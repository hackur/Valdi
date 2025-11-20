/**
 * Dynamic Lists Demo
 *
 * Comprehensive demonstration of Valdi's list rendering and manipulation capabilities.
 * Shows forEach iteration, dynamic operations, filtering, sorting, and performance optimization.
 *
 * **Features Demonstrated:**
 *
 * 1. **Array Operations:**
 *    - Add items to start/end of list
 *    - Remove items from list
 *    - Immutable state updates
 *    - forEach with keys for efficient rendering
 *
 * 2. **Search & Filter:**
 *    - Real-time search with case-insensitive matching
 *    - Filter by category
 *    - Combined search and filter
 *
 * 3. **Sorting:**
 *    - Sort by title or date
 *    - Ascending/descending order
 *    - Maintain sort across operations
 *
 * 4. **Large Lists:**
 *    - Handling 100+ items
 *    - Optional viewport limiting for performance
 *    - Scroll position preservation
 *
 * @see {@link https://github.com/valdi-labs/valdi|Valdi Framework Documentation}
 */

import { StatefulComponent } from 'valdi_core/src/Component';
import { Style } from 'valdi_core/src/Style';
import { NavigationController } from 'valdi_navigation/src/NavigationController';
import { NavigationPage } from 'valdi_navigation/src/NavigationPage';
import { View, Label, Layout, ScrollView, TextField } from 'valdi_tsx/src/NativeTemplateElements';

import {
  Colors,
  Fonts,
  Spacing,
  BorderRadius,
  Header,
  DemoSection,
  Card,
  Button,
} from '../../common/src/index';

export interface ListsDemoViewModel {
  navigationController: NavigationController;
}

interface ListItem {
  id: string;
  title: string;
  description: string;
  category: 'work' | 'personal' | 'urgent';
  date: Date;
  completed: boolean;
}

type SortField = 'title' | 'date';
type SortOrder = 'asc' | 'desc';
type FilterCategory = 'all' | 'work' | 'personal' | 'urgent';

interface ListsDemoState {
  // Array operations
  items: ListItem[];
  itemCounter: number;

  // Search & filter
  searchQuery: string;
  filterCategory: FilterCategory;

  // Sorting
  sortField: SortField;
  sortOrder: SortOrder;

  // Large lists
  largeListItems: ListItem[];
  limitViewport: boolean;
  viewportLimit: number;
}

@NavigationPage(module)
export class ListsDemo extends StatefulComponent<ListsDemoViewModel, ListsDemoState> {
  state: ListsDemoState = {
    items: this.createSampleItems(),
    itemCounter: 5,
    searchQuery: '',
    filterCategory: 'all',
    sortField: 'date',
    sortOrder: 'desc',
    largeListItems: this.createLargeList(100),
    limitViewport: false,
    viewportLimit: 20,
  };

  onRender() {
    const filteredItems = this.getFilteredAndSortedItems();
    const displayedLargeList = this.state.limitViewport
      ? this.state.largeListItems.slice(0, this.state.viewportLimit)
      : this.state.largeListItems;

    <view style={styles.page}>
      {/* Header */}
      <Header
        title="Dynamic Lists"
        showBack={true}
        onBack={() => this.viewModel.navigationController.pop()}
      />

      {/* Content */}
      <scroll style={styles.scroll}>
        <layout style={styles.content}>
          {/* Array Operations */}
          <DemoSection
            title="Array Operations"
            description="Add and remove items dynamically with immutable state updates"
          >
            <Card>
              <layout width="100%">
                {/* Action buttons */}
                <layout flexDirection="row" flexWrap="wrap">
                  <Button
                    title="Add to Start"
                    variant="primary"
                    size="small"
                    onTap={() => this.addItemToStart()}
                  />
                  <Button
                    title="Add to End"
                    variant="primary"
                    size="small"
                    onTap={() => this.addItemToEnd()}
                  />
                  <Button
                    title="Remove First"
                    variant="outline"
                    size="small"
                    onTap={() => this.removeFirstItem()}
                    disabled={this.state.items.length === 0}
                  />
                  <Button
                    title="Clear All"
                    variant="outline"
                    size="small"
                    onTap={() => this.clearAllItems()}
                    disabled={this.state.items.length === 0}
                  />
                </layout>

                {/* Item count */}
                <label
                  value={`Total items: ${this.state.items.length}`}
                  font={Fonts.body}
                  color={Colors.textSecondary}
                />

                {/* List rendering with forEach */}
                <layout width="100%">
                  {this.state.items.length === 0 ? (
                    <view style={styles.emptyState}>
                      <label
                        value="No items yet. Add some items to get started!"
                        font={Fonts.body}
                        color={Colors.textSecondary}
                        textAlign="center"
                      />
                    </view>
                  ) : (
                    this.state.items.map((item) => (
                      <view key={item.id} style={styles.listItem}>
                        <layout width="100%">
                          <label value={item.title} font={Fonts.label} />
                          <label
                            value={item.description}
                            font={Fonts.caption}
                            color={Colors.textSecondary}
                          />
                        </layout>
                        <Button
                          title="Remove"
                          variant="outline"
                          size="small"
                          onTap={() => this.removeItem(item.id)}
                        />
                      </view>
                    ))
                  )}
                </layout>
              </layout>
            </Card>
          </DemoSection>

          {/* Search & Filter */}
          <DemoSection
            title="Search & Filter"
            description="Search by text and filter by category in real-time"
          >
            <Card>
              <layout width="100%">
                {/* Search input */}
                <layout width="100%">
                  <label value="Search:" font={Fonts.body} />
                  <textfield
                    width="100%"
                    height={40}
                    value={this.state.searchQuery}
                    placeholder="Type to search..."
                    onChange={(event) => this.setState({ searchQuery: event.text })}
                    style={styles.input}
                  />
                </layout>

                {/* Category filter */}
                <layout width="100%">
                  <label value="Filter by category:" font={Fonts.body} />
                  <layout flexDirection="row" flexWrap="wrap">
                    <Button
                      title="All"
                      variant={this.state.filterCategory === 'all' ? 'primary' : 'outline'}
                      size="small"
                      onTap={() => this.setState({ filterCategory: 'all' })}
                    />
                    <Button
                      title="Work"
                      variant={this.state.filterCategory === 'work' ? 'primary' : 'outline'}
                      size="small"
                      onTap={() => this.setState({ filterCategory: 'work' })}
                    />
                    <Button
                      title="Personal"
                      variant={this.state.filterCategory === 'personal' ? 'primary' : 'outline'}
                      size="small"
                      onTap={() => this.setState({ filterCategory: 'personal' })}
                    />
                    <Button
                      title="Urgent"
                      variant={this.state.filterCategory === 'urgent' ? 'primary' : 'outline'}
                      size="small"
                      onTap={() => this.setState({ filterCategory: 'urgent' })}
                    />
                  </layout>
                </layout>

                {/* Results count */}
                <label
                  value={`Showing ${filteredItems.length} of ${this.state.items.length} items`}
                  font={Fonts.caption}
                  color={Colors.textSecondary}
                />

                {/* Filtered results */}
                <layout width="100%">
                  {filteredItems.length === 0 ? (
                    <view style={styles.emptyState}>
                      <label
                        value="No items match your search/filter criteria"
                        font={Fonts.body}
                        color={Colors.textSecondary}
                        textAlign="center"
                      />
                    </view>
                  ) : (
                    filteredItems.map((item) => (
                      <view key={item.id} style={styles.listItem}>
                        <layout width="100%">
                          <label value={item.title} font={Fonts.label} />
                          <label
                            value={item.description}
                            font={Fonts.caption}
                            color={Colors.textSecondary}
                          />
                          <view style={this.getCategoryBadgeStyle(item.category)}>
                            <label
                              value={item.category.toUpperCase()}
                              font={Fonts.caption}
                              color={Colors.white}
                            />
                          </view>
                        </layout>
                      </view>
                    ))
                  )}
                </layout>
              </layout>
            </Card>
          </DemoSection>

          {/* Sorting */}
          <DemoSection title="Sorting" description="Sort items by different fields and orders">
            <Card>
              <layout width="100%">
                {/* Sort field selector */}
                <layout width="100%">
                  <label value="Sort by:" font={Fonts.body} />
                  <layout flexDirection="row" flexWrap="wrap">
                    <Button
                      title="Title"
                      variant={this.state.sortField === 'title' ? 'primary' : 'outline'}
                      size="small"
                      onTap={() => this.setState({ sortField: 'title' })}
                    />
                    <Button
                      title="Date"
                      variant={this.state.sortField === 'date' ? 'primary' : 'outline'}
                      size="small"
                      onTap={() => this.setState({ sortField: 'date' })}
                    />
                  </layout>
                </layout>

                {/* Sort order selector */}
                <layout width="100%">
                  <label value="Order:" font={Fonts.body} />
                  <layout flexDirection="row" flexWrap="wrap">
                    <Button
                      title="Ascending ↑"
                      variant={this.state.sortOrder === 'asc' ? 'primary' : 'outline'}
                      size="small"
                      onTap={() => this.setState({ sortOrder: 'asc' })}
                    />
                    <Button
                      title="Descending ↓"
                      variant={this.state.sortOrder === 'desc' ? 'primary' : 'outline'}
                      size="small"
                      onTap={() => this.setState({ sortOrder: 'desc' })}
                    />
                  </layout>
                </layout>

                {/* Sorted list */}
                <layout width="100%">
                  {filteredItems.map((item, index) => (
                    <view key={item.id} style={styles.listItem}>
                      <label
                        value={`#${index + 1}`}
                        font={Fonts.label}
                        color={Colors.primary}
                        width={40}
                      />
                      <layout>
                        <label value={item.title} font={Fonts.label} />
                        <label
                          value={this.formatDate(item.date)}
                          font={Fonts.caption}
                          color={Colors.textSecondary}
                        />
                      </layout>
                    </view>
                  ))}
                </layout>
              </layout>
            </Card>
          </DemoSection>

          {/* Large Lists */}
          <DemoSection
            title="Large Lists Performance"
            description="Handling large datasets with optional viewport limiting"
          >
            <Card>
              <layout width="100%">
                {/* List info */}
                <label
                  value={`Total items in list: ${this.state.largeListItems.length}`}
                  font={Fonts.body}
                />

                {/* Viewport limiting toggle */}
                <layout flexDirection="row" alignItems="center">
                  <label value="Limit viewport:" font={Fonts.body} />
                  <Button
                    title={this.state.limitViewport ? 'ON' : 'OFF'}
                    variant={this.state.limitViewport ? 'primary' : 'outline'}
                    size="small"
                    onTap={() => this.setState({ limitViewport: !this.state.limitViewport })}
                  />
                </layout>

                {this.state.limitViewport && (
                  <label
                    value={`Showing first ${this.state.viewportLimit} items for performance`}
                    font={Fonts.caption}
                    color={Colors.warning}
                  />
                )}

                {/* Large list rendering */}
                <view style={styles.largeListContainer}>
                  <scroll style={styles.largeListScroll}>
                    <layout width="100%">
                      {displayedLargeList.map((item, index) => (
                        <view key={item.id} style={styles.compactListItem}>
                          <label
                            value={`${index + 1}. ${item.title}`}
                            font={Fonts.body}
                            numberOfLines={1}
                          />
                        </view>
                      ))}
                    </layout>
                  </scroll>
                </view>

                {/* Performance info */}
                <view style={styles.infoBox}>
                  <label
                    value={
                      this.state.limitViewport
                        ? 'Viewport limiting improves render performance by only displaying a subset of items.'
                        : 'All items are rendered. For very large lists, consider enabling viewport limiting.'
                    }
                    font={Fonts.caption}
                    color={Colors.textSecondary}
                    numberOfLines={0}
                  />
                </view>
              </layout>
            </Card>
          </DemoSection>

          {/* Advanced Operations */}
          <DemoSection
            title="Advanced Operations"
            description="Batch operations and item updates"
          >
            <Card>
              <layout width="100%">
                {/* Batch operations */}
                <label value="Batch Actions:" font={Fonts.body} />
                <layout flexDirection="row" flexWrap="wrap">
                  <Button
                    title="Mark All Complete"
                    variant="outline"
                    size="small"
                    onTap={() => this.markAllComplete(true)}
                  />
                  <Button
                    title="Mark All Incomplete"
                    variant="outline"
                    size="small"
                    onTap={() => this.markAllComplete(false)}
                  />
                  <Button
                    title="Remove Completed"
                    variant="outline"
                    size="small"
                    onTap={() => this.removeCompleted()}
                  />
                </layout>

                {/* Statistics */}
                <view style={styles.statsBox}>
                  <label value="Statistics:" font={Fonts.label} />
                  <label
                    value={`Total: ${this.state.items.length}`}
                    font={Fonts.caption}
                    color={Colors.textSecondary}
                  />
                  <label
                    value={`Completed: ${this.state.items.filter((i) => i.completed).length}`}
                    font={Fonts.caption}
                    color={Colors.success}
                  />
                  <label
                    value={`Pending: ${this.state.items.filter((i) => !i.completed).length}`}
                    font={Fonts.caption}
                    color={Colors.warning}
                  />
                </view>

                {/* List with completion status */}
                <layout width="100%">
                  {this.state.items.map((item) => (
                    <view key={item.id} style={styles.listItem}>
                      <layout flexDirection="row" alignItems="center">
                        <view
                          width={20}
                          height={20}
                          borderRadius={10}
                          borderWidth={2}
                          borderColor={item.completed ? Colors.success : Colors.gray300}
                          backgroundColor={item.completed ? Colors.success : 'transparent'}
                          marginRight={Spacing.sm}
                          onTap={() => this.toggleItemComplete(item.id)}
                        >
                          {item.completed && (
                            <label value="✓" font={Fonts.caption} color={Colors.white} />
                          )}
                        </view>
                        <layout>
                          <label
                            value={item.title}
                            font={Fonts.body}
                            color={item.completed ? Colors.textSecondary : Colors.textPrimary}
                          />
                        </layout>
                      </layout>
                    </view>
                  ))}
                </layout>
              </layout>
            </Card>
          </DemoSection>
        </layout>
      </scroll>
    </view>;
  }

  // Array operation methods

  private addItemToStart() {
    const newItem: ListItem = {
      id: `item-${this.state.itemCounter}`,
      title: `Task ${this.state.itemCounter}`,
      description: 'Added to start of list',
      category: this.getRandomCategory(),
      date: new Date(),
      completed: false,
    };

    this.setState({
      items: [newItem, ...this.state.items],
      itemCounter: this.state.itemCounter + 1,
    });
  }

  private addItemToEnd() {
    const newItem: ListItem = {
      id: `item-${this.state.itemCounter}`,
      title: `Task ${this.state.itemCounter}`,
      description: 'Added to end of list',
      category: this.getRandomCategory(),
      date: new Date(),
      completed: false,
    };

    this.setState({
      items: [...this.state.items, newItem],
      itemCounter: this.state.itemCounter + 1,
    });
  }

  private removeItem(id: string) {
    this.setState({
      items: this.state.items.filter((item) => item.id !== id),
    });
  }

  private removeFirstItem() {
    if (this.state.items.length > 0) {
      this.setState({
        items: this.state.items.slice(1),
      });
    }
  }

  private clearAllItems() {
    this.setState({ items: [] });
  }

  private toggleItemComplete(id: string) {
    this.setState({
      items: this.state.items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    });
  }

  private markAllComplete(completed: boolean) {
    this.setState({
      items: this.state.items.map((item) => ({ ...item, completed }))
    });
  }

  private removeCompleted() {
    this.setState({
      items: this.state.items.filter((item) => !item.completed),
    });
  }

  // Filter and sort methods

  private getFilteredAndSortedItems(): ListItem[] {
    let filtered = this.state.items;

    // Apply search filter
    if (this.state.searchQuery) {
      const query = this.state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (this.state.filterCategory !== 'all') {
      filtered = filtered.filter((item) => item.category === this.state.filterCategory);
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0;

      if (this.state.sortField === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else if (this.state.sortField === 'date') {
        comparison = a.date.getTime() - b.date.getTime();
      }

      return this.state.sortOrder === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }

  // Helper methods

  private createSampleItems(): ListItem[] {
    return [
      {
        id: 'item-0',
        title: 'Review pull request',
        description: 'Code review for authentication module',
        category: 'work',
        date: new Date(2025, 0, 15),
        completed: false,
      },
      {
        id: 'item-1',
        title: 'Update documentation',
        description: 'Add API documentation for new endpoints',
        category: 'work',
        date: new Date(2025, 0, 16),
        completed: true,
      },
      {
        id: 'item-2',
        title: 'Fix critical bug',
        description: 'Memory leak in image processing',
        category: 'urgent',
        date: new Date(2025, 0, 14),
        completed: false,
      },
      {
        id: 'item-3',
        title: 'Buy groceries',
        description: 'Weekly shopping trip',
        category: 'personal',
        date: new Date(2025, 0, 17),
        completed: false,
      },
      {
        id: 'item-4',
        title: 'Team meeting',
        description: 'Sprint planning session',
        category: 'work',
        date: new Date(2025, 0, 18),
        completed: false,
      },
    ];
  }

  private createLargeList(count: number): ListItem[] {
    const items: ListItem[] = [];
    const categories: Array<'work' | 'personal' | 'urgent'> = ['work', 'personal', 'urgent'];

    for (let i = 0; i < count; i++) {
      items.push({
        id: `large-item-${i}`,
        title: `Item ${i + 1}`,
        description: `Description for item ${i + 1}`,
        category: categories[i % categories.length],
        date: new Date(2025, 0, 1 + (i % 30)),
        completed: i % 3 === 0,
      });
    }

    return items;
  }

  private getRandomCategory(): 'work' | 'personal' | 'urgent' {
    const categories: Array<'work' | 'personal' | 'urgent'> = ['work', 'personal', 'urgent'];
    return categories[Math.floor(Math.random() * categories.length)];
  }

  private getCategoryBadgeStyle(category: 'work' | 'personal' | 'urgent'): Style<View> {
    const colors = {
      work: Colors.primary,
      personal: Colors.secondary,
      urgent: Colors.error,
    };

    return new Style<View>({
      paddingLeft: Spacing.xs,
      paddingRight: Spacing.xs,
      paddingTop: 2,
      paddingBottom: 2,
      borderRadius: BorderRadius.sm,
      backgroundColor: colors[category],
      alignSelf: 'flex-start',
      marginTop: 4,
    });
  }

  private formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}

const styles = {
  page: new Style<View>({
    width: '100%',
    height: '100%',
    backgroundColor: Colors.background,
  }),

  scroll: new Style<ScrollView>({
    width: '100%',
    height: '100%',
  }),

  content: new Style<Layout>({
    width: '100%',
    padding: Spacing.base,
  }),

  input: new Style<TextField>({
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray300,
    borderRadius: BorderRadius.base,
  }),

  listItem: new Style<View>({
    width: '100%',
    padding: Spacing.sm,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.base,
    marginBottom: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.gray200,
    flexDirection: 'row',
    alignItems: 'center',
  }),

  compactListItem: new Style<View>({
    width: '100%',
    padding: Spacing.xs,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray100,
  }),

  emptyState: new Style<View>({
    width: '100%',
    padding: Spacing.xl,
    backgroundColor: Colors.gray50,
    borderRadius: BorderRadius.base,
    alignItems: 'center',
    justifyContent: 'center',
  }),

  largeListContainer: new Style<View>({
    width: '100%',
    height: 300,
    backgroundColor: Colors.gray50,
    borderRadius: BorderRadius.base,
    borderWidth: 1,
    borderColor: Colors.gray200,
  }),

  largeListScroll: new Style<ScrollView>({
    width: '100%',
    height: '100%',
  }),

  infoBox: new Style<View>({
    width: '100%',
    padding: Spacing.sm,
    backgroundColor: Colors.gray50,
    borderRadius: BorderRadius.base,
    borderWidth: 3,
    borderColor: Colors.primary,
  }),

  statsBox: new Style<View>({
    width: '100%',
    padding: Spacing.sm,
    backgroundColor: Colors.gray50,
    borderRadius: BorderRadius.base,
  }),
};
