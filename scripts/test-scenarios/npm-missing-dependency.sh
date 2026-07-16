#!/usr/bin/env bash
# Scenario: npm_missing_dependency
# Adds a dependency on a package that doesn't exist on the registry and drops
# package-lock.json so npm has to resolve from scratch.
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=_common.sh
source "$DIR/_common.sh"

require_clean_tree
checkout_from 3cea3cf package.json
remove_files package-lock.json
commit_or_skip "test: add non-existent dependency to trigger npm missing-dependency error" \
  package.json package-lock.json
scenario_done "npm_missing_dependency" "npm install"
