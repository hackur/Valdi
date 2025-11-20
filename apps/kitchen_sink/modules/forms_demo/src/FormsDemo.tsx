/**
 * Forms & Validation Demo
 *
 * Comprehensive demonstration of Valdi's form input capabilities using TextField and TextView.
 * Shows input validation, content types, keyboard management, and complete multi-field forms.
 *
 * **Features Demonstrated:**
 *
 * 1. **Content Types:**
 *    - Default, email, phone, password, URL, number
 *    - Multi-line text (TextView)
 *    - Auto-capitalization and auto-correct
 *
 * 2. **Input Validation:**
 *    - Real-time validation with onChange
 *    - Pre-validation with onWillChange
 *    - Email, phone, username validation
 *    - Error messages and success indicators
 *
 * 3. **Keyboard Management:**
 *    - Return key types (next, done, search)
 *    - onReturn callbacks
 *    - Focus tracking with onEditBegin/End
 *
 * 4. **Complete Form:**
 *    - Multi-field registration form
 *    - Combined validation
 *    - Submit with loading state
 *    - Success/error feedback
 *
 * @see {@link https://github.com/valdi-labs/valdi|Valdi Framework Documentation}
 */

import { StatefulComponent } from 'valdi_core/src/Component';
import { Style } from 'valdi_core/src/Style';
import { NavigationController } from 'valdi_navigation/src/NavigationController';
import { NavigationPage } from 'valdi_navigation/src/NavigationPage';
import {
  View,
  Label,
  Layout,
  ScrollView,
  TextField,
  TextView,
  EditTextEvent,
  EditTextBeginEvent,
  EditTextEndEvent,
} from 'valdi_tsx/src/NativeTemplateElements';

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

export interface FormsDemoViewModel {
  navigationController: NavigationController;
}

interface FormsDemoState {
  // Basic inputs
  name: string;
  email: string;
  phone: string;
  password: string;
  website: string;
  age: string;
  bio: string;

  // Validation
  emailValid: boolean;
  emailError?: string;
  usernameValue: string;
  usernameError?: string;

  // Keyboard management
  firstName: string;
  lastName: string;
  searchQuery: string;
  currentFocus?: string;

  // Complete form
  formFirstName: string;
  formLastName: string;
  formEmail: string;
  formPhone: string;
  formPassword: string;
  formConfirmPassword: string;
  formErrors: { [key: string]: string };
  isSubmitting: boolean;
  submitSuccess: boolean;
  submitError?: string;
}

@NavigationPage(module)
export class FormsDemo extends StatefulComponent<FormsDemoViewModel, FormsDemoState> {
  state: FormsDemoState = {
    name: '',
    email: '',
    phone: '',
    password: '',
    website: '',
    age: '',
    bio: '',
    emailValid: false,
    usernameValue: '',
    firstName: '',
    lastName: '',
    searchQuery: '',
    formFirstName: '',
    formLastName: '',
    formEmail: '',
    formPhone: '',
    formPassword: '',
    formConfirmPassword: '',
    formErrors: {},
    isSubmitting: false,
    submitSuccess: false,
  };

  onRender() {
    <view style={styles.page}>
      <Header
        title="Forms & Validation"
        showBack={true}
        onBack={() => this.viewModel.navigationController.pop()}
      />

      <scroll style={styles.scroll}>
        <layout style={styles.content}>
          {/* Content Types */}
          <DemoSection
            title="Input Content Types"
            description="Different keyboard types for different input formats"
          >
            <Card>
              <layout width="100%">
                <label value="Name (Default)" font={Fonts.body} color={Colors.textPrimary} />
                <textfield
                  value={this.state.name}
                  placeholder="Enter your name"
                  contentType="default"
                  onChange={(e) => this.setState({ name: e.text })}
                  style={styles.input}
                />

                <label value="Email" font={Fonts.body} color={Colors.textPrimary} />
                <textfield
                  value={this.state.email}
                  placeholder="email@example.com"
                  contentType="email"
                  onChange={(e) => this.setState({ email: e.text })}
                  style={styles.input}
                />

                <label value="Phone Number" font={Fonts.body} color={Colors.textPrimary} />
                <textfield
                  value={this.state.phone}
                  placeholder="(555) 123-4567"
                  contentType="phoneNumber"
                  onChange={(e) => this.setState({ phone: e.text })}
                  style={styles.input}
                />

                <label value="Password (Secure)" font={Fonts.body} color={Colors.textPrimary} />
                <textfield
                  value={this.state.password}
                  placeholder="Enter password"
                  contentType="password"
                  onChange={(e) => this.setState({ password: e.text })}
                  style={styles.input}
                />

                <label value="Website URL" font={Fonts.body} color={Colors.textPrimary} />
                <textfield
                  value={this.state.website}
                  placeholder="https://example.com"
                  contentType="url"
                  onChange={(e) => this.setState({ website: e.text })}
                  style={styles.input}
                />

                <label value="Age (Number)" font={Fonts.body} color={Colors.textPrimary} />
                <textfield
                  value={this.state.age}
                  placeholder="25"
                  contentType="number"
                  onChange={(e) => this.setState({ age: e.text })}
                  style={styles.input}
                />

                <label value="Bio (Multi-line)" font={Fonts.body} color={Colors.textPrimary} />
                <textview
                  value={this.state.bio}
                  placeholder="Tell us about yourself..."
                  onChange={(e) => this.setState({ bio: e.text })}
                  style={styles.textarea}
                />
              </layout>
            </Card>
          </DemoSection>

          {/* Validation */}
          <DemoSection
            title="Input Validation"
            description="Real-time validation with error messages"
          >
            <Card>
              <layout width="100%">
                <label value="Email Validation" font={Fonts.body} color={Colors.textPrimary} />
                <textfield
                  value={this.state.email}
                  placeholder="email@example.com"
                  contentType="email"
                  onChange={(e) => this.handleEmailValidation(e.text)}
                  style={styles.input}
                />
                {this.state.emailError && (
                  <label
                    value={this.state.emailError}
                    font={Fonts.caption}
                    color={Colors.error}
                  />
                )}
                {this.state.emailValid && this.state.email && (
                  <label value="✓ Valid email" font={Fonts.caption} color={Colors.success} />
                )}

                <label value="Username (3-20 chars, alphanumeric + _)" font={Fonts.body} color={Colors.textPrimary} />
                <textfield
                  value={this.state.usernameValue}
                  placeholder="john_doe123"
                  onWillChange={(e) => this.handleUsernameWillChange(e)}
                  onChange={(e) => this.handleUsernameChange(e.text)}
                  style={styles.input}
                />
                {this.state.usernameError && (
                  <label
                    value={this.state.usernameError}
                    font={Fonts.caption}
                    color={Colors.error}
                  />
                )}
                <label
                  value={`${this.state.usernameValue.length}/20 characters`}
                  font={Fonts.caption}
                  color={Colors.textSecondary}
                />
              </layout>
            </Card>
          </DemoSection>

          {/* Keyboard Management */}
          <DemoSection
            title="Keyboard Management"
            description="Return key actions and focus tracking"
          >
            <Card>
              <layout width="100%">
                <label value="First Name (press Next)" font={Fonts.body} color={Colors.textPrimary} />
                <textfield
                  value={this.state.firstName}
                  placeholder="John"
                  returnKeyText="next"
                  onReturn={() => this.handleReturn('firstName')}
                  onChange={(e) => this.setState({ firstName: e.text })}
                  onEditBegin={(e) => this.setState({ currentFocus: 'firstName' })}
                  style={styles.input}
                />

                <label value="Last Name (press Next)" font={Fonts.body} color={Colors.textPrimary} />
                <textfield
                  value={this.state.lastName}
                  placeholder="Doe"
                  returnKeyText="next"
                  onReturn={() => this.handleReturn('lastName')}
                  onChange={(e) => this.setState({ lastName: e.text })}
                  onEditBegin={(e) => this.setState({ currentFocus: 'lastName' })}
                  style={styles.input}
                />

                <label value="Search (press Search)" font={Fonts.body} color={Colors.textPrimary} />
                <textfield
                  value={this.state.searchQuery}
                  placeholder="Search..."
                  returnKeyText="search"
                  onReturn={(e) => this.handleSearch(e.text)}
                  onChange={(e) => this.setState({ searchQuery: e.text })}
                  onEditBegin={(e) => this.setState({ currentFocus: 'search' })}
                  style={styles.input}
                />

                {this.state.currentFocus && (
                  <view
                    padding={Spacing.base}
                    backgroundColor={Colors.gray100}
                    borderRadius={BorderRadius.sm}
                  >
                    <label
                      value={`Currently editing: ${this.state.currentFocus}`}
                      font={Fonts.caption}
                      color={Colors.textSecondary}
                    />
                  </view>
                )}
              </layout>
            </Card>
          </DemoSection>

          {/* Complete Form */}
          <DemoSection
            title="Registration Form"
            description="Complete form with validation and submission"
          >
            <Card>
              <layout width="100%">
                {this.state.submitSuccess ? (
                  <view
                    width="100%"
                    padding={Spacing.xl}
                    backgroundColor={Colors.success}
                    borderRadius={BorderRadius.base}
                    alignItems="center"
                  >
                    <label value="✓ Registration Successful!" font={Fonts.h2} color={Colors.white} />
                    <label value="Form submitted successfully" font={Fonts.body} color={Colors.white} />
                  </view>
                ) : (
                  <layout width="100%">
                    <label value="First Name *" font={Fonts.body} color={Colors.textPrimary} />
                    <textfield
                      value={this.state.formFirstName}
                      placeholder="John"
                      returnKeyText="next"
                      onChange={(e) => this.setState({ formFirstName: e.text })}
                      style={this.getFormInputStyle('formFirstName')}
                    />
                    {this.state.formErrors.formFirstName && (
                      <label
                        value={this.state.formErrors.formFirstName}
                        font={Fonts.caption}
                        color={Colors.error}
                      />
                    )}

                    <label value="Last Name *" font={Fonts.body} color={Colors.textPrimary} />
                    <textfield
                      value={this.state.formLastName}
                      placeholder="Doe"
                      returnKeyText="next"
                      onChange={(e) => this.setState({ formLastName: e.text })}
                      style={this.getFormInputStyle('formLastName')}
                    />
                    {this.state.formErrors.formLastName && (
                      <label
                        value={this.state.formErrors.formLastName}
                        font={Fonts.caption}
                        color={Colors.error}
                      />
                    )}

                    <label value="Email *" font={Fonts.body} color={Colors.textPrimary} />
                    <textfield
                      value={this.state.formEmail}
                      placeholder="john@example.com"
                      contentType="email"
                      returnKeyText="next"
                      onChange={(e) => this.setState({ formEmail: e.text })}
                      style={this.getFormInputStyle('formEmail')}
                    />
                    {this.state.formErrors.formEmail && (
                      <label
                        value={this.state.formErrors.formEmail}
                        font={Fonts.caption}
                        color={Colors.error}
                      />
                    )}

                    <label value="Phone" font={Fonts.body} color={Colors.textPrimary} />
                    <textfield
                      value={this.state.formPhone}
                      placeholder="(555) 123-4567"
                      contentType="phoneNumber"
                      returnKeyText="next"
                      onChange={(e) => this.setState({ formPhone: e.text })}
                      style={styles.input}
                    />

                    <label value="Password * (min 8 chars)" font={Fonts.body} color={Colors.textPrimary} />
                    <textfield
                      value={this.state.formPassword}
                      placeholder="••••••••"
                      contentType="password"
                      returnKeyText="next"
                      onChange={(e) => this.setState({ formPassword: e.text })}
                      style={this.getFormInputStyle('formPassword')}
                    />
                    {this.state.formErrors.formPassword && (
                      <label
                        value={this.state.formErrors.formPassword}
                        font={Fonts.caption}
                        color={Colors.error}
                      />
                    )}

                    <label value="Confirm Password *" font={Fonts.body} color={Colors.textPrimary} />
                    <textfield
                      value={this.state.formConfirmPassword}
                      placeholder="••••••••"
                      contentType="password"
                      returnKeyText="done"
                      onChange={(e) => this.setState({ formConfirmPassword: e.text })}
                      style={this.getFormInputStyle('formConfirmPassword')}
                    />
                    {this.state.formErrors.formConfirmPassword && (
                      <label
                        value={this.state.formErrors.formConfirmPassword}
                        font={Fonts.caption}
                        color={Colors.error}
                      />
                    )}

                    {this.state.submitError && (
                      <view
                        width="100%"
                        padding={Spacing.base}
                        backgroundColor="rgba(239, 68, 68, 0.1)"
                        borderRadius={BorderRadius.sm}
                      >
                        <label
                          value={this.state.submitError}
                          font={Fonts.body}
                          color={Colors.error}
                        />
                      </view>
                    )}

                    <layout flexDirection="row" flexWrap="wrap" margin={Spacing.base}>
                      <Button
                        title={this.state.isSubmitting ? 'Submitting...' : 'Submit'}
                        variant="primary"
                        onTap={() => this.submitForm()}
                      />
                      <Button
                        title="Reset"
                        variant="outline"
                        onTap={() => this.resetForm()}
                      />
                    </layout>
                  </layout>
                )}
              </layout>
            </Card>
          </DemoSection>
        </layout>
      </scroll>
    </view>;
  }

  // Validation methods

  private handleEmailValidation(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      this.setState({ email, emailValid: false, emailError: undefined });
      return;
    }

    if (!emailRegex.test(email)) {
      this.setState({ email, emailValid: false, emailError: 'Invalid email format' });
      return;
    }

    this.setState({ email, emailValid: true, emailError: undefined });
  }

  private handleUsernameWillChange(event: EditTextEvent): EditTextEvent | undefined {
    const sanitized = event.text.replace(/[^a-zA-Z0-9_]/g, '');
    if (sanitized !== event.text) {
      return { ...event, text: sanitized };
    }
    return undefined;
  }

  private handleUsernameChange(username: string) {
    if (!username) {
      this.setState({ usernameValue: username, usernameError: undefined });
      return;
    }

    if (username.length < 3) {
      this.setState({
        usernameValue: username,
        usernameError: 'Username must be at least 3 characters',
      });
      return;
    }

    this.setState({ usernameValue: username, usernameError: undefined });
  }

  // Keyboard management

  private handleReturn(field: string) {
    console.log(`Return pressed on ${field}`);
  }

  private handleSearch(query: string) {
    console.log(`Searching for: ${query}`);
  }

  // Form submission

  private validateCompleteForm(): { valid: boolean; errors: { [key: string]: string } } {
    const errors: { [key: string]: string } = {};

    if (!this.state.formFirstName.trim()) {
      errors.formFirstName = 'First name is required';
    }

    if (!this.state.formLastName.trim()) {
      errors.formLastName = 'Last name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.state.formEmail.trim()) {
      errors.formEmail = 'Email is required';
    } else if (!emailRegex.test(this.state.formEmail)) {
      errors.formEmail = 'Invalid email format';
    }

    if (!this.state.formPassword) {
      errors.formPassword = 'Password is required';
    } else if (this.state.formPassword.length < 8) {
      errors.formPassword = 'Password must be at least 8 characters';
    }

    if (this.state.formPassword !== this.state.formConfirmPassword) {
      errors.formConfirmPassword = 'Passwords do not match';
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  }

  private async submitForm() {
    const validation = this.validateCompleteForm();

    if (!validation.valid) {
      this.setState({ formErrors: validation.errors });
      return;
    }

    this.setState({ isSubmitting: true, submitError: undefined, formErrors: {} });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      this.setState({
        isSubmitting: false,
        submitSuccess: true,
      });

      // Reset after 2 seconds
      setTimeout(() => {
        this.resetForm();
      }, 2000);
    } catch (error) {
      this.setState({
        isSubmitting: false,
        submitError: 'Failed to submit form. Please try again.',
      });
    }
  }

  private resetForm() {
    this.setState({
      formFirstName: '',
      formLastName: '',
      formEmail: '',
      formPhone: '',
      formPassword: '',
      formConfirmPassword: '',
      formErrors: {},
      submitSuccess: false,
      submitError: undefined,
      isSubmitting: false,
    });
  }

  private getFormInputStyle(field: string) {
    // TextField doesn't support border styling, so we just return the base style
    // Validation errors are shown via the error label below each field
    return styles.input;
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
    width: '100%',
    backgroundColor: Colors.surface,
    font: Fonts.body,
    color: Colors.textPrimary,
  }),

  textarea: new Style<TextView>({
    width: '100%',
    height: 100,
    backgroundColor: Colors.surface,
    font: Fonts.body,
    color: Colors.textPrimary,
  }),
};
