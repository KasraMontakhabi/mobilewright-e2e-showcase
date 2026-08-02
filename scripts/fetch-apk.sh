#!/usr/bin/env bash
#
# Fetches the latest My Demo App (Android, native) APK from GitHub Releases
# and drops it into ./apks/. Uses the GitHub Releases API instead of a
# hardcoded filename, since asset names change between versions.
#
# Usage:
#   ./scripts/fetch-apk.sh
#   ./scripts/fetch-apk.sh 2.2.0     # fetch a specific tag instead of latest

set -euo pipefail

REPO="saucelabs/my-demo-app-android"
TAG="${1:-latest}"
OUT_DIR="$(dirname "$0")/../apks"

mkdir -p "$OUT_DIR"

if [ "$TAG" = "latest" ]; then
  API_URL="https://api.github.com/repos/${REPO}/releases/latest"
else
  API_URL="https://api.github.com/repos/${REPO}/releases/tags/${TAG}"
fi

echo "Fetching release metadata from ${API_URL} ..."

RELEASE_JSON=$(curl -sSL \
  -H "Accept: application/vnd.github+json" \
  "$API_URL")

# Pull the first asset whose name ends in .apk
APK_URL=$(echo "$RELEASE_JSON" | grep -o '"browser_download_url": *"[^"]*\.apk"' | head -n1 | sed -E 's/"browser_download_url": *"([^"]*)"/\1/')
APK_NAME=$(echo "$RELEASE_JSON" | grep -o '"name": *"[^"]*\.apk"' | head -n1 | sed -E 's/"name": *"([^"]*)"/\1/')

if [ -z "$APK_URL" ]; then
  echo "Error: no .apk asset found in release '${TAG}' of ${REPO}." >&2
  echo "Check https://github.com/${REPO}/releases for available assets." >&2
  exit 1
fi

DEST="${OUT_DIR}/${APK_NAME}"

echo "Downloading ${APK_NAME} ..."
curl -sSL -o "$DEST" "$APK_URL"

echo "Saved to ${DEST}"
echo ""
echo "Install it on the running emulator with:"
echo "  adb install -r \"${DEST}\""
