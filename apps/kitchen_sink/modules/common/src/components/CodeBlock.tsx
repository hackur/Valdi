/**
 * CodeBlock Component
 *
 * Displays code snippets in a monospace font with dark background,
 * simulating a code editor appearance. Useful for showing example
 * code within demo pages.
 *
 * Note: This is a basic implementation without true syntax highlighting.
 * Uses monospace font and dark theme styling for code display.
 *
 * @example
 * ```tsx
 * <CodeBlock
 *   language="tsx"
 *   code="const hello = 'world';"
 * />
 * ```
 */

import { Component } from 'valdi_core/src/Component';
import { Style } from 'valdi_core/src/Style';
import { View, Label } from 'valdi_tsx/src/NativeTemplateElements';

import { Colors } from '../theme/colors';
import { Fonts } from '../theme/fonts';
import { BorderRadius, Spacing } from '../theme/styles';

/**
 * ViewModel interface for CodeBlock component
 */
export interface CodeBlockViewModel {
  /**
   * The code string to display
   * Supports multiline code (numberOfLines={0})
   */
  code: string;

  /**
   * Programming language identifier (displayed as uppercase label)
   * Examples: 'tsx', 'typescript', 'javascript', 'swift'
   * For display purposes only (no actual syntax highlighting)
   */
  language?: string;
}

/**
 * CodeBlock Component
 *
 * A simple code display component with:
 * - Dark gray background (gray800)
 * - Monospace font for code clarity
 * - Optional language label (uppercase, small caption)
 * - Rounded corners and padding
 * - Support for multiline code
 *
 * Future Enhancement: Could add actual syntax highlighting
 * using a library or custom AttributedText implementation.
 */
export class CodeBlock extends Component<CodeBlockViewModel> {
  onRender() {
    const { code, language } = this.viewModel;

    <view style={styles.container}>
      {/* Language label */}
      {language && <label style={styles.language} value={language.toUpperCase()} />}

      {/* Code content */}
      <label style={styles.code} value={code} numberOfLines={0} />
    </view>;
  }
}

const styles = {
  container: new Style<View>({
    width: '100%',
    backgroundColor: Colors.gray800,
    borderRadius: BorderRadius.base,
    padding: Spacing.base,
  }),

  language: new Style<Label>({
    font: Fonts.captionSmall,
    color: Colors.gray400,
    marginBottom: Spacing.xs,
  }),

  code: new Style<Label>({
    font: Fonts.code,
    color: Colors.gray100,
  }),
};
