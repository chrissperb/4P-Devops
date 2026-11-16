# Napkin Runbook

## Curation Rules
- Re-prioritize on every read.
- Keep recurring, high-value notes only.
- Max 10 items per category.
- Each item includes date + "Do instead".

## Execution & Validation (Highest Priority)
1. **[2026-11-15] `cfn-lint` is not on PATH**
   Do instead: run `/tmp/opencode/cfnlint-venv/bin/cfn-lint <template>`; confirm exit 0.

2. **[2026-11-15] Docker socket is not accessible to the current user**
   Do instead: run the downloaded `/tmp/opencode/actionlint` binary, not `docker run ... actionlint`.

3. **[2026-11-15] S3 artifacts bucket uses SSE-KMS**
   Do instead: keep `kms:GenerateDataKey` and `kms:Decrypt` on the deploy role, restricted with `kms:ViaService=s3.<region>.amazonaws.com`; otherwise `aws s3 cp` fails.

4. **[2026-11-15] No AWS/GitHub mutations without explicit approval**
   Do instead: implement and validate locally; do not create/update/delete stacks, push, or open PRs unless the user authorizes it.

5. **[2026-11-15] IAM managed policy hard limit is 6144 characters**
   Do instead: measure the rendered/minified policy before bootstrap; remove unused actions or split into multiple managed policies.

6. **[2026-11-15] CloudFormation `CREATE` change sets leave empty `REVIEW_IN_PROGRESS` stacks**
   Do instead: delete the empty stack after a non-applied plan, and clean it before retrying apply.

7. **[2026-11-15] S3 IAM action names differ from the API operation names**
   Do instead: use `s3:PutEncryptionConfiguration` (not `PutBucketEncryption`) and `s3:PutLifecycleConfiguration` (not `PutBucketLifecycleConfiguration`).

8. **[2026-11-15] CloudFormation VPC/subnet attributes need EC2 modify actions**
   Do instead: keep `ec2:ModifyVpcAttribute` and `ec2:ModifySubnetAttribute` in the deploy role; `EnableDns*` and `MapPublicIpOnLaunch` call them.

9. **[2026-11-15] CloudFormation no-changes can surface as a failed waiter**
   Do instead: inspect the change set reason for `didn't contain changes` and treat it as `unchanged`, not as a pipeline failure.

10. **[2026-11-15] ELB needs `ec2:GetSecurityGroupsForVpc`**
   Do instead: keep this action in the deploy role; `Describe*` does not cover it.

11. **[2026-11-15] RDS subnet-group changes can replace the DB instance**
   Do instead: inspect the change set and take a manual snapshot before any update where data exists.

## Shell & Command Reliability
1. **[2026-11-15] Editing existing files may be blocked by tool permissions**
   Do instead: use a small anchored Python replacement from the shell, assert the old block exists exactly once, then review `git diff`.

2. **[2026-11-15] Preserve exact YAML anchors in CloudFormation patches**
   Do instead: patch logical resource/property blocks, not raw line numbers; line numbers shift after each insertion.

## Domain Behavior Guardrails
1. **[2026-11-15] Region is fixed to `us-east-2`**
   Do instead: use `us-east-2` in templates, ACM references, CLI examples, and docs.

2. **[2026-11-15] HTTPS on ALB needs ACM certificate and domain**
   Do instead: keep the 443 listener conditional on both `CertificateArn` and `DomainName`; never imply the ALB DNS name can use a public ACM cert.

## User Directives
1. **[2026-11-15] Keep the Atividade IV deliverable self-contained and reproducible**
   Do instead: document prerequisites, parameters, approval gates, artifacts/state, rollback, and exact verification commands.
