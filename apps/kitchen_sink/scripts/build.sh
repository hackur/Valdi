#!/bin/bash
#
# Build script for Valdi Kitchen Sink iOS app
# Usage: ./scripts/build.sh

set -e

echo "🔨 Building Valdi Kitchen Sink for iOS..."
echo ""

cd "$(dirname "$0")/../.."

# Run the bazel build
bazel build //apps/kitchen_sink:kitchen_sink_ios

echo ""
echo "✅ Build completed successfully!"
echo ""
echo "Output: bazel-bin/apps/kitchen_sink/kitchen_sink_ios.ipa"
