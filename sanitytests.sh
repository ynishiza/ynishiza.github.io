#!/bin/bash
set -eu -o pipefail

# shellcheck disable=SC2034
__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck disable=SC2034
__file="${__dir}/$(basename "${BASH_SOURCE[0]}")"

declare TAB=$'\t'
declare NEWLINE=$'\n'
declare LOGFILE
LOGFILE="/tmp/$(basename "$0").log"

writeLogPipe() {
	echo "$*" >>"$LOGFILE"
}

# Usage
usage() {
	cat <<END
 $0 [--startindex n] [-d|--debug] [--startline l]
END
}

USAGE_EXITCODE=200
# shellcheck disable=SC2120
usageAndExit() {
	usage
	if [[ $# = 1 ]]; then exit "$1"; else exit "$USAGE_EXITCODE"; fi
}

cleanup() {
	code="$?"
	if [[ "$code" -eq 0 ]]
	then
		# nothing for now
		:
	elif [[ "$code" -ne "$USAGE_EXITCODE" ]]
	then
		# case: error other than usage message
		onError
	fi
	echo "Logs in $LOGFILE"
	exit "$code"
}
onError() {
	echo "error"
}
# cleanup: on script exit
# Both success and fail
trap cleanup EXIT RETURN

main() {
	# step: parse options
	local startindex=0
	local startline=0
	while [[ $# -gt 0 ]]
	do
		case "$1" in
			-d|--debug)
				set -x
				;;
			--startindex)
				startindex="$2"
				shift
				;;
			--startline)
				startline="$2"
				shift
				;;
			--help|-h)
				usageAndExit 0
				;;
			# case: error handling
			-*)
				echo "Unknown option $1" >&2
				usageAndExit
				;;
			# case: implicit start of positional argument
			*)
				break
				;;
			esac
		shift
	done

	[[ $# -gt 0 ]] && usageAndExit
	echo "" >"$LOGFILE"
 	writeLogPipe date
	test_links "$__dir/notes.md" "$startline" "$startindex"
}

test_links() {
	local file="$1"
	local startline="$2"
	local startindex="$3"

	# step: get links
	# shellcheck disable=SC2002
	IFS=$'\n' \
		read -r -d '' -a my_arr < \
		<( cat "$file" | awk "$startline < NR " | grep "\[.*\] *(https" \
		&& printf '\0' )

	local total="$((${#my_arr[@]} - 1))"
	echo "startindex=$startindex total=$total"

	# case: invalid startindex
	[[ "$startindex" -gt "$total" ]] && echo "Bad start index " && exit 1

	for ((i="$startindex";i<="$total";i++))
	do
		line="${my_arr[$i]}"
		printf "Testing link #:%d/%d line=%s" "$i" "$total" "$line"
		_test_single_link "$line"
	done

	echo "Links validated indexes: $startindex - $total (out of 0 - $total)"
}

declare LINKTEST_TAG="PAGETEST"
declare LINKTEST_DELIM=$TAB

_print_linktest_error() {
	local message="$1"
	local line="$2"
	echo "$message
$line
Result must be defined by <!--$LINKTEST_TAG: ...-->
May contain regex that can be recognized by grep.
e.g. <!--$LINKTEST_TAG: notes.*html-->"
	exit 1
}

function _test_single_link() {
	line="$1"

	# case: missing test tag
	! (grep "$LINKTEST_TAG:" <<<"$line" >/dev/null) && _print_linktest_error "Missing $LINKTEST_TAG" "$line"

	# note: get columns
	# shellcheck disable=SC2001
	parts="$(echo "$line" | sed -e "s=.*\[\(.*\)\](\(https.*\)).*<!--$LINKTEST_TAG: *\(.*\) *-->.*=\1$LINKTEST_DELIM\2$LINKTEST_DELIM\3=")"
	notename="$(echo "$parts" | cut -f1 -d"$LINKTEST_DELIM")"
	notelink="$(echo "$parts" | cut -f2 -d"$LINKTEST_DELIM")"
	expectedpattern="$(echo "$parts" | cut -f3 -d"$LINKTEST_DELIM")"

	# case: empty expected result
	[[ -z "$expectedpattern" ]] && _print_linktest_error "Missing test expectation" "$line"

	# step: get page content
	# -L = follow redirect.
	# 	e.g. Evernote's link redirects to a viewer app
	pagecontent="$(curl -v -X GET -L -s "$notelink" 2>>"$LOGFILE")"
	writeLogPipe "$pagecontent"

	# main: test
	if (grep -i "$expectedpattern" <<<"$pagecontent" >/dev/null)
	then
		# case: test pass
		printf "%ssuccess%s" "$TAB" "$NEWLINE"
	else
		# case: test failure
		echo "
Test failed for note $notename
expected: $expectedpattern
result: $pagecontent"
		exit 1
	fi
}

(main "$@")
