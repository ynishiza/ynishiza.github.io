#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source_dir="$script_dir/source"
dist_dir="$script_dir/../../docs/notes"
tool_dir="$script_dir/viewer_script"
build_dir="$tool_dir/.build"
binary="$build_dir/rtfd-to-pdf"

mkdir -p "$build_dir" "$dist_dir"
swiftc -module-cache-path "$build_dir/module-cache" "$tool_dir/RtfdToPdf.swift" -o "$binary"

find "$source_dir" \( -type d -name '*.rtfd' -print -prune \) -o \( -type f -name '*.rtf' -print \) |
while IFS= read -r input; do
	relative_path="${input#$source_dir/}"
	output="$dist_dir/${relative_path%.*}.pdf"
	mkdir -p "$(dirname "$output")"
	echo "Converting $input -> $output"

	# IMPORTANT: do not update if the file already exists.
	[[ -f "$output" ]] && echo "$output already exists. Skipping to avoid binary change." && continue
	"$binary" "$input" "$output"
done
