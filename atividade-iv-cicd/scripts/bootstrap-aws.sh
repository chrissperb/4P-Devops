#!/usr/bin/env bash
# =============================================================================
# bootstrap-aws.sh — prepara a conta AWS para o pipeline do GitHub Actions.
#
# Cria (idempotente):
#   1. Bucket de artifacts com versionamento, SSE-KMS, bloqueio publico e
#      ciclo de vida;
#   2. Usuario IAM programatico com permissao APENAS de assumir uma role;
#   3. Role de deploy com politica escopada (CloudFormation, S3, CloudFront,
#      servicos da stack da Atividade III);
#   4. Access key (somente se ainda nao existir).
#
# Por que nao OIDC: a conta do projeto (plano FREE do novo AWS experience)
# aplica um SCP que nega iam:*Provider*, impedindo criar o provedor OIDC do
# GitHub. O requisito da atividade aceita AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY.
# A chave fica restrita a sts:AssumeRole; o runner usa credenciais temporarias.
#
# Uso:
#   AWS_PROFILE=chrissperb ./bootstrap-aws.sh
#   EXTERNAL_ID=... AWS_PROFILE=chrissperb ./bootstrap-aws.sh   # reexecucao
#
# Nunca comite o arquivo .bootstrap.env nem a secret key.
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
export AWS_REGION="${AWS_REGION:-us-east-2}"
export AWS_DEFAULT_REGION="$AWS_REGION"

EXPECTED_ACCOUNT_ID="${EXPECTED_ACCOUNT_ID:-686420703845}"
PROJECT_NAME="${PROJECT_NAME:-devops-iv}"
ROLE_NAME="${ROLE_NAME:-gha-4p-devops-deploy}"
USER_NAME="${USER_NAME:-github-actions-4p-devops}"
POLICY_NAME="${POLICY_NAME:-gha-4p-devops-deploy-policy}"
BUCKET="${BUCKET:-${PROJECT_NAME}-artifacts-${EXPECTED_ACCOUNT_ID}-${AWS_REGION}}"
EXTERNAL_ID="${EXTERNAL_ID:-$(openssl rand -hex 16)}"

for bin in aws openssl sed; do
  command -v "$bin" >/dev/null 2>&1 || { echo "Dependencia ausente: $bin" >&2; exit 2; }
done

ACCOUNT_ID="$(aws sts get-caller-identity --query Account --output text)"
if [[ "$ACCOUNT_ID" != "$EXPECTED_ACCOUNT_ID" ]]; then
  echo "Conta ativa ($ACCOUNT_ID) diferente da esperada ($EXPECTED_ACCOUNT_ID)." >&2
  echo "Confirme o AWS_PROFILE ou defina EXPECTED_ACCOUNT_ID." >&2
  exit 1
fi

ROLE_ARN="arn:aws:iam::${ACCOUNT_ID}:role/${ROLE_NAME}"
POLICY_ARN="arn:aws:iam::${ACCOUNT_ID}:policy/${POLICY_NAME}"

render() {
  sed \
    -e "s|\${ACCOUNT_ID}|${ACCOUNT_ID}|g" \
    -e "s|\${USER_NAME}|${USER_NAME}|g" \
    -e "s|\${ROLE_NAME}|${ROLE_NAME}|g" \
    -e "s|\${EXTERNAL_ID}|${EXTERNAL_ID}|g" \
    -e "s|\${AWS_REGION}|${AWS_REGION}|g" \
    -e "s|\${BUCKET}|${BUCKET}|g" \
    "$1"
}

echo "==> Conta $ACCOUNT_ID | regiao $AWS_REGION | perfil $AWS_PROFILE"

# -----------------------------------------------------------------------------
# 1. Bucket de artifacts
# -----------------------------------------------------------------------------
echo "==> Bucket de artifacts: $BUCKET"
if ! aws s3api head-bucket --bucket "$BUCKET" >/dev/null 2>&1; then
  if [[ "$AWS_REGION" == "us-east-1" ]]; then
    aws s3api create-bucket --bucket "$BUCKET" --region "$AWS_REGION" >/dev/null
  else
    aws s3api create-bucket --bucket "$BUCKET" --region "$AWS_REGION" \
      --create-bucket-configuration "LocationConstraint=$AWS_REGION" >/dev/null
  fi
  echo "    bucket criado"
else
  echo "    bucket ja existe"
fi

aws s3api put-public-access-block --bucket "$BUCKET" \
  --public-access-block-configuration \
  "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"

aws s3api put-bucket-versioning --bucket "$BUCKET" \
  --versioning-configuration Status=Enabled

ENCRYPTION_FILE="$(mktemp)"
cat > "$ENCRYPTION_FILE" <<'JSON'
{
  "Rules": [
    {
      "ApplyServerSideEncryptionByDefault": {
        "SSEAlgorithm": "aws:kms",
        "KMSMasterKeyID": "alias/aws/s3"
      },
      "BucketKeyEnabled": true
    }
  ]
}
JSON
aws s3api put-bucket-encryption --bucket "$BUCKET" \
  --server-side-encryption-configuration "file://$ENCRYPTION_FILE"
rm -f "$ENCRYPTION_FILE"

aws s3api put-bucket-lifecycle-configuration --bucket "$BUCKET" \
  --lifecycle-configuration "file://$PROJECT_DIR/s3/artifacts-lifecycle.json"

# -----------------------------------------------------------------------------
# 2. Usuario IAM programatico (sem login no console)
# -----------------------------------------------------------------------------
echo "==> Usuario IAM: $USER_NAME"
if aws iam get-user --user-name "$USER_NAME" >/dev/null 2>&1; then
  echo "    usuario ja existe"
else
  aws iam create-user --user-name "$USER_NAME" \
    --tags "Key=Project,Value=$PROJECT_NAME" "Key=ManagedBy,Value=bootstrap-aws.sh" >/dev/null
  echo "    usuario criado"
fi

USER_POLICY_FILE="$(mktemp)"
render "$PROJECT_DIR/iam/github-user-policy.json" > "$USER_POLICY_FILE"
aws iam put-user-policy --user-name "$USER_NAME" \
  --policy-name "GitHubActionsAssumeOnly" \
  --policy-document "file://$USER_POLICY_FILE"
rm -f "$USER_POLICY_FILE"

# -----------------------------------------------------------------------------
# 3. Role de deploy e politica escopada
# -----------------------------------------------------------------------------
echo "==> Role: $ROLE_NAME"
TRUST_FILE="$(mktemp)"
render "$PROJECT_DIR/iam/deploy-role-trust.json" > "$TRUST_FILE"

if aws iam get-role --role-name "$ROLE_NAME" >/dev/null 2>&1; then
  aws iam update-assume-role-policy --role-name "$ROLE_NAME" \
    --policy-document "file://$TRUST_FILE"
  echo "    trust policy atualizada"
else
  aws iam create-role --role-name "$ROLE_NAME" \
    --assume-role-policy-document "file://$TRUST_FILE" \
    --description "Deploy do pipeline GitHub Actions (Atividade IV)" \
    --max-session-duration 3600 \
    --tags "Key=Project,Value=$PROJECT_NAME" "Key=ManagedBy,Value=bootstrap-aws.sh" >/dev/null
  echo "    role criada"
fi
rm -f "$TRUST_FILE"

echo "==> Politica: $POLICY_NAME"
ROLE_POLICY_FILE="$(mktemp)"
render "$PROJECT_DIR/iam/deploy-role-policy.json" > "$ROLE_POLICY_FILE"

if aws iam get-policy --policy-arn "$POLICY_ARN" >/dev/null 2>&1; then
  # Mantem no maximo uma versao antiga para nao estourar o limite de 5.
  OLD_VERSIONS="$(aws iam list-policy-versions --policy-arn "$POLICY_ARN" \
    --query 'sort_by(Versions[?IsDefaultVersion==`false`], &CreateDate)[].VersionId' \
    --output text)"
  read -r -a VERSIONS_ARRAY <<< "$OLD_VERSIONS"
  for ((i = 0; i < ${#VERSIONS_ARRAY[@]} - 1; i++)); do
    aws iam delete-policy-version --policy-arn "$POLICY_ARN" \
      --version-id "${VERSIONS_ARRAY[$i]}" >/dev/null 2>&1 || true
  done

  aws iam create-policy-version --policy-arn "$POLICY_ARN" \
    --policy-document "file://$ROLE_POLICY_FILE" --set-as-default >/dev/null
  echo "    nova versao publicada"
else
  aws iam create-policy --policy-name "$POLICY_NAME" \
    --policy-document "file://$ROLE_POLICY_FILE" \
    --description "Permissoes do pipeline GitHub Actions (Atividade IV)" >/dev/null
  echo "    politica criada"
fi
rm -f "$ROLE_POLICY_FILE"

aws iam attach-role-policy --role-name "$ROLE_NAME" --policy-arn "$POLICY_ARN"

# -----------------------------------------------------------------------------
# 4. Access key (uma unica vez)
# -----------------------------------------------------------------------------
echo "==> Access key do usuario $USER_NAME"
KEY_ID="$(aws iam list-access-keys --user-name "$USER_NAME" \
  --query 'AccessKeyMetadata[0].AccessKeyId' --output text 2>/dev/null || true)"

if [[ -z "$KEY_ID" || "$KEY_ID" == "None" ]]; then
  KEY_JSON="$(aws iam create-access-key --user-name "$USER_NAME" \
    --query 'AccessKey.[AccessKeyId,SecretAccessKey]' --output text)"
  read -r KEY_ID ACCESS_KEY_SECRET <<< "$KEY_JSON"
  echo "    chave criada"
else
  ACCESS_KEY_SECRET=""
  echo "    chave existente: $KEY_ID (segredo nao pode ser recuperado)"
  echo "    para trocar, use scripts/rotate-key.sh"
fi

if [[ -n "${ACCESS_KEY_SECRET:-}" ]]; then
  ACCESS_KEY_SECRET_DISPLAY="$ACCESS_KEY_SECRET"
else
  ACCESS_KEY_SECRET_DISPLAY="(chave existente; segredo nao recuperavel)"
fi

# -----------------------------------------------------------------------------
# 5. Estado local e teste
# -----------------------------------------------------------------------------
umask 077
cat > "$STATE_FILE" <<EOF
# Gerado por bootstrap-aws.sh — NAO COMITAR
AWS_PROFILE=$AWS_PROFILE
AWS_REGION=$AWS_REGION
ACCOUNT_ID=$ACCOUNT_ID
ROLE_ARN=$ROLE_ARN
EXTERNAL_ID=$EXTERNAL_ID
BUCKET=$BUCKET
USER_NAME=$USER_NAME
EOF
chmod 600 "$STATE_FILE"

echo "==> Testando AssumeRole"
aws sts assume-role --role-arn "$ROLE_ARN" --role-session-name bootstrap-check \
  --external-id "$EXTERNAL_ID" \
  --query 'AssumedRoleUser.Arn' --output text

cat <<EOF

=============================================================================
Bootstrap concluido.

GitHub -> Settings -> Secrets and variables -> Actions:
  AWS_ACCESS_KEY_ID      = ${KEY_ID}
  AWS_SECRET_ACCESS_KEY  = ${ACCESS_KEY_SECRET_DISPLAY}
  AWS_ROLE_ARN           = ${ROLE_ARN}
  AWS_ROLE_EXTERNAL_ID   = ${EXTERNAL_ID}
  ARTIFACTS_BUCKET       = ${BUCKET}

Estado local salvo em: ${STATE_FILE} (gitignored, modo 600)
Nunca comite access keys. Rotacione com scripts/rotate-key.sh.
=============================================================================
EOF
