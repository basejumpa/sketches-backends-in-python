#!/usr/bin/env bash

## own call

echo $0

## arguments

echo "$@"

## stdin

if [ -p /dev/stdin ]; then
    echo "Reading from stdin because a pipe exists:"
    while read line; do
        echo "Received: $line"
    done
else
    echo "No pipe found. Not reading from stdin."
fi

## stdout (explicitly)

echo "stdout" >&1

## stderr

echo "stderr" >&2

## Indicator of new call

echo "The time is: $(date)" >&2

## exit code

exit 42
