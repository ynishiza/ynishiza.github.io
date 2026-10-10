#!/bin/zsh
set -euo pipefail

script_dir="${0:A:h}"
notes_dir="${1:-${script_dir}/..}"
output_dir="${2:-${notes_dir}/pdf}"
build_dir="$script_dir/.build"
binary="$build_dir/rtfd-to-pdf"
module_cache="$build_dir/module-cache"

mkdir -p "$build_dir" "$module_cache"
swiftc -module-cache-path "$module_cache" "$script_dir/RtfdToPdf.swift" -o "$binary"
"$binary" "$notes_dir" "$output_dir"
