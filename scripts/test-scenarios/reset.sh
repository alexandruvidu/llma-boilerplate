#!/usr/bin/env bash
# Restores the files touched by any test-scenarios/*.sh script back to the
# clean pre-scenario baseline. Safe to run regardless of which scenario (if
# any) is currently applied, including one already committed on main.
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=_common.sh
source "$DIR/_common.sh"

FILES=(actions/echo/index.js package.json package-lock.json test/actions/echo.test.js)

git checkout "$BASELINE_SHA" -- "${FILES[@]}"
commit_or_skip "Revert test scenario: restore actions/echo and package files to clean baseline" "${FILES[@]}"
push_current_branch
echo "Working tree restored to the clean baseline ($BASELINE_SHA)."
