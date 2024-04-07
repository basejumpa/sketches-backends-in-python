#!/usr/bin/env bash

# Interface:
# y = m*x + b where
#    m, x, b : parameters provided via command line arguments, in that order,

m=$1
x=$2
b=$3

y=$(echo "$m * $x + $b" | bc)

# Simulating sophisticated and long calculation
for i in {0..100..10}
do
    echo "LOG: Progress: $i of 100" >&2
    sleep 0.5
done

printf "$y" >&1

## exit with defined code
exit 7
