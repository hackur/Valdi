#!/bin/bash

# Test Kitchen Sink on Android emulator or device
# Usage: ./scripts/test-android.sh [device_id]

set -e

cd "$(dirname "$0")/.."

DEVICE_ID=$1

echo "🤖 Testing Kitchen Sink on Android..."
echo "================================================"

# Check if device ID was provided
if [ -z "$DEVICE_ID" ]; then
    echo "Detecting connected Android devices..."
    DEVICES=$(adb devices | grep -v "List" | grep "device$" | awk '{print $1}')
    DEVICE_COUNT=$(echo "$DEVICES" | grep -v "^$" | wc -l | tr -d ' ')

    if [ "$DEVICE_COUNT" -eq 0 ]; then
        echo "❌ No Android devices found!"
        echo ""
        echo "Please start an Android emulator or connect a device."
        echo "To list available emulators: emulator -list-avds"
        exit 1
    elif [ "$DEVICE_COUNT" -eq 1 ]; then
        DEVICE_ID=$(echo "$DEVICES" | head -1)
        echo "Using device: $DEVICE_ID"
    else
        echo "Multiple devices found:"
        echo "$DEVICES"
        echo ""
        echo "Please specify device ID:"
        echo "  ./scripts/test-android.sh <device_id>"
        exit 1
    fi
fi

echo ""
echo "Building and installing to $DEVICE_ID..."

# Use valdi install which handles build + install
valdi install android --application=//apps/kitchen_sink:kitchen_sink_android --device_id "$DEVICE_ID"

echo ""
echo "Launching app..."

# Launch the app
adb -s "$DEVICE_ID" shell am start -n com.snap.valdi.kitchen_sink/.StartActivity

echo ""
echo "✅ App launched successfully!"
echo ""
echo "To view logs:"
echo "  adb -s $DEVICE_ID logcat | grep -i valdi"
