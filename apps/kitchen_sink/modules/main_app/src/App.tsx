/**
 * Main App Component
 *
 * Root component for the Valdi Kitchen Sink application.
 * Sets up the navigation system using NavigationRoot and provides
 * the navigationController to all child pages.
 *
 * Key Decisions:
 * - Uses $slot() compiler intrinsic for navigation context (required pattern)
 * - NavigationRoot provides the NavigationController to child components
 * - HomePage is the initial/root page in the navigation stack
 */

import { Component } from 'valdi_core/src/Component';
import { $slot } from 'valdi_core/src/CompilerIntrinsics'; // Required for NavigationRoot pattern
import { NavigationRoot } from 'valdi_navigation/src/NavigationRoot';
import { NavigationController } from 'valdi_navigation/src/NavigationController';

import { HomePage } from './HomePage';

/**
 * Root application component
 *
 * This is the entry point specified in BUILD.bazel:
 *   root_component_path = "App@main_app/src/App"
 *
 * Note: The path is relative to the module name, not an absolute Bazel path.
 * Using "//apps/kitchen_sink/modules/main_app/src/App" would cause a runtime error.
 */
export class App extends Component {
  private navigationController?: NavigationController;

  onCreate() {
    // Component initialization
    // Called once when the component is created
  }

  onRender() {
    // NavigationRoot provides navigation infrastructure
    // It uses a render prop pattern via $slot() to provide the NavigationController
    <NavigationRoot>
      {$slot((navigationController: NavigationController) => {
        // Store navigation controller reference (optional, for potential future use)
        this.navigationController = navigationController;

        // Render the initial page (HomePage) and pass navigationController
        // HomePage will use this to navigate to demo pages
        <HomePage navigationController={navigationController} />;
      })}
    </NavigationRoot>;
  }

  onDestroy() {
    // Cleanup logic would go here
    // Called when the component is being destroyed
  }
}
