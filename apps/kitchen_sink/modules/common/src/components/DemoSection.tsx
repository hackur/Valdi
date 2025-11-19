/**
 * DemoSection Component
 *
 * A standardized section container used across all demo pages to organize
 * content with consistent styling. Provides a title, optional description,
 * and slot-based content area.
 *
 * @example
 * ```tsx
 * <DemoSection
 *   title="Flex Direction"
 *   description="Examples of different flexDirection values"
 * >
 *   <View>Content goes here</View>
 * </DemoSection>
 * ```
 */

import { Component } from 'valdi_core/src/Component';
import { Style } from 'valdi_core/src/Style';
import { Layout, Label } from 'valdi_tsx/src/NativeTemplateElements';

import { Colors } from '../theme/colors';
import { Fonts } from '../theme/fonts';
import { Spacing } from '../theme/styles';

/**
 * ViewModel interface for DemoSection component
 */
export interface DemoSectionViewModel {
  /** The section title (displayed in h3 font) */
  title: string;

  /**
   * Optional description text displayed below title
   * Supports multiple lines (numberOfLines={0})
   */
  description?: string;

  /**
   * Bottom margin spacing for separation from next section
   * @default Spacing.xl (24)
   */
  marginBottom?: number;
}

/**
 * DemoSection Component
 *
 * Provides consistent section structure across all demo pages:
 * - Bold h3 title for clear section identification
 * - Optional body text description for context
 * - Slot-based content area for demo examples
 * - Configurable bottom margin for spacing
 *
 * Used extensively in demo modules to separate different examples
 * and maintain visual hierarchy.
 */
export class DemoSection extends Component<DemoSectionViewModel> {
  onRender() {
    const { title, description, marginBottom = Spacing.xl } = this.viewModel;

    <layout width="100%" marginBottom={marginBottom}>
      {/* Section header */}
      <layout style={styles.header}>
        <label style={styles.title} value={title} />
        {description && (
          <label style={styles.description} value={description} numberOfLines={0} />
        )}
      </layout>

      {/* Section content */}
      <layout style={styles.content}>
        <slot />
      </layout>
    </layout>;
  }
}

const styles = {
  header: new Style<Layout>({
    width: '100%',
    marginBottom: Spacing.md,
  }),

  title: new Style<Label>({
    font: Fonts.h3,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  }),

  description: new Style<Label>({
    font: Fonts.body,
    color: Colors.textSecondary,
  }),

  content: new Style<Layout>({
    width: '100%',
  }),
};
