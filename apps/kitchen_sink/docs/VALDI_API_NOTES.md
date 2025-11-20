# Valdi API Notes and Common Issues

This document captures common API constraints, limitations, and usage patterns discovered while implementing the Valdi Kitchen Sink demos.

## TextField and TextView Limitations

### Unsupported Properties

Both `TextField` and `TextView` have limited styling support compared to `View` and `Layout`. The following properties are **NOT supported**:

- ❌ `padding` / `paddingLeft` / `paddingRight` / `paddingTop` / `paddingBottom` / `paddingHorizontal` / `paddingVertical`
- ❌ `borderWidth` / `borderLeftWidth` / `borderRightWidth` / `borderTopWidth` / `borderBottomWidth`
- ❌ `borderRadius`
- ❌ `marginBottom` / individual margin properties
- ❌ `fontSize` (use `font` property instead)
- ❌ `autoCapitalize`
- ❌ `autoCorrect`
- ❌ `secureTextEntry` (use `contentType="password"` instead)
- ❌ `maxLength` (implement validation in `onWillChange` handler)

### Supported Properties

```typescript
new Style<TextField>({
  width: '100%',
  backgroundColor: Colors.surface,
  font: Fonts.body,
  color: Colors.textPrimary,
})
```

### Correct Event Property Names

- ✅ `event.text` (NOT `event.value`)
- ✅ `onChange={(e) => handleChange(e.text)}`

### TextField contentType

Use `contentType` to specify keyboard type and secure entry:

```typescript
<textfield contentType="password" /> // Secure text entry
<textfield contentType="email" />    // Email keyboard
<textfield contentType="phone" />    // Phone number keyboard
```

### Character Validation Pattern

Use `onWillChange` for input sanitization/validation:

```typescript
private handleTextWillChange(event: EditTextEvent): EditTextEvent | undefined {
  const sanitized = event.text.replace(/[^a-zA-Z0-9_]/g, '');
  if (sanitized !== event.text) {
    return { ...event, text: sanitized }; // NOT 'value'
  }
  return undefined;
}
```

## ScrollEvent Properties

ScrollEvent provides individual coordinate properties, not object properties:

### Correct Usage

```typescript
interface ScrollEvent {
  x: number;                    // Scroll offset X
  y: number;                    // Scroll offset Y
  velocityX: number;            // Velocity X
  velocityY: number;            // Velocity Y
  overscrollTensionX?: number;  // Overscroll tension X
  overscrollTensionY?: number;  // Overscroll tension Y
}

// Correct handler:
private handleScroll(event: ScrollEvent) {
  this.setState({
    scrollPosition: { x: event.x, y: event.y },
    scrollVelocity: { x: event.velocityX, y: event.velocityY },
    overscrollTension: {
      x: event.overscrollTensionX || 0,
      y: event.overscrollTensionY || 0
    },
  });
}
```

### Common Mistakes

```typescript
// ❌ WRONG - These properties don't exist:
event.offset
event.contentOffset
event.velocity (as object)
event.overscrollTension (as object)
```

## View Border Properties

Valdi only supports uniform borders, not individual border sides:

### Supported

```typescript
new Style<View>({
  borderWidth: 1,      // All borders
  borderColor: Colors.primary,
  borderRadius: 8,
})
```

### NOT Supported

```typescript
// ❌ Individual border widths don't exist:
borderLeftWidth: 3,
borderRightWidth: 1,
borderTopWidth: 2,
borderBottomWidth: 1,
```

## View Padding Properties

Use only the generic `padding` property, not directional variants:

### Supported

```typescript
new Style<View>({
  padding: Spacing.base,  // All sides
})
```

### NOT Supported on View (but check individual components)

```typescript
// ❌ These may not be universally supported:
paddingHorizontal: Spacing.sm,
paddingVertical: Spacing.xs,
paddingLeft: 10,
paddingRight: 10,
```

## Keys in JSX Loops

All keys must be strings, not numbers:

### Correct

```typescript
{items.map((item, i) => (
  <view key={`${i}`}>  {/* Template literal */}
    ...
  </view>
))}

{[1, 2, 4, 8].map((width) => (
  <Button key={`${width}`} />  {/* Convert to string */}
))}
```

### Wrong

```typescript
{items.map((item, i) => (
  <view key={i}>  {/* ❌ Number not allowed */}
    ...
  </view>
))}
```

## Animation Import Path

### Correct

```typescript
import { AnimationCurve, PresetCurveAnimationOptions } from 'valdi_core/src/AnimationOptions';
```

### Wrong

```typescript
import { ... } from 'valdi_core/src/Animation'; // ❌ Wrong path
```

## GeometricPathScaleType

Use enum values, not strings:

### Correct

```typescript
import { GeometricPathBuilder, GeometricPathScaleType } from 'valdi_core/src/GeometricPath';

const builder = new GeometricPathBuilder(
  100,
  100,
  GeometricPathScaleType.Contain  // ✅ Enum value
);
```

### Wrong

```typescript
const builder = new GeometricPathBuilder(100, 100, 'contain'); // ❌ String
```

## Color System

### Available Colors

```typescript
Colors.textPrimary    // ✅ Main text color
Colors.textSecondary  // ✅ Secondary text
Colors.textTertiary   // ✅ Tertiary text
Colors.textInverse    // ✅ Inverse text (white)
```

### Common Mistake

```typescript
color: Colors.text  // ❌ Does not exist
```

## Font System

### Available Fonts

```typescript
Fonts.label   // ✅ Bold 16pt (equivalent to bodyBold)
Fonts.body    // ✅ Regular 16pt
Fonts.h1      // ✅ Large heading
Fonts.h2      // ✅ Medium heading
Fonts.caption // ✅ Small text
```

### Common Mistake

```typescript
font: Fonts.bodyBold  // ❌ Does not exist, use Fonts.label
```

## Style Object Typing

When creating dynamic styles, ensure they return Style objects, not plain objects:

### Wrong

```typescript
private getInputStyle() {
  return {
    ...styles.input,
    borderWidth: 1,  // ❌ Plain object, not a Style
  };
}
```

### Correct

```typescript
private getInputStyle() {
  // For TextField, which doesn't support borderWidth:
  return styles.input;  // ✅ Return the Style object directly
}
```

## Common Patterns

### Form Validation Without Border Styling

Since TextField doesn't support border styling, show validation state via labels:

```typescript
<textfield
  value={this.state.email}
  onChange={(e) => this.validateEmail(e.text)}
  style={styles.input}
/>
{this.state.emailError && (
  <label
    value={this.state.emailError}
    color={Colors.error}
  />
)}
```

### Index Signature for Dynamic Property Access

When accessing object properties dynamically, add an index signature:

```typescript
private getGradient(type: string): string {
  const gradients: { [key: string]: string } = {  // ✅ Index signature
    sunset: 'linear-gradient(...)',
    ocean: 'linear-gradient(...)',
  };
  return gradients[type] || gradients.sunset;
}
```

## Summary

The main constraints to remember:

1. **TextField/TextView** have minimal styling support (no padding, borders, etc.)
2. **ScrollEvent** uses individual x/y properties, not nested objects
3. **Borders** are uniform only (no per-side widths)
4. **Keys** must be strings (convert numbers with template literals)
5. **Enums** must be used instead of string literals for certain properties
6. **Event properties** use `.text` not `.value`
7. **Import paths** matter - use correct paths for AnimationOptions, etc.

When in doubt, check the TypeScript definitions in:
- `src/valdi_modules/src/valdi/valdi_tsx/src/NativeTemplateElements.d.ts`
- `src/valdi_modules/src/valdi/valdi_tsx/src/GestureEvents.d.ts`
