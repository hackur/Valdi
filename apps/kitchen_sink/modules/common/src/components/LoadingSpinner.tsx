/**
 * LoadingSpinner Component
 *
 * Displays a loading indicator with optional message.
 * Useful for showing loading states during data fetching or processing.
 *
 * @example
 * ```tsx
 * <LoadingSpinner message="Loading data..." />
 * ```
 */

import { Component } from 'valdi_core/src/Component';
import { Style } from 'valdi_core/src/Style';
import { View, Label, Layout } from 'valdi_tsx/src/NativeTemplateElements';

import { Colors } from '../theme/colors';
import { Fonts } from '../theme/fonts';
import { Spacing } from '../theme/styles';

/**
 * ViewModel interface for LoadingSpinner component
 */
export interface LoadingSpinnerViewModel {
  /**
   * Optional loading message to display
   * @default "Loading..."
   */
  message?: string;

  /**
   * Size of the loading indicator
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Color of the loading indicator
   * @default Colors.primary
   */
  color?: string;

  /**
   * Whether to show fullscreen overlay
   * @default false
   */
  fullscreen?: boolean;
}

/**
 * LoadingSpinner Component
 *
 * Displays a loading state with:
 * - Animated loading indicator (emoji or shape)
 * - Optional message text
 * - Configurable size and color
 * - Optional fullscreen overlay mode
 *
 * Note: This is a simplified implementation without actual animations.
 * A production version would use animated rotation or pulse effects.
 */
export class LoadingSpinner extends Component<LoadingSpinnerViewModel> {
  onRender() {
    const {
      message = 'Loading...',
      size = 'medium',
      color = Colors.primary,
      fullscreen = false,
    } = this.viewModel;

    const containerStyle = fullscreen ? styles.fullscreenContainer : styles.inlineContainer;
    const spinnerSize = this.getSpinnerSize(size);

    <view style={containerStyle}>
      <layout style={styles.content}>
        {/* Spinner indicator */}
        <view
          style={styles.spinner}
          backgroundColor={color}
          width={spinnerSize}
          height={spinnerSize}
        />

        {/* Loading message */}
        {message && (
          <label
            style={styles.message}
            value={message}
            numberOfLines={0}
          />
        )}
      </layout>
    </view>;
  }

  private getSpinnerSize(size: LoadingSpinnerViewModel['size']): number {
    switch (size) {
      case 'small':
        return 24;
      case 'medium':
        return 40;
      case 'large':
        return 64;
      default:
        return 40;
    }
  }
}

const styles = {
  fullscreenContainer: new Style<View>({
    width: '100%',
    height: '100%',
    backgroundColor: Colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
  }),

  inlineContainer: new Style<View>({
    width: '100%',
    padding: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  }),

  content: new Style<Layout>({
    alignItems: 'center',
  }),

  spinner: new Style<View>({
    borderRadius: 9999, // Full circle
    opacity: 0.8,
    marginBottom: Spacing.base,
  }),

  message: new Style<Label>({
    font: Fonts.body,
    color: Colors.white,
    textAlign: 'center',
  }),
};
