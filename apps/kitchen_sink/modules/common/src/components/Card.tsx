/**
 * Card Component
 *
 * A versatile container component with shadow, padding, and rounded corners.
 * Useful for grouping related content and creating visual hierarchy.
 * Supports slot-based content projection for flexible composition.
 *
 * @example
 * ```tsx
 * <Card elevation="md" padding={16}>
 *   <Label value="Card content goes here" />
 * </Card>
 * ```
 */

import { Component } from 'valdi_core/src/Component';
import { Style } from 'valdi_core/src/Style';
import { View, Layout } from 'valdi_tsx/src/NativeTemplateElements';

import { Colors } from '../theme/colors';
import { BorderRadius, Shadows, Spacing } from '../theme/styles';

/**
 * ViewModel interface for Card component
 */
export interface CardViewModel {
  /**
   * Background color of the card
   * @default Colors.surface (white)
   */
  backgroundColor?: string;

  /**
   * Shadow elevation level (affects visual depth):
   * - none: No shadow
   * - sm: Subtle shadow
   * - base: Standard shadow (default)
   * - md: Medium shadow
   * - lg: Large shadow
   * @default 'base'
   */
  elevation?: 'none' | 'sm' | 'base' | 'md' | 'lg';

  /**
   * Corner radius in points
   * @default BorderRadius.base (8)
   */
  borderRadius?: number;

  /**
   * Inner padding in points
   * @default Spacing.base (16)
   */
  padding?: number;

  /**
   * Whether card should expand to fill parent width
   * @default false
   */
  fullWidth?: boolean;

  /** Optional tap handler (makes card interactive) */
  onTap?: () => void;
}

/**
 * Card Component
 *
 * A container component following Material Design card principles:
 * - Elevated surface with shadow
 * - Rounded corners for softer appearance
 * - Inner padding for content spacing
 * - Slot-based content projection using `<slot />`
 *
 * Use cards to:
 * - Group related information
 * - Create visual sections
 * - Make content tappable/interactive
 * - Add depth to flat layouts
 */
export class Card extends Component<CardViewModel> {
  onRender() {
    const {
      backgroundColor = Colors.surface,
      elevation = 'base',
      borderRadius = BorderRadius.base,
      padding = Spacing.base,
      fullWidth = false,
      onTap,
    } = this.viewModel;

    const shadow = this.getShadow(elevation);

    <view
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      boxShadow={shadow}
      padding={padding}
      width={fullWidth ? '100%' : undefined}
      onTap={onTap}
    >
      <layout width="100%">
        <slot />
      </layout>
    </view>;
  }

  private getShadow(elevation: CardViewModel['elevation']): string {
    switch (elevation) {
      case 'none':
        return Shadows.none;
      case 'sm':
        return Shadows.sm;
      case 'base':
        return Shadows.base;
      case 'md':
        return Shadows.md;
      case 'lg':
        return Shadows.lg;
      default:
        return Shadows.base;
    }
  }
}
