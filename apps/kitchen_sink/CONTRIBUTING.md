# Contributing to Valdi Kitchen Sink

Thank you for your interest in contributing to the Valdi Kitchen Sink demo application! This guide will help you get started with development.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Adding New Demo Modules](#adding-new-demo-modules)
- [Code Style Guidelines](#code-style-guidelines)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)

## Getting Started

### Prerequisites

- macOS environment (for iOS development)
- Xcode and iOS Simulator
- Bazel build system
- Node.js and npm (for scripts)

### Initial Setup

1. Clone the repository
2. Navigate to the kitchen sink app:
   ```bash
   cd apps/kitchen_sink
   ```

3. Install dependencies (if any):
   ```bash
   npm install
   ```

4. Build the app:
   ```bash
   npm run build
   # or
   ./scripts/build.sh
   ```

## Development Workflow

### Quick Commands

```bash
# Build the app
npm run build

# Build and install to iOS Simulator
npm run dev

# Clean build artifacts
npm run clean

# Deep clean (removes all cache)
npm run clean:deep

# List available iOS Simulators
npm run simulators

# Run linter
npm run lint

# Fix linting errors
npm run lint:fix

# Show all commands
npm run help
```

### Making Changes

1. **Create a new branch** for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the code style guidelines below

3. **Test your changes**:
   ```bash
   npm run build
   npm run test:ios
   ```

4. **Lint your code**:
   ```bash
   npm run lint:fix
   ```

5. **Commit your changes** with a clear, descriptive message:
   ```bash
   git commit -m "Add [feature]: brief description"
   ```

## Adding New Demo Modules

To add a new demo module (e.g., for one of the unimplemented sections):

### 1. Create Module Structure

```bash
mkdir -p modules/your_demo/src
```

### 2. Create BUILD.bazel

Create `modules/your_demo/BUILD.bazel`:

```python
load("//src/build_defs:valdi.bzl", "valdi_module")

valdi_module(
    name = "your_demo",
    srcs = glob(["src/**/*.{ts,tsx}"]),
    module_name = "your_demo",
    visibility = ["//visibility:public"],
    deps = [
        "//src/valdi_modules/src/valdi/valdi_core",
        "//src/valdi_modules/src/valdi/valdi_tsx",
        "//src/valdi_modules/src/valdi/valdi_navigation",
        "//apps/kitchen_sink/modules/common",
    ],
)
```

### 3. Create Demo Component

Create `modules/your_demo/src/YourDemo.tsx`:

```typescript
/**
 * Your Demo Component
 * Description of what this demo showcases
 */

import { StatefulComponent } from 'valdi_core/src/StatefulComponent';
import { Style } from 'valdi_core/src/Style';
import { NavigationController } from 'valdi_navigation/src/NavigationController';
import { NavigationPageComponent } from 'valdi_navigation/src/NavigationPageComponent';
import { NavigationPage } from 'valdi_navigation/src/NavigationPage';
import { View, Layout, ScrollView } from 'valdi_tsx/src/NativeTemplateElements';

import { Header, Colors, Spacing, DemoSection } from '../../common/src/index';

export interface YourDemoViewModel {
  navigationController: NavigationController;
}

interface YourDemoState {
  // Your state properties
}

@NavigationPage(module)
export class YourDemo extends NavigationPageComponent<YourDemoViewModel, YourDemoState> {
  onCreate() {
    this.setState({
      // Initialize state
    });
  }

  onRender() {
    <view style={styles.page}>
      <Header
        title="Your Demo"
        navigationController={this.viewModel.navigationController}
      />

      <scroll style={styles.scroll}>
        <layout style={styles.content}>
          <DemoSection title="Section 1" description="Description">
            {/* Your demo content */}
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

### 4. Add Dependency to main_app

Edit `modules/main_app/BUILD.bazel` and add your module to deps:

```python
deps = [
    # ... existing deps
    "//apps/kitchen_sink/modules/your_demo",
],
```

### 5. Add Navigation

Edit `modules/main_app/src/HomePage.tsx`:

1. Import your demo:
   ```typescript
   import { YourDemo } from '../../your_demo/src/YourDemo';
   ```

2. Add navigation case:
   ```typescript
   case 'your-id':
     navController.push(YourDemo, { navigationController: navController }, {});
     break;
   ```

### 6. Build and Test

```bash
npm run build
npm run test:ios
```

## Code Style Guidelines

### TypeScript/TSX

- **Use TypeScript strict mode** - All code must pass strict type checking
- **Follow existing patterns** - Look at implemented demos for reference
- **Document all public APIs** - Use JSDoc comments for components and interfaces
- **Use consistent naming**:
  - Components: PascalCase (e.g., `YourDemo`)
  - Files: PascalCase for components (e.g., `YourDemo.tsx`)
  - Variables/functions: camelCase (e.g., `myVariable`)
  - Constants: UPPER_SNAKE_CASE (e.g., `MAX_VALUE`)

### Component Structure

1. Imports (grouped by source)
2. Interfaces (ViewModel, State)
3. Component class
4. Lifecycle methods (onCreate, onRender, onDestroy)
5. Private helper methods
6. Styles object at bottom

### Valdi-Specific Guidelines

- **Layout vs View**: Use `<layout>` for structure, `<view>` for visual elements
- **No gap property**: Use margins for spacing (gap not supported)
- **Use flexGrow/flexShrink**: Not shorthand `flex` property
- **ScrollView sizing**: Use `height: '100%'` instead of `flex: 1`
- **Animation types**: Import and use `AnimationCurve` enum
- **Slots**: Use lowercase `<slot />`, not `<Slot />`

### File Headers

All source files should start with a documentation comment:

```typescript
/**
 * Component/Module Name
 * Brief description of purpose
 */
```

### Styling

- **Use design system**: Import from `common` module
- **Type your styles**: Use `Style<T>` with specific element type
- **Keep styles at bottom**: Define styles object after component class
- **Use theme constants**: Colors, Fonts, Spacing, etc.

Example:
```typescript
const styles = {
  container: new Style<View>({
    backgroundColor: Colors.surface,
    padding: Spacing.base,
  }),
};
```

## Testing

### Manual Testing

1. **Build the app**: `npm run build`
2. **Install to simulator**: `npm run test:ios`
3. **Test all interactions**:
   - Navigation works correctly
   - Buttons respond to taps
   - Animations run smoothly
   - Text is readable
   - Layout adapts to screen size

### Automated Testing

Currently, this project does not have automated tests. Contributions to add testing infrastructure are welcome!

## Pull Request Process

### Before Submitting

1. **Ensure code builds**: `npm run build` succeeds
2. **Run linter**: `npm run lint:fix`
3. **Test on iOS Simulator**: Verify your changes work as expected
4. **Update documentation**: Add/update relevant documentation
5. **Follow commit message conventions**:
   - `Add [feature]: description` - New features
   - `Fix [bug]: description` - Bug fixes
   - `Update [docs]: description` - Documentation changes
   - `Refactor [component]: description` - Code refactoring

### Submitting a Pull Request

1. **Push your branch** to the repository
2. **Create a pull request** with:
   - Clear title describing the change
   - Detailed description of what changed and why
   - Screenshots/videos for UI changes
   - Reference any related issues

3. **Wait for review** - A maintainer will review your PR
4. **Address feedback** - Make requested changes if needed
5. **Merge** - Once approved, your PR will be merged!

## Getting Help

- **Documentation**: See [README.md](./README.md) and [WORKFLOW.md](./WORKFLOW.md)
- **Issues**: Check existing issues or create a new one
- **Questions**: Open a discussion or issue for questions

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Follow best practices

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT).

---

Thank you for contributing to Valdi Kitchen Sink! Your efforts help make this demo better for everyone learning the Valdi framework.
