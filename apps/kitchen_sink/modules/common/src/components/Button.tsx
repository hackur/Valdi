/**
 * Button Component
 *
 * A highly configurable button component with multiple visual variants,
 * sizes, and states. Follows the design system for consistent styling.
 *
 * @example
 * ```tsx
 * <Button
 *   title="Click Me"
 *   variant="primary"
 *   size="medium"
 *   onTap={() => console.log('Clicked!')}
 * />
 * ```
 */

import { Component } from 'valdi_core/src/Component';
import { Style } from 'valdi_core/src/Style';
import { View, Label } from 'valdi_tsx/src/NativeTemplateElements';

import { Colors } from '../theme/colors';
import { Fonts, FontSizes } from '../theme/fonts';
import { BorderRadius, Spacing } from '../theme/styles';

/**
 * ViewModel interface for Button component
 */
export interface ButtonViewModel {
  /** The text displayed on the button */
  title: string;

  /**
   * Visual style variant:
   * - primary: Filled with primary color background
   * - secondary: Filled with secondary color background
   * - outline: Transparent with primary border
   * - ghost: Transparent with no border
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';

  /**
   * Button size affecting padding and font:
   * - small: Compact padding
   * - medium: Standard padding (default)
   * - large: Generous padding
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Whether the button is disabled (reduces opacity, prevents interaction)
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the button should expand to fill parent width
   * @default false
   */
  fullWidth?: boolean;

  /** Callback function invoked when button is tapped */
  onTap?: () => void;
}

/**
 * Button Component
 *
 * Implements the design system's button specifications with support for:
 * - 4 visual variants (primary, secondary, outline, ghost)
 * - 3 size options (small, medium, large)
 * - Disabled state with opacity reduction
 * - Full-width layout option
 * - Tap interaction with disabled state handling
 */
export class Button extends Component<ButtonViewModel> {
  onRender() {
    const {
      title,
      variant = 'primary',
      size = 'medium',
      disabled = false,
      fullWidth = false,
      onTap,
    } = this.viewModel;

    // Determine styles based on variant and size
    const containerStyle = this.getContainerStyle(variant, size, fullWidth, disabled);
    const textStyle = this.getTextStyle(variant, size, disabled);

    <view
      style={containerStyle}
      onTap={disabled ? undefined : onTap}
      onTapDisabled={disabled}
    >
      <label style={textStyle} value={title} />
    </view>;
  }

  private getContainerStyle(
    variant: ButtonViewModel['variant'],
    size: ButtonViewModel['size'],
    fullWidth: boolean,
    disabled: boolean
  ): Style<View> {
    let backgroundColor: string = Colors.primary;
    let borderColor: string = 'transparent';
    let borderWidth: number = 0;
    let opacity: number = disabled ? 0.5 : 1;

    switch (variant) {
      case 'primary':
        backgroundColor = Colors.primary;
        break;
      case 'secondary':
        backgroundColor = Colors.secondary;
        break;
      case 'outline':
        backgroundColor = 'transparent';
        borderColor = Colors.primary;
        borderWidth = 2;
        break;
      case 'ghost':
        backgroundColor = 'transparent';
        break;
    }

    let paddingVertical: number = Spacing.md;
    let paddingHorizontal: number = Spacing.lg;

    switch (size) {
      case 'small':
        paddingVertical = Spacing.sm;
        paddingHorizontal = Spacing.base;
        break;
      case 'medium':
        paddingVertical = Spacing.md;
        paddingHorizontal = Spacing.lg;
        break;
      case 'large':
        paddingVertical = Spacing.base;
        paddingHorizontal = Spacing.xl;
        break;
    }

    return new Style<View>({
      backgroundColor,
      borderRadius: BorderRadius.base,
      paddingTop: paddingVertical,
      paddingBottom: paddingVertical,
      paddingLeft: paddingHorizontal,
      paddingRight: paddingHorizontal,
      borderWidth,
      borderColor,
      opacity,
      width: fullWidth ? '100%' : undefined,
      alignItems: 'center',
      justifyContent: 'center',
    });
  }

  private getTextStyle(
    variant: ButtonViewModel['variant'],
    size: ButtonViewModel['size'],
    disabled: boolean
  ): Style<Label> {
    let color: string = Colors.white;

    switch (variant) {
      case 'primary':
      case 'secondary':
        color = Colors.white;
        break;
      case 'outline':
      case 'ghost':
        color = Colors.primary;
        break;
    }

    let fontSize: number = FontSizes.base;
    switch (size) {
      case 'small':
        fontSize = FontSizes.sm;
        break;
      case 'medium':
        fontSize = FontSizes.base;
        break;
      case 'large':
        fontSize = FontSizes.lg;
        break;
    }

    return new Style<Label>({
      color,
      font: Fonts.button,
      textAlign: 'center',
    });
  }
}
