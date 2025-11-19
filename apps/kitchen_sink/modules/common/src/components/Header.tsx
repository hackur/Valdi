/**
 * Header Component
 *
 * A reusable page header component with title and optional back navigation.
 * Used consistently across all demo pages for navigation and branding.
 *
 * @example
 * ```tsx
 * <Header
 *   title="My Page"
 *   showBack={true}
 *   onBack={() => navController.pop()}
 * />
 * ```
 */

import { Component } from 'valdi_core/src/Component';
import { Style } from 'valdi_core/src/Style';
import { View, Label, Layout } from 'valdi_tsx/src/NativeTemplateElements';

import { Colors } from '../theme/colors';
import { Fonts } from '../theme/fonts';
import { Spacing } from '../theme/styles';

/**
 * ViewModel interface for Header component
 */
export interface HeaderViewModel {
  /** The text to display in the header */
  title: string;

  /** Whether to show the back button (default: false) */
  showBack?: boolean;

  /** Callback function when back button is tapped */
  onBack?: () => void;

  /** Optional custom background color (default: Colors.surface) */
  backgroundColor?: string;
}

/**
 * Header Component
 *
 * Provides a consistent header bar across all pages with:
 * - Centered title text
 * - Optional left-side back button (← arrow)
 * - Status bar padding (50pt top padding)
 * - Bottom border and shadow for depth
 *
 * The header uses a three-column layout (back button | title | spacer)
 * to keep the title centered even when the back button is shown.
 */
export class Header extends Component<HeaderViewModel> {
  onRender() {
    const {
      title,
      showBack = false,
      onBack,
      backgroundColor = Colors.surface,
    } = this.viewModel;

    <view style={styles.container} backgroundColor={backgroundColor}>
      <layout style={styles.content}>
        {/* Back button */}
        {showBack && (
          <view style={styles.backButton} onTap={onBack}>
            <label style={styles.backText} value="←" />
          </view>
        )}

        {/* Title */}
        <view style={styles.titleContainer}>
          <label style={styles.title} value={title} numberOfLines={1} />
        </view>

        {/* Placeholder for right side */}
        {showBack && <view style={styles.placeholder} />}
      </layout>
    </view>;
  }
}

const styles = {
  container: new Style<View>({
    width: '100%',
    paddingTop: 50, // Status bar
    borderWidth: 1,
    borderColor: Colors.border,
    boxShadow: `0 1 3 ${Colors.overlayLight}`,
  }),

  content: new Style<Layout>({
    width: '100%',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: Spacing.base,
    paddingRight: Spacing.base,
  }),

  backButton: new Style<View>({
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  }),

  backText: new Style<Label>({
    font: Fonts.h2,
    color: Colors.primary,
  }),

  titleContainer: new Style<View>({
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }),

  title: new Style<Label>({
    font: Fonts.h3,
    color: Colors.textPrimary,
    textAlign: 'center',
  }),

  placeholder: new Style<View>({
    width: 44,
    height: 44,
  }),
};
