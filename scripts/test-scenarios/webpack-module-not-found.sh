#!/usr/bin/env bash
# Scenario: webpack_module_not_found
# actions/echo/index.js requires a local module that doesn't exist on disk.
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=_common.sh
source "$DIR/_common.sh"

require_clean_tree
checkout_from 51017bb actions/echo/index.js
commit_or_skip "test: introduce a non-existent local require to trigger webpack_module_not_found classification" \
  actions/echo/index.js
scenario_done "webpack_module_not_found" "npm run build"
