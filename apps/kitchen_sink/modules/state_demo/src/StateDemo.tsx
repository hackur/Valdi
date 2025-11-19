/**
 * State Management & Lifecycle Demo
 *
 * Comprehensive demonstration of Valdi's state management system using StatefulComponent.
 * Shows how to manage component state, handle state updates, and understand the component
 * lifecycle.
 *
 * **StatefulComponent vs Component:**
 *
 * Valdi provides two base classes for components:
 *
 * 1. **Component** - For stateless components that only render based on props (viewModel)
 * 2. **StatefulComponent** - For components that maintain internal state that can change over time
 *
 * **State Management Pattern:**
 *
 * ```typescript
 * // Define state interface
 * interface MyState {
 *   counter: number;
 *   isVisible: boolean;
 * }
 *
 * // Extend StatefulComponent with ViewModel and State types
 * class MyComponent extends StatefulComponent<MyViewModel, MyState> {
 *   // Initialize state
 *   state: MyState = {
 *     counter: 0,
 *     isVisible: true,
 *   };
 *
 *   // Update state (triggers re-render)
 *   handleClick() {
 *     this.setState({ counter: this.state.counter + 1 });
 *   }
 * }
 * ```
 *
 * **The setState() Method:**
 *
 * - `setState(partialState)` merges the partial state object with current state
 * - Triggers a re-render of the component
 * - State updates are batched for performance
 * - Always use setState(), NEVER mutate this.state directly
 *
 * **Component Lifecycle Methods:**
 *
 * StatefulComponent provides lifecycle hooks called at specific points:
 *
 * 1. **onCreate()** - Called once when component is first created
 *    - Use for: Initial setup, subscriptions, one-time operations
 *
 * 2. **onViewModelUpdate(previous?)** - Called when props (viewModel) change
 *    - Use for: Responding to prop changes, derived state updates
 *
 * 3. **onRender()** - Called whenever component needs to render
 *    - Use for: Returning the component's UI tree
 *    - Called after state or viewModel changes
 *
 * 4. **onDestroy()** - Called when component is being removed
 *    - Use for: Cleanup, unsubscribing, releasing resources
 *
 * **State Immutability:**
 *
 * Valdi follows React-like immutability patterns:
 * - Don't mutate arrays/objects in state directly
 * - Create new copies when updating complex state
 * - Use spread operator for updates: `setState({ items: [...items, newItem] })`
 *
 * **Best Practices:**
 *
 * 1. Keep state minimal - derive values in render when possible
 * 2. Use StatefulComponent only when you need mutable state
 * 3. Prefer Component + props for simple, reusable components
 * 4. Don't store props in state (causes sync issues)
 * 5. Group related state updates in a single setState() call
 *
 * **Comparison to Other Frameworks:**
 *
 * - **React:** Similar to class components with `this.state` and `this.setState()`
 * - **Vue:** Similar to Vue 2's `data` and state management
 * - **Angular:** Similar to component properties with change detection
 *
 * **References:**
 * @see {@link https://github.com/valdi-labs/valdi|Valdi Framework Documentation}
 * @see StatefulComponent for the base class API
 * @see Component for stateless component pattern
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
  Button,
  CodeBlock,
} from '../../common/src/index';

/**
 * ViewModel interface defines the props (external data) passed to this component.
 * In this case, we only receive the navigationController from the parent.
 */
export interface StateDemoViewModel {
  navigationController: NavigationController;
}

/**
 * State interface defines all internal state managed by this component.
 * Each property represents a piece of data that can change over time.
 *
 * **State Design:**
 * - counter: Numeric value demonstrating increment/decrement operations
 * - likes: Separate counter for demonstrating independent state updates
 * - isToggled: Boolean state for demonstrating conditional rendering
 * - lifecycleLog: Array demonstrating mutable state (shows lifecycle events)
 */
interface StateDemoState {
  counter: number;
  likes: number;
  isToggled: boolean;
  lifecycleLog: string[];
}

@NavigationPage(module)
export class StateDemo extends StatefulComponent<StateDemoViewModel, StateDemoState> {
  /**
   * Initial State Declaration
   *
   * The `state` property must be initialized with default values for all state properties.
   * This is the ONLY place where you should directly assign to `state` - all other
   * state changes must go through `setState()`.
   *
   * **Pattern:**
   * - Set sensible defaults (0 for numbers, false for booleans, [] for arrays)
   * - Ensure type matches the StateDemoState interface
   * - Keep initialization simple (no async operations or side effects)
   */
  state: StateDemoState = {
    counter: 0,
    likes: 0,
    isToggled: false,
    lifecycleLog: [],
  };

  /**
   * onCreate() Lifecycle Method
   *
   * Called ONCE when the component is first created, before the first render.
   * This is the earliest lifecycle hook available.
   *
   * **Common Uses:**
   * - Setting up subscriptions or event listeners
   * - Starting timers or intervals
   * - Performing initial data fetching
   * - Logging component initialization
   *
   * **Important:**
   * - Don't rely on DOM/UI being ready (not rendered yet)
   * - Can call setState() here, but it won't trigger extra render
   */
  onCreate() {
    this.addLifecycleLog('onCreate() called');
  }

  /**
   * onViewModelUpdate() Lifecycle Method
   *
   * Called whenever the component's props (viewModel) change from the parent.
   * Receives the previous viewModel for comparison.
   *
   * **Common Uses:**
   * - Reacting to prop changes
   * - Updating state based on new props
   * - Re-fetching data when props change
   * - Validating new prop values
   *
   * **Pattern Example:**
   * ```typescript
   * onViewModelUpdate(previous?: MyViewModel) {
   *   if (previous?.userId !== this.viewModel.userId) {
   *     // User changed, fetch new data
   *     this.fetchUserData(this.viewModel.userId);
   *   }
   * }
   * ```
   */
  onViewModelUpdate(previous?: StateDemoViewModel) {
    this.addLifecycleLog(`onViewModelUpdate() called`);
  }

  /**
   * onDestroy() Lifecycle Method
   *
   * Called when the component is being removed from the UI tree.
   * This is your last chance to clean up resources.
   *
   * **Common Uses:**
   * - Clearing timers/intervals
   * - Unsubscribing from events
   * - Cancelling pending requests
   * - Releasing resources
   *
   * **Important:**
   * - Don't call setState() here (component is being destroyed)
   * - Always clean up to prevent memory leaks
   */
  onDestroy() {
    this.addLifecycleLog('onDestroy() called');
  }

  onRender() {
    <view style={styles.page}>
      {/* Header */}
      <Header
        title="State & Lifecycle"
        showBack={true}
        onBack={() => this.viewModel.navigationController.pop()}
      />

      {/* Content */}
      <scroll style={styles.scroll}>
        <layout style={styles.content}>
          {/* Counter Example */}
          <DemoSection
            title="State Management"
            description="Use setState() to update component state and trigger re-render"
          >
            <Card>
              <layout width="100%" alignItems="center">
                <label
                  font={Fonts.h1}
                  color={Colors.primary}
                  value={this.state.counter.toString()}
                />

                <layout flexDirection="row">
                  <Button
                    title="Decrement"
                    variant="outline"
                    onTap={() => this.setState({ counter: this.state.counter - 1 })}
                  />
                  <Button
                    title="Increment"
                    variant="primary"
                    onTap={() => this.setState({ counter: this.state.counter + 1 })}
                  />
                </layout>

                <Button
                  title="Reset"
                  variant="secondary"
                  size="small"
                  onTap={() => this.setState({ counter: 0 })}
                />
              </layout>
            </Card>
          </DemoSection>

          {/* Multiple State Values */}
          <DemoSection
            title="Multiple State Values"
            description="Manage multiple independent state values in one component"
          >
            <Card>
              <layout width="100%">
                {/* Likes counter */}
                <layout width="100%">
                  <layout flexDirection="row" alignItems="center" justifyContent="space-between" width="100%">
                    <label font={Fonts.h4} color={Colors.textPrimary} value="Likes" />
                    <label font={Fonts.h3} color={Colors.error} value={`❤️ ${this.state.likes}`} />
                  </layout>
                  <Button
                    title="Like this!"
                    variant="outline"
                    fullWidth={true}
                    onTap={() => this.setState({ likes: this.state.likes + 1 })}
                  />
                </layout>

                {/* Toggle state */}
                <layout width="100%">
                  <layout flexDirection="row" alignItems="center" justifyContent="space-between" width="100%">
                    <label font={Fonts.h4} color={Colors.textPrimary} value="Toggle" />
                    <label
                      font={Fonts.body}
                      color={this.state.isToggled ? Colors.success : Colors.textSecondary}
                      value={this.state.isToggled ? 'ON' : 'OFF'}
                    />
                  </layout>
                  <Button
                    title={this.state.isToggled ? 'Turn Off' : 'Turn On'}
                    variant={this.state.isToggled ? 'secondary' : 'primary'}
                    fullWidth={true}
                    onTap={() => this.setState({ isToggled: !this.state.isToggled })}
                  />
                </layout>
              </layout>
            </Card>
          </DemoSection>

          {/* Lifecycle Methods */}
          <DemoSection
            title="Lifecycle Methods"
            description="Track component lifecycle with onCreate, onViewModelUpdate, and onDestroy"
          >
            <Card>
              <layout width="100%">
                <label
                  font={Fonts.body}
                  color={Colors.textSecondary}
                  value="Lifecycle events logged below:"
                  numberOfLines={0}
                />

                <view
                  width="100%"
                  backgroundColor={Colors.gray100}
                  borderRadius={BorderRadius.sm}
                  padding={Spacing.md}
                  maxHeight={200}
                >
                  {this.state.lifecycleLog.length === 0 ? (
                    <label
                      font={Fonts.caption}
                      color={Colors.textTertiary}
                      value="No events yet"
                    />
                  ) : (
                    <layout width="100%">
                      {this.state.lifecycleLog.forEach((log, index) => (
                        <label
                          font={Fonts.caption}
                          color={Colors.textPrimary}
                          value={`${index + 1}. ${log}`}
                          numberOfLines={0}
                        />
                      ))}
                    </layout>
                  )}
                </view>

                <Button
                  title="Trigger State Update"
                  variant="outline"
                  fullWidth={true}
                  onTap={() => this.addLifecycleLog('Manual state update triggered')}
                />
              </layout>
            </Card>
          </DemoSection>

          {/* Code Example */}
          <DemoSection title="Code Example">
            <CodeBlock
              language="tsx"
              code={`import { StatefulComponent } from 'valdi_core/src/Component';

interface MyState {
  count: number;
}

export class Counter extends StatefulComponent<{}, MyState> {
  state: MyState = { count: 0 };

  onCreate() {
    // Component initialization
  }

  onRender() {
    <view>
      <label value={\`Count: \${this.state.count}\`} />
      <view onTap={() => {
        this.setState({ count: this.state.count + 1 });
      }}>
        <label value="Increment" />
      </view>
    </view>;
  }

  onDestroy() {
    // Cleanup
  }
}`}
            />
          </DemoSection>
        </layout>
      </scroll>
    </view>;
  }

  /**
   * Helper method demonstrating immutable array updates in state
   *
   * **Immutability Pattern for Arrays:**
   *
   * When updating arrays in state, you must create a NEW array rather than
   * mutating the existing one. This ensures Valdi detects the change and
   * triggers a re-render.
   *
   * **Wrong (mutates state directly):**
   * ```typescript
   * this.state.lifecycleLog.push(message); // ❌ Never do this!
   * ```
   *
   * **Correct (creates new array):**
   * ```typescript
   * this.setState({
   *   lifecycleLog: [...this.state.lifecycleLog, message] // ✅ Spread operator creates new array
   * });
   * ```
   *
   * **Why Immutability Matters:**
   * - Enables efficient change detection (reference comparison)
   * - Prevents bugs from unexpected state mutations
   * - Makes state changes predictable and traceable
   * - Allows for features like undo/redo
   *
   * **Common Array Update Patterns:**
   * ```typescript
   * // Add item
   * setState({ items: [...items, newItem] })
   *
   * // Remove item
   * setState({ items: items.filter(i => i.id !== removeId) })
   *
   * // Update item
   * setState({ items: items.map(i => i.id === updateId ? updatedItem : i) })
   *
   * // Replace all items
   * setState({ items: newItems })
   * ```
   */
  private addLifecycleLog(message: string) {
    this.setState({
      // Spread operator (...) creates a new array with existing items plus the new message
      // This is the immutable way to "append" to an array in state
      lifecycleLog: [...this.state.lifecycleLog, message],
    });
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
