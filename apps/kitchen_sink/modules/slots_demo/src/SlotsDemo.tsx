/**
 * Slots & Composition Demo
 *
 * Demonstrates Valdi's content projection system using <slot> elements.
 * Shows basic slots, render functions with $slot(), and composition patterns.
 */

import { StatefulComponent, Component } from 'valdi_core/src/Component';
import { Style } from 'valdi_core/src/Style';
import { NavigationController } from 'valdi_navigation/src/NavigationController';
import { NavigationPageComponent } from 'valdi_navigation/src/NavigationPageComponent';
import { NavigationPage } from 'valdi_navigation/src/NavigationPage';
import { View, Label, Layout, ScrollView } from 'valdi_tsx/src/NativeTemplateElements';

import {
  Header,
  DemoSection,
  Colors,
  Fonts,
  Spacing,
  BorderRadius,
  Shadows,
} from '../../common/src/index';

export interface SlotsDemoViewModel {
  navigationController: NavigationController;
}

interface SlotsDemoState {
  clickCount: number;
}

@NavigationPage(module)
export class SlotsDemo extends StatefulComponent<SlotsDemoViewModel, SlotsDemoState> {
  state: SlotsDemoState = {
    clickCount: 0,
  };

  onRender() {
    <view style={styles.page}>
      <Header
        title="Slots & Composition"
        showBack={true}
        onBack={() => this.viewModel.navigationController.pop()}
      />

      <scroll style={styles.scroll}>
        <layout style={styles.content}>
          {/* Basic Slot Example */}
          <DemoSection
            title="1. Basic Slot"
            description="Simple content projection with <slot />"
          >
            <SimpleCard>
              <label style={styles.exampleText} value="This content is projected through a <slot />" />
              <label style={styles.exampleText} value="Multiple elements can be projected!" />
            </SimpleCard>

            <CodeExample
              code={`<SimpleCard>
  <Label value="Content here" />
</SimpleCard>`}
            />
          </DemoSection>

          {/* Multiple Slots Example */}
          <DemoSection
            title="2. Multiple Children"
            description="Projecting multiple elements through a single slot"
          >
            <SimpleCard>
              <label style={styles.exampleText} value="First element" />
              <label style={styles.exampleText} value="Second element" />
              <label style={styles.exampleText} value="Third element" />
              <label style={styles.captionText} value="All rendered through <slot />" />
            </SimpleCard>

            <CodeExample
              code={`<SimpleCard>
  <Label value="First" />
  <Label value="Second" />
  <Label value="Third" />
</SimpleCard>`}
            />
          </DemoSection>

          {/* Composition Pattern */}
          <DemoSection
            title="3. Component Composition"
            description="Building complex UIs from simple components"
          >
            <InfoBox variant="info">
              <label style={styles.exampleText} value="ℹ️ Info: Components can be composed together" />
            </InfoBox>

            <InfoBox variant="success">
              <label style={styles.exampleText} value="✓ Success: Build reusable component libraries" />
            </InfoBox>

            <InfoBox variant="warning">
              <label style={styles.exampleText} value="⚠️ Warning: Keep components focused and simple" />
            </InfoBox>

            <InfoBox variant="error">
              <label style={styles.exampleText} value="✗ Error: Avoid deep nesting" />
            </InfoBox>

            <CodeExample
              code={`<InfoBox variant="success">
  <Label value="Message" />
</InfoBox>`}
            />
          </DemoSection>

          {/* Interactive Slot Example */}
          <DemoSection
            title="4. Interactive Slot"
            description="Slots with callbacks and state management"
          >
            <ClickableCard onTap={() => this.handleClick()}>
              <label
                style={styles.exampleText}
                value={`Tapped ${this.state.clickCount} times`}
              />
              <label
                style={styles.captionText}
                value="Click anywhere on this card"
              />
            </ClickableCard>

            <CodeExample
              code={`<ClickableCard onTap={handleClick}>
  <Label value="Content" />
</ClickableCard>`}
            />
          </DemoSection>

          {/* Real-World Example */}
          <DemoSection
            title="5. Real-World Example"
            description="Practical composition pattern used in this app"
          >
            <label
              style={styles.noteText}
              value="The DemoSection component you see throughout this app uses <slot /> for content projection:"
              numberOfLines={0}
            />

            <CodeExample
              code={`// DemoSection component
export class DemoSection {
  onRender() {
    <layout>
      <Label value={title} />
      <layout>
        <slot /> {/* Content goes here */}
      </layout>
    </layout>;
  }
}

// Usage in demos
<DemoSection title="Example">
  <View>Your content</View>
</DemoSection>`}
            />
          </DemoSection>

          {/* Key Concepts */}
          <DemoSection
            title="Key Concepts"
            description="Important things to know about slots"
          >
            <view style={styles.conceptBox}>
              <label style={styles.conceptTitle} value="1. Simple Content Projection" />
              <label
                style={styles.conceptDesc}
                value="Use <slot /> to project child elements into a component"
                numberOfLines={0}
              />
            </view>

            <view style={styles.conceptBox}>
              <label style={styles.conceptTitle} value="2. Multiple Children" />
              <label
                style={styles.conceptDesc}
                value="A slot can project multiple child elements at once"
                numberOfLines={0}
              />
            </view>

            <view style={styles.conceptBox}>
              <label style={styles.conceptTitle} value="3. Composition Over Inheritance" />
              <label
                style={styles.conceptDesc}
                value="Build complex components by composing simple ones together"
                numberOfLines={0}
              />
            </view>

            <view style={styles.conceptBox}>
              <label style={styles.conceptTitle} value="4. Lowercase Syntax" />
              <label
                style={styles.conceptDesc}
                value="Always use <slot /> (lowercase), not <Slot /> (component import)"
                numberOfLines={0}
              />
            </view>
          </DemoSection>
        </layout>
      </scroll>
    </view>;
  }

  private handleClick() {
    this.setState({
      clickCount: this.state.clickCount + 1,
    });
  }
}

// ============================================================================
// Example Components Demonstrating Slots
// ============================================================================

/**
 * Simple card with basic slot projection
 */
interface SimpleCardViewModel {}

class SimpleCard extends Component<SimpleCardViewModel> {
  onRender() {
    <view style={styles.simpleCard}>
      <slot />
    </view>;
  }
}


/**
 * Info box with variant styling
 */
interface InfoBoxViewModel {
  variant: 'info' | 'success' | 'warning' | 'error';
}

class InfoBox extends Component<InfoBoxViewModel> {
  onRender() {
    const { variant } = this.viewModel;
    const backgroundColor = this.getBackgroundColor(variant);
    const borderColor = this.getBorderColor(variant);

    <view
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={2}
      borderRadius={BorderRadius.base}
      padding={Spacing.base}
      width="100%"
      marginBottom={Spacing.sm}
    >
      <slot />
    </view>;
  }

  private getBackgroundColor(variant: InfoBoxViewModel['variant']): string {
    switch (variant) {
      case 'info': return Colors.infoLight + '20'; // 20% opacity
      case 'success': return Colors.successLight + '20';
      case 'warning': return Colors.warningLight + '20';
      case 'error': return Colors.errorLight + '20';
      default: return Colors.gray100;
    }
  }

  private getBorderColor(variant: InfoBoxViewModel['variant']): string {
    switch (variant) {
      case 'info': return Colors.info;
      case 'success': return Colors.success;
      case 'warning': return Colors.warning;
      case 'error': return Colors.error;
      default: return Colors.border;
    }
  }
}

/**
 * Clickable card with tap handler
 */
interface ClickableCardViewModel {
  onTap: () => void;
}

class ClickableCard extends Component<ClickableCardViewModel> {
  onRender() {
    <view
      style={styles.clickableCard}
      onTap={this.viewModel.onTap}
    >
      <slot />
    </view>;
  }
}

/**
 * Code example display
 */
interface CodeExampleViewModel {
  code: string;
}

class CodeExample extends Component<CodeExampleViewModel> {
  onRender() {
    <view style={styles.codeExample}>
      <label
        style={styles.codeText}
        value={this.viewModel.code}
        numberOfLines={0}
      />
    </view>;
  }
}

// ============================================================================
// Styles
// ============================================================================

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

  simpleCard: new Style<View>({
    width: '100%',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.base,
    boxShadow: Shadows.base,
    padding: Spacing.base,
    marginBottom: Spacing.base,
  }),

  clickableCard: new Style<View>({
    width: '100%',
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.base,
    boxShadow: Shadows.md,
    padding: Spacing.lg,
    marginBottom: Spacing.base,
    alignItems: 'center',
  }),

  exampleText: new Style<Label>({
    font: Fonts.body,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  }),

  captionText: new Style<Label>({
    font: Fonts.bodySmall,
    color: Colors.white,
    opacity: 0.8,
  }),

  noteText: new Style<Label>({
    font: Fonts.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.base,
  }),

  codeExample: new Style<View>({
    width: '100%',
    backgroundColor: Colors.gray800,
    borderRadius: BorderRadius.base,
    padding: Spacing.base,
    marginTop: Spacing.base,
  }),

  codeText: new Style<Label>({
    font: Fonts.code,
    color: Colors.gray100,
  }),

  conceptBox: new Style<View>({
    width: '100%',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.base,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.base,
    marginBottom: Spacing.base,
  }),

  conceptTitle: new Style<Label>({
    font: Fonts.h5,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  }),

  conceptDesc: new Style<Label>({
    font: Fonts.bodySmall,
    color: Colors.textSecondary,
  }),
};
