#!/usr/bin/env bash
# Scenario: syntax_error
# Appends an unclosed/invalid function definition to actions/echo/index.js.
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=_common.sh
source "$DIR/_common.sh"

require_clean_tree
checkout_from 210b9e9 actions/echo/index.js
commit_or_skip "test: introduce syntax error to trigger build syntax_error classification" \
  actions/echo/index.js
scenario_done "syntax_error" "npm run build"
