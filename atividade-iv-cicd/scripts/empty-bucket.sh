#!/usr/bin/env bash
# =============================================================================
# empty-bucket.sh — remove TODAS as versoes e marcadores de exclusao de um
# bucket versionado, deixando-o vazio para que o CloudFormation possa apaga-lo.
#
# Uso: ./empty-bucket.sh NOME_DO_BUCKET
# =============================================================================
set -euo pipefail

BUCKET="${1:-}"
[[ -n "$BUCKET" ]] || { echo "Uso: $0 NOME_DO_BUCKET" >&2; exit 2; }
command -v jq >/dev/null 2>&1 || { echo "jq e obrigatorio" >&2; exit 2; }
: "${AWS_REGION:?Defina AWS_REGION}"

if ! aws s3api head-bucket --bucket "$BUCKET" >/dev/null 2>&1; then
  echo "==> Bucket $BUCKET nao existe; nada a esvaziar"
  exit 0
fi

echo "==> Esvaziando $BUCKET (versoes + marcadores de exclusao)"
while :; do
  LIST_JSON="$(aws s3api list-object-versions --bucket "$BUCKET" \
    --max-keys 1000 --output json)"
  PAYLOAD="$(jq -c '{
    Objects: ((.Versions // []) + (.DeleteMarkers // []))
      | map({Key: .Key, VersionId: .VersionId}),
    Quiet: true
  }' <<<"$LIST_JSON")"
  COUNT="$(jq '.Objects | length' <<<"$PAYLOAD")"

  if [[ "$COUNT" -eq 0 ]]; then
    break
  fi

  TMP_FILE="$(mktemp)"
  printf '%s\n' "$PAYLOAD" > "$TMP_FILE"
  aws s3api delete-objects --bucket "$BUCKET" --delete "file://$TMP_FILE" >/dev/null
  rm -f "$TMP_FILE"
  echo "    removidos $COUNT objetos"
done

echo "==> Bucket $BUCKET vazio"
