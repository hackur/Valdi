import { Component, StatefulComponent } from 'valdi_core/src/Component';
import { INavigator } from './INavigator';
import { NavigationController, NavigationOptions } from './NavigationController';
import { INavigationComponent, NavigationPageContext } from './NavigationComponent';

/**
 * NavigationPageComponent - Base class for navigation pages
 *
 * Provides a convenient base class for pages that need navigation functionality.
 * Automatically creates a NavigationController instance from the component's context.
 *
 * **IMPORTANT - Android Compatibility Issue:**
 *
 * This class uses a class field initializer to create the navigationController:
 * ```typescript
 * navigationController: NavigationController = new NavigationController(this.context.navigator);
 * ```
 *
 * Class field initializers execute during object construction, BEFORE the component's
 * context has been fully initialized. This timing difference causes issues on Android:
 *
 * - **iOS**: Context is available during field initialization (works correctly)
 * - **Android**: Context is not available until after construction completes (throws error)
 *
 * **Error on Android:**
 * ```
 * Cannot read property 'navigator' of undefined
 * ```
 *
 * **Recommended Workaround:**
 *
 * Instead of extending NavigationPageComponent, use the @NavigationPage decorator
 * with the base Component class:
 *
 * ```typescript
 * import { Component } from 'valdi_core/src/Component';
 * import { NavigationPage } from 'valdi_navigation/src/NavigationPage';
 *
 * @NavigationPage(module)
 * export class MyPage extends Component<MyViewModel> {
 *   onRender() {
 *     // Access navigation via viewModel instead
 *     this.props.viewModel.navigationController.push(...);
 *   }
 * }
 * ```
 *
 * This approach provides the same navigation functionality without the Android
 * initialization timing issue.
 *
 * **When to Use NavigationPageComponent:**
 * - Only use this class if your app targets iOS exclusively
 * - For cross-platform apps (iOS + Android), prefer Component + @NavigationPage decorator
 *
 * @see Component for the base component class
 * @see NavigationPage for the decorator approach
 * @see NavigationController for navigation API documentation
 */
export abstract class NavigationPageComponent<
    ViewModel,
    ComponentContext extends NavigationPageContext = {
      navigator: INavigator;
    },
  >
  extends Component<ViewModel, ComponentContext>
  implements INavigationComponent
{
  static componentPath: string;
  // CAUTION: This field initializer causes Android runtime errors
  // See class documentation above for details and workarounds
  navigationController: NavigationController = new NavigationController(this.context.navigator);
}

/**
 * NavigationPageStatefulComponent - Stateful base class for navigation pages
 *
 * Provides a stateful base class for pages that need both navigation and state management.
 * Automatically creates a NavigationController instance from the component's context.
 *
 * **IMPORTANT - Android Compatibility Issue:**
 *
 * This class has the SAME Android initialization issue as NavigationPageComponent.
 * See the NavigationPageComponent documentation for detailed explanation.
 *
 * **Recommended Workaround:**
 *
 * Use StatefulComponent with the @NavigationPage decorator instead:
 *
 * ```typescript
 * import { StatefulComponent } from 'valdi_core/src/Component';
 * import { NavigationPage } from 'valdi_navigation/src/NavigationPage';
 *
 * @NavigationPage(module)
 * export class MyStatefulPage extends StatefulComponent<MyViewModel, MyState> {
 *   onRender() {
 *     // Access navigation via viewModel
 *     this.props.viewModel.navigationController.push(...);
 *   }
 * }
 * ```
 *
 * **When to Use NavigationPageStatefulComponent:**
 * - Only for iOS-exclusive applications
 * - For cross-platform apps, use StatefulComponent + @NavigationPage decorator
 *
 * @see StatefulComponent for the base stateful component class
 * @see NavigationPageComponent for more details on the Android issue
 * @see NavigationPage for the decorator approach
 */
export abstract class NavigationPageStatefulComponent<
    ViewModel,
    State,
    ComponentContext extends NavigationPageContext = {
      navigator: INavigator;
    },
  >
  extends StatefulComponent<ViewModel, State, ComponentContext>
  implements INavigationComponent
{
  static componentPath: string;
  // CAUTION: This field initializer causes Android runtime errors
  // See NavigationPageComponent documentation for details and workarounds
  navigationController: NavigationController = new NavigationController(this.context.navigator);
}
