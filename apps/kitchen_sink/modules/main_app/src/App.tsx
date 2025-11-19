/**
 * Valdi Kitchen Sink Application Entry Point
 *
 * This file contains the root component for the Valdi Kitchen Sink application,
 * which demonstrates all major features and capabilities of the Valdi cross-platform
 * UI framework (iOS and Android).
 *
 * **Application Architecture:**
 *
 * The App component serves as the application entry point and is responsible for:
 * - Initializing the navigation system via NavigationRoot
 * - Providing the NavigationController context to all child components
 * - Rendering the HomePage as the initial screen in the navigation stack
 *
 * **Navigation System Setup:**
 *
 * Valdi's navigation system uses a render prop pattern implemented through the
 * $slot() compiler intrinsic. This pattern is REQUIRED for NavigationRoot to work:
 *
 * ```typescript
 * <NavigationRoot>
 *   {$slot((navigationController: NavigationController) => {
 *     <HomePage navigationController={navigationController} />
 *   })}
 * </NavigationRoot>
 * ```
 *
 * The $slot() function is a Valdi compiler intrinsic (not a regular JavaScript function)
 * that enables the NavigationRoot to pass the NavigationController instance to its
 * children. This controller is then used by all pages to navigate between screens.
 *
 * **BUILD.bazel Configuration:**
 *
 * This component is registered as the application entry point in BUILD.bazel:
 * ```
 * root_component_path = "App@main_app/src/App"
 * ```
 *
 * IMPORTANT: The path format is "ClassName@module_name/src/FilePath"
 * - Module name is relative (NOT a Bazel label like "//apps/...")
 * - Using absolute Bazel paths will cause runtime initialization errors
 *
 * **Component Lifecycle:**
 *
 * The App component follows the standard Valdi component lifecycle:
 * 1. onCreate() - Component initialization (called once)
 * 2. onRender() - Rendering the component tree (called on each render)
 * 3. onDestroy() - Cleanup when component is destroyed
 *
 * **Cross-Platform Compatibility:**
 * - iOS: Tested and verified working
 * - Android: Tested and verified working
 *
 * **References:**
 * @see {@link https://github.com/valdi-labs/valdi|Valdi Framework Documentation}
 * @see NavigationRoot for navigation system architecture
 * @see NavigationController for navigation API
 * @see Component for base component lifecycle
 * @see HomePage for the initial landing page
 */

import { Component } from 'valdi_core/src/Component';
import { $slot } from 'valdi_core/src/CompilerIntrinsics'; // Required for NavigationRoot pattern
import { NavigationRoot } from 'valdi_navigation/src/NavigationRoot';
import { NavigationController } from 'valdi_navigation/src/NavigationController';

import { HomePage } from './HomePage';

/**
 * App Component
 *
 * Root component that initializes the Valdi Kitchen Sink application.
 * Extends the base Component class and sets up the navigation hierarchy.
 *
 * @class App
 * @extends Component
 */
export class App extends Component {
  private navigationController?: NavigationController;

  /**
   * Component initialization lifecycle method.
   *
   * Called once when the App component is first created, before the first render.
   * Use this for one-time setup tasks like initializing state or subscribing to events.
   *
   * Currently no initialization is needed for the App component since NavigationRoot
   * handles all navigation setup automatically.
   */
  onCreate() {
    // No initialization needed - NavigationRoot handles navigation setup
  }

  /**
   * Render lifecycle method.
   *
   * Called whenever the component needs to render its UI. This method sets up
   * the navigation hierarchy using NavigationRoot and renders the HomePage as
   * the initial screen.
   *
   * **NavigationRoot Pattern:**
   * NavigationRoot provides the navigation infrastructure for the entire app.
   * It uses a render prop pattern via the $slot() compiler intrinsic to pass
   * the NavigationController instance to child components.
   *
   * **Why $slot() is required:**
   * The $slot() function is not a regular JavaScript function - it's a compiler
   * intrinsic that the Valdi compiler transforms into the appropriate navigation
   * setup code. Attempting to use regular callback functions will not work.
   */
  onRender() {
    <NavigationRoot>
      {$slot((navigationController: NavigationController) => {
        // Store navigation controller reference for potential future use
        // (e.g., programmatic navigation from the App level, deep linking, etc.)
        this.navigationController = navigationController;

        // Render the HomePage as the root page in the navigation stack
        // HomePage receives the navigationController and uses it to navigate
        // to individual demo pages when the user taps a demo card
        <HomePage navigationController={navigationController} />;
      })}
    </NavigationRoot>;
  }

  /**
   * Component destruction lifecycle method.
   *
   * Called when the App component is being destroyed. Use this for cleanup tasks
   * like unsubscribing from events or releasing resources.
   *
   * Currently no cleanup is needed since NavigationRoot handles its own cleanup.
   */
  onDestroy() {
    // No cleanup needed - NavigationRoot handles navigation cleanup
  }
}
