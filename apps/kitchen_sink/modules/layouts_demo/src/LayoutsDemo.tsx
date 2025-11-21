/**
 * Layouts & Flexbox Demo
 *
 * Comprehensive demonstration of Valdi's layout system using the <layout> and <view> elements
 * with flexbox positioning. Shows the fundamental building blocks for creating responsive,
 * flexible user interfaces.
 *
 * **Features Demonstrated:**
 *
 * 1. **Layout vs View:**
 *    - <layout> - Memory-only container (no native view created)
 *    - <view> - Creates native UIView/View with full styling support
 *    - Performance implications and when to use each
 *
 * 2. **Flexbox Direction:**
 *    - row - Horizontal layout (left to right)
 *    - column - Vertical layout (top to bottom)
 *    - row-reverse - Horizontal reversed (right to left)
 *    - column-reverse - Vertical reversed (bottom to top)
 *
 * 3. **Justify Content (Main Axis):**
 *    - flex-start - Items packed at start
 *    - center - Items centered
 *    - flex-end - Items packed at end
 *    - space-between - Items evenly distributed, first at start, last at end
 *    - space-around - Items evenly distributed with equal space around them
 *    - space-evenly - Items distributed with equal space between them
 *
 * 4. **Align Items (Cross Axis):**
 *    - flex-start - Items aligned at start of cross axis
 *    - center - Items centered on cross axis
 *    - flex-end - Items aligned at end of cross axis
 *    - stretch - Items stretched to fill cross axis
 *
 * 5. **Flex Grow/Shrink:**
 *    - flexGrow - How much an item should grow relative to siblings
 *    - flexShrink - How much an item should shrink when space is limited
 *
 * **Key Concepts:**
 *
 * **Main Axis vs Cross Axis:**
 * - In flexDirection="row", main axis is horizontal, cross axis is vertical
 * - In flexDirection="column", main axis is vertical, cross axis is horizontal
 * - justifyContent controls main axis, alignItems controls cross axis
 *
 * **Performance Tips:**
 * - Use <layout> when you only need positioning (no visual styling)
 * - Use <view> when you need backgroundColor, borders, shadows, etc.
 * - <layout> is more performant as it doesn't create a native view
 *
 * **Common Patterns:**
 * - Center content: justifyContent="center" alignItems="center"
 * - Sidebar layout: flexDirection="row" with fixed + flexGrow children
 * - Header/Content/Footer: flexDirection="column" with fixed + flexGrow sections
 *
 * **Valdi vs CSS Flexbox:**
 * - Most CSS flexbox properties work the same way
 * - No 'gap' property - use margins on children instead
 * - Use 'flexGrow' instead of 'flex' shorthand
 *
 * @see {@link https://github.com/valdi-labs/valdi|Valdi Framework Documentation}
 */

import { StatefulComponent } from 'valdi_core/src/Component';
import { Style } from 'valdi_core/src/Style';
import { NavigationController } from 'valdi_navigation/src/NavigationController';
import { NavigationPageComponent } from 'valdi_navigation/src/NavigationPageComponent';
import { NavigationPage } from 'valdi_navigation/src/NavigationPage';
import { View, Label, Layout, ScrollView } from 'valdi_tsx/src/NativeTemplateElements';

import {
  Colors,
  Fonts,
  Spacing,
  BorderRadius,
  Header,
  DemoSection,
  Card,
  CodeBlock,
} from '../../common/src/index';

export interface LayoutsDemoViewModel {
  navigationController: NavigationController;
}

@NavigationPage(module)
export class LayoutsDemo extends NavigationPageComponent<LayoutsDemoViewModel> {
  onRender() {
    <view style={styles.page}>
      {/* Header */}
      <Header
        title="Layouts & Flexbox"
        showBack={true}
        onBack={() => this.viewModel.navigationController.pop()}
      />

      {/* Content */}
      <scroll style={styles.scroll}>
        <layout style={styles.content}>
          {/* Layout vs View */}
          <DemoSection
            title="<layout> vs <view>"
            description="<layout> is memory-only (no native view), <view> creates a native view. Use <layout> for better performance when you don't need visual styling."
          >
            <Card>
              <layout width="100%">
                {/* Example with layout */}
                <view
                  width="100%"
                  padding={Spacing.base}
                  backgroundColor={Colors.gray100}
                  borderRadius={BorderRadius.sm}
                >
                  <label
                    font={Fonts.caption}
                    color={Colors.textSecondary}
                    value="<layout> - Memory only, no native view (shown in styled view for visibility)"
                  />
                </view>

                {/* Example with view */}
                <view
                  width="100%"
                  padding={Spacing.base}
                  backgroundColor={Colors.primary}
                  borderRadius={BorderRadius.sm}
                  boxShadow={`0 2 8 ${Colors.overlayLight}`}
                >
                  <label
                    font={Fonts.caption}
                    color={Colors.white}
                    value="<view> - Creates native UIView/View with styling"
                  />
                </view>
              </layout>
            </Card>
          </DemoSection>

          {/* Flexbox Direction */}
          <DemoSection
            title="Flex Direction"
            description="Control the main axis direction of flex items"
          >
            <Card>
              <layout width="100%">
                {/* Row */}
                <layout width="100%">
                  <label
                    font={Fonts.labelSmall}
                    color={Colors.textSecondary}
                    value="flexDirection: 'row'"
                    marginBottom={Spacing.xs}
                  />
                  <layout flexDirection="row" width="100%">
                    {this.renderBox('1', Colors.primary)}
                    {this.renderBox('2', Colors.secondary)}
                    {this.renderBox('3', Colors.success)}
                  </layout>
                </layout>

                {/* Column */}
                <layout width="100%">
                  <label
                    font={Fonts.labelSmall}
                    color={Colors.textSecondary}
                    value="flexDirection: 'column' (default)"
                    marginBottom={Spacing.xs}
                  />
                  <layout flexDirection="column" width="100%">
                    {this.renderBox('1', Colors.primary)}
                    {this.renderBox('2', Colors.secondary)}
                    {this.renderBox('3', Colors.success)}
                  </layout>
                </layout>
              </layout>
            </Card>
          </DemoSection>

          {/* Justify Content */}
          <DemoSection
            title="Justify Content"
            description="Alignment along the main axis"
          >
            <Card>
              <layout width="100%">
                {this.renderJustifyExample('flex-start', 'flex-start')}
                {this.renderJustifyExample('center', 'center')}
                {this.renderJustifyExample('flex-end', 'flex-end')}
                {this.renderJustifyExample('space-between', 'space-between')}
                {this.renderJustifyExample('space-around', 'space-around')}
              </layout>
            </Card>
          </DemoSection>

          {/* Align Items */}
          <DemoSection
            title="Align Items"
            description="Alignment along the cross axis"
          >
            <Card>
              <layout width="100%">
                {this.renderAlignExample('flex-start', 'flex-start')}
                {this.renderAlignExample('center', 'center')}
                {this.renderAlignExample('flex-end', 'flex-end')}
                {this.renderAlignExample('stretch', 'stretch')}
              </layout>
            </Card>
          </DemoSection>

          {/* Flex Grow/Shrink */}
          <DemoSection
            title="Flex Grow"
            description="Control how items grow to fill available space"
          >
            <Card>
              <layout width="100%">
                <label
                  font={Fonts.labelSmall}
                  color={Colors.textSecondary}
                  value="flex: 1, flex: 2, flex: 1"
                  marginBottom={Spacing.xs}
                />
                <layout flexDirection="row" width="100%">
                  {this.renderFlexBox('1', Colors.primary, 1)}
                  {this.renderFlexBox('2', Colors.secondary, 2)}
                  {this.renderFlexBox('1', Colors.success, 1)}
                </layout>
              </layout>
            </Card>
          </DemoSection>

          {/* Gap and Spacing */}
          <DemoSection
            title="Gap & Spacing"
            description="Space between flex items using gap property"
          >
            <Card>
              <layout width="100%">
                <layout width="100%">
                  <label
                    font={Fonts.labelSmall}
                    color={Colors.textSecondary}
                    value="gap: 4px"
                    marginBottom={Spacing.xs}
                  />
                  <layout flexDirection="row" width="100%">
                    {this.renderBox('', Colors.primary)}
                    {this.renderBox('', Colors.secondary)}
                    {this.renderBox('', Colors.success)}
                  </layout>
                </layout>

                <layout width="100%">
                  <label
                    font={Fonts.labelSmall}
                    color={Colors.textSecondary}
                    value="gap: 16px"
                    marginBottom={Spacing.xs}
                  />
                  <layout flexDirection="row" width="100%">
                    {this.renderBox('', Colors.primary)}
                    {this.renderBox('', Colors.secondary)}
                    {this.renderBox('', Colors.success)}
                  </layout>
                </layout>
              </layout>
            </Card>
          </DemoSection>

          {/* Code Example */}
          <DemoSection title="Code Example">
            <CodeBlock
              language="tsx"
              code={`<layout flexDirection="row" justifyContent="space-between" alignItems="center">
  <view backgroundColor="blue" width={50} height={50} />
  <view backgroundColor="red" width={50} height={50} />
  <view backgroundColor="green" width={50} height={50} />
</layout>`}
            />
          </DemoSection>
        </layout>
      </scroll>
    </view>;
  }

  // ============================================================================
  // Helper Methods - Visual Element Rendering
  // ============================================================================

  /**
   * Renders a colored box with text for layout demonstrations
   */
  private renderBox(text: string, color: string) {
    <view
      backgroundColor={color}
      width={60}
      height={60}
      borderRadius={BorderRadius.sm}
      alignItems="center"
      justifyContent="center"
    >
      <label font={Fonts.h4} color={Colors.white} value={text} />
    </view>;
  }

  /**
   * Renders a flex box with specified flexGrow value
   */
  private renderFlexBox(text: string, color: string, flex: number) {
    <view
      backgroundColor={color}
      flexGrow={flex}
      height={60}
      borderRadius={BorderRadius.sm}
      alignItems="center"
      justifyContent="center"
    >
      <label font={Fonts.h4} color={Colors.white} value={text} />
    </view>;
  }

  /**
   * Renders a justify-content example with label and boxes
   */
  private renderJustifyExample(label: string, value: any) {
    <layout width="100%">
      <label
        font={Fonts.labelSmall}
        color={Colors.textSecondary}
        value={`justifyContent: '${label}'`}
        marginBottom={Spacing.xs}
      />
      <layout flexDirection="row" justifyContent={value} width="100%">
        {this.renderBox('', Colors.primary)}
        {this.renderBox('', Colors.secondary)}
        {this.renderBox('', Colors.success)}
      </layout>
    </layout>;
  }

  // Helper to render align-items examples
  private renderAlignExample(label: string, value: any) {
    <layout width="100%">
      <label
        font={Fonts.labelSmall}
        color={Colors.textSecondary}
        value={`alignItems: '${label}'`}
        marginBottom={Spacing.xs}
      />
      <view
        flexDirection="row"
        alignItems={value}
        width="100%"
        height={100}
        backgroundColor={Colors.gray100}
        borderRadius={BorderRadius.sm}
        padding={Spacing.sm}

      >
        <view backgroundColor={Colors.primary} width={50} height={30} borderRadius={4} />
        <view backgroundColor={Colors.secondary} width={50} height={50} borderRadius={4} />
        <view backgroundColor={Colors.success} width={50} height={70} borderRadius={4} />
      </view>
    </layout>;
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
