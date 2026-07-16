#!/usr/bin/env bash
# Scenario: jest_test_failure
# Chains jest into the build script and adds a deliberately failing assertion.
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=_common.sh
source "$DIR/_common.sh"

require_clean_tree
checkout_from cdb1928 package.json test/actions/echo.test.js
commit_or_skip "test: chain jest into build and introduce a failing assertion to trigger jest_test_failure classification" \
  package.json test/actions/echo.test.js
scenario_done "jest_test_failure" "npm run build   # (build now runs jest first)"
