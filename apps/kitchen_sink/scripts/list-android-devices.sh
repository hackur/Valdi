#!/bin/bash

# List available Android emulators and connected devices
# Usage: ./scripts/list-android-devices.sh

echo "📱 Connected Android Devices & Emulators"
echo "================================================"
echo ""

# List connected devices
echo "Connected devices:"
adb devices -l

echo ""
echo "To start an emulator, use:"
echo "  emulator -avd <avd_name> &"
echo ""
echo "To install and test the app:"
echo "  ./scripts/test-android.sh [device_id]"
