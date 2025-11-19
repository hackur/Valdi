# Valdi Kitchen Sink

**Status**: ✅ Building & Running | 🚧 42% Complete (5/12 Demos Implemented)

A comprehensive demonstration application showcasing the Valdi cross-platform UI framework. This app serves as a living reference for building native mobile applications with TypeScript and Valdi.

---

## 📋 Table of Contents

- [Current Status](#current-status)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Implemented Features](#implemented-features)
- [Roadmap & TODOs](#roadmap--todos)
- [Documentation](#documentation)
- [Design System](#design-system)
- [Development Notes](#development-notes)

---

## Current Status

### ✅ What's Working

**5 Fully Functional Demo Modules:**
- **Layouts Demo** - Flexbox layout system demonstrations
- **Text Demo** - Text elements and input handling
- **State Demo** - Component state management and lifecycle
- **Animation Demo** - Smooth animations with various curves
- **Slots & Composition Demo** - Content projection with <slot> elements

**Complete Infrastructure:**
- ✅ iOS app builds successfully (~7-10 second incremental builds)
- ✅ Android app builds successfully (~5-14 second builds)
- ✅ App launches without crashes on both iOS and Android
- ✅ Navigation system working between demos
- ✅ Design system with 8 reusable components (Button, Card, Header, ErrorBoundary, LoadingSpinner, EmptyState, DemoSection, CodeBlock)
- ✅ Professional UI with consistent styling
- ✅ Development scripts and build verification tools for both platforms

**Build Details:**
- Platforms: iOS (iPhone), Android
- Bundle IDs:
  - iOS: `com.valdi.kitchensink`
  - Android: `com.snap.valdi.kitchen_sink`
- Build System: Bazel + Valdi Compiler
- App Size:
  - iOS: 65MB (includes Valdi runtime)
  - Android: 17MB APK
- TypeScript: Strict mode, fully type-safe

### 🚧 Work In Progress

**7 Demo Modules Planned But Not Implemented:**
- Images & Media
- Scrolling & Lists
- Gestures
- Advanced Styling
- Shapes & Paths
- Forms & Validation
- Dynamic Lists

See [Roadmap & TODOs](#roadmap--todos) for details.

---

## Quick Start

### iOS

```bash
# Build and install to iOS Simulator (recommended)
npm run dev

# Or build and install separately
npm run build:ios
npm run test:ios "iPhone 16"
```

### Android

```bash
# Build and install to Android device/emulator (recommended)
npm run test:android

# Or build separately
npm run build:android
```

### Manual Build (if not using npm)

```bash
# iOS
valdi build ios --application=//apps/kitchen_sink:kitchen_sink_ios

# Android
valdi build android --application=//apps/kitchen_sink:kitchen_sink_android

# List iOS simulators
xcrun simctl list devices available | grep "iPhone"

# List Android devices
adb devices

# Boot simulator (example: iPhone 16)
DEVICE_ID="your-device-id-here"
xcrun simctl boot "$DEVICE_ID"

# Install app
xcrun simctl install "$DEVICE_ID" \
  "bazel-bin/apps/kitchen_sink/kitchen_sink_ios_archive-root/Payload/Valdi Kitchen Sink.app"

# Launch app
xcrun simctl launch "$DEVICE_ID" "com.valdi.kitchensink"

# Open Simulator window
open -a Simulator
```

### Full Development Workflow

See **[WORKFLOW.md](./WORKFLOW.md)** for complete documentation including:
- Step-by-step build instructions
- Common TypeScript errors and solutions
- Debugging runtime errors
- Adding new demo modules
- Testing on iOS Simulator
- Quick reference commands

---

## Project Structure

```
apps/kitchen_sink/
├── BUILD.bazel                 # Main app configuration
├── README.md                   # This file
├── WORKFLOW.md                # Complete development guide
│
└── modules/
    ├── common/                # Shared design system
    │   ├── BUILD.bazel
    │   └── src/
    │       ├── theme/        # Colors, fonts, spacing, shadows
    │       └── components/   # Button, Card, Header, DemoSection, CodeBlock
    │
    ├── main_app/             # Root app & HomePage
    │   ├── BUILD.bazel
    │   └── src/
    │       ├── App.tsx       # Root component with NavigationRoot
    │       └── HomePage.tsx  # Main menu with demo cards
    │
    ├── layouts_demo/         # ✅ Flexbox demonstrations
    │   ├── BUILD.bazel
    │   └── src/
    │       └── LayoutsDemo.tsx
    │
    ├── text_demo/            # ✅ Text elements
    │   ├── BUILD.bazel
    │   └── src/
    │       └── TextDemo.tsx
    │
    ├── state_demo/           # ✅ State management
    │   ├── BUILD.bazel
    │   └── src/
    │       └── StateDemo.tsx
    │
    └── animation_demo/       # ✅ Animations
        ├── BUILD.bazel
        └── src/
            └── AnimationDemo.tsx
```

---

## Implemented Features

### 1. Common Module (Design System)

A complete, production-ready design system used across all demos:

**Theme Components:**
```typescript
// Colors: Semantic color palette
Colors.primary    = '#3B82F6'  // Blue
Colors.secondary  = '#8B5CF6'  // Purple
Colors.success    = '#10B981'  // Green
Colors.warning    = '#F59E0B'  // Amber
Colors.error      = '#EF4444'  // Red
Colors.background = '#F9FAFB'  // Light gray
Colors.surface    = '#FFFFFF'  // White

// Typography: System font-based scale
Fonts.h1      = systemBoldFont(28)
Fonts.h2      = systemBoldFont(24)
Fonts.h3      = systemBoldFont(20)
Fonts.h4      = systemBoldFont(18)
Fonts.body    = systemFont(16)
Fonts.caption = systemFont(14)

// Spacing: Consistent scale
Spacing.xs   = 4
Spacing.sm   = 8
Spacing.md   = 12
Spacing.base = 16
Spacing.lg   = 20
Spacing.xl   = 24

// Shadows & Borders
Shadows.base, Shadows.md, Shadows.lg
BorderRadius.sm, BorderRadius.base, BorderRadius.md, BorderRadius.full
```

**Reusable Components:**
- **Button**: Multi-variant button (primary, secondary, outline, ghost) with sizes
- **Card**: Container with elevation and padding
- **Header**: Page header with title and optional back button
- **DemoSection**: Section wrapper with title and description
- **CodeBlock**: Syntax-highlighted code display

### 2. Layouts Demo

**What It Demonstrates:**
- `<layout>` vs `<view>` (memory-only vs visual containers)
- Flexbox direction (row, column, column-reverse, row-reverse)
- Justify content (flex-start, center, flex-end, space-between, space-around, space-evenly)
- Align items (flex-start, center, flex-end, stretch, baseline)

**Key Implementation Notes:**
- Use `<view>` when visual styling needed (backgroundColor, borders, shadows)
- Use `<layout>` for pure layout containers (better performance)
- No `gap` property support in Valdi - use margins instead
- `flex` shorthand not supported - use `flexGrow`/`flexShrink`

### 3. Text Demo

**What It Demonstrates:**
- `<label>`: Font sizes, colors, alignment, numberOfLines truncation
- `<textfield>`: Single-line input with contentType (email, number, password)
- `<textview>`: Multi-line input with returnType
- AttributedText: Rich text with AttributedTextBuilder

**Key Implementation Notes:**
- TextField/TextView don't support padding - wrap in View if needed
- contentType affects keyboard type on mobile
- numberOfLines={1} with ellipsis for text truncation
- returnType="linereturn" allows Enter key in textview

### 4. State Demo

**What It Demonstrates:**
- StatefulComponent for components with internal state
- setState() triggers reactive re-rendering
- Multiple independent state variables
- Component lifecycle methods (onCreate, onViewModelUpdate, onDestroy)

**Key Implementation Notes:**
- Extend StatefulComponent<ViewModel, State>
- Always initialize state in class property
- setState is synchronous in Valdi
- State updates trigger onRender

### 5. Animation Demo

**What It Demonstrates:**
- Color animations (backgroundColor transitions)
- Scale animations (scaleX, scaleY)
- Position animations (translationX, translationY)
- Opacity animations (fade in/out)
- Rotation animations (in radians)
- Combined animations (multiple properties)
- Animation curves (Linear, EaseIn, EaseOut, EaseInOut)

**Key Implementation Notes:**
- Must import `AnimationCurve` enum and `PresetCurveAnimationOptions`
- Use enum values: `AnimationCurve.EaseInOut` (not string 'easeInOut')
- Explicit type annotations required: `const options: PresetCurveAnimationOptions = ...`
- Duration in seconds (e.g., 0.3 for 300ms)
- Rotation in radians (Math.PI = 180°)

### 6. Main App & Navigation

**App.tsx:**
- Root component with NavigationRoot setup
- Uses `$slot()` compiler intrinsic for navigation context
- Passes navigationController to HomePage

**HomePage.tsx:**
- Grid of demo cards with emojis, titles, descriptions
- Color-coded accent bars for visual distinction
- Navigation to implemented demos
- Logs message for unimplemented demos

**Navigation Implementation:**
```typescript
// Import demo components
import { LayoutsDemo } from '../../layouts_demo/src/LayoutsDemo';
import { TextDemo } from '../../text_demo/src/TextDemo';
// ... etc

// Navigate on tap
private navigateToDemo(demoId: string) {
  const navController = this.viewModel.navigationController;
  switch (demoId) {
    case 'layouts':
      navController.push(LayoutsDemo, { navigationController: navController }, {});
      break;
    // ... other cases
  }
}
```

---

## Roadmap & TODOs

### Priority 1: Core Demos (Next 4)

#### 📸 Images & Media Demo
**Status**: Not Started
**Estimated Effort**: 4-6 hours

**What It Should Demonstrate:**
- `<image>` element with local and remote images
- Image sizing and scaling (aspectFit, aspectFill, stretch)
- Placeholder loading states
- Error handling for failed image loads
- Image caching behavior
- `<video>` element (if supported)
- Video controls and playback

**Implementation Notes:**
- Create `modules/images_demo/` with BUILD.bazel
- Add ImageDemo component with @NavigationPage
- Use common design system components
- Add to HomePage navigation

**TODOs:**
```typescript
// TODO: Implement image loading states
// TODO: Add placeholder images for offline mode
// TODO: Demonstrate image caching
// TODO: Show video playback if supported
// TODO: Add error boundaries for image load failures
```

#### 📜 Scrolling & Lists Demo
**Status**: Not Started
**Estimated Effort**: 6-8 hours

**What It Should Demonstrate:**
- `<scroll>` with vertical scrolling
- `<scroll>` with horizontal scrolling
- Nested scroll views
- ScrollView properties (showsVerticalScrollIndicator, etc.)
- Pull-to-refresh (if supported)
- Scroll to position programmatically
- Virtual lists / FlatList equivalent
- Infinite scrolling patterns

**Implementation Notes:**
- Scrolling is already used in demos but not explicitly demonstrated
- Need to show performance with large lists
- Demonstrate scroll position tracking
- Show scroll event handling

**TODOs:**
```typescript
// TODO: Create ScrollingDemo component
// TODO: Demonstrate vertical and horizontal scroll
// TODO: Add pull-to-refresh example
// TODO: Show infinite scroll pattern
// TODO: Demonstrate scroll position tracking
// TODO: Add performance testing with 1000+ items
```

#### 👆 Gestures Demo
**Status**: Not Started
**Estimated Effort**: 6-8 hours

**What It Should Demonstrate:**
- onTap gesture (already used throughout)
- onLongPress gesture
- onDrag / onPan gesture
- onPinch gesture (zoom)
- onRotate gesture
- Gesture recognition and conflicts
- Multi-touch handling
- Gesture velocity and position data

**Implementation Notes:**
- Many gestures likely already available but not documented
- Need to check Valdi API for gesture support
- Interactive demos work best (draggable elements, etc.)

**TODOs:**
```typescript
// TODO: Research available gesture APIs in Valdi
// TODO: Create GesturesDemo component
// TODO: Add draggable box example
// TODO: Implement pinch-to-zoom demo
// TODO: Show rotation gesture
// TODO: Demonstrate long-press menu
// TODO: Add gesture conflict resolution example
```

#### 🎨 Advanced Styling Demo
**Status**: Not Started
**Estimated Effort**: 4-6 hours

**What It Should Demonstrate:**
- Gradients (linear, radial)
- Box shadows (already partially shown)
- Border styling (width, color, radius)
- Clipping and masks
- Blend modes (if supported)
- Transform properties beyond rotation
- Backdrop blur effects (if supported)
- Custom drawing (if supported)

**Implementation Notes:**
- Check which advanced styling features Valdi supports
- May need to demonstrate platform-specific styling
- Good opportunity to show CSS-like capabilities

**TODOs:**
```typescript
// TODO: Research Valdi's gradient support
// TODO: Create StylingDemo component
// TODO: Add linear gradient examples
// TODO: Show radial gradient if supported
// TODO: Demonstrate transform combinations
// TODO: Add border style variations
// TODO: Show clipping/masking if available
```

### Priority 2: Advanced Features (Next 4)

#### ⬛ Shapes & Paths Demo
**Status**: Not Started
**Estimated Effort**: 6-8 hours

**What It Should Demonstrate:**
- `<shape>` element basics
- Path drawing (lines, curves, arcs)
- Filled vs stroked shapes
- Path animations
- SVG-like drawing capabilities
- Complex shape compositions

**TODOs:**
```typescript
// TODO: Research Valdi shape API
// TODO: Create ShapesDemo component
// TODO: Draw basic shapes (rect, circle, polygon)
// TODO: Demonstrate path drawing
// TODO: Add animated shape transitions
// TODO: Show complex shape compositions
```

#### 🧩 Slots & Composition Demo
**Status**: Not Started
**Estimated Effort**: 4-6 hours

**What It Should Demonstrate:**
- `<slot>` for content projection
- Named slots
- Slot default content
- Render props pattern with `$slot()`
- Component composition patterns
- Higher-order components

**Implementation Notes:**
- Slots are already used in Card and DemoSection
- Need to explicitly demonstrate the pattern
- Show best practices for composable components

**TODOs:**
```typescript
// TODO: Create SlotsDemo component
// TODO: Show basic slot usage
// TODO: Demonstrate named slots
// TODO: Add slot default content example
// TODO: Show render props with $slot()
// TODO: Demonstrate composition patterns
```

#### 📋 Forms & Validation Demo
**Status**: Not Started
**Estimated Effort**: 8-10 hours

**What It Should Demonstrate:**
- Form state management
- Input validation patterns
- Error display and handling
- Form submission
- Multi-step forms
- Field types (email, password, number, phone)
- Accessibility for forms
- Keyboard handling

**Implementation Notes:**
- Build on TextField/TextView from text_demo
- Create reusable form components
- Demonstrate validation strategies
- Show best practices for UX

**TODOs:**
```typescript
// TODO: Create FormsDemo component
// TODO: Build reusable FormField component
// TODO: Implement validation library/helpers
// TODO: Add error display component
// TODO: Show form submission flow
// TODO: Demonstrate multi-step form
// TODO: Add keyboard management
// TODO: Ensure accessibility compliance
```

#### 📊 Dynamic Lists Demo
**Status**: Not Started
**Estimated Effort**: 6-8 hours

**What It Should Demonstrate:**
- Rendering lists from data
- Array.forEach() in TSX (already shown in HomePage)
- List keys for performance
- Add/remove items dynamically
- Filter and sort lists
- Search functionality
- Virtualized lists for performance

**Implementation Notes:**
- HomePage already uses forEach for demo cards
- Need to show best practices
- Demonstrate performance optimizations
- Add interactive list manipulation

**TODOs:**
```typescript
// TODO: Create DynamicListsDemo component
// TODO: Show basic list rendering
// TODO: Demonstrate list keys
// TODO: Add interactive add/remove
// TODO: Implement search/filter
// TODO: Show sorting examples
// TODO: Add virtualization for large lists
```

### Priority 3: Polish & Production Readiness

#### 🔧 Infrastructure Improvements
- [ ] Add error boundaries for graceful error handling
- [ ] Implement loading states for async operations
- [ ] Add skeleton screens for better perceived performance
- [ ] Create empty states for each demo
- [ ] Add deep linking support
- [ ] Implement analytics/logging infrastructure
- [ ] Add performance monitoring

#### 📱 Platform Support
- [ ] Build and test on Android
- [ ] Fix any Android-specific issues
- [ ] Test on real iOS devices (not just simulator)
- [ ] Add platform-specific optimizations
- [ ] Test on different screen sizes
- [ ] Ensure accessibility on both platforms

#### 🧪 Testing
- [ ] Add unit tests for components
- [ ] Add integration tests for navigation
- [ ] Test hot reload functionality
- [ ] Create automated screenshot tests
- [ ] Performance testing with large datasets
- [ ] Memory leak detection

#### 📚 Documentation
- [ ] Add JSDoc comments to all public APIs
- [ ] Create interactive tutorials
- [ ] Record video walkthroughs
- [ ] Add more code examples to README
- [ ] Document platform differences
- [ ] Create troubleshooting guide for common issues

#### 🎨 UI/UX Enhancements
- [ ] Add transitions between pages
- [ ] Improve loading states
- [ ] Add haptic feedback (if supported)
- [ ] Enhance accessibility labels
- [ ] Add dark mode support
- [ ] Create app icon and splash screen
- [ ] Polish animations and timings

---

## Documentation

### 📖 Complete Documentation

- **[WORKFLOW.md](./WORKFLOW.md)** - Complete development workflow
  - Build and test instructions
  - Common TypeScript errors and solutions
  - Debugging runtime errors
  - Adding new demo modules
  - Testing on simulators
  - Quick reference commands

### 🔍 Additional Resources

- [Valdi Framework Documentation](../../docs/README.md)
- [Valdi API Reference](../../docs/api/api-reference-elements.md)
- Build Summary: `/tmp/valdi_kitchen_sink_build_summary.md` (generated during build)

---

## Design System

### Color Palette

```typescript
export const Colors = {
  // Brand colors
  primary:   '#3B82F6',  // Blue - used for primary actions, headers
  secondary: '#8B5CF6',  // Purple - used for secondary actions

  // Semantic colors
  success:   '#10B981',  // Green - success states, positive actions
  warning:   '#F59E0B',  // Amber - warnings, caution states
  error:     '#EF4444',  // Red - errors, destructive actions
  info:      '#3B82F6',  // Same as primary

  // Neutrals
  background: '#F9FAFB', // App background color
  surface:    '#FFFFFF', // Card/container background
  border:     '#E5E7EB', // Border color for inputs and dividers

  // Text colors
  textPrimary:   '#111827', // Primary text
  textSecondary: '#6B7280', // Secondary text, descriptions
  textTertiary:  '#9CA3AF', // Placeholder text, disabled text

  // Grayscale
  gray50:  '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',

  // Utility
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};
```

### Typography

```typescript
import { systemFont, systemBoldFont } from 'valdi_core/src/SystemFont';

export const FontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
};

export const Fonts = {
  // Display fonts (bold)
  h1: systemBoldFont(FontSizes['3xl']),  // 28pt
  h2: systemBoldFont(FontSizes['2xl']),  // 24pt
  h3: systemBoldFont(FontSizes.xl),      // 20pt
  h4: systemBoldFont(FontSizes.lg),      // 18pt

  // Body fonts (regular)
  body:      systemFont(FontSizes.base), // 16pt
  bodySmall: systemFont(FontSizes.sm),   // 14pt
  caption:   systemFont(FontSizes.xs),   // 12pt

  // Labels
  label:      systemFont(FontSizes.base),
  labelSmall: systemFont(FontSizes.sm),
};
```

### Spacing

```typescript
export const Spacing = {
  xs:   4,
  sm:   8,
  md:   12,
  base: 16,
  lg:   20,
  xl:   24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
};
```

### Shadows

```typescript
export const Shadows = {
  base: '0px 1px 3px rgba(0, 0, 0, 0.1)',
  md:   '0px 4px 6px rgba(0, 0, 0, 0.1)',
  lg:   '0px 10px 15px rgba(0, 0, 0, 0.1)',
  xl:   '0px 20px 25px rgba(0, 0, 0, 0.1)',
};
```

### Border Radius

```typescript
export const BorderRadius = {
  sm:   4,
  base: 8,
  md:   12,
  lg:   16,
  xl:   20,
  full: 9999, // Circular
};
```

---

## Development Notes

### Key Decisions & Adjustments Made

#### 1. Layout vs View Usage

**Decision**: Use `<view>` instead of `<layout>` when any visual styling is needed.

**Reason**: In Valdi, `<layout>` is a memory-only container that doesn't create a native view. It's more performant but doesn't support visual properties like backgroundColor, borderRadius, padding, or shadows.

**When to use what:**
- `<layout>`: Pure flexbox containers with no visual styling
- `<view>`: Containers that need background colors, borders, shadows, or padding

**Example from LayoutsDemo.tsx:**
```typescript
// ❌ This caused TypeScript errors
<layout backgroundColor={Colors.gray100} padding={Spacing.sm}>
  {children}
</layout>

// ✅ Fixed: Use view for visual styling
<view backgroundColor={Colors.gray100} padding={Spacing.sm}>
  {children}
</view>
```

#### 2. Flex Property Not Supported

**Decision**: Use `flexGrow` instead of shorthand `flex` property.

**Reason**: Valdi doesn't support the CSS flex shorthand. Use individual properties.

**For View elements:**
```typescript
// ❌ Not supported
const style = new Style<View>({ flex: 1 });

// ✅ Use flexGrow instead
const style = new Style<View>({ flexGrow: 1 });
```

**For ScrollView:**
```typescript
// ❌ Not supported
const style = new Style<ScrollView>({ flex: 1 });

// ✅ Use height: '100%' instead
const style = new Style<ScrollView>({ height: '100%' });
```

#### 3. Gap Property Not Available

**Decision**: Remove gap property, use margins on children instead.

**Reason**: Valdi's Layout doesn't support CSS gap property.

```typescript
// ❌ Not supported
<layout flexDirection="row" gap={Spacing.md}>
  <view>Child 1</view>
  <view>Child 2</view>
</layout>

// ✅ Use margins instead
<layout flexDirection="row">
  <view marginRight={Spacing.md}>Child 1</view>
  <view>Child 2</view>
</layout>
```

#### 4. Animation Type System

**Decision**: Use AnimationCurve enum with explicit types.

**Reason**: TypeScript can't infer animation types without explicit annotations.

```typescript
// Required imports
import {
  PresetCurveAnimationOptions,
  AnimationCurve
} from 'valdi_core/src/AnimationOptions';

// ❌ String literals don't work
this.animate({ duration: 0.3, curve: 'easeInOut' }, ...);

// ✅ Use enum with explicit type
const options: PresetCurveAnimationOptions = {
  duration: 0.3,
  curve: AnimationCurve.EaseInOut,
};
this.animate(options, () => {
  this.setState({ value: newValue });
});
```

#### 5. Slot Element Usage

**Decision**: Use lowercase `<slot />` element, don't import it.

**Reason**: `slot` is a built-in JSX element, not a component to import.

```typescript
// ❌ Don't import or use as component
import { Slot } from 'valdi_tsx/src/NativeTemplateElements';
<Slot />

// ✅ Use as lowercase element
<slot />

// For render functions, use $slot() intrinsic
import { $slot } from 'valdi_core/src/CompilerIntrinsics';
{$slot((param) => { /* render */ })}
```

#### 6. TextField/TextView Padding

**Decision**: Wrap TextField/TextView in View for padding.

**Reason**: These elements don't support padding properties directly.

```typescript
// ❌ Doesn't work
<textfield
  style={new Style<TextField>({ padding: Spacing.md })}
/>

// ✅ Wrap in View
<view padding={Spacing.md}>
  <textfield style={textFieldStyle} />
</view>
```

#### 7. Root Component Path

**Decision**: Use relative module path, not absolute Bazel path.

**Reason**: Valdi's module resolver expects relative paths from module name.

```python
# ❌ Absolute Bazel path caused runtime error
root_component_path = "App@//apps/kitchen_sink/modules/main_app/src/App"

# ✅ Relative path from module
root_component_path = "App@main_app/src/App"
```

#### 8. Module Dependencies

**Decision**: Explicitly declare all module imports in deps array.

**Reason**: Bazel requires explicit dependency declarations for proper build graph.

```python
# In modules/main_app/BUILD.bazel
deps = [
    "//src/valdi_modules/src/valdi/valdi_core",
    "//src/valdi_modules/src/valdi/valdi_tsx",
    "//src/valdi_modules/src/valdi/valdi_navigation",
    "//apps/kitchen_sink/modules/common",
    # Must add all demo modules that are imported
    "//apps/kitchen_sink/modules/layouts_demo",
    "//apps/kitchen_sink/modules/text_demo",
    "//apps/kitchen_sink/modules/state_demo",
    "//apps/kitchen_sink/modules/animation_demo",
],
```

### Performance Considerations

1. **Use Layout When Possible**: If you don't need visual styling, use `<layout>` for better performance
2. **Minimize Re-renders**: Use StatefulComponent only when needed; prefer stateless components
3. **Animation Performance**: Hardware-accelerated properties (opacity, transform) perform better than layout properties
4. **List Virtualization**: For large lists, implement virtualization (not yet in demo)

### Code Style Conventions

1. **TypeScript Strict Mode**: All code uses strict TypeScript
2. **Explicit Types**: Always type component props and state
3. **Import Order**: Group imports (framework, modules, theme, components)
4. **Component Structure**: onCreate → onRender → private methods → styles
5. **Style Objects**: Define styles object at bottom of file using new Style<T>()
6. **Naming**: PascalCase for components, camelCase for methods, UPPER_CASE for constants

---

## Building the App

See **[WORKFLOW.md](./WORKFLOW.md)** for complete step-by-step instructions.

**Quick Build:**
```bash
cd /path/to/Valdi
valdi build ios --application=//apps/kitchen_sink:kitchen_sink_ios
```

**Build Output:**
- IPA: `bazel-bin/apps/kitchen_sink/kitchen_sink_ios.ipa`
- App Bundle: `bazel-bin/apps/kitchen_sink/kitchen_sink_ios_archive-root/Payload/Valdi Kitchen Sink.app`

---

## Contributing

To add a new demo module:

1. Create module directory: `modules/your_demo/`
2. Add `BUILD.bazel` with valdi_module configuration
3. Create component extending NavigationPageComponent
4. Add @NavigationPage(module) decorator
5. Import in HomePage.tsx and add to navigation switch
6. Add module to main_app BUILD.bazel deps
7. Add module to root BUILD.bazel deps
8. Build and test

See [WORKFLOW.md](./WORKFLOW.md) for detailed instructions.

---

## License

Same license as the Valdi framework.

---

## Summary

**Valdi Kitchen Sink** is a working, building, and functional demonstration app showcasing Valdi's core capabilities. With 4 complete demo modules and a solid design system, it provides a practical reference for building native mobile applications with TypeScript.

**Status**: Production-ready for implemented features | 33% complete overall

For detailed development instructions, see **[WORKFLOW.md](./WORKFLOW.md)**.
