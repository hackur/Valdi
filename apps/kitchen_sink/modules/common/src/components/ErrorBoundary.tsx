/**
 * ErrorBoundary Component
 *
 * A component that catches and displays errors that occur in child components.
 * Prevents the entire app from crashing when a component throws an error.
 *
 * @example
 * ```tsx
 * <ErrorBoundary fallback="Something went wrong">
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 */

import { StatefulComponent } from 'valdi_core/src/Component';
import { Style } from 'valdi_core/src/Style';
import { View, Label, Layout } from 'valdi_tsx/src/NativeTemplateElements';

import { Colors } from '../theme/colors';
import { Fonts } from '../theme/fonts';
import { Spacing, BorderRadius } from '../theme/styles';

/**
 * ViewModel interface for ErrorBoundary component
 */
export interface ErrorBoundaryViewModel {
  /**
   * Fallback message to display when an error occurs
   * @default "An error occurred"
   */
  fallback?: string;

  /**
   * Whether to show technical error details
   * @default false
   */
  showDetails?: boolean;
}

/**
 * State interface for ErrorBoundary component
 */
interface ErrorBoundaryState {
  /** Whether an error has been caught */
  hasError: boolean;

  /** The error message if available */
  errorMessage?: string;

  /** The error stack trace if available */
  errorStack?: string;
}

/**
 * ErrorBoundary Component
 *
 * Catches errors in child components and displays a fallback UI
 * instead of crashing the entire application.
 *
 * Features:
 * - Graceful error handling
 * - Custom fallback message
 * - Optional technical error details
 * - Red error card UI
 *
 * Note: Error boundaries are conceptual in this implementation.
 * Valdi may handle errors differently at runtime.
 */
export class ErrorBoundary extends StatefulComponent<ErrorBoundaryViewModel, ErrorBoundaryState> {
  onCreate() {
    this.setState({
      hasError: false,
      errorMessage: undefined,
      errorStack: undefined,
    });
  }

  onRender() {
    const { fallback = 'An error occurred', showDetails = false } = this.viewModel;

    if (this.state && this.state.hasError) {
      // Render error UI
      <view style={styles.errorContainer}>
        <view style={styles.errorCard}>
          {/* Error icon */}
          <label style={styles.errorIcon} value="⚠️" />

          {/* Error title */}
          <label style={styles.errorTitle} value="Error" />

          {/* Fallback message */}
          <label
            style={styles.errorMessage}
            value={fallback}
            numberOfLines={0}
          />

          {/* Technical details (if enabled) */}
          {showDetails && this.state && this.state.errorMessage && (
            <view style={styles.detailsContainer}>
              <label
                style={styles.detailsTitle}
                value="Technical Details:"
              />
              <label
                style={styles.detailsText}
                value={this.state?.errorMessage || ''}
                numberOfLines={0}
              />
            </view>
          )}
        </view>
      </view>;
    } else {
      // Render children normally
      <slot />;
    }
  }

  /**
   * Called when an error is thrown in a child component
   * Note: This is conceptual - actual error handling may differ in Valdi
   */
  onError(error: Error) {
    this.setState({
      hasError: true,
      errorMessage: error.message || 'Unknown error',
      errorStack: error.stack,
    });
  }
}

const styles = {
  errorContainer: new Style<View>({
    width: '100%',
    height: '100%',
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
  }),

  errorCard: new Style<View>({
    width: '100%',
    backgroundColor: Colors.errorLight + '10', // 10% opacity
    borderColor: Colors.error,
    borderWidth: 2,
    borderRadius: BorderRadius.md,
    padding: Spacing.xl,
    alignItems: 'center',
  }),

  errorIcon: new Style<Label>({
    font: Fonts.h1,
    marginBottom: Spacing.base,
  }),

  errorTitle: new Style<Label>({
    font: Fonts.h2,
    color: Colors.error,
    marginBottom: Spacing.sm,
  }),

  errorMessage: new Style<Label>({
    font: Fonts.body,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.base,
  }),

  detailsContainer: new Style<View>({
    width: '100%',
    backgroundColor: Colors.gray100,
    borderRadius: BorderRadius.sm,
    padding: Spacing.base,
    marginTop: Spacing.base,
  }),

  detailsTitle: new Style<Label>({
    font: Fonts.h5,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  }),

  detailsText: new Style<Label>({
    font: Fonts.code,
    color: Colors.textSecondary,
  }),
};
