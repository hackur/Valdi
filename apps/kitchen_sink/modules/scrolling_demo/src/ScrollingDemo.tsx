/**
 * Scrolling & Lists Demo (Placeholder)
 *
 * This placeholder page explains what will be demonstrated when the
 * Scrolling & Lists demo is fully implemented.
 *
 * **Planned Features:**
 *
 * 1. **Scroll Views:**
 *    - Vertical scrolling
 *    - Horizontal scrolling
 *    - Nested scroll views
 *    - Scroll momentum and bounce effects
 *
 * 2. **Scroll Interaction:**
 *    - Pull-to-refresh functionality
 *    - Scroll position tracking
 *    - Scroll-to-top button
 *    - Programmatic scrolling
 *
 * 3. **Performance:**
 *    - Virtual scrolling / list virtualization
 *    - Lazy loading content
 *    - Scroll performance optimization
 *
 * 4. **Advanced Features:**
 *    - Sticky headers
 *    - Parallax scrolling effects
 *    - Infinite scrolling
 *
 * **Estimated Implementation Effort:** 6-8 hours
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
 * Placeholder component explaining the planned Scrolling & Lists demo features.
 */
@NavigationPage(module)
export class ScrollingDemo extends Component {
  onRender() {
    <view style={styles.page}>
      {/* Header */}
      <view style={styles.header}>
        <label style={styles.backButton} value="← Back" onTap={() => this.viewModel.navigationController.pop()} />
        <label style={styles.headerTitle} value="📜 Scrolling & Lists" />
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
            value="This demo will showcase advanced scrolling techniques, including vertical and horizontal scrolling, nested scroll views, pull-to-refresh, and virtual list rendering for optimal performance."
            numberOfLines={0}
          />

          {/* Planned Features Section */}
          <label style={styles.sectionTitle} value="Planned Features" />

          <DemoCard
            title="Scroll Views"
            description="Vertical, horizontal, nested scrolling with momentum and bounce effects"
            color={Colors.primary}
          />

          <DemoCard
            title="Scroll Interaction"
            description="Pull-to-refresh, position tracking, scroll-to-top, programmatic scrolling"
            color={Colors.secondary}
          />

          <DemoCard
            title="Performance Optimization"
            description="Virtual scrolling, lazy loading, list virtualization techniques"
            color={Colors.accent}
          />

          <DemoCard
            title="Advanced Features"
            description="Sticky headers, parallax effects, infinite scrolling"
            color={Colors.success}
          />

          {/* Implementation Info */}
          <label style={styles.sectionTitle} value="Implementation Status" />
          <label
            style={styles.infoText}
            value="Estimated implementation effort: 6-8 hours"
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
