#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# ClarityChart — Generate Lambda deploy script
#
# Usage:
#   FIRST TIME (creates the CloudFormation stack + Lambda):
#     ./scripts/deploy-generate-lambda.sh --init
#
#   SUBSEQUENT DEPLOYS (updates Lambda code only — fast, ~10 seconds):
#     ./scripts/deploy-generate-lambda.sh
#
# Prerequisites:
#   - AWS CLI installed and configured (aws configure) with a profile that has
#     CloudFormation, Lambda, and IAM permissions in your BAA-signed account
#   - The values for the four required parameters (see CONFIGURATION below)
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

# ── CONFIGURATION ─────────────────────────────────────────────────────────────
# Fill these in before running --init. After first deploy they live in AWS and
# do not need to be re-supplied for code-only updates.

ANTHROPIC_API_KEY=""          # Your Anthropic secret key
SUPABASE_URL=""               # e.g. https://xxxx.supabase.co
SUPABASE_ANON_KEY=""          # Supabase public anon key
ALLOWED_ORIGIN=""             # e.g. https://app.claritychart.com (or * for testing)

# AWS settings
REGION="us-east-1"           # Must match the region where Amplify is deployed
STACK_NAME="claritychart-generate-lambda"
FUNCTION_NAME="claritychart-generate"
# ─────────────────────────────────────────────────────────────────────────────

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
LAMBDA_DIR="$PROJECT_ROOT/lambda/generate"
ZIP_PATH="/tmp/claritychart-generate-lambda.zip"

package_lambda() {
  echo "→ Packaging lambda/generate/index.mjs..."
  rm -f "$ZIP_PATH"
  cd "$LAMBDA_DIR"
  zip -j "$ZIP_PATH" index.mjs
  cd "$PROJECT_ROOT"
  echo "  Packaged: $ZIP_PATH ($(du -sh "$ZIP_PATH" | cut -f1))"
}

deploy_code() {
  echo "→ Uploading Lambda code..."
  aws lambda update-function-code \
    --function-name "$FUNCTION_NAME" \
    --zip-file "fileb://$ZIP_PATH" \
    --region "$REGION" \
    --output text \
    --query 'FunctionName' | xargs echo "  Updated:"

  echo "→ Waiting for update to complete..."
  aws lambda wait function-updated \
    --function-name "$FUNCTION_NAME" \
    --region "$REGION"
  echo "  Done."
}

print_url() {
  URL=$(aws lambda get-function-url-config \
    --function-name "$FUNCTION_NAME" \
    --region "$REGION" \
    --query 'FunctionUrl' \
    --output text 2>/dev/null || true)
  if [ -n "$URL" ]; then
    echo ""
    echo "────────────────────────────────────────────────────────────"
    echo "  Lambda Function URL:"
    echo "  $URL"
    echo ""
    echo "  → Add this to Amplify environment variables as:"
    echo "    NEXT_PUBLIC_GENERATE_URL = $URL"
    echo "────────────────────────────────────────────────────────────"
  fi
}

# ── INIT: create CloudFormation stack ─────────────────────────────────────────
if [ "${1:-}" = "--init" ]; then
  if [ -z "$ANTHROPIC_API_KEY" ] || [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_ANON_KEY" ] || [ -z "$ALLOWED_ORIGIN" ]; then
    echo "ERROR: Fill in ANTHROPIC_API_KEY, SUPABASE_URL, SUPABASE_ANON_KEY,"
    echo "       and ALLOWED_ORIGIN at the top of this script before running --init."
    exit 1
  fi

  echo "→ Creating CloudFormation stack: $STACK_NAME..."
  aws cloudformation deploy \
    --template-file "$PROJECT_ROOT/infrastructure/generate-lambda.yml" \
    --stack-name "$STACK_NAME" \
    --region "$REGION" \
    --capabilities CAPABILITY_NAMED_IAM \
    --parameter-overrides \
      AnthropicApiKey="$ANTHROPIC_API_KEY" \
      SupabaseUrl="$SUPABASE_URL" \
      SupabaseAnonKey="$SUPABASE_ANON_KEY" \
      AllowedOrigin="$ALLOWED_ORIGIN"

  echo "  Stack created."
  package_lambda
  deploy_code
  print_url
  echo ""
  echo "NEXT STEPS:"
  echo "  1. Copy the Function URL above into Amplify:"
  echo "     App settings → Environment variables → NEXT_PUBLIC_GENERATE_URL"
  echo "  2. Trigger a new Amplify build to pick up the env var."
  echo "  3. Future code updates: ./scripts/deploy-generate-lambda.sh (no --init)"
  exit 0
fi

# ── DEFAULT: code-only update ─────────────────────────────────────────────────
package_lambda
deploy_code
print_url
echo "Deploy complete."
