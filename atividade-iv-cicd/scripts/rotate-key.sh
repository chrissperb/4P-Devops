#!/usr/bin/env bash
# =============================================================================
# rotate-key.sh — rotaciona a access key do usuario do pipeline.
#
# Fluxo:
#   1. ./rotate-key.sh                 # cria nova chave e imprime os valores
#   2. Atualize AWS_ACCESS_KEY_ID e AWS_SECRET_ACCESS_KEY no GitHub
#   3. ./rotate-key.sh --delete OLD_ID # remove a chave antiga
#
# Nunca remove a ultima chave existente.
# =============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
STATE_FILE="$PROJECT_DIR/.bootstrap.env"

if [[ -f "$STATE_FILE" ]]; then
  # shellcheck disable=SC1090
  source "$STATE_FILE"
fi

export AWS_PROFILE="${AWS_PROFILE:-chrissperb}"
USER_NAME="${USER_NAME:-github-actions-4p-devops}"

DELETE_ID=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --delete) DELETE_ID="${2:-}"; shift 2 ;;
    -h|--help) sed -n '3,13p' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) echo "Argumento desconhecido: $1" >&2; exit 2 ;;
  esac
done

if [[ -n "$DELETE_ID" ]]; then
  REMAINING="$(aws iam list-access-keys --user-name "$USER_NAME" \
    --query 'length(AccessKeyMetadata)' --output text)"
  if [[ "$REMAINING" -le 1 ]]; then
    echo "Recusado: $DELETE_ID e a ultima chave do usuario." >&2
    exit 1
  fi
  aws iam delete-access-key --user-name "$USER_NAME" --access-key-id "$DELETE_ID"
  echo "Chave $DELETE_ID removida."
  exit 0
fi

echo "==> Criando nova access key para $USER_NAME"
KEY_JSON="$(aws iam create-access-key --user-name "$USER_NAME" \
  --query 'AccessKey.[AccessKeyId,SecretAccessKey]' --output text)"
read -r NEW_KEY_ID NEW_SECRET <<< "$KEY_JSON"

cat <<EOF

Nova chave criada:
  AWS_ACCESS_KEY_ID     = ${NEW_KEY_ID}
  AWS_SECRET_ACCESS_KEY = ${NEW_SECRET}

1. Atualize os dois secrets no GitHub.
2. Valide com um workflow_dispatch (action=apply, skip_infra=true).
3. Remova a chave antiga:
   ./rotate-key.sh --delete <ID_ANTIGO>

Chaves atuais:
$(aws iam list-access-keys --user-name "$USER_NAME" \
  --query 'AccessKeyMetadata[].[AccessKeyId,Status,CreateDate]' --output table)
EOF
