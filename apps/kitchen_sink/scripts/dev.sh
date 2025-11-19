#!/bin/bash
#
# Development mode script - builds and installs to iOS Simulator
# Usage: ./scripts/dev.sh [device_name]

set -e

DEVICE_NAME="${1:-iPhone 16}"

echo "🚀 Valdi Kitchen Sink - Development Mode"
echo "========================================="
echo ""

# Build and install
./scripts/test-ios.sh "$DEVICE_NAME"

echo ""
echo "🔄 Watching for changes... (press Ctrl+C to stop)"
echo ""
echo "💡 After making changes, run this script again to rebuild and reinstall"
