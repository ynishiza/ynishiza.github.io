#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$SCRIPT_DIR/../.."
NOTES_FILE="$REPO_ROOT/pages/notes.md"
DOCS_DIR="$REPO_ROOT/docs"
COUNT=0

while IFS= read -r file_link; do
	file_link="$(printf '%s\n' "$file_link" | sed 's/\\(/(/g; s/\\)/)/g')"
	file_path="$DOCS_DIR/${file_link#./}"
	COUNT=$((COUNT + 1))

	echo "$COUNT: $file_link -> $file_path"
	if [[ ! -f "$file_path" ]]; then
		printf 'Missing: %s\n' "$file_path"
		exit 1
	fi
done < <(sed -nE 's/.*\]\((.*\.pdf)\).*/\1/p' "$NOTES_FILE")
