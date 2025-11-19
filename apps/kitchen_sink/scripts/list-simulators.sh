#!/bin/bash
#
# List available iOS Simulators
# Usage: ./scripts/list-simulators.sh

echo "📱 Available iOS Simulators:"
echo ""

xcrun simctl list devices available | grep "iPhone\|iPad"
