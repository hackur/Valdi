# Development Scripts

This directory contains helper scripts for building and testing the Valdi Kitchen Sink application.

## Available Scripts

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

### `clean.sh [--deep]`
Cleans build artifacts.

```bash
# Standard clean
./scripts/clean.sh

# Deep clean (removes all cache)
./scripts/clean.sh --deep
```

### `list-simulators.sh`
Lists all available iOS Simulators.

```bash
./scripts/list-simulators.sh
```

## Using with npm

All scripts are also available as npm commands:

```bash
npm run build        # Build iOS app
npm run dev          # Build and install to simulator
npm run test:ios     # Install to iOS Simulator
npm run clean        # Clean build artifacts
npm run clean:deep   # Deep clean
npm run simulators   # List available simulators
npm run help         # Show all commands
```

## Requirements

- Bazel installed and configured
- Xcode and iOS Simulator
- macOS environment
