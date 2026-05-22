#!/bin/bash
set -e

PR_NUMBER="$1"
RULES_FILE=".github/ai-review-rules.md"
DIFF_FILE="/tmp/pr.diff"
REVIEW_FILE="/tmp/review.md"

if [ ! -f "$DIFF_FILE" ]; then
  echo "Diff file not found, skipping AI review"
  exit 0
fi

if [ -z "$DEEPSEEK_API_KEY" ]; then
  echo "DEEPSEEK_API_KEY not set, skipping AI review"
  exit 0
fi

echo "Sending diff to DeepSeek for review..."

RESPONSE=$(jq -n \
  --rawfile rules "$RULES_FILE" \
  --rawfile diff "$DIFF_FILE" \
  '{
    model: "deepseek-v4-pro",
    max_tokens: 2048,
    messages: [{
      role: "user",
      content: (
        "You are a code reviewer. Review the git diff against the rules below. "
        + "For each violation, output one line: [SEVERITY] file:line - explanation. "
        + "If no violations found, output \"No issues found.\". "
        + "Do NOT output preamble, summary, or markdown headers.\n\n"
        + "--- REVIEW RULES ---\n\($rules)\n\n"
        + "--- GIT DIFF ---\n\($diff)"
      )
    }]
  }' \
  | curl -s --max-time 120 \
    https://api.deepseek.com/anthropic/v1/messages \
    -H "x-api-key: $DEEPSEEK_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "content-type: application/json" \
    -d @-)

if echo "$RESPONSE" | jq -e '.content[0].text' > /dev/null 2>&1; then
  echo "$RESPONSE" | jq -r '.content[0].text' > "$REVIEW_FILE"
  echo "=== AI Review Result ==="
  cat "$REVIEW_FILE"
else
  ERROR_MSG=$(echo "$RESPONSE" | jq -r '.error.message // "Unknown API error"')
  echo "AI review API error: $ERROR_MSG"
  echo "AI review skipped due to API error: $ERROR_MSG" > "$REVIEW_FILE"
fi

gh pr review "$PR_NUMBER" --body-file "$REVIEW_FILE" --comment
