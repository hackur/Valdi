/**
 * Text Elements Demo
 *
 * Comprehensive demonstration of Valdi's text display and input capabilities, including
 * labels for static text, text fields for single-line input, text views for multi-line
 * input, and attributed text for rich formatting.
 *
 * **Features Demonstrated:**
 *
 * 1. **Label Element (<label>):**
 *    - Display static or dynamic text
 *    - Font sizes and weights (h1-h6, body, caption)
 *    - Text colors and alignment
 *    - Number of lines and truncation
 *
 * 2. **TextField (<textfield>):**
 *    - Single-line text input
 *    - Content types (text, email, number, password, phone, URL)
 *    - Placeholder text
 *    - Real-time value tracking with onChange
 *    - Keyboard types based on content
 *
 * 3. **TextView (<textview>):**
 *    - Multi-line text input
 *    - Expandable text area
 *    - Return key behavior (linereturn for newlines)
 *    - Suitable for comments, descriptions, notes
 *
 * 4. **AttributedText:**
 *    - Rich text with mixed styles
 *    - Multiple fonts, colors, and decorations
 *    - Built with AttributedTextBuilder
 *    - Inline text formatting
 *
 * **Key Concepts:**
 *
 * **TextField vs TextView:**
 * - TextField: Single-line, typically for short inputs (name, email, search)
 * - TextView: Multi-line, for longer content (bio, comments, messages)
 * - Both support contentType for keyboard customization
 *
 * **Content Types:**
 * - text: Default keyboard
 * - email: Email keyboard with @ and .
 * - number: Numeric keyboard
 * - password: Secure text entry (hidden characters)
 * - phone: Phone number keyboard
 * - URL: URL keyboard with / and .com
 *
 * **Styling Limitations:**
 * TextField and TextView have limited styling compared to View:
 * - ❌ No padding property (wrap in View for padding)
 * - ❌ No borderWidth/borderRadius (style container instead)
 * - ✅ Can set backgroundColor, font, color
 * - ✅ Width and height work normally
 *
 * **AttributedText Usage:**
 * ```typescript
 * const attributed = new AttributedTextBuilder()
 *   .append('Bold text', { font: Fonts.h3 })
 *   .append(' normal text', { font: Fonts.body })
 *   .append(' colored', { color: Colors.primary })
 *   .toAttributedText();
 * ```
 *
 * **Event Handling:**
 * - onChange: Fires on every text change, receives EditTextEvent
 * - onWillChange: Pre-change validation/sanitization
 * - onReturn: User presses return/enter key
 * - Use event.text (not event.value) to get the text
 *
 * @see {@link https://github.com/valdi-labs/valdi|Valdi Framework Documentation}
 */

import { StatefulComponent } from 'valdi_core/src/Component';
import { Style } from 'valdi_core/src/Style';
import { AttributedTextBuilder } from 'valdi_core/src/utils/AttributedTextBuilder';
import { NavigationController } from 'valdi_navigation/src/NavigationController';
import { NavigationPageComponent } from 'valdi_navigation/src/NavigationPageComponent';
import { NavigationPage } from 'valdi_navigation/src/NavigationPage';
import { View, Label, Layout, ScrollView, TextField, TextView } from 'valdi_tsx/src/NativeTemplateElements';

import {
  Colors,
  Fonts,
  FontSizes,
  Spacing,
  BorderRadius,
  Header,
  DemoSection,
  Card,
  CodeBlock,
} from '../../common/src/index';

export interface TextDemoViewModel {
  navigationController: NavigationController;
}

interface TextDemoState {
  // TextField input value
  textFieldValue: string;

  // TextView (multi-line) input value
  textViewValue: string;
}

@NavigationPage(module)
export class TextDemo extends StatefulComponent<TextDemoViewModel, TextDemoState> {
  state: TextDemoState = {
    textFieldValue: '',
    textViewValue: '',
  };

  onRender() {
    <view style={styles.page}>
      {/* Header */}
      <Header
        title="Text Elements"
        showBack={true}
        onBack={() => this.viewModel.navigationController.pop()}
      />

      {/* Content */}
      <scroll style={styles.scroll}>
        <layout style={styles.content}>
          {/* Label Element */}
          <DemoSection
            title="<label> - Display Text"
            description="Labels display static or dynamic text with various styling options"
          >
            <Card>
              <layout width="100%">
                {/* Font sizes */}
                <layout width="100%">
                  <label font={Fonts.h1} color={Colors.textPrimary} value="Heading 1" />
                  <label font={Fonts.h2} color={Colors.textPrimary} value="Heading 2" />
                  <label font={Fonts.h3} color={Colors.textPrimary} value="Heading 3" />
                  <label font={Fonts.body} color={Colors.textPrimary} value="Body text" />
                  <label font={Fonts.caption} color={Colors.textSecondary} value="Caption text" />
                </layout>

                {/* Text alignment */}
                <layout width="100%">
                  <label
                    font={Fonts.labelSmall}
                    color={Colors.textSecondary}
                    value="Text Alignment:"
                  />
                  <label
                    font={Fonts.body}
                    color={Colors.textPrimary}
                    value="Left aligned (default)"
                    textAlign="left"
                    width="100%"
                  />
                  <label
                    font={Fonts.body}
                    color={Colors.textPrimary}
                    value="Center aligned"
                    textAlign="center"
                    width="100%"
                  />
                  <label
                    font={Fonts.body}
                    color={Colors.textPrimary}
                    value="Right aligned"
                    textAlign="right"
                    width="100%"
                  />
                </layout>

                {/* Colors */}
                <layout width="100%">
                  <label
                    font={Fonts.labelSmall}
                    color={Colors.textSecondary}
                    value="Text Colors:"
                  />
                  <label font={Fonts.body} color={Colors.primary} value="Primary color" />
                  <label font={Fonts.body} color={Colors.secondary} value="Secondary color" />
                  <label font={Fonts.body} color={Colors.success} value="Success color" />
                  <label font={Fonts.body} color={Colors.error} value="Error color" />
                </layout>

                {/* Number of lines */}
                <layout width="100%">
                  <label
                    font={Fonts.labelSmall}
                    color={Colors.textSecondary}
                    value="Line Limiting (numberOfLines):"
                  />
                  <label
                    font={Fonts.body}
                    color={Colors.textPrimary}
                    value="This is a very long text that will be truncated to just one line with an ellipsis at the end"
                    numberOfLines={1}
                    width="100%"
                  />
                  <label
                    font={Fonts.body}
                    color={Colors.textPrimary}
                    value="This is a longer text that will wrap to multiple lines but will be limited to maximum two lines with an ellipsis at the end if it exceeds that limit"
                    numberOfLines={2}
                    width="100%"
                  />
                </layout>
              </layout>
            </Card>
          </DemoSection>

          {/* TextField Element */}
          <DemoSection
            title="<textfield> - Single Line Input"
            description="Text fields for single-line text input with various keyboard types"
          >
            <Card>
              <layout width="100%">
                {/* Basic text field */}
                <layout width="100%">
                  <label
                    font={Fonts.labelSmall}
                    color={Colors.textSecondary}
                    value="Basic Text Field"
                    marginBottom={Spacing.xs}
                  />
                  <textfield
                    style={styles.textField}
                    placeholder="Enter text here..."
                    placeholderColor={Colors.textTertiary}
                    value={this.state.textFieldValue}
                    onChange={event => this.setState({ textFieldValue: event.text })}
                  />
                  {this.state.textFieldValue && (
                    <label
                      font={Fonts.caption}
                      color={Colors.textSecondary}
                      value={`You typed: ${this.state.textFieldValue}`}
                      marginTop={Spacing.xs}
                    />
                  )}
                </layout>

                {/* Email input */}
                <layout width="100%">
                  <label
                    font={Fonts.labelSmall}
                    color={Colors.textSecondary}
                    value="Email Input"
                    marginBottom={Spacing.xs}
                  />
                  <textfield
                    style={styles.textField}
                    placeholder="email@example.com"
                    placeholderColor={Colors.textTertiary}
                    contentType="email"
                    autocapitalization="none"
                  />
                </layout>

                {/* Number input */}
                <layout width="100%">
                  <label
                    font={Fonts.labelSmall}
                    color={Colors.textSecondary}
                    value="Number Input"
                    marginBottom={Spacing.xs}
                  />
                  <textfield
                    style={styles.textField}
                    placeholder="123"
                    placeholderColor={Colors.textTertiary}
                    contentType="number"
                  />
                </layout>

                {/* Password input */}
                <layout width="100%">
                  <label
                    font={Fonts.labelSmall}
                    color={Colors.textSecondary}
                    value="Password Input"
                    marginBottom={Spacing.xs}
                  />
                  <textfield
                    style={styles.textField}
                    placeholder="Password"
                    placeholderColor={Colors.textTertiary}
                    contentType="password"
                  />
                </layout>

                {/* Character limit */}
                <layout width="100%">
                  <label
                    font={Fonts.labelSmall}
                    color={Colors.textSecondary}
                    value="Character Limit (max 20)"
                    marginBottom={Spacing.xs}
                  />
                  <textfield
                    style={styles.textField}
                    placeholder="Limited to 20 characters"
                    placeholderColor={Colors.textTertiary}
                    characterLimit={20}
                  />
                </layout>
              </layout>
            </Card>
          </DemoSection>

          {/* TextView Element */}
          <DemoSection
            title="<textview> - Multi-line Input"
            description="Text views for multi-line text input"
          >
            <Card>
              <layout width="100%">
                <layout width="100%">
                  <label
                    font={Fonts.labelSmall}
                    color={Colors.textSecondary}
                    value="Multi-line Text Input"
                    marginBottom={Spacing.xs}
                  />
                  <textview
                    style={styles.textView}
                    placeholder="Enter multiple lines of text..."
                    placeholderColor={Colors.textTertiary}
                    value={this.state.textViewValue}
                    onChange={event => this.setState({ textViewValue: event.text })}
                    returnType="linereturn"
                  />
                  {this.state.textViewValue && (
                    <label
                      font={Fonts.caption}
                      color={Colors.textSecondary}
                      value={`Character count: ${this.state.textViewValue.length}`}
                      marginTop={Spacing.xs}
                    />
                  )}
                </layout>
              </layout>
            </Card>
          </DemoSection>

          {/* AttributedText */}
          <DemoSection
            title="AttributedText - Rich Text"
            description="Mix multiple styles in a single label using AttributedTextBuilder"
          >
            <Card>
              <layout width="100%">
                {this.renderAttributedTextExample()}
              </layout>
            </Card>
          </DemoSection>

          {/* Code Example */}
          <DemoSection title="Code Example">
            <CodeBlock
              language="tsx"
              code={`// Label
<label
  font="System-Bold 18"
  color="#111827"
  value="Hello World"
/>

// TextField
<textfield
  placeholder="Enter email"
  contentType="email"
  onChange={(event) => {
    console.log(event.text);
  }}
/>

// TextView
<textview
  placeholder="Comments..."
  returnType="linereturn"
  value={this.state.comment}
  onChange={(event) => {
    this.setState({ comment: event.text });
  }}
/>`}
            />
          </DemoSection>
        </layout>
      </scroll>
    </view>;
  }

  // ============================================================================
  // Helper Methods - Text Rendering
  // ============================================================================

  /**
   * Renders an AttributedText example with mixed formatting
   * Demonstrates how to use AttributedTextBuilder for rich text
   */
  private renderAttributedTextExample() {
    // Build rich text with multiple styles
    const builder = new AttributedTextBuilder();
    builder.append('Bold text ', { font: Fonts.h4, color: Colors.textPrimary });
    builder.append('normal text ', { font: Fonts.body, color: Colors.textPrimary });
    builder.append('colored text ', { font: Fonts.body, color: Colors.primary });
    builder.append('and more', { font: Fonts.caption, color: Colors.textSecondary });

    <label value={builder.build()} numberOfLines={0} />;
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

  textField: new Style<TextField>({
    width: '100%',
    height: 44,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.sm,
    font: Fonts.body,
    color: Colors.textPrimary,
  }),

  textView: new Style<TextView>({
    width: '100%',
    height: 120,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.sm,
    font: Fonts.body,
    color: Colors.textPrimary,
    textGravity: 'top',
  }),
};
