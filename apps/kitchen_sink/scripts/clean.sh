#!/bin/bash
#
# Clean build artifacts for Valdi Kitchen Sink
# Usage: ./scripts/clean.sh [--deep]

set -e

cd "$(dirname "$0")/../.."

if [ "$1" == "--deep" ]; then
  echo "🧹 Deep cleaning all Bazel cache and build artifacts..."
  bazel clean --expunge
  echo "✅ Deep clean completed!"
else
  echo "🧹 Cleaning build artifacts..."
  bazel clean
  echo "✅ Clean completed!"
  echo ""
  echo "💡 Tip: Use './scripts/clean.sh --deep' to remove all cached artifacts"
fi
