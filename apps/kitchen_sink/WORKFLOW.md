# Valdi Kitchen Sink - Complete Development Workflow

This document outlines the complete workflow for building, debugging, and running the Valdi Kitchen Sink demonstration application.

---

## Table of Contents

1. [Initial Setup](#initial-setup)
2. [Common TypeScript Compilation Errors](#common-typescript-compilation-errors)
3. [Build Process](#build-process)
4. [Testing on iOS Simulator](#testing-on-ios-simulator)
5. [Debugging Runtime Errors](#debugging-runtime-errors)
6. [Adding New Demo Modules](#adding-new-demo-modules)
7. [Common Issues and Solutions](#common-issues-and-solutions)

---

## Initial Setup

### Prerequisites
- macOS with Xcode installed
- Bazel build system
- Valdi toolchain installed
- iOS Simulator

### Project Structure
```
apps/kitchen_sink/
├── BUILD.bazel              # Main application configuration
├── README.md               # Project documentation
├── WORKFLOW.md            # This file
├── modules/
│   ├── common/           # Shared components and theme
│   │   ├── BUILD.bazel
│   │   └── src/
│   │       ├── components/
│   │       └── theme/
│   ├── main_app/        # Root app and HomePage
│   │   ├── BUILD.bazel
│   │   └── src/
│   │       ├── App.tsx
│   │       └── HomePage.tsx
│   ├── layouts_demo/   # Flexbox demonstrations
│   ├── text_demo/      # Text element demonstrations
│   ├── state_demo/     # State management demonstrations
│   └── animation_demo/ # Animation demonstrations
```

---

## Common TypeScript Compilation Errors

### Error 1: Layout vs View Properties

**Error:**
```
Property 'backgroundColor' does not exist on type 'Layout'
```

**Cause:**
`<layout>` elements are memory-only containers and don't support visual styling properties.

**Solution:**
Change `<layout>` to `<view>` when using visual properties:

```tsx
// ❌ Wrong
<layout
  backgroundColor={Colors.gray100}
  borderRadius={BorderRadius.sm}
  padding={Spacing.sm}
>
  {children}
</layout>

// ✅ Correct
<view
  backgroundColor={Colors.gray100}
  borderRadius={BorderRadius.sm}
  padding={Spacing.sm}
>
  {children}
</view>
```

**Files typically affected:**
- Demo components with styled containers
- Card components
- Section wrappers

---

### Error 2: Flex Property Not Supported

**Error:**
```
Property 'flex' does not exist on type 'View'
Property 'flex' does not exist on type 'ScrollView'
```

**Cause:**
Valdi uses individual flex properties instead of the shorthand.

**Solution:**

For `View` elements:
```tsx
// ❌ Wrong
const style = new Style<View>({
  flex: 1,
});

// ✅ Correct
const style = new Style<View>({
  flexGrow: 1,
});
```

For `ScrollView` elements:
```tsx
// ❌ Wrong
const style = new Style<ScrollView>({
  flex: 1,
});

// ✅ Correct
const style = new Style<ScrollView>({
  height: '100%',
});
```

---

### Error 3: Gap Property Not Supported

**Error:**
```
Property 'gap' does not exist on type 'Layout'
```

**Cause:**
Valdi's Layout doesn't support CSS gap property.

**Solution:**
Remove gap and use margin/padding on child elements:

```tsx
// ❌ Wrong
const style = new Style<Layout>({
  flexDirection: 'row',
  gap: Spacing.md,
});

// ✅ Correct
const style = new Style<Layout>({
  flexDirection: 'row',
});

// Add margin to children instead
<layout style={containerStyle}>
  <view marginRight={Spacing.md}>Child 1</view>
  <view>Child 2</view>
</layout>
```

---

### Error 4: Animation Type Issues

**Error:**
```
Type '"easeInOut"' is not assignable to type 'AnimationCurve | undefined'
```

**Cause:**
Animation curves must use the `AnimationCurve` enum, not string literals.

**Solution:**

```tsx
// ❌ Wrong
this.animate({ duration: 0.3, curve: 'easeInOut' }, () => {
  this.setState({ value: newValue });
});

// ✅ Correct
import { PresetCurveAnimationOptions, AnimationCurve } from 'valdi_core/src/AnimationOptions';

private animateValue(newValue: number) {
  const options: PresetCurveAnimationOptions = {
    duration: 0.3,
    curve: AnimationCurve.EaseInOut,
  };
  this.animate(options, () => {
    this.setState({ value: newValue });
  });
}
```

**Available curves:**
- `AnimationCurve.Linear`
- `AnimationCurve.EaseIn`
- `AnimationCurve.EaseOut`
- `AnimationCurve.EaseInOut`

---

### Error 5: Slot Component Usage

**Error:**
```
'Slot' only refers to a type, but is being used as a value here
```

**Cause:**
`slot` is a built-in element, not a component to import.

**Solution:**

```tsx
// ❌ Wrong
import { Slot } from 'valdi_tsx/src/NativeTemplateElements';

<Slot />

// ✅ Correct
// No import needed

<slot />
```

For render functions with slots:
```tsx
import { $slot } from 'valdi_core/src/CompilerIntrinsics';

<NavigationRoot>
  {$slot((navigationController: NavigationController) => {
    <HomePage navigationController={navigationController} />;
  })}
</NavigationRoot>
```

---

### Error 6: TextField/TextView Padding

**Error:**
```
Property 'padding' does not exist on type 'TextField'
Property 'paddingLeft' does not exist on type 'TextField'
```

**Cause:**
TextField and TextView have limited styling properties.

**Solution:**
Wrap in a View with padding:

```tsx
// ❌ Wrong
const textFieldStyle = new Style<TextField>({
  paddingLeft: Spacing.md,
  paddingRight: Spacing.md,
});

// ✅ Correct
const wrapperStyle = new Style<View>({
  padding: Spacing.md,
});

<view style={wrapperStyle}>
  <textfield style={textFieldStyle} />
</view>
```

---

### Error 7: Overflow Property Invalid Value

**Error:**
```
Type '"hidden"' is not assignable to type '"scroll" | "visible" | undefined'
```

**Cause:**
Valdi only supports 'scroll' or 'visible' for overflow.

**Solution:**
Remove or change overflow value:

```tsx
// ❌ Wrong
const style = new Style<View>({
  overflow: 'hidden',
});

// ✅ Correct - Option 1: Remove it
const style = new Style<View>({
  // overflow removed
});

// ✅ Correct - Option 2: Use valid value
const style = new Style<View>({
  overflow: 'scroll', // or 'visible'
});
```

---

### Error 8: Import Path Issues

**Error:**
```
Module '"valdi_core/src/SystemFont"' has no exported member 'systemItalicFont'
```

**Cause:**
Valdi only exports certain font utilities.

**Solution:**
Use only available exports:

```tsx
// ❌ Wrong
import { systemFont, systemBoldFont, systemItalicFont } from 'valdi_core/src/SystemFont';

// ✅ Correct
import { systemFont, systemBoldFont } from 'valdi_core/src/SystemFont';

// Use systemBoldFont for all weight variants
const Fonts = {
  h1: systemBoldFont(24),
  body: systemFont(16),
  caption: systemFont(12),
};
```

---

## Build Process

### Full Build Command

```bash
cd /path/to/Valdi
valdi build ios --application=//apps/kitchen_sink:kitchen_sink_ios
```

### Build Output
```
Building: //apps/kitchen_sink:kitchen_sink_ios
Building iOS application...
Running Bazel command: bazel build //apps/kitchen_sink:kitchen_sink_ios ...

INFO: Analyzed target //apps/kitchen_sink:kitchen_sink_ios (617 packages loaded, 31557 targets configured).
INFO: Found 1 target...
Target //apps/kitchen_sink:kitchen_sink_ios up-to-date:
  bazel-bin/apps/kitchen_sink/kitchen_sink_ios.ipa
INFO: Elapsed time: 8.357s
INFO: Build completed successfully, 37 total actions
```

### Build Artifacts

After successful build, you'll find:
- **IPA File**: `bazel-bin/apps/kitchen_sink/kitchen_sink_ios.ipa` (for device deployment)
- **App Bundle**: `bazel-bin/apps/kitchen_sink/kitchen_sink_ios_archive-root/Payload/Valdi Kitchen Sink.app` (for simulator)

---

## Testing on iOS Simulator

### 1. List Available Simulators

```bash
xcrun simctl list devices available | grep "iPhone"
```

Example output:
```
iPhone 16 Pro (D4327276-0F11-43B2-B696-A54B8F205DEE) (Shutdown)
iPhone 16 (8C722852-DC8E-453E-95D6-419CD9CCB241) (Shutdown)
iPhone SE (3rd generation) (CAE542EA-BE04-4B51-9CCF-3DD9858CBE56) (Shutdown)
```

### 2. Boot Simulator

```bash
DEVICE_ID="8C722852-DC8E-453E-95D6-419CD9CCB241"  # iPhone 16
xcrun simctl boot "$DEVICE_ID"
```

### 3. Install App

```bash
xcrun simctl install "$DEVICE_ID" "bazel-bin/apps/kitchen_sink/kitchen_sink_ios_archive-root/Payload/Valdi Kitchen Sink.app"
```

### 4. Launch App

```bash
xcrun simctl launch "$DEVICE_ID" "com.valdi.kitchensink"
```

### 5. Open Simulator UI

```bash
open -a Simulator
```

### 6. Take Screenshot

```bash
xcrun simctl io "$DEVICE_ID" screenshot /tmp/screenshot.png
```

### Complete Test Script

Save as `scripts/test_ios.sh`:

```bash
#!/bin/bash
set -e

# Configuration
DEVICE_ID="8C722852-DC8E-453E-95D6-419CD9CCB241"
BUNDLE_ID="com.valdi.kitchensink"
APP_PATH="bazel-bin/apps/kitchen_sink/kitchen_sink_ios_archive-root/Payload/Valdi Kitchen Sink.app"

echo "🔨 Building iOS app..."
valdi build ios --application=//apps/kitchen_sink:kitchen_sink_ios

echo "📱 Booting simulator..."
xcrun simctl boot "$DEVICE_ID" 2>/dev/null || echo "Simulator already booted"

echo "🗑️  Uninstalling old version..."
xcrun simctl uninstall "$DEVICE_ID" "$BUNDLE_ID" 2>/dev/null || echo "No previous version"

echo "📦 Installing app..."
xcrun simctl install "$DEVICE_ID" "$APP_PATH"

echo "🚀 Launching app..."
xcrun simctl launch "$DEVICE_ID" "$BUNDLE_ID"

echo "🖥️  Opening Simulator..."
open -a Simulator

echo "✅ App launched successfully!"
```

Make executable and run:
```bash
chmod +x scripts/test_ios.sh
./scripts/test_ios.sh
```

---

## Debugging Runtime Errors

### Common Runtime Error 1: Module Resolution

**Error in app:**
```
'No item named 'kitchen_sink/modules/main_app/src/App.js' in module 'apps'
```

**Cause:**
Incorrect `root_component_path` in BUILD.bazel.

**Solution:**
```python
# ❌ Wrong - absolute Bazel path
root_component_path = "App@//apps/kitchen_sink/modules/main_app/src/App"

# ✅ Correct - relative path
root_component_path = "App@main_app/src/App"
```

### Common Runtime Error 2: Missing Dependencies

**Error during build:**
```
Found imports from undeclared dependencies: [layouts_demo, text_demo]
Please update the module.yaml and specify the missing dependencies.
```

**Solution:**
Add dependencies to module's BUILD.bazel:

```python
# apps/kitchen_sink/modules/main_app/BUILD.bazel
valdi_module(
    name = "main_app",
    # ... other config ...
    deps = [
        "//src/valdi_modules/src/valdi/valdi_core",
        "//src/valdi_modules/src/valdi/valdi_tsx",
        "//src/valdi_modules/src/valdi/valdi_navigation",
        "//apps/kitchen_sink/modules/common",
        # Add demo module dependencies
        "//apps/kitchen_sink/modules/layouts_demo",
        "//apps/kitchen_sink/modules/text_demo",
        "//apps/kitchen_sink/modules/state_demo",
        "//apps/kitchen_sink/modules/animation_demo",
    ],
)
```

### Viewing Console Logs

```bash
# Stream logs for your app
xcrun simctl spawn "$DEVICE_ID" log stream \
  --predicate 'processImagePath CONTAINS "kitchensink"' \
  --level debug

# Check for errors
xcrun simctl spawn "$DEVICE_ID" log stream \
  --predicate 'processImagePath CONTAINS "kitchensink"' \
  --level debug | grep -i error
```

### Check App Status

```bash
# Verify app is installed
xcrun simctl listapps "$DEVICE_ID" | grep -A 5 "com.valdi.kitchensink"

# Check if app is running
xcrun simctl spawn "$DEVICE_ID" launchctl list | grep kitchensink
```

---

## Adding New Demo Modules

### Step 1: Create Module Structure

```bash
mkdir -p apps/kitchen_sink/modules/my_demo/src
```

### Step 2: Create BUILD.bazel

`apps/kitchen_sink/modules/my_demo/BUILD.bazel`:
```python
load("//bzl/valdi:valdi_module.bzl", "valdi_module")

valdi_module(
    name = "my_demo",
    srcs = glob([
        "src/**/*.ts",
        "src/**/*.tsx",
    ]),
    visibility = ["//visibility:public"],
    deps = [
        "//src/valdi_modules/src/valdi/valdi_core",
        "//src/valdi_modules/src/valdi/valdi_tsx",
        "//src/valdi_modules/src/valdi/valdi_navigation",
        "//apps/kitchen_sink/modules/common",
    ],
)
```

### Step 3: Create Demo Component

`apps/kitchen_sink/modules/my_demo/src/MyDemo.tsx`:
```tsx
import { StatefulComponent } from 'valdi_core/src/Component';
import { Style } from 'valdi_core/src/Style';
import { NavigationController } from 'valdi_navigation/src/NavigationController';
import { NavigationPage } from 'valdi_navigation/src/NavigationPage';
import { View, Label, Layout, ScrollView } from 'valdi_tsx/src/NativeTemplateElements';

import {
  Colors,
  Fonts,
  Spacing,
  BorderRadius,
  Header,
  DemoSection,
  Card,
} from '../../common/src/index';

export interface MyDemoViewModel {
  navigationController: NavigationController;
}

interface MyDemoState {
  // Your state here
}

@NavigationPage(module)
export class MyDemo extends StatefulComponent<MyDemoViewModel, MyDemoState> {
  state: MyDemoState = {
    // Initial state
  };

  onRender() {
    <view style={styles.page}>
      <Header
        title="My Demo"
        showBack={true}
        onBack={() => this.viewModel.navigationController.pop()}
      />

      <scroll style={styles.scroll}>
        <layout style={styles.content}>
          <DemoSection
            title="Feature Name"
            description="Description of what this demonstrates"
          >
            <Card>
              {/* Your demo content */}
            </Card>
          </DemoSection>
        </layout>
      </scroll>
    </view>;
  }
}

const styles = {
  page: new Style<View>({
    width: '100%',
    height: '100%',
    backgroundColor: Colors.background,
  }),

  scroll: new Style<ScrollView>({
    width: '100%',
    height: '100%',
  }),

  content: new Style<Layout>({
    width: '100%',
    padding: Spacing.base,
  }),
};
```

### Step 4: Add to HomePage

Update `apps/kitchen_sink/modules/main_app/src/HomePage.tsx`:

```tsx
// Add import
import { MyDemo } from '../../my_demo/src/MyDemo';

// Add to navigateToDemo switch
case 'my_feature':
  navController.push(MyDemo, { navigationController: navController }, {});
  break;
```

Update `apps/kitchen_sink/modules/main_app/BUILD.bazel`:
```python
deps = [
    # ... existing deps ...
    "//apps/kitchen_sink/modules/my_demo",
],
```

### Step 5: Add to Main App Dependencies

Update `apps/kitchen_sink/BUILD.bazel`:
```python
deps = [
    # ... existing deps ...
    "//apps/kitchen_sink/modules/my_demo",
],
```

### Step 6: Build and Test

```bash
valdi build ios --application=//apps/kitchen_sink:kitchen_sink_ios
```

---

## Common Issues and Solutions

### Issue: Build Fails with "No such target"

**Error:**
```
ERROR: no such target '//apps/kitchen_sink:kitchen_sink'
```

**Solution:**
Use the correct target name `kitchen_sink_ios`:
```bash
valdi build ios --application=//apps/kitchen_sink:kitchen_sink_ios
```

---

### Issue: TypeScript Errors After Adding Imports

**Error:**
```
Cannot find module '../../my_demo/src/MyDemo'
```

**Solution:**
1. Verify the file exists at the path
2. Check BUILD.bazel includes the file in `srcs`
3. Add module to dependencies in importing module's BUILD.bazel

---

### Issue: App Crashes on Tap

**Symptoms:**
- App launches successfully
- UI displays correctly
- App crashes or does nothing when tapping buttons/cards

**Common Causes:**
1. **Empty onTap handler**: Make sure onTap methods are implemented
2. **Missing navigation controller**: Ensure viewModel.navigationController is available
3. **Component not registered**: Check @NavigationPage(module) decorator

**Solution:**
Check that navigation is properly implemented:
```tsx
<view
  style={styles.card}
  onTap={() => this.navigateToDemo(section.id)}
>
  {/* content */}
</view>

private navigateToDemo(demoId: string) {
  const navController = this.viewModel.navigationController;
  // Actually implement navigation, not just TODO
  navController.push(DemoComponent, { navigationController: navController }, {});
}
```

---

### Issue: Bazel Cache Corruption

**Symptoms:**
- Build fails with cryptic errors
- Inconsistent build results
- "file not found" errors for files that exist

**Solution:**
Clean Bazel cache and rebuild:
```bash
cd /path/to/Valdi
bazel clean --expunge
valdi build ios --application=//apps/kitchen_sink:kitchen_sink_ios
```

---

### Issue: Simulator Won't Boot

**Error:**
```
Unable to boot device in current state: Booted
```

**Solution:**
```bash
# Shutdown all simulators
xcrun simctl shutdown all

# Boot specific device
xcrun simctl boot "$DEVICE_ID"
```

---

### Issue: Hot Reload Not Working

**Symptoms:**
- Code changes don't reflect in running app
- Need to rebuild and reinstall manually

**Current Status:**
Hot reload was not tested in this workflow. To test:

1. Make a small change to a component
2. Save the file
3. Check if app updates automatically

If not working, you'll need to rebuild and reinstall after each change.

---

## Quick Reference Commands

### Build Commands
```bash
# Full build
valdi build ios --application=//apps/kitchen_sink:kitchen_sink_ios

# Clean build
bazel clean --expunge
valdi build ios --application=//apps/kitchen_sink:kitchen_sink_ios

# Verbose build (for debugging)
valdi build ios --application=//apps/kitchen_sink:kitchen_sink_ios --verbose_failures
```

### Simulator Commands
```bash
# List devices
xcrun simctl list devices available

# Boot simulator
xcrun simctl boot <device_id>

# Shutdown simulator
xcrun simctl shutdown <device_id>

# Install app
xcrun simctl install <device_id> <app_path>

# Uninstall app
xcrun simctl uninstall <device_id> <bundle_id>

# Launch app
xcrun simctl launch <device_id> <bundle_id>

# Take screenshot
xcrun simctl io <device_id> screenshot <path>

# Stream logs
xcrun simctl spawn <device_id> log stream --predicate 'processImagePath CONTAINS "kitchensink"'
```

### File Operations
```bash
# Find all TypeScript files
find apps/kitchen_sink/modules -name "*.tsx" -o -name "*.ts"

# Search for pattern in code
grep -r "backgroundColor" apps/kitchen_sink/modules --include="*.tsx"

# Count lines of code
find apps/kitchen_sink/modules -name "*.tsx" | xargs wc -l
```

---

## Troubleshooting Checklist

When encountering issues, check these in order:

- [ ] Build completes successfully without errors
- [ ] App .ipa file exists: `ls -lh bazel-bin/apps/kitchen_sink/kitchen_sink_ios.ipa`
- [ ] Simulator is booted: `xcrun simctl list | grep Booted`
- [ ] App is installed: `xcrun simctl listapps <device_id> | grep kitchensink`
- [ ] Console shows no errors: `xcrun simctl spawn <device_id> log stream ...`
- [ ] All dependencies are declared in BUILD.bazel files
- [ ] root_component_path is correct in main BUILD.bazel
- [ ] Navigation controller is passed to all navigation pages
- [ ] All imported modules are in deps list

---

## Additional Resources

### Valdi Documentation
- Core concepts: Component lifecycle, state management
- Layout system: Flexbox, view hierarchy
- Navigation: NavigationController, page transitions
- Animations: Animation curves, spring physics

### Bazel Documentation
- Build rules: valdi_module, valdi_application
- Dependency management: deps, visibility
- Caching: incremental builds, cache keys

### iOS Simulator
- Device management: simctl commands
- Debugging tools: Console app, Instruments
- Testing: UI automation, screenshots

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Nov 19, 2025 | Initial workflow documentation |

---

## Contributing

When adding new features or fixing issues:

1. **Test thoroughly** - Build, install, and test on simulator
2. **Update documentation** - Add to this WORKFLOW.md if you encounter new issues
3. **Follow conventions** - Use existing code style and structure
4. **Document errors** - If you hit a new error, add it to this guide with solution

---

*This workflow was created during the initial development of the Valdi Kitchen Sink application and documents all issues encountered and solutions applied.*
