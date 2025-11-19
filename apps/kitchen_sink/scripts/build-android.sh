#!/bin/bash

# Build Android APK for Kitchen Sink
# Usage: ./scripts/build-android.sh

set -e

echo "🤖 Building Kitchen Sink for Android..."
echo "================================================"

cd "$(dirname "$0")/.."

# Build the Android APK
valdi build android --application=//apps/kitchen_sink:kitchen_sink_android

echo ""
echo "✅ Android build completed successfully!"
echo ""
echo "APK location:"
find bazel-bin/apps/kitchen_sink -name "*.apk" -type f 2>/dev/null | grep -v unsigned | head -1

echo ""
echo "To install on a device:"
echo "  ./scripts/test-android.sh"
