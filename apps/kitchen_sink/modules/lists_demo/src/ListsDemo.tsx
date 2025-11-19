/**
 * Dynamic Lists Demo (Placeholder)
 *
 * This placeholder page explains what will be demonstrated when the
 * Dynamic Lists demo is fully implemented.
 *
 * **Planned Features:**
 *
 * 1. **List Rendering:**
 *    - forEach for list iteration (already shown in HomePage!)
 *    - Keyed list items for efficient updates
 *    - Nested lists
 *    - Conditional list items
 *
 * 2. **List Operations:**
 *    - Add items dynamically
 *    - Remove items
 *    - Reorder items (drag-and-drop)
 *    - Update existing items
 *
 * 3. **List Filtering & Sorting:**
 *    - Filter list by criteria
 *    - Sort ascending/descending
 *    - Search/filter as you type
 *    - Multiple filter conditions
 *
 * 4. **Performance:**
 *    - List virtualization for large datasets
 *    - Pagination
 *    - Infinite scrolling
 *    - Lazy loading list items
 *
 * 5. **Interactive Lists:**
 *    - Selectable list items
 *    - Multi-select with checkboxes
 *    - Expandable/collapsible list items
 *    - Swipe actions on list items
 *
 * **Estimated Implementation Effort:** 6-8 hours
 *
 * **References:**
 * @see {@link https://github.com/valdi-labs/valdi|Valdi Framework Documentation}
 *
 * **Note:**
 * The HomePage already demonstrates basic list rendering with forEach!
 * This demo will expand on that with advanced features.
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
 * Placeholder component explaining the planned Dynamic Lists demo features.
 */
@NavigationPage(module)
export class ListsDemo extends Component {
  onRender() {
    <view style={styles.page}>
      {/* Header */}
      <view style={styles.header}>
        <label style={styles.backButton} value="← Back" onTap={() => this.viewModel.navigationController.pop()} />
        <label style={styles.headerTitle} value="📊 Dynamic Lists" />
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
            value="This demo will showcase advanced list rendering and manipulation in Valdi, including dynamic operations, filtering, sorting, virtualization, and interactive features. (Basic forEach is already shown in HomePage!)"
            numberOfLines={0}
          />

          {/* Planned Features Section */}
          <label style={styles.sectionTitle} value="Planned Features" />

          <DemoCard
            title="List Rendering"
            description="forEach iteration, keyed items, nested lists, conditional rendering"
            color={Colors.primary}
          />

          <DemoCard
            title="List Operations"
            description="Add, remove, reorder (drag-and-drop), update items dynamically"
            color={Colors.secondary}
          />

          <DemoCard
            title="Filtering & Sorting"
            description="Filter by criteria, sort, search-as-you-type, multiple conditions"
            color={Colors.accent}
          />

          <DemoCard
            title="Performance Optimization"
            description="Virtualization, pagination, infinite scroll, lazy loading"
            color={Colors.success}
          />

          <DemoCard
            title="Interactive Lists"
            description="Selectable items, multi-select, expandable items, swipe actions"
            color={Colors.error}
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
