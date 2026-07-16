#!/usr/bin/env bash
# Shared helpers for scripts/test-scenarios/*.sh
# These scripts overlay a known CI-failure scenario onto the working tree,
# commit it as a new commit on top of the current branch tip (HEAD never
# moves before the commit, so no existing history is discarded), and push it
# to origin. reset.sh commits and pushes the inverse to restore the clean
# baseline.
set -euo pipefail

REPO_ROOT="$(git -C "$(dirname "${BASH_SOURCE[0]}")" rev-parse --show-toplevel)"
cd "$REPO_ROOT"

# Last commit before any of the test-scenario churn started.
BASELINE_SHA="46a2f82"

require_clean_tree() {
  if [[ -n "$(git status --porcelain)" ]]; then
    echo "error: working tree has uncommitted changes." >&2
    echo "Commit or stash them first (git stash -u), or run scripts/test-scenarios/reset.sh." >&2
    exit 1
  fi
}

checkout_from() {
  local sha="$1"; shift
  git checkout "$sha" -- "$@"
}

remove_files() {
  git rm -f --quiet --ignore-unmatch -- "$@"
}

commit_or_skip() {
  # Commits only the given paths, so any unrelated staged/dirty state (should
  # there be any) is left untouched rather than swept into this commit.
  local message="$1"; shift
  if git diff --cached --quiet -- "$@"; then
    echo "Nothing to commit (already matches this state)."
    return 0
  fi
  git commit -q -m "$message" -- "$@"
  echo "Committed: $(git rev-parse --short HEAD) $message"
}

push_current_branch() {
  local branch
  branch="$(git branch --show-current)"
  if git rev-parse --abbrev-ref --symbolic-full-name '@{u}' >/dev/null 2>&1; then
    git push
  else
    git push -u origin "$branch"
  fi
  echo "Pushed '$branch' to origin."
}

scenario_done() {
  local name="$1" cmd="$2"
  push_current_branch
  echo "Committed and pushed '$name' scenario on top of $(git branch --show-current)."
  echo "Try it: $cmd"
  echo "Undo:   scripts/test-scenarios/reset.sh"
}
