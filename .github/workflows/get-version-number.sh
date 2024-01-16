TERMINAL_OUTPUT=$(cat)
REGEX_GET_VERSION_FROM_TERMINAL="version ([{0-9}]+)"



# Check if TERMINAL_OUTPUT matches the regex pattern
if [[ $TERMINAL_OUTPUT =~ $REGEX_GET_VERSION_FROM_TERMINAL ]]; then
    version="${BASH_REMATCH[1]}"
    echo "$version"
else
    echo "No match found."
fi