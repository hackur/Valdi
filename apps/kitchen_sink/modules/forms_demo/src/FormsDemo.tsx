/**
 * Forms & Validation Demo (Placeholder)
 *
 * This placeholder page explains what will be demonstrated when the
 * Forms & Validation demo is fully implemented.
 *
 * **Planned Features:**
 *
 * 1. **Form Controls:**
 *    - Text inputs with various input types
 *    - Number inputs with min/max validation
 *    - Date and time pickers
 *    - Checkboxes and radio buttons
 *    - Dropdowns and select menus
 *    - Sliders and range inputs
 *
 * 2. **Validation:**
 *    - Required field validation
 *    - Pattern/regex validation
 *    - Custom validation rules
 *    - Real-time validation feedback
 *    - Error message display
 *
 * 3. **Form State Management:**
 *    - Controlled vs uncontrolled inputs
 *    - Form state tracking
 *    - Dirty/pristine/touched states
 *    - Form reset functionality
 *
 * 4. **Submission & Handling:**
 *    - Form submission
 *    - Loading states during submission
 *    - Success/error handling
 *    - Multi-step forms
 *
 * 5. **Accessibility & UX:**
 *    - Keyboard navigation
 *    - Focus management
 *    - Label associations
 *    - Screen reader support
 *
 * **Estimated Implementation Effort:** 8-10 hours
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
 * Placeholder component explaining the planned Forms & Validation demo features.
 */
@NavigationPage(module)
export class FormsDemo extends Component {
  onRender() {
    <view style={styles.page}>
      {/* Header */}
      <view style={styles.header}>
        <label style={styles.backButton} value="← Back" onTap={() => this.viewModel.navigationController.pop()} />
        <label style={styles.headerTitle} value="📋 Forms & Validation" />
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
            value="This demo will showcase comprehensive form handling in Valdi, including various input types, validation, state management, submission handling, and accessibility features."
            numberOfLines={0}
          />

          {/* Planned Features Section */}
          <label style={styles.sectionTitle} value="Planned Features" />

          <DemoCard
            title="Form Controls"
            description="Text inputs, number inputs, date/time pickers, checkboxes, dropdowns, sliders"
            color={Colors.primary}
          />

          <DemoCard
            title="Validation"
            description="Required fields, pattern matching, custom rules, real-time feedback"
            color={Colors.secondary}
          />

          <DemoCard
            title="State Management"
            description="Controlled inputs, form state, dirty/pristine/touched tracking, reset"
            color={Colors.accent}
          />

          <DemoCard
            title="Submission & Handling"
            description="Form submission, loading states, success/error handling, multi-step forms"
            color={Colors.success}
          />

          <DemoCard
            title="Accessibility & UX"
            description="Keyboard navigation, focus management, labels, screen reader support"
            color={Colors.error}
          />

          {/* Implementation Info */}
          <label style={styles.sectionTitle} value="Implementation Status" />
          <label
            style={styles.infoText}
            value="Estimated implementation effort: 8-10 hours"
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
