#!/bin/bash
#
# Build and install Valdi Kitchen Sink to iOS Simulator
# Usage: ./scripts/test-ios.sh [device_name]
#
# Examples:
#   ./scripts/test-ios.sh                    # Uses iPhone 16 (default)
#   ./scripts/test-ios.sh "iPhone 15 Pro"    # Specific device

set -e

DEVICE_NAME="${1:-iPhone 16}"

echo "🔨 Building Valdi Kitchen Sink for iOS..."
echo ""

cd "$(dirname "$0")/../.."

# Build the app
bazel build //apps/kitchen_sink:kitchen_sink_ios

echo ""
echo "📱 Installing to iOS Simulator: $DEVICE_NAME"
echo ""

# Install to simulator
xcrun simctl install "$DEVICE_NAME" bazel-bin/apps/kitchen_sink/kitchen_sink_ios_archive-root/Payload/Valdi\ Kitchen\ Sink.app

echo ""
echo "✅ Installation completed!"
echo ""
echo "💡 Launch the app from the iOS Simulator home screen"
echo "   or run: xcrun simctl launch \"$DEVICE_NAME\" com.valdi.kitchensink"
