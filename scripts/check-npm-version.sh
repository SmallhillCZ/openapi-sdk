#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Read package.json and extract name and version
PACKAGE_NAME=$(jq -r '.name' package.json)
PACKAGE_VERSION=$(jq -r '.version' package.json)

# Fetch the published versions from npm
PUBLISHED_VERSIONS=$(npm view "$PACKAGE_NAME" versions --json)
LATEST_PUBLISHED_VERSION=$(echo "$PUBLISHED_VERSIONS" | jq -r '.[-1]')

# Check if the current version is in the list of published versions
if echo "$PUBLISHED_VERSIONS" | grep -q "\"$PACKAGE_VERSION\""; then
  echo "ERROR: Version $PACKAGE_VERSION is already published"
  echo "There were changes in backend openapi.json, but cannot publish new SDK, because version $PACKAGE_VERSION is already published for this package"
  echo "Latest published version: $LATEST_PUBLISHED_VERSION"
  exit 1
else
  echo "Version $PACKAGE_VERSION is not published yet. You can proceed."
fi
