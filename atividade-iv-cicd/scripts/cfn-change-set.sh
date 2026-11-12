#!/usr/bin/env bash
# =============================================================================
# cfn-change-set.sh — cria um change set (equivalente ao "plan") e,
# opcionalmente, executa (equivalente ao "apply").
#
# Uso:
#   ./cfn-change-set.sh --stack NAME --template FILE --parameters FILE \
#       --status-file FILE [--plan-out FILE] [--apply] \
#       [--capabilities CAPABILITY_IAM] [--description TEXTO]
#
# Saídas:
#   --status-file: "changed" ou "unchanged"
#   --plan-out:    JSON do describe-change-set (ou {"Status":"NO_CHANGES"})
#
# Códigos de saída:
#   0  plano criado/aplicado, com ou sem mudanças
#   1  falha no CloudFormation
#   2  uso incorreto
# =============================================================================
set -euo pipefail

usage() {
  sed -n '3,20p' "$0" | sed 's/^# \{0,1\}//'
}

STACK=""
TEMPLATE=""
PARAMETERS=""
STATUS_FILE=""
PLAN_OUT=""
CAPABILITIES=""
DESCRIPTION=""
APPLY="false"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --stack)        STACK="${2:-}"; shift 2 ;;
    --template)     TEMPLATE="${2:-}"; shift 2 ;;
    --parameters)   PARAMETERS="${2:-}"; shift 2 ;;
    --status-file)  STATUS_FILE="${2:-}"; shift 2 ;;
    --plan-out)     PLAN_OUT="${2:-}"; shift 2 ;;
    --capabilities) CAPABILITIES="${2:-}"; shift 2 ;;
    --description)  DESCRIPTION="${2:-}"; shift 2 ;;
    --apply)        APPLY="true"; shift ;;
    -h|--help)      usage; exit 0 ;;
    *) echo "Argumento desconhecido: $1" >&2; usage >&2; exit 2 ;;
  esac
done

[[ -n "$STACK" && -n "$TEMPLATE" && -n "$PARAMETERS" && -n "$STATUS_FILE" ]] || {
  usage >&2
  exit 2
}
[[ -f "$TEMPLATE" ]]   || { echo "Template nao encontrado: $TEMPLATE" >&2; exit 2; }
[[ -f "$PARAMETERS" ]] || { echo "Parametros nao encontrados: $PARAMETERS" >&2; exit 2; }
: "${AWS_REGION:?Defina AWS_REGION (ex.: us-east-2)}"

CHANGE_SET="cs-${GITHUB_RUN_ID:-local}-${GITHUB_RUN_ATTEMPT:-0}-$(date +%s)"
CHANGE_SET_ARGS=(
  --stack-name "$STACK"
  --change-set-name "$CHANGE_SET"
  --template-body "file://$TEMPLATE"
  --parameters "file://$PARAMETERS"
  --description "${DESCRIPTION:-Deploy de $STACK}"
)

if aws cloudformation describe-stacks --stack-name "$STACK" >/dev/null 2>&1; then
  MODE="UPDATE"
  STACK_STATUS="$(aws cloudformation describe-stacks --stack-name "$STACK" \
    --query 'Stacks[0].StackStatus' --output text)"
  if [[ "$STACK_STATUS" == "ROLLBACK_COMPLETE" || "$STACK_STATUS" == *_IN_PROGRESS ]]; then
    echo "Stack $STACK esta em $STACK_STATUS; nao e possivel atualizar." >&2
    echo "Execute o job destroy ou apague a stack antes de tentar de novo." >&2
    exit 1
  fi
else
  MODE="CREATE"
  STACK_STATUS=""
fi

CHANGE_SET_ARGS+=(--change-set-type "$MODE")
[[ -n "$CAPABILITIES" ]] && CHANGE_SET_ARGS+=(--capabilities "$CAPABILITIES")

echo "==> Stack $STACK ($MODE): criando change set $CHANGE_SET"

set +e
CREATE_OUTPUT="$(aws cloudformation create-change-set "${CHANGE_SET_ARGS[@]}" 2>&1)"
CREATE_RC=$?
set -e

if [[ $CREATE_RC -ne 0 ]]; then
  if grep -qi "didn't contain changes\|No updates are to be performed" <<<"$CREATE_OUTPUT"; then
    echo "==> Sem mudancas em $STACK"
    echo "unchanged" > "$STATUS_FILE"
    if [[ -n "$PLAN_OUT" ]]; then
      printf '{"StackName":"%s","Status":"NO_CHANGES","Changes":[]}\n' "$STACK" > "$PLAN_OUT"
    fi
    exit 0
  fi
  echo "$CREATE_OUTPUT" >&2
  exit 1
fi

if ! aws cloudformation wait change-set-create-complete \
      --stack-name "$STACK" --change-set-name "$CHANGE_SET"; then
  echo "Falha ao montar o change set de $STACK:" >&2
  aws cloudformation describe-change-set --stack-name "$STACK" \
    --change-set-name "$CHANGE_SET" \
    --query '[Status,StatusReason]' --output text >&2 || true
  exit 1
fi

aws cloudformation describe-change-set --stack-name "$STACK" \
  --change-set-name "$CHANGE_SET" \
  --query 'Changes[].ResourceChange.[Action,LogicalResourceId,ResourceType]' \
  --output table || true

if [[ -n "$PLAN_OUT" ]]; then
  aws cloudformation describe-change-set --stack-name "$STACK" \
    --change-set-name "$CHANGE_SET" --output json > "$PLAN_OUT"
fi

if [[ "$APPLY" == "true" ]]; then
  echo "==> Aplicando $STACK"
  aws cloudformation execute-change-set --stack-name "$STACK" \
    --change-set-name "$CHANGE_SET"

  WAIT_TARGET="stack-update-complete"
  [[ "$MODE" == "CREATE" ]] && WAIT_TARGET="stack-create-complete"

  if ! aws cloudformation wait "$WAIT_TARGET" --stack-name "$STACK"; then
    echo "Falha ao aplicar $STACK. Ultimos eventos:" >&2
    aws cloudformation describe-stack-events --stack-name "$STACK" \
      --max-items 25 \
      --query 'StackEvents[].[Timestamp,LogicalResourceId,ResourceStatus,ResourceStatusReason]' \
      --output table >&2 || true
    exit 1
  fi

  echo "changed" > "$STATUS_FILE"
  echo "==> $STACK aplicada com sucesso"
else
  aws cloudformation delete-change-set --stack-name "$STACK" \
    --change-set-name "$CHANGE_SET" >/dev/null 2>&1 || true
  echo "changed" > "$STATUS_FILE"
  echo "==> Plano de $STACK pronto (change set removido; nada aplicado)"
fi
