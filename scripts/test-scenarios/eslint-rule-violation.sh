#!/usr/bin/env bash
# Scenario: eslint_rule_violation
# Adds eslint-plugin-jest, chains `eslint actions/` into the build script, and
# introduces a no-undef violation in actions/echo/index.js.
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=_common.sh
source "$DIR/_common.sh"

require_clean_tree
checkout_from 0e15dc9 actions/echo/index.js package.json package-lock.json
commit_or_skip "test: add missing eslint-plugin-jest devDependency; chain lint into build and introduce a no-undef violation to trigger eslint_rule_violation classification" \
  actions/echo/index.js package.json package-lock.json
scenario_done "eslint_rule_violation" "npm run build   # (build now runs eslint first)"
