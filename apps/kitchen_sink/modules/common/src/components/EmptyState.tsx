/**
 * EmptyState Component
 *
 * Displays a placeholder when there's no content to show.
 * Provides helpful messaging and optional call-to-action.
 *
 * @example
 * ```tsx
 * <EmptyState
 *   icon="📭"
 *   title="No messages"
 *   description="You don't have any messages yet."
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
 * ViewModel interface for EmptyState component
 */
export interface EmptyStateViewModel {
  /**
   * Emoji or icon to display
   * @default "📭"
   */
  icon?: string;

  /**
   * Title text
   * @default "No data"
   */
  title?: string;

  /**
   * Description text (optional)
   */
  description?: string;

  /**
   * Background color
   * @default Colors.background
   */
  backgroundColor?: string;
}

/**
 * EmptyState Component
 *
 * A friendly placeholder component for empty states:
 * - Large emoji/icon for visual interest
 * - Bold title explaining the empty state
 * - Optional description with more context
 * - Centered layout
 *
 * Use this to:
 * - Show empty lists or collections
 * - Indicate no search results
 * - Display placeholder for missing data
 * - Provide helpful context to users
 */
export class EmptyState extends Component<EmptyStateViewModel> {
  onRender() {
    const {
      icon = '📭',
      title = 'No data',
      description,
      backgroundColor = Colors.background,
    } = this.viewModel;

    <view style={styles.container} backgroundColor={backgroundColor}>
      <layout style={styles.content}>
        {/* Icon */}
        <label style={styles.icon} value={icon} />

        {/* Title */}
        <label style={styles.title} value={title} />

        {/* Description */}
        {description && (
          <label
            style={styles.description}
            value={description}
            numberOfLines={0}
          />
        )}
      </layout>
    </view>;
  }
}

const styles = {
  container: new Style<View>({
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  }),

  content: new Style<Layout>({
    alignItems: 'center',
    width: '100%',
  }),

  icon: new Style<Label>({
    font: Fonts.h1,
    marginBottom: Spacing.lg,
  }),

  title: new Style<Label>({
    font: Fonts.h2,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  }),

  description: new Style<Label>({
    font: Fonts.body,
    color: Colors.textSecondary,
    textAlign: 'center',
  }),
};
