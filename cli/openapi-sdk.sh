#!/bin/bash -x

SCRIPT_PATH=$(realpath "$0")
MODULE_PATH=$(dirname "$SCRIPT_PATH")/..

$MODULE_PATH/node_modules/.bin/openapi-generator-cli generate \
    -g typescript-axios \
    -t $MODULE_PATH/templates \
    $@