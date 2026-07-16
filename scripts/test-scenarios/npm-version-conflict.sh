#!/usr/bin/env bash
# Scenario: npm_version_conflict
# Adds conflicting peer dependencies (react@15 with react-dom@19) and drops
# package-lock.json so npm has to resolve from scratch.
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=_common.sh
source "$DIR/_common.sh"

require_clean_tree
checkout_from c775adb package.json
remove_files package-lock.json
commit_or_skip "test: add conflicting peer dependencies to trigger npm version-conflict error" \
  package.json package-lock.json
scenario_done "npm_version_conflict" "npm install"
