/**
 * Animation & Curves Demo
 *
 * Comprehensive demonstration of Valdi's animation system, including animation curves,
 * timing functions, and animatable properties. Shows how to create smooth, performant
 * animations for UI elements.
 *
 * **Animation System Overview:**
 *
 * Valdi provides a declarative animation API through the `animate()` method. Instead of
 * manually updating values over time, you declare the target state and animation parameters,
 * and Valdi handles the interpolation.
 *
 * **Basic Animation Pattern:**
 * ```typescript
 * animate(
 *   // Target state (what to animate to)
 *   () => this.setState({ boxScale: 2 }),
 *   // Animation options
 *   { duration: 300, curve: AnimationCurve.easeInOut }
 * );
 * ```
 *
 * **Animation Curves (Timing Functions):**
 *
 * Curves control the rate of change during an animation, affecting how it "feels":
 *
 * 1. **Linear** - Constant speed from start to finish
 *    - Use for: Progress indicators, looping animations
 *    - Feels: Mechanical, steady
 *
 * 2. **EaseIn** - Starts slow, accelerates
 *    - Use for: Elements entering the screen, fade-ins
 *    - Feels: Natural entry, gathering momentum
 *
 * 3. **EaseOut** - Starts fast, decelerates
 *    - Use for: Elements exiting, settling into place
 *    - Feels: Natural deceleration, coming to rest
 *
 * 4. **EaseInOut** - Starts slow, fast in middle, ends slow
 *    - Use for: State transitions, smooth property changes
 *    - Feels: Most natural for UI transitions
 *
 * 5. **Spring** - Physics-based bouncy motion
 *    - Use for: Interactive elements, attention-grabbing effects
 *    - Feels: Playful, dynamic, responsive
 *
 * **Animatable Properties:**
 *
 * Most visual properties can be animated:
 * - **Layout:** width, height, padding, margin
 * - **Position:** translateX, translateY, left, top
 * - **Transform:** scale, rotate, skew
 * - **Visual:** opacity, backgroundColor, borderColor
 * - **Effects:** borderRadius, shadowOpacity
 *
 * **Animation Options:**
 * ```typescript
 * interface AnimationOptions {
 *   duration: number;        // Animation length in milliseconds
 *   curve: AnimationCurve;  // Timing function (easeIn, easeOut, etc.)
 *   delay?: number;         // Wait before starting (optional)
 * }
 * ```
 *
 * **Chaining & Sequences:**
 *
 * Animations can be chained by calling animate() in the completion callback:
 * ```typescript
 * animate(
 *   () => this.setState({ scale: 2 }),
 *   { duration: 300, curve: AnimationCurve.easeOut },
 *   () => {
 *     // Called when first animation completes
 *     animate(
 *       () => this.setState({ scale: 1 }),
 *       { duration: 300, curve: AnimationCurve.easeIn }
 *     );
 *   }
 * );
 * ```
 *
 * **Best Practices:**
 *
 * 1. **Keep durations short** (150-400ms) for UI responsiveness
 * 2. **Use easeInOut** for most transitions (feels most natural)
 * 3. **Use spring** sparingly (can be distracting if overused)
 * 4. **Animate transforms** (scale, rotate) over layout properties for better performance
 * 5. **Test on real devices** - animations may feel different on actual hardware
 * 6. **Respect accessibility** - provide reduced-motion alternatives
 *
 * **Performance Tips:**
 *
 * - Prefer transform/opacity animations (GPU-accelerated)
 * - Avoid animating layout properties (width, height) if possible
 * - Use lower framerates on older devices
 * - Limit concurrent animations
 *
 * **Comparison to Other Frameworks:**
 *
 * - **React:** Similar to React Spring or Framer Motion
 * - **Vue:** Similar to Vue's <transition> component
 * - **CSS:** Similar to CSS transitions and @keyframes animations
 *
 * **References:**
 * @see {@link https://github.com/valdi-labs/valdi|Valdi Framework Documentation}
 * @see AnimationCurve for available curve types
 * @see PresetCurveAnimationOptions for animation configuration
 */

import { StatefulComponent } from 'valdi_core/src/Component';
import { Style } from 'valdi_core/src/Style';
import { PresetCurveAnimationOptions, AnimationCurve } from 'valdi_core/src/AnimationOptions';
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
  AnimationDurations,
} from '../../common/src/index';

export interface AnimationDemoViewModel {
  navigationController: NavigationController;
}

interface AnimationDemoState {
  // Color animation
  boxColor: string;

  // Size animation
  boxScale: number;

  // Position animation
  boxPosition: number;

  // Opacity animation
  boxOpacity: number;

  // Rotation animation
  boxRotation: number;

  // Combined animation
  combinedScale: number;
  combinedOpacity: number;
}

@NavigationPage(module)
export class AnimationDemo extends StatefulComponent<AnimationDemoViewModel, AnimationDemoState> {
  state: AnimationDemoState = {
    boxColor: Colors.primary,
    boxScale: 1,
    boxPosition: 0,
    boxOpacity: 1,
    boxRotation: 0,
    combinedScale: 1,
    combinedOpacity: 1,
  };

  onRender() {
    <view style={styles.page}>
      {/* Header */}
      <Header
        title="Animations"
        showBack={true}
        onBack={() => this.viewModel.navigationController.pop()}
      />

      {/* Content */}
      <scroll style={styles.scroll}>
        <layout style={styles.content}>
          {/* Color Animation */}
          <DemoSection
            title="Color Animation"
            description="Animate backgroundColor with smooth transitions"
          >
            <Card>
              <layout width="100%" alignItems="center">
                <view
                  width={100}
                  height={100}
                  backgroundColor={this.state.boxColor}
                  borderRadius={BorderRadius.base}
                />

                <layout flexDirection="row">
                  <Button
                    title="Blue"
                    variant="primary"
                    size="small"
                    onTap={() => this.animateColor(Colors.primary)}
                  />
                  <Button
                    title="Purple"
                    variant="secondary"
                    size="small"
                    onTap={() => this.animateColor(Colors.secondary)}
                  />
                  <Button
                    title="Green"
                    variant="outline"
                    size="small"
                    onTap={() => this.animateColor(Colors.success)}
                  />
                </layout>
              </layout>
            </Card>
          </DemoSection>

          {/* Scale Animation */}
          <DemoSection
            title="Scale Animation"
            description="Animate size using scaleX and scaleY properties"
          >
            <Card>
              <layout width="100%" alignItems="center">
                <view
                  width={100}
                  height={100}
                  backgroundColor={Colors.secondary}
                  borderRadius={BorderRadius.base}
                  scaleX={this.state.boxScale}
                  scaleY={this.state.boxScale}
                />

                <layout flexDirection="row">
                  <Button
                    title="Small"
                    variant="outline"
                    size="small"
                    onTap={() => this.animateScale(0.5)}
                  />
                  <Button
                    title="Normal"
                    variant="primary"
                    size="small"
                    onTap={() => this.animateScale(1)}
                  />
                  <Button
                    title="Large"
                    variant="secondary"
                    size="small"
                    onTap={() => this.animateScale(1.5)}
                  />
                </layout>
              </layout>
            </Card>
          </DemoSection>

          {/* Position Animation */}
          <DemoSection
            title="Position Animation"
            description="Animate position using translationX and translationY"
          >
            <Card>
              <layout width="100%">
                <view
                  width="100%"
                  height={120}
                  backgroundColor={Colors.gray100}
                  borderRadius={BorderRadius.base}
                  alignItems="center"
                  justifyContent="center"
                >
                  <view
                    width={60}
                    height={60}
                    backgroundColor={Colors.success}
                    borderRadius={BorderRadius.full}
                    translationX={this.state.boxPosition}
                  />
                </view>

                <layout flexDirection="row" justifyContent="center">
                  <Button
                    title="← Left"
                    variant="outline"
                    size="small"
                    onTap={() => this.animatePosition(-80)}
                  />
                  <Button
                    title="Center"
                    variant="primary"
                    size="small"
                    onTap={() => this.animatePosition(0)}
                  />
                  <Button
                    title="Right →"
                    variant="outline"
                    size="small"
                    onTap={() => this.animatePosition(80)}
                  />
                </layout>
              </layout>
            </Card>
          </DemoSection>

          {/* Opacity Animation */}
          <DemoSection
            title="Opacity Animation"
            description="Fade in and out using opacity property"
          >
            <Card>
              <layout width="100%" alignItems="center">
                <view
                  width={100}
                  height={100}
                  backgroundColor={Colors.warning}
                  borderRadius={BorderRadius.base}
                  opacity={this.state.boxOpacity}
                />

                <layout flexDirection="row">
                  <Button
                    title="Hide"
                    variant="outline"
                    size="small"
                    onTap={() => this.animateOpacity(0)}
                  />
                  <Button
                    title="50%"
                    variant="outline"
                    size="small"
                    onTap={() => this.animateOpacity(0.5)}
                  />
                  <Button
                    title="Show"
                    variant="primary"
                    size="small"
                    onTap={() => this.animateOpacity(1)}
                  />
                </layout>
              </layout>
            </Card>
          </DemoSection>

          {/* Rotation Animation */}
          <DemoSection
            title="Rotation Animation"
            description="Rotate elements using rotation property (in radians)"
          >
            <Card>
              <layout width="100%" alignItems="center">
                <view
                  width={100}
                  height={100}
                  backgroundColor={Colors.error}
                  borderRadius={BorderRadius.base}
                  rotation={this.state.boxRotation}
                >
                  <layout width="100%" height="100%" alignItems="center" justifyContent="center">
                    <label font={Fonts.h2} color={Colors.white} value="↑" />
                  </layout>
                </view>

                <layout flexDirection="row">
                  <Button
                    title="90°"
                    variant="outline"
                    size="small"
                    onTap={() => this.animateRotation(Math.PI / 2)}
                  />
                  <Button
                    title="180°"
                    variant="outline"
                    size="small"
                    onTap={() => this.animateRotation(Math.PI)}
                  />
                  <Button
                    title="360°"
                    variant="primary"
                    size="small"
                    onTap={() => this.animateRotation(Math.PI * 2)}
                  />
                  <Button
                    title="Reset"
                    variant="secondary"
                    size="small"
                    onTap={() => this.animateRotation(0)}
                  />
                </layout>
              </layout>
            </Card>
          </DemoSection>

          {/* Combined Animation */}
          <DemoSection
            title="Combined Animations"
            description="Animate multiple properties simultaneously"
          >
            <Card>
              <layout width="100%" alignItems="center">
                <view
                  width={100}
                  height={100}
                  backgroundColor={Colors.primary}
                  borderRadius={BorderRadius.base}
                  scaleX={this.state.combinedScale}
                  scaleY={this.state.combinedScale}
                  opacity={this.state.combinedOpacity}
                />

                <layout flexDirection="row">
                  <Button
                    title="Pulse"
                    variant="primary"
                    onTap={() => this.animatePulse()}
                  />
                  <Button
                    title="Reset"
                    variant="outline"
                    onTap={() => this.resetCombined()}
                  />
                </layout>
              </layout>
            </Card>
          </DemoSection>

          {/* Code Example */}
          <DemoSection title="Code Example">
            <CodeBlock
              language="tsx"
              code={`// Animate background color
this.animate(
  { duration: 0.3, curve: 'easeInOut' as const },
  () => {
    this.setState({ boxColor: '#3B82F6' });
  }
);

// Animate multiple properties
this.animate(
  { duration: 0.5, curve: 'easeInOut' as const },
  () => {
    this.setState({
      scale: 1.5,
      opacity: 0.5,
      rotation: Math.PI,
    });
  }
);`}
            />
          </DemoSection>
        </layout>
      </scroll>
    </view>;
  }

  // Animation methods
  private animateColor(color: string) {
    const options: PresetCurveAnimationOptions = { duration: 0.3, curve: AnimationCurve.EaseInOut };
    this.animate(options, () => {
      this.setState({ boxColor: color });
    });
  }

  private animateScale(scale: number) {
    const options: PresetCurveAnimationOptions = { duration: 0.3, curve: AnimationCurve.EaseInOut };
    this.animate(options, () => {
      this.setState({ boxScale: scale });
    });
  }

  private animatePosition(position: number) {
    const options: PresetCurveAnimationOptions = { duration: 0.3, curve: AnimationCurve.EaseInOut };
    this.animate(options, () => {
      this.setState({ boxPosition: position });
    });
  }

  private animateOpacity(opacity: number) {
    const options: PresetCurveAnimationOptions = { duration: 0.3, curve: AnimationCurve.EaseInOut };
    this.animate(options, () => {
      this.setState({ boxOpacity: opacity });
    });
  }

  private animateRotation(rotation: number) {
    const options: PresetCurveAnimationOptions = { duration: 0.3, curve: AnimationCurve.EaseInOut };
    this.animate(options, () => {
      this.setState({ boxRotation: rotation });
    });
  }

  private animatePulse() {
    // Animate to larger size with fade
    const optionsOut: PresetCurveAnimationOptions = { duration: 0.3, curve: AnimationCurve.EaseOut };
    this.animate(optionsOut, () => {
      this.setState({ combinedScale: 1.3, combinedOpacity: 0.7 });
    });

    // After 300ms, animate back
    setTimeout(() => {
      const optionsIn: PresetCurveAnimationOptions = { duration: 0.3, curve: AnimationCurve.EaseIn };
      this.animate(optionsIn, () => {
        this.setState({ combinedScale: 1, combinedOpacity: 1 });
      });
    }, 300);
  }

  private resetCombined() {
    const options: PresetCurveAnimationOptions = { duration: 0.3, curve: AnimationCurve.EaseInOut };
    this.animate(options, () => {
      this.setState({ combinedScale: 1, combinedOpacity: 1 });
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
