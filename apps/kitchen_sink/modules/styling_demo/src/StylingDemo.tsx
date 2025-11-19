/**
 * Advanced Styling Demo
 *
 * Comprehensive demonstration of Valdi's advanced styling capabilities including gradients,
 * box shadows, blur effects, opacity, and combined effects for modern UI design.
 *
 * **Features Demonstrated:**
 *
 * 1. **Linear Gradients:**
 *    - Basic two-color gradients
 *    - Multi-color gradients
 *    - Custom gradient stops
 *    - Interactive gradient selector
 *
 * 2. **Box Shadows & Depth:**
 *    - Elevation levels (1-5)
 *    - Colored shadows (glows)
 *    - Interactive shadow demo
 *    - Press states with shadow changes
 *
 * 3. **Blur Effects:** (iOS-only)
 *    - Basic blur styles (light, dark, regular, prominent)
 *    - Blur over gradient backgrounds
 *    - Interactive blur style selector
 *
 * 4. **Opacity & Fading:**
 *    - Opacity control
 *    - Fade in/out animations
 *    - Layered opacity effects
 *
 * 5. **Combined Effects:**
 *    - Glassmorphism (blur + transparency + border)
 *    - Modern card designs
 *    - Real-world UI examples
 *
 * @see {@link https://github.com/valdi-labs/valdi|Valdi Framework Documentation}
 */

import { StatefulComponent } from 'valdi_core/src/Component';
import { Style } from 'valdi_core/src/Style';
import { AnimationCurve, PresetCurveAnimationOptions } from 'valdi_core/src/Animation';
import { NavigationController } from 'valdi_navigation/src/NavigationController';
import { NavigationPage } from 'valdi_navigation/src/NavigationPage';
import { View, Label, Layout, ScrollView, BlurView, BlurStyle } from 'valdi_tsx/src/NativeTemplateElements';

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

export interface StylingDemoViewModel {
  navigationController: NavigationController;
}

interface StylingDemoState {
  // Gradients
  gradientType: 'sunset' | 'ocean' | 'forest' | 'purple';

  // Shadows
  isPressed: boolean;

  // Blur
  selectedBlurStyle: BlurStyle;
  showBlur: boolean;

  // Opacity
  opacity: number;
  fadeVisible: boolean;
}

@NavigationPage(module)
export class StylingDemo extends StatefulComponent<StylingDemoViewModel, StylingDemoState> {
  state: StylingDemoState = {
    gradientType: 'sunset',
    isPressed: false,
    selectedBlurStyle: 'light',
    showBlur: false,
    opacity: 1,
    fadeVisible: true,
  };

  onRender() {
    <view style={styles.page}>
      {/* Header */}
      <Header
        title="Advanced Styling"
        showBack={true}
        onBack={() => this.viewModel.navigationController.pop()}
      />

      {/* Content */}
      <scroll style={styles.scroll}>
        <layout style={styles.content}>
          {/* Linear Gradients */}
          <DemoSection
            title="Linear Gradients"
            description="Smooth color transitions with even and custom stops"
          >
            <Card>
              <layout width="100%">
                {/* Even-stop gradient */}
                <label value="Even-Stop Gradient" font={Fonts.body} color={Colors.text} />
                <view
                  width="100%"
                  height={120}
                  background="linear-gradient(#FF6B6B, #FFD93D, #6BCF7F)"
                  borderRadius={BorderRadius.base}
                  alignItems="center"
                  justifyContent="center"
                  margin={Spacing.xs}
                >
                  <label value="3 Color Gradient" font={Fonts.h3} color={Colors.white} />
                </view>

                {/* Custom-stop gradient */}
                <label value="Custom-Stop Gradient" font={Fonts.body} color={Colors.text} />
                <view
                  width="100%"
                  height={120}
                  background="linear-gradient(#667EEA 0%, #764BA2 50%, #F093FB 100%)"
                  borderRadius={BorderRadius.base}
                  alignItems="center"
                  justifyContent="center"
                  margin={Spacing.xs}
                >
                  <label value="Custom Stops" font={Fonts.h3} color={Colors.white} />
                </view>

                {/* Gradient selector */}
                <label value="Select Gradient Style" font={Fonts.body} color={Colors.text} />
                <layout flexDirection="row" flexWrap="wrap">
                  <Button
                    title="Sunset"
                    variant={this.state.gradientType === 'sunset' ? 'primary' : 'outline'}
                    size="small"
                    onTap={() => this.setState({ gradientType: 'sunset' })}
                  />
                  <Button
                    title="Ocean"
                    variant={this.state.gradientType === 'ocean' ? 'primary' : 'outline'}
                    size="small"
                    onTap={() => this.setState({ gradientType: 'ocean' })}
                  />
                  <Button
                    title="Forest"
                    variant={this.state.gradientType === 'forest' ? 'primary' : 'outline'}
                    size="small"
                    onTap={() => this.setState({ gradientType: 'forest' })}
                  />
                  <Button
                    title="Purple"
                    variant={this.state.gradientType === 'purple' ? 'primary' : 'outline'}
                    size="small"
                    onTap={() => this.setState({ gradientType: 'purple' })}
                  />
                </layout>

                {/* Selected gradient preview */}
                <view
                  width="100%"
                  height={100}
                  background={this.getGradient(this.state.gradientType)}
                  borderRadius={BorderRadius.base}
                  alignItems="center"
                  justifyContent="center"
                  margin={Spacing.xs}
                >
                  <label
                    value={this.state.gradientType.toUpperCase()}
                    font={Fonts.h2}
                    color={Colors.white}
                  />
                </view>
              </layout>
            </Card>
          </DemoSection>

          {/* Box Shadows & Depth */}
          <DemoSection
            title="Box Shadows & Elevation"
            description="Create depth perception with shadows"
          >
            <Card>
              <layout width="100%">
                {/* Elevation levels */}
                <label value="Elevation Levels (1-5)" font={Fonts.body} color={Colors.text} />
                <layout flexDirection="row" flexWrap="wrap" justifyContent="space-around">
                  {[1, 2, 3, 4, 5].map((elevation) => (
                    <view
                      key={elevation}
                      width={60}
                      height={60}
                      backgroundColor={Colors.surface}
                      borderRadius={BorderRadius.base}
                      boxShadow={this.getShadowForElevation(elevation)}
                      alignItems="center"
                      justifyContent="center"
                      margin={Spacing.xs}
                    >
                      <label value={`${elevation}`} font={Fonts.h2} color={Colors.text} />
                    </view>
                  ))}
                </layout>

                {/* Colored shadows (glows) */}
                <label value="Colored Shadows (Glows)" font={Fonts.body} color={Colors.text} />
                <layout flexDirection="row" justifyContent="space-around" flexWrap="wrap">
                  <view
                    width={80}
                    height={80}
                    backgroundColor={Colors.primary}
                    borderRadius={BorderRadius.base}
                    boxShadow="0 8 24 rgba(59, 130, 246, 0.5)"
                    margin={Spacing.xs}
                  />
                  <view
                    width={80}
                    height={80}
                    backgroundColor={Colors.secondary}
                    borderRadius={BorderRadius.base}
                    boxShadow="0 8 24 rgba(139, 92, 246, 0.5)"
                    margin={Spacing.xs}
                  />
                  <view
                    width={80}
                    height={80}
                    backgroundColor={Colors.success}
                    borderRadius={BorderRadius.base}
                    boxShadow="0 8 24 rgba(34, 197, 94, 0.5)"
                    margin={Spacing.xs}
                  />
                </layout>

                {/* Interactive shadow demo */}
                <label value="Press to See Shadow Change" font={Fonts.body} color={Colors.text} />
                <view
                  width={150}
                  height={150}
                  backgroundColor={Colors.surface}
                  borderRadius={BorderRadius.base}
                  boxShadow={
                    this.state.isPressed
                      ? '0 2 4 rgba(0, 0, 0, 0.1)'
                      : '0 8 24 rgba(0, 0, 0, 0.2)'
                  }
                  scaleX={this.state.isPressed ? 0.95 : 1}
                  scaleY={this.state.isPressed ? 0.95 : 1}
                  onTouch={(e) =>
                    this.setState({ isPressed: e.state === 0 || e.state === 1 })
                  }
                  alignItems="center"
                  justifyContent="center"
                  margin={Spacing.xs}
                >
                  <label
                    value={this.state.isPressed ? 'Pressed!' : 'Press Me'}
                    font={Fonts.h3}
                    color={Colors.text}
                  />
                </view>
              </layout>
            </Card>
          </DemoSection>

          {/* Blur Effects */}
          <DemoSection
            title="Blur Effects"
            description="Glassmorphism with backdrop blur (iOS-only)"
          >
            <Card>
              <layout width="100%">
                <label
                  value="Note: Blur effects work best on iOS devices"
                  font={Fonts.caption}
                  color={Colors.warning}
                  numberOfLines={0}
                />

                <Button
                  title={this.state.showBlur ? 'Hide Blur' : 'Show Blur'}
                  variant={this.state.showBlur ? 'primary' : 'outline'}
                  onTap={() => this.setState({ showBlur: !this.state.showBlur })}
                />

                {/* Blur over gradient */}
                <view
                  width="100%"
                  height={200}
                  background="linear-gradient(#667EEA, #764BA2)"
                  borderRadius={BorderRadius.base}
                  position="relative"
                  margin={Spacing.xs}
                >
                  {this.state.showBlur && (
                    <blur
                      width="100%"
                      height="100%"
                      blurStyle={this.state.selectedBlurStyle}
                      borderRadius={BorderRadius.base}
                    >
                      <layout
                        width="100%"
                        height="100%"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <label value="Blurred Content" font={Fonts.h2} color={Colors.white} />
                      </layout>
                    </blur>
                  )}

                  {!this.state.showBlur && (
                    <layout
                      width="100%"
                      height="100%"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <label value="No Blur" font={Fonts.h2} color={Colors.white} />
                    </layout>
                  )}
                </view>

                {/* Blur style selector */}
                {this.state.showBlur && (
                  <layout width="100%">
                    <label value="Blur Style" font={Fonts.body} color={Colors.text} />
                    <layout flexDirection="row" flexWrap="wrap">
                      <Button
                        title="Light"
                        variant={this.state.selectedBlurStyle === 'light' ? 'primary' : 'outline'}
                        size="small"
                        onTap={() => this.setState({ selectedBlurStyle: 'light' })}
                      />
                      <Button
                        title="Dark"
                        variant={this.state.selectedBlurStyle === 'dark' ? 'primary' : 'outline'}
                        size="small"
                        onTap={() => this.setState({ selectedBlurStyle: 'dark' })}
                      />
                      <Button
                        title="Regular"
                        variant={
                          this.state.selectedBlurStyle === 'regular' ? 'primary' : 'outline'
                        }
                        size="small"
                        onTap={() => this.setState({ selectedBlurStyle: 'regular' })}
                      />
                      <Button
                        title="Prominent"
                        variant={
                          this.state.selectedBlurStyle === 'prominent' ? 'primary' : 'outline'
                        }
                        size="small"
                        onTap={() => this.setState({ selectedBlurStyle: 'prominent' })}
                      />
                    </layout>
                  </layout>
                )}
              </layout>
            </Card>
          </DemoSection>

          {/* Opacity & Fading */}
          <DemoSection
            title="Opacity & Fading"
            description="Transparency and fade animations"
          >
            <Card>
              <layout width="100%">
                {/* Opacity control */}
                <label
                  value={`Opacity: ${(this.state.opacity * 100).toFixed(0)}%`}
                  font={Fonts.body}
                  color={Colors.text}
                />

                <view
                  width={200}
                  height={200}
                  backgroundColor={Colors.primary}
                  borderRadius={BorderRadius.base}
                  opacity={this.state.opacity}
                  alignItems="center"
                  justifyContent="center"
                  margin={Spacing.xs}
                >
                  <label
                    value={`${(this.state.opacity * 100).toFixed(0)}%`}
                    font={Fonts.h1}
                    color={Colors.white}
                  />
                </view>

                {/* Opacity presets */}
                <layout flexDirection="row" flexWrap="wrap">
                  {[0, 0.25, 0.5, 0.75, 1].map((op) => (
                    <Button
                      key={op}
                      title={`${(op * 100).toFixed(0)}%`}
                      variant={this.state.opacity === op ? 'primary' : 'outline'}
                      size="small"
                      onTap={() => this.setState({ opacity: op })}
                    />
                  ))}
                </layout>

                {/* Fade animation */}
                <label value="Fade Animation" font={Fonts.body} color={Colors.text} />

                <view
                  width={200}
                  height={100}
                  backgroundColor={Colors.secondary}
                  borderRadius={BorderRadius.base}
                  opacity={this.state.fadeVisible ? 1 : 0}
                  alignItems="center"
                  justifyContent="center"
                  margin={Spacing.xs}
                >
                  <label value="I fade in/out" font={Fonts.h3} color={Colors.white} />
                </view>

                <layout flexDirection="row">
                  <Button
                    title="Fade In"
                    variant="primary"
                    size="small"
                    onTap={() => this.animateFade(true)}
                  />
                  <Button
                    title="Fade Out"
                    variant="outline"
                    size="small"
                    onTap={() => this.animateFade(false)}
                  />
                </layout>
              </layout>
            </Card>
          </DemoSection>

          {/* Combined Effects */}
          <DemoSection
            title="Combined Effects"
            description="Real-world UI examples with multiple effects"
          >
            <Card>
              <layout width="100%">
                {/* Premium card with gradient + shadow */}
                <label value="Premium Card" font={Fonts.body} color={Colors.text} />
                <view
                  width="100%"
                  background="linear-gradient(135deg, #667EEA 0%, #764BA2 100%)"
                  borderRadius={BorderRadius.base}
                  boxShadow="0 10 30 rgba(102, 126, 234, 0.4)"
                  padding={Spacing.lg}
                  margin={Spacing.xs}
                >
                  <label value="Premium" font={Fonts.h1} color={Colors.white} />
                  <label
                    value="$29/month"
                    font={Fonts.h2}
                    color="rgba(255, 255, 255, 0.9)"
                  />
                  <label
                    value="All features included"
                    font={Fonts.body}
                    color="rgba(255, 255, 255, 0.7)"
                  />
                </view>

                {/* Glass card effect */}
                <label value="Glassmorphism Card" font={Fonts.body} color={Colors.text} />
                <view
                  width="100%"
                  height={200}
                  background="linear-gradient(#FF6B6B, #4ECDC4)"
                  borderRadius={BorderRadius.base}
                  padding={Spacing.base}
                  margin={Spacing.xs}
                >
                  <view
                    width="100%"
                    height="100%"
                    backgroundColor="rgba(255, 255, 255, 0.15)"
                    borderRadius={BorderRadius.base}
                    boxShadow="0 8 32 rgba(0, 0, 0, 0.1)"
                    borderWidth={1}
                    borderColor="rgba(255, 255, 255, 0.3)"
                    padding={Spacing.base}
                    justifyContent="center"
                  >
                    <label value="Glass Effect" font={Fonts.h2} color={Colors.white} />
                    <label
                      value="Semi-transparent with border"
                      font={Fonts.body}
                      color="rgba(255, 255, 255, 0.8)"
                    />
                  </view>
                </view>

                {/* Elevated card */}
                <label value="Elevated Card" font={Fonts.body} color={Colors.text} />
                <view
                  width="100%"
                  backgroundColor={Colors.surface}
                  borderRadius={BorderRadius.base}
                  boxShadow="0 8 24 rgba(0, 0, 0, 0.12)"
                  padding={Spacing.lg}
                  margin={Spacing.xs}
                >
                  <label value="Featured Content" font={Fonts.h2} color={Colors.text} />
                  <label
                    value="This card has elevation 4 shadow with smooth edges"
                    font={Fonts.body}
                    color={Colors.textSecondary}
                    numberOfLines={0}
                  />
                </view>
              </layout>
            </Card>
          </DemoSection>
        </layout>
      </scroll>
    </view>;
  }

  // Gradient helpers

  private getGradient(type: string): string {
    const gradients = {
      sunset: 'linear-gradient(#FF6B6B, #FFD93D, #6BCF7F)',
      ocean: 'linear-gradient(#667EEA 0%, #764BA2 100%)',
      forest: 'linear-gradient(#134E5E, #71B280)',
      purple: 'linear-gradient(#667EEA, #764BA2, #F093FB)',
    };

    return gradients[type] || gradients.sunset;
  }

  // Shadow helpers

  private getShadowForElevation(elevation: number): string {
    const shadows = [
      '0 1 3 rgba(0, 0, 0, 0.12)', // Elevation 1
      '0 2 6 rgba(0, 0, 0, 0.16)', // Elevation 2
      '0 4 12 rgba(0, 0, 0, 0.2)', // Elevation 3
      '0 8 24 rgba(0, 0, 0, 0.24)', // Elevation 4
      '0 16 48 rgba(0, 0, 0, 0.28)', // Elevation 5
    ];

    return shadows[elevation - 1] || shadows[0];
  }

  // Animation helpers

  private animateFade(show: boolean) {
    const options: PresetCurveAnimationOptions = {
      duration: 0.4,
      curve: AnimationCurve.EaseInOut,
    };

    this.animate(options, () => {
      this.setState({ fadeVisible: show });
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
