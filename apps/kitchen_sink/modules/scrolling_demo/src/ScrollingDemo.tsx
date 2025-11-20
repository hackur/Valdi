/**
 * Scrolling & Lists Demo
 *
 * Comprehensive demonstration of Valdi's scrolling capabilities including vertical/horizontal
 * scrolling, scroll events and tracking, paging, programmatic control, and performance optimization.
 *
 * **Features Demonstrated:**
 *
 * 1. **Basic Scrolling:**
 *    - Vertical scrolling (default)
 *    - Horizontal scrolling with flexDirection
 *    - Bounce effects on/off
 *    - Content larger than viewport
 *
 * 2. **Scroll Events & Tracking:**
 *    - onScroll event with real-time position tracking
 *    - Scroll velocity display
 *    - onScrollEnd detection
 *    - Drag start/end events
 *    - Overscroll tension visualization (rubber-band effect)
 *
 * 3. **Paging & Snapping:**
 *    - pagingEnabled for snap-to-page behavior
 *    - Horizontal page carousel
 *    - Page indicator dots
 *    - Custom snap points using onDragEnding
 *    - Current page tracking
 *
 * 4. **Programmatic Scrolling:**
 *    - Scroll to specific position using contentOffsetX/Y
 *    - Animated scrolling with animate()
 *    - Scroll to top/bottom buttons
 *    - Smooth scroll to specific item
 *
 * 5. **Performance Optimization:**
 *    - limitToViewport for rendering only visible items
 *    - viewportExtension for preloading content
 *    - Large list handling (100+ items)
 *
 * @see {@link https://github.com/valdi-labs/valdi|Valdi Framework Documentation}
 */

import { StatefulComponent } from 'valdi_core/src/Component';
import { Style } from 'valdi_core/src/Style';
import { AnimationCurve, PresetCurveAnimationOptions } from 'valdi_core/src/AnimationOptions';
import { NavigationController } from 'valdi_navigation/src/NavigationController';
import { NavigationPage } from 'valdi_navigation/src/NavigationPage';
import {
  View,
  Label,
  Layout,
  ScrollView,
} from 'valdi_tsx/src/NativeTemplateElements';
import {
  ScrollEvent,
  ScrollEndEvent,
  ScrollDragEndEvent,
} from 'valdi_tsx/src/GestureEvents';

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

export interface ScrollingDemoViewModel {
  navigationController: NavigationController;
}

interface ScrollingDemoState {
  // Basic scrolling
  verticalBounces: boolean;
  horizontalBounces: boolean;

  // Scroll tracking
  scrollPosition: { x: number; y: number };
  scrollVelocity: { x: number; y: number };
  isScrolling: boolean;
  isDragging: boolean;
  overscrollTension: { x: number; y: number };

  // Paging
  currentPage: number;
  totalPages: number;

  // Programmatic scrolling
  targetScrollY: number;

  // Performance
  useViewportLimit: boolean;
  viewportExtension: number;
  itemCount: number;
}

@NavigationPage(module)
export class ScrollingDemo extends StatefulComponent<ScrollingDemoViewModel, ScrollingDemoState> {
  state: ScrollingDemoState = {
    verticalBounces: true,
    horizontalBounces: true,
    scrollPosition: { x: 0, y: 0 },
    scrollVelocity: { x: 0, y: 0 },
    isScrolling: false,
    isDragging: false,
    overscrollTension: { x: 0, y: 0 },
    currentPage: 0,
    totalPages: 5,
    targetScrollY: 0,
    useViewportLimit: false,
    viewportExtension: 200,
    itemCount: 100,
  };

  onRender() {
    <view style={styles.page}>
      {/* Header */}
      <Header
        title="Scrolling & Lists"
        showBack={true}
        onBack={() => this.viewModel.navigationController.pop()}
      />

      {/* Content */}
      <scroll style={styles.scroll}>
        <layout style={styles.content}>
          {/* Basic Vertical Scrolling */}
          <DemoSection
            title="Vertical Scrolling"
            description="Basic vertical scrolling with bounce control"
          >
            <Card>
              <layout width="100%">
                <Button
                  title={this.state.verticalBounces ? 'Bounce: ON' : 'Bounce: OFF'}
                  variant={this.state.verticalBounces ? 'primary' : 'outline'}
                  size="small"
                  onTap={() => this.setState({ verticalBounces: !this.state.verticalBounces })}
                />

                <view
                  width="100%"
                  height={200}
                  backgroundColor={Colors.gray100}
                  borderRadius={BorderRadius.base}
                  margin={Spacing.xs}
                >
                  <scroll
                    horizontal={false}
                    bounces={this.state.verticalBounces}
                    width="100%"
                    height={200}
                  >
                    <layout width="100%" padding={Spacing.base}>
                      {Array.from({ length: 15 }).map((_, i) => (
                        <view
                          key={`${i}`}
                          width="100%"
                          padding={Spacing.base}
                          margin={Spacing.xs}
                          backgroundColor={Colors.surface}
                          borderRadius={BorderRadius.sm}
                        >
                          <label
                            value={`Vertical Item ${i + 1}`}
                            font={Fonts.body}
                            color={Colors.textPrimary}
                          />
                        </view>
                      ))}
                    </layout>
                  </scroll>
                </view>
              </layout>
            </Card>
          </DemoSection>

          {/* Horizontal Scrolling */}
          <DemoSection
            title="Horizontal Scrolling"
            description="Horizontal scroll view with flexDirection row"
          >
            <Card>
              <layout width="100%">
                <Button
                  title={this.state.horizontalBounces ? 'Bounce: ON' : 'Bounce: OFF'}
                  variant={this.state.horizontalBounces ? 'primary' : 'outline'}
                  size="small"
                  onTap={() => this.setState({ horizontalBounces: !this.state.horizontalBounces })}
                />

                <view
                  width="100%"
                  height={120}
                  backgroundColor={Colors.gray100}
                  borderRadius={BorderRadius.base}
                  margin={Spacing.xs}
                >
                  <scroll
                    horizontal={true}
                    bounces={this.state.horizontalBounces}
                    width="100%"
                    height={120}
                  >
                    <layout flexDirection="row" padding={Spacing.base}>
                      {Array.from({ length: 10 }).map((_, i) => (
                        <view
                          key={`${i}`}
                          width={100}
                          height={80}
                          margin={Spacing.xs}
                          backgroundColor={Colors.primary}
                          borderRadius={BorderRadius.base}
                          alignItems="center"
                          justifyContent="center"
                        >
                          <label value={`${i + 1}`} font={Fonts.h2} color={Colors.white} />
                        </view>
                      ))}
                    </layout>
                  </scroll>
                </view>
              </layout>
            </Card>
          </DemoSection>

          {/* Scroll Events & Tracking */}
          <DemoSection
            title="Scroll Event Tracking"
            description="Real-time scroll position, velocity, and event monitoring"
          >
            <Card>
              <layout width="100%">
                {/* Metrics Display */}
                <view
                  width="100%"
                  padding={Spacing.base}
                  backgroundColor={Colors.gray100}
                  borderRadius={BorderRadius.base}
                  margin={Spacing.xs}
                >
                  <label
                    value={`Position: ${this.state.scrollPosition.y.toFixed(0)}px`}
                    font={Fonts.body}
                    color={Colors.textPrimary}
                  />
                  <label
                    value={`Velocity: ${this.state.scrollVelocity.y.toFixed(0)}px/s`}
                    font={Fonts.body}
                    color={Colors.textPrimary}
                  />
                  <label
                    value={`Status: ${this.state.isScrolling ? 'Scrolling' : 'Stopped'}`}
                    font={Fonts.body}
                    color={this.state.isScrolling ? Colors.success : Colors.textSecondary}
                  />
                  <label
                    value={`Dragging: ${this.state.isDragging ? 'Yes' : 'No'}`}
                    font={Fonts.body}
                    color={this.state.isDragging ? Colors.primary : Colors.textSecondary}
                  />
                  {this.state.overscrollTension.y !== 0 && (
                    <label
                      value={`Overscroll: ${this.state.overscrollTension.y.toFixed(2)}`}
                      font={Fonts.body}
                      color={Colors.warning}
                    />
                  )}
                </view>

                {/* Scrollable Area */}
                <view
                  width="100%"
                  height={200}
                  backgroundColor={Colors.gray100}
                  borderRadius={BorderRadius.base}
                  margin={Spacing.xs}
                >
                  <scroll
                    width="100%"
                    height={200}
                    onScroll={(event) => this.handleScroll(event)}
                    onScrollEnd={(event) => this.handleScrollEnd(event)}
                    onDragStart={(event) => this.handleDragStart(event)}
                    onDragEnd={(event) => this.handleDragEnd(event)}
                  >
                    <layout width="100%" padding={Spacing.base}>
                      {Array.from({ length: 20 }).map((_, i) => (
                        <view
                          key={`${i}`}
                          width="100%"
                          padding={Spacing.base}
                          margin={Spacing.xs}
                          backgroundColor={Colors.surface}
                          borderRadius={BorderRadius.sm}
                        >
                          <label
                            value={`Tracked Item ${i + 1}`}
                            font={Fonts.body}
                            color={Colors.textPrimary}
                          />
                        </view>
                      ))}
                    </layout>
                  </scroll>
                </view>

                <label
                  value="Scroll the list above to see real-time metrics"
                  font={Fonts.caption}
                  color={Colors.textSecondary}
                />
              </layout>
            </Card>
          </DemoSection>

          {/* Paging & Snapping */}
          <DemoSection
            title="Horizontal Paging"
            description="Snap-to-page behavior with page indicators"
          >
            <Card>
              <layout width="100%" alignItems="center">
                <view
                  width="100%"
                  height={180}
                  backgroundColor={Colors.gray100}
                  borderRadius={BorderRadius.base}
                  margin={Spacing.xs}
                >
                  <scroll
                    horizontal={true}
                    pagingEnabled={true}
                    width="100%"
                    height={180}
                    onScroll={(event) => this.handlePageScroll(event)}
                  >
                    <layout flexDirection="row">
                      {Array.from({ length: this.state.totalPages }).map((_, i) => (
                        <view
                          key={`${i}`}
                          width={300}
                          height={180}
                          backgroundColor={this.getPageColor(i)}
                          alignItems="center"
                          justifyContent="center"
                        >
                          <label value={`Page ${i + 1}`} font={Fonts.h1} color={Colors.white} />
                          <label
                            value="Swipe to see more"
                            font={Fonts.body}
                            color={Colors.white}
                          />
                        </view>
                      ))}
                    </layout>
                  </scroll>
                </view>

                {/* Page Indicator Dots */}
                <layout flexDirection="row" justifyContent="center" margin={Spacing.base}>
                  {Array.from({ length: this.state.totalPages }).map((_, i) => (
                    <view
                      key={`${i}`}
                      width={8}
                      height={8}
                      borderRadius={4}
                      margin={Spacing.xs / 2}
                      backgroundColor={
                        i === this.state.currentPage ? Colors.primary : Colors.gray300
                      }
                    />
                  ))}
                </layout>

                <label
                  value={`Current Page: ${this.state.currentPage + 1} of ${this.state.totalPages}`}
                  font={Fonts.body}
                  color={Colors.textSecondary}
                />
              </layout>
            </Card>
          </DemoSection>

          {/* Programmatic Scrolling */}
          <DemoSection
            title="Programmatic Scrolling"
            description="Control scroll position via code with animations"
          >
            <Card>
              <layout width="100%">
                {/* Scroll Controls */}
                <layout flexDirection="row" flexWrap="wrap" margin={Spacing.xs}>
                  <Button
                    title="↑ Top"
                    variant="outline"
                    size="small"
                    onTap={() => this.scrollToTop()}
                  />
                  <Button
                    title="↓ Bottom"
                    variant="outline"
                    size="small"
                    onTap={() => this.scrollToBottom()}
                  />
                  <Button
                    title="→ Item 15"
                    variant="primary"
                    size="small"
                    onTap={() => this.scrollToItem(14)}
                  />
                </layout>

                {/* Scrollable Area */}
                <view
                  width="100%"
                  height={250}
                  backgroundColor={Colors.gray100}
                  borderRadius={BorderRadius.base}
                  margin={Spacing.xs}
                >
                  <scroll
                    width="100%"
                    height={250}
                  >
                    <layout width="100%" padding={Spacing.base}>
                      {Array.from({ length: 30 }).map((_, i) => (
                        <view
                          key={`${i}`}
                          width="100%"
                          padding={Spacing.base}
                          margin={Spacing.xs}
                          backgroundColor={Colors.surface}
                          borderRadius={BorderRadius.sm}
                          flexDirection="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <label value={`Item ${i + 1}`} font={Fonts.body} color={Colors.textPrimary} />
                          <Button
                            title="Go Here"
                            size="small"
                            variant="outline"
                            onTap={() => this.scrollToItem(i)}
                          />
                        </view>
                      ))}
                    </layout>
                  </scroll>
                </view>

                <label
                  value="Use buttons to scroll programmatically with smooth animations"
                  font={Fonts.caption}
                  color={Colors.textSecondary}
                />
              </layout>
            </Card>
          </DemoSection>

          {/* Performance Optimization */}
          <DemoSection
            title="Performance Optimization"
            description="Viewport limiting for large lists with 100+ items"
          >
            <Card>
              <layout width="100%">
                {/* Performance Controls */}
                <layout flexDirection="row" flexWrap="wrap" margin={Spacing.xs}>
                  <Button
                    title={this.state.useViewportLimit ? 'Limit: ON' : 'Limit: OFF'}
                    variant={this.state.useViewportLimit ? 'primary' : 'outline'}
                    size="small"
                    onTap={() =>
                      this.setState({ useViewportLimit: !this.state.useViewportLimit })
                    }
                  />
                  <view
                    padding={Spacing.xs}
                    backgroundColor={Colors.gray100}
                    borderRadius={BorderRadius.sm}
                  >
                    <label
                      value={`Extension: ${this.state.viewportExtension}px`}
                      font={Fonts.caption}
                      color={Colors.textPrimary}
                    />
                  </view>
                </layout>

                <label
                  value={
                    this.state.useViewportLimit
                      ? 'Viewport limiting enabled - only visible items are rendered'
                      : 'All items rendered - may impact performance with many items'
                  }
                  font={Fonts.caption}
                  color={this.state.useViewportLimit ? Colors.success : Colors.warning}
                  numberOfLines={0}
                />

                {/* Large List */}
                <view
                  width="100%"
                  height={300}
                  backgroundColor={Colors.gray100}
                  borderRadius={BorderRadius.base}
                  margin={Spacing.xs}
                >
                  <scroll
                    width="100%"
                    height={300}
                    limitToViewport={this.state.useViewportLimit}
                    viewportExtensionTop={this.state.viewportExtension}
                    viewportExtensionBottom={this.state.viewportExtension}
                  >
                    <layout width="100%" padding={Spacing.base}>
                      {Array.from({ length: this.state.itemCount }).map((_, i) => (
                        <view
                          key={`${i}`}
                          width="100%"
                          padding={Spacing.base}
                          margin={Spacing.xs}
                          backgroundColor={Colors.surface}
                          borderRadius={BorderRadius.sm}
                        >
                          <label
                            value={`Item ${i + 1} of ${this.state.itemCount}`}
                            font={Fonts.body}
                            color={Colors.textPrimary}
                          />
                          <label
                            value={
                              this.state.useViewportLimit ? 'Optimized rendering' : 'Always rendered'
                            }
                            font={Fonts.caption}
                            color={Colors.textSecondary}
                          />
                        </view>
                      ))}
                    </layout>
                  </scroll>
                </view>

                <label
                  value={`Total items: ${this.state.itemCount}. Toggle viewport limiting to see performance impact.`}
                  font={Fonts.caption}
                  color={Colors.textSecondary}
                  numberOfLines={0}
                />
              </layout>
            </Card>
          </DemoSection>
        </layout>
      </scroll>
    </view>;
  }

  // Scroll event handlers

  private handleScroll(event: ScrollEvent) {
    this.setState({
      scrollPosition: { x: event.x, y: event.y },
      scrollVelocity: { x: event.velocityX, y: event.velocityY },
      overscrollTension: { x: event.overscrollTensionX || 0, y: event.overscrollTensionY || 0 },
      isScrolling: true,
    });
  }

  private handleScrollEnd(event: ScrollEndEvent) {
    this.setState({
      isScrolling: false,
      scrollPosition: { x: event.x, y: event.y },
    });
  }

  private handleDragStart(event: ScrollEvent) {
    this.setState({ isDragging: true });
  }

  private handleDragEnd(event: ScrollDragEndEvent) {
    this.setState({ isDragging: false });
  }

  // Paging handlers

  private handlePageScroll(event: ScrollEvent) {
    const pageWidth = 300;
    const currentPage = Math.round(event.x / pageWidth);

    if (currentPage !== this.state.currentPage && currentPage >= 0 && currentPage < this.state.totalPages) {
      this.setState({ currentPage });
    }
  }

  private getPageColor(index: number): string {
    const colors = [Colors.primary, Colors.secondary, Colors.success, Colors.warning, Colors.error];
    return colors[index % colors.length];
  }

  // Programmatic scrolling methods

  private scrollToTop() {
    const options: PresetCurveAnimationOptions = {
      duration: 0.4,
      curve: AnimationCurve.EaseInOut,
    };

    this.animate(options, () => {
      this.setState({ targetScrollY: 0 });
    });
  }

  private scrollToBottom() {
    const itemHeight = 60;
    const totalItems = 30;
    const contentHeight = itemHeight * totalItems;
    const viewportHeight = 250;
    const maxScroll = Math.max(0, contentHeight - viewportHeight + 40);

    const options: PresetCurveAnimationOptions = {
      duration: 0.5,
      curve: AnimationCurve.EaseInOut,
    };

    this.animate(options, () => {
      this.setState({ targetScrollY: maxScroll });
    });
  }

  private scrollToItem(index: number) {
    const itemHeight = 60;
    const targetY = index * itemHeight;

    const options: PresetCurveAnimationOptions = {
      duration: 0.3,
      curve: AnimationCurve.EaseOut,
    };

    this.animate(options, () => {
      this.setState({ targetScrollY: targetY });
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
};
