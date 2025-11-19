/**
 * Advanced Styling Demo (Placeholder)
 *
 * This placeholder page explains what will be demonstrated when the
 * Advanced Styling demo is fully implemented.
 *
 * **Planned Features:**
 *
 * 1. **Gradients:**
 *    - Linear gradients
 *    - Radial gradients
 *    - Multiple color stops
 *    - Gradient angles and positions
 *
 * 2. **Shadows & Depth:**
 *    - Box shadows with offset, blur, and spread
 *    - Drop shadows on text
 *    - Inner shadows
 *    - Multiple layered shadows
 *
 * 3. **Borders & Outlines:**
 *    - Border radius variations
 *    - Border styles (solid, dashed, dotted)
 *    - Individual border sides
 *    - Border images/gradients
 *
 * 4. **Transforms:**
 *    - Scale, rotate, translate transformations
 *    - Transform origin
 *    - 3D transforms (perspective, rotateX/Y/Z)
 *    - Transform animations
 *
 * 5. **Advanced Effects:**
 *    - Backdrop blur/filters
 *    - Blend modes
 *    - Opacity and visibility
 *    - Clipping and masks
 *
 * **Estimated Implementation Effort:** 4-6 hours
 *
 * **References:**
 * @see {@link https://github.com/valdi-labs/valdi|Valdi Framework Documentation}
 *
 * **Contributing:**
 * If you'd like to implement this demo, check CONTRIBUTING.md for guidelines
 * and submit a pull request!
 */

import { Component } from 'valdi_core/src/Component';
import { Style } from 'valdi_core/src/Style';
import { NavigationPage } from 'valdi_navigation/src/NavigationPage';
import { View, Label, Scroll, Layout } from 'valdi_tsx/src/BuiltinComponents';
import { DemoCard } from 'common/src/DemoCard';
import { Colors } from 'common/src/Colors';

/**
 * Placeholder component explaining the planned Advanced Styling demo features.
 */
@NavigationPage(module)
export class StylingDemo extends Component {
  onRender() {
    <view style={styles.page}>
      {/* Header */}
      <view style={styles.header}>
        <label style={styles.backButton} value="← Back" onTap={() => this.viewModel.navigationController.pop()} />
        <label style={styles.headerTitle} value="🎨 Advanced Styling" />
        <label style={styles.headerSubtitle} value="Coming Soon" />
      </view>

      {/* Scrollable content */}
      <scroll style={styles.scroll}>
        <layout style={styles.content}>
          {/* Status badge */}
          <view style={styles.badge}>
            <label style={styles.badgeText} value="🚧 Under Construction" />
          </view>

          {/* Description */}
          <label
            style={styles.description}
            value="This demo will showcase Valdi's advanced styling capabilities, including gradients, shadows, borders, transforms, blend modes, and backdrop effects."
            numberOfLines={0}
          />

          {/* Planned Features Section */}
          <label style={styles.sectionTitle} value="Planned Features" />

          <DemoCard
            title="Gradients"
            description="Linear, radial gradients with multiple color stops and positioning"
            color={Colors.primary}
          />

          <DemoCard
            title="Shadows & Depth"
            description="Box shadows, drop shadows, inner shadows, layered effects"
            color={Colors.secondary}
          />

          <DemoCard
            title="Borders & Outlines"
            description="Border radius, styles, individual sides, border images/gradients"
            color={Colors.accent}
          />

          <DemoCard
            title="Transforms"
            description="Scale, rotate, translate, 3D transforms, transform origin"
            color={Colors.success}
          />

          <DemoCard
            title="Advanced Effects"
            description="Backdrop blur, blend modes, opacity, clipping, masks"
            color={Colors.error}
          />

          {/* Implementation Info */}
          <label style={styles.sectionTitle} value="Implementation Status" />
          <label
            style={styles.infoText}
            value="Estimated implementation effort: 4-6 hours"
            numberOfLines={0}
          />
          <label
            style={styles.infoText}
            value="Want to contribute? Check out CONTRIBUTING.md for guidelines on how to implement this demo!"
            numberOfLines={0}
          />
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

  header: new Style<View>({
    width: '100%',
    padding: 20,
    paddingTop: 60,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  }),

  backButton: new Style<Label>({
    fontSize: 16,
    color: Colors.primary,
    marginBottom: 10,
    cursor: 'pointer',
  }),

  headerTitle: new Style<Label>({
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 5,
  }),

  headerSubtitle: new Style<Label>({
    fontSize: 14,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  }),

  scroll: new Style<Scroll>({
    width: '100%',
    height: '100%',
  }),

  content: new Style<Layout>({
    padding: 20,
    gap: 15,
  }),

  badge: new Style<View>({
    alignSelf: 'flex-start',
    backgroundColor: '#FEF3C7',
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  }),

  badgeText: new Style<Label>({
    fontSize: 14,
    fontWeight: '600',
    color: '#92400E',
  }),

  description: new Style<Label>({
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text,
  }),

  sectionTitle: new Style<Label>({
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 10,
    marginBottom: 5,
  }),

  infoText: new Style<Label>({
    fontSize: 14,
    lineHeight: 20,
    color: Colors.textSecondary,
    marginTop: 5,
  }),
};
