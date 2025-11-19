# Development Scripts

This directory contains helper scripts for building and testing the Valdi Kitchen Sink application on iOS and Android.

## iOS Scripts

### `build.sh`
Builds the iOS application using Bazel.

```bash
./scripts/build.sh
```

**Output**: `bazel-bin/apps/kitchen_sink/kitchen_sink_ios.ipa`

### `test-ios.sh [device_name]`
Builds and installs the app to an iOS Simulator.

```bash
# Install to iPhone 16 (default)
./scripts/test-ios.sh

# Install to specific device
./scripts/test-ios.sh "iPhone 15 Pro"
```

### `dev.sh [device_name]`
Development mode - builds and installs to simulator in one command.

```bash
./scripts/dev.sh
```

### `list-simulators.sh`
Lists all available iOS Simulators.

```bash
./scripts/list-simulators.sh
```

## Android Scripts

### `build-android.sh`
Builds the Android APK using Valdi build system.

```bash
./scripts/build-android.sh
```

**Output**: `bazel-bin/apps/kitchen_sink/kitchen_sink_android.apk`

### `test-android.sh [device_id]`
Builds and installs the app to an Android device or emulator.

```bash
# Auto-detect connected device
./scripts/test-android.sh

# Install to specific device
./scripts/test-android.sh emulator-5554
```

### `list-android-devices.sh`
Lists all connected Android devices and emulators.

```bash
./scripts/list-android-devices.sh
```

## General Scripts

### `clean.sh [--deep]`
Cleans build artifacts for all platforms.

```bash
# Standard clean
./scripts/clean.sh

# Deep clean (removes all cache)
./scripts/clean.sh --deep
```

### `verify.sh`
Runs build verification with health checks.

```bash
./scripts/verify.sh
```

## Using with npm

All scripts are also available as npm commands:

```bash
# iOS
npm run build:ios       # Build iOS app
npm run dev             # Build and install to iOS simulator
npm run test:ios        # Install to iOS Simulator
npm run simulators      # List available iOS simulators

# Android
npm run build:android   # Build Android APK
npm run test:android    # Build and install to Android device
npm run devices:android # List connected Android devices

# General
npm run verify          # Run build verification
npm run clean           # Clean build artifacts
npm run clean:deep      # Deep clean
npm run help            # Show all commands
```

## Requirements

### iOS Development
- Bazel installed and configured
- Xcode and iOS Simulator
- macOS environment

### Android Development
- Bazel installed and configured
- Android SDK and NDK
- Android emulator or physical device
- adb (Android Debug Bridge)
