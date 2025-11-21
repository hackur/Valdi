/**
 * Shapes & Paths Demo
 *
 * Comprehensive demonstration of Valdi's vector graphics capabilities using GeometricPathBuilder
 * and ShapeView. Shows custom shapes, paths, stroke/fill properties, curves, and animations.
 *
 * **Features Demonstrated:**
 *
 * 1. **Basic Shapes:**
 *    - Rectangle, RoundedRect, Circle/Oval
 *    - Triangle (custom path)
 *    - Star (complex custom path)
 *    - Interactive shape selector
 *
 * 2. **Stroke vs Fill:**
 *    - Stroke and fill toggles
 *    - Stroke width variations
 *    - Stroke cap styles (butt, round, square)
 *    - Stroke join styles (bevel, miter, round)
 *
 * 3. **Bezier Curves & Arcs:**
 *    - Quadratic curves (quadTo)
 *    - Cubic curves (cubicTo)
 *    - Arcs with angle control
 *    - Control point visualization
 *
 * 4. **Path Animation:**
 *    - strokeStart/strokeEnd animation
 *    - Drawing line effect
 *    - Animated checkmark
 *    - Loading spinner
 *
 * @see {@link https://github.com/valdi-labs/valdi|Valdi Framework Documentation}
 */

import { StatefulComponent } from 'valdi_core/src/Component';
import { Style } from 'valdi_core/src/Style';
import { AnimationCurve, PresetCurveAnimationOptions } from 'valdi_core/src/AnimationOptions';
import { NavigationController } from 'valdi_navigation/src/NavigationController';
import { NavigationPage } from 'valdi_navigation/src/NavigationPage';
import { GeometricPathBuilder, GeometricPathScaleType } from 'valdi_core/src/GeometricPath';
import {
  View,
  Label,
  Layout,
  ScrollView,
  ShapeView,
  ShapeStrokeCap,
  ShapeStrokeJoin,
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

export interface ShapesDemoViewModel {
  navigationController: NavigationController;
}

interface ShapesDemoState {
  // Basic shapes
  selectedShape: 'rectangle' | 'roundedRect' | 'circle' | 'triangle' | 'star';

  // Stroke vs Fill
  showStroke: boolean;
  showFill: boolean;
  strokeWidth: number;
  strokeCap: ShapeStrokeCap;
  strokeJoin: ShapeStrokeJoin;

  // Curves
  curveType: 'quad' | 'cubic' | 'arc';
  arcAngle: number;

  // Path animation
  strokeStart: number;
  strokeEnd: number;
  isAnimating: boolean;
  spinnerRotation: number;
}

@NavigationPage(module)
export class ShapesDemo extends StatefulComponent<ShapesDemoViewModel, ShapesDemoState> {
  private spinnerInterval?: any;

  state: ShapesDemoState = {
    selectedShape: 'star',
    showStroke: true,
    showFill: true,
    strokeWidth: 2,
    strokeCap: 'round',
    strokeJoin: 'round',
    curveType: 'quad',
    arcAngle: Math.PI,
    strokeStart: 0,
    strokeEnd: 1,
    isAnimating: false,
    spinnerRotation: 0,
  };

  componentDidMount() {
    // Animate spinner
    this.spinnerInterval = setInterval(() => {
      this.setState({ spinnerRotation: this.state.spinnerRotation + 0.1 });
    }, 16);
  }

  componentWillUnmount() {
    if (this.spinnerInterval) {
      clearInterval(this.spinnerInterval);
    }
  }

  onRender() {
    <view style={styles.page}>
      <Header
        title="Shapes & Paths"
        showBack={true}
        onBack={() => this.viewModel.navigationController.pop()}
      />

      <scroll style={styles.scroll}>
        <layout style={styles.content}>
          {/* Basic Shapes */}
          <DemoSection title="Basic Shapes" description="Built-in and custom shapes with GeometricPathBuilder">
            <Card>
              <layout width="100%">
                <layout flexDirection="row" flexWrap="wrap">
                  <Button
                    title="Rectangle"
                    variant={this.state.selectedShape === 'rectangle' ? 'primary' : 'outline'}
                    size="small"
                    onTap={() => this.setState({ selectedShape: 'rectangle' })}
                  />
                  <Button
                    title="Rounded"
                    variant={this.state.selectedShape === 'roundedRect' ? 'primary' : 'outline'}
                    size="small"
                    onTap={() => this.setState({ selectedShape: 'roundedRect' })}
                  />
                  <Button
                    title="Circle"
                    variant={this.state.selectedShape === 'circle' ? 'primary' : 'outline'}
                    size="small"
                    onTap={() => this.setState({ selectedShape: 'circle' })}
                  />
                  <Button
                    title="Triangle"
                    variant={this.state.selectedShape === 'triangle' ? 'primary' : 'outline'}
                    size="small"
                    onTap={() => this.setState({ selectedShape: 'triangle' })}
                  />
                  <Button
                    title="Star"
                    variant={this.state.selectedShape === 'star' ? 'primary' : 'outline'}
                    size="small"
                    onTap={() => this.setState({ selectedShape: 'star' })}
                  />
                </layout>

                <view
                  width="100%"
                  height={200}
                  backgroundColor={Colors.gray100}
                  borderRadius={BorderRadius.base}
                  alignItems="center"
                  justifyContent="center"
                  margin={Spacing.xs}
                >
                  <shape
                    width={150}
                    height={150}
                    path={this.getShapePath(this.state.selectedShape)}
                    fillColor={Colors.primary}
                    strokeColor={Colors.secondary}
                    strokeWidth={3}
                  />
                </view>
              </layout>
            </Card>
          </DemoSection>

          {/* Stroke vs Fill */}
          <DemoSection
            title="Stroke vs Fill"
            description="Control stroke and fill properties independently"
          >
            <Card>
              <layout width="100%">
                <layout flexDirection="row" flexWrap="wrap">
                  <Button
                    title={this.state.showStroke ? 'Stroke: ON' : 'Stroke: OFF'}
                    variant={this.state.showStroke ? 'primary' : 'outline'}
                    size="small"
                    onTap={() => this.setState({ showStroke: !this.state.showStroke })}
                  />
                  <Button
                    title={this.state.showFill ? 'Fill: ON' : 'Fill: OFF'}
                    variant={this.state.showFill ? 'primary' : 'outline'}
                    size="small"
                    onTap={() => this.setState({ showFill: !this.state.showFill })}
                  />
                </layout>

                <view
                  width="100%"
                  height={200}
                  backgroundColor={Colors.gray100}
                  borderRadius={BorderRadius.base}
                  alignItems="center"
                  justifyContent="center"
                  margin={Spacing.xs}
                >
                  <shape
                    width={150}
                    height={150}
                    path={this.createStrokeDemo()}
                    strokeColor={this.state.showStroke ? Colors.primary : undefined}
                    strokeWidth={this.state.strokeWidth}
                    strokeCap={this.state.strokeCap}
                    strokeJoin={this.state.strokeJoin}
                    fillColor={this.state.showFill ? Colors.secondary : undefined}
                  />
                </view>

                {this.state.showStroke && (
                  <layout width="100%">
                    <label
                      value={`Stroke Width: ${this.state.strokeWidth}px`}
                      font={Fonts.body}
                      color={Colors.textPrimary}
                    />
                    <layout flexDirection="row" flexWrap="wrap">
                      {[1, 2, 4, 8, 12].map((width) => (
                        <Button
                          key={`${width}`}
                          title={`${width}px`}
                          variant={this.state.strokeWidth === width ? 'primary' : 'outline'}
                          size="small"
                          onTap={() => this.setState({ strokeWidth: width })}
                        />
                      ))}
                    </layout>

                    <label value="Stroke Cap" font={Fonts.body} color={Colors.textPrimary} />
                    <layout flexDirection="row" flexWrap="wrap">
                      {['butt', 'round', 'square'].map((cap) => (
                        <Button
                          key={cap}
                          title={cap}
                          variant={this.state.strokeCap === cap ? 'primary' : 'outline'}
                          size="small"
                          onTap={() => this.setState({ strokeCap: cap as ShapeStrokeCap })}
                        />
                      ))}
                    </layout>

                    <label value="Stroke Join" font={Fonts.body} color={Colors.textPrimary} />
                    <layout flexDirection="row" flexWrap="wrap">
                      {['bevel', 'miter', 'round'].map((join) => (
                        <Button
                          key={join}
                          title={join}
                          variant={this.state.strokeJoin === join ? 'primary' : 'outline'}
                          size="small"
                          onTap={() => this.setState({ strokeJoin: join as ShapeStrokeJoin })}
                        />
                      ))}
                    </layout>
                  </layout>
                )}
              </layout>
            </Card>
          </DemoSection>

          {/* Curves & Arcs */}
          <DemoSection
            title="Bezier Curves & Arcs"
            description="Quadratic, cubic curves, and circular arcs"
          >
            <Card>
              <layout width="100%">
                <layout flexDirection="row" flexWrap="wrap">
                  <Button
                    title="Quadratic"
                    variant={this.state.curveType === 'quad' ? 'primary' : 'outline'}
                    size="small"
                    onTap={() => this.setState({ curveType: 'quad' })}
                  />
                  <Button
                    title="Cubic"
                    variant={this.state.curveType === 'cubic' ? 'primary' : 'outline'}
                    size="small"
                    onTap={() => this.setState({ curveType: 'cubic' })}
                  />
                  <Button
                    title="Arc"
                    variant={this.state.curveType === 'arc' ? 'primary' : 'outline'}
                    size="small"
                    onTap={() => this.setState({ curveType: 'arc' })}
                  />
                </layout>

                <view
                  width="100%"
                  height={220}
                  backgroundColor={Colors.gray100}
                  borderRadius={BorderRadius.base}
                  alignItems="center"
                  justifyContent="center"
                  margin={Spacing.xs}
                >
                  <shape
                    width={200}
                    height={200}
                    path={this.getCurvePath(this.state.curveType)}
                    strokeColor={Colors.primary}
                    strokeWidth={3}
                    strokeCap="round"
                  />
                </view>

                {this.state.curveType === 'arc' && (
                  <layout width="100%">
                    <label
                      value={`Arc Angle: ${this.toDegrees(this.state.arcAngle).toFixed(0)}°`}
                      font={Fonts.body}
                      color={Colors.textPrimary}
                    />
                    <layout flexDirection="row" flexWrap="wrap">
                      {[90, 180, 270, 360].map((degrees) => {
                        const radians = this.toRadians(degrees);
                        return (
                          <Button
                            key={`${degrees}`}
                            title={`${degrees}°`}
                            variant="outline"
                            size="small"
                            onTap={() => this.setState({ arcAngle: radians })}
                          />
                        );
                      })}
                    </layout>
                  </layout>
                )}
              </layout>
            </Card>
          </DemoSection>

          {/* Path Animation */}
          <DemoSection
            title="Path Animation"
            description="Animate paths with strokeStart and strokeEnd"
          >
            <Card>
              <layout width="100%">
                <label value="Animated Checkmark" font={Fonts.body} color={Colors.textPrimary} />
                <view
                  width="100%"
                  height={150}
                  backgroundColor={Colors.gray100}
                  borderRadius={BorderRadius.base}
                  alignItems="center"
                  justifyContent="center"
                  margin={Spacing.xs}
                >
                  <shape
                    width={100}
                    height={100}
                    path={this.createCheckmark()}
                    strokeColor={Colors.success}
                    strokeWidth={8}
                    strokeCap="round"
                    strokeJoin="round"
                    strokeStart={this.state.strokeStart}
                    strokeEnd={this.state.strokeEnd}
                  />
                </view>

                <layout flexDirection="row" flexWrap="wrap">
                  <Button
                    title="Animate Draw"
                    variant="primary"
                    size="small"
                    onTap={() => this.animatePathDraw()}
                  />
                  <Button
                    title="Reset"
                    variant="outline"
                    size="small"
                    onTap={() => this.setState({ strokeStart: 0, strokeEnd: 0 })}
                  />
                  <Button
                    title="Show Full"
                    variant="outline"
                    size="small"
                    onTap={() => this.setState({ strokeStart: 0, strokeEnd: 1 })}
                  />
                </layout>

                <label
                  value={`Start: ${(this.state.strokeStart * 100).toFixed(0)}% | End: ${(this.state.strokeEnd * 100).toFixed(0)}%`}
                  font={Fonts.caption}
                  color={Colors.textSecondary}
                />

                <label value="Animated Loader" font={Fonts.body} color={Colors.textPrimary} />
                <view
                  width="100%"
                  height={100}
                  backgroundColor={Colors.gray100}
                  borderRadius={BorderRadius.base}
                  alignItems="center"
                  justifyContent="center"
                  margin={Spacing.xs}
                >
                  <view width={80} height={80} rotation={this.state.spinnerRotation}>
                    <shape
                      width={80}
                      height={80}
                      path={this.createSpinner()}
                      strokeColor={Colors.primary}
                      strokeWidth={4}
                      strokeCap="round"
                      strokeStart={0}
                      strokeEnd={0.75}
                    />
                  </view>
                </view>
              </layout>
            </Card>
          </DemoSection>
        </layout>
      </scroll>
    </view>;
  }

  // Shape creation methods

  private getShapePath(shape: string) {
    switch (shape) {
      case 'rectangle':
        return this.createRectangle();
      case 'roundedRect':
        return this.createRoundedRect();
      case 'circle':
        return this.createCircle();
      case 'triangle':
        return this.createTriangle();
      case 'star':
        return this.createStar();
      default:
        return this.createRectangle();
    }
  }

  private createRectangle() {
    const builder = new GeometricPathBuilder(100, 100, GeometricPathScaleType.Contain);
    return builder.rectTo(10, 10, 80, 80).build();
  }

  private createRoundedRect() {
    const builder = new GeometricPathBuilder(100, 100, GeometricPathScaleType.Contain);
    return builder.roundRectTo(10, 10, 80, 80, 15, 15).build();
  }

  private createCircle() {
    const builder = new GeometricPathBuilder(100, 100, GeometricPathScaleType.Contain);
    return builder.ovalTo(10, 10, 80, 80).build();
  }

  private createTriangle() {
    const builder = new GeometricPathBuilder(100, 100, GeometricPathScaleType.Contain);
    return builder.moveTo(50, 10).lineTo(90, 90).lineTo(10, 90).close().build();
  }

  private createStar() {
    const builder = new GeometricPathBuilder(100, 100, GeometricPathScaleType.Contain);
    const centerX = 50;
    const centerY = 50;
    const outerRadius = 40;
    const innerRadius = 18;
    const points = 5;

    builder.moveTo(centerX, centerY - outerRadius);

    for (let i = 1; i <= points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (Math.PI * 2 * i) / (points * 2) - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      builder.lineTo(x, y);
    }

    return builder.close().build();
  }

  private createStrokeDemo() {
    const builder = new GeometricPathBuilder(150, 150, GeometricPathScaleType.Contain);
    return builder
      .moveTo(20, 20)
      .lineTo(130, 50)
      .lineTo(80, 130)
      .lineTo(40, 100)
      .close()
      .build();
  }

  // Curve creation methods

  private getCurvePath(type: string) {
    switch (type) {
      case 'quad':
        return this.createQuadCurve();
      case 'cubic':
        return this.createCubicCurve();
      case 'arc':
        return this.createArc();
      default:
        return this.createQuadCurve();
    }
  }

  private createQuadCurve() {
    const builder = new GeometricPathBuilder(200, 200, GeometricPathScaleType.Contain);
    return builder.moveTo(20, 180).quadTo(100, 20, 180, 180).build();
  }

  private createCubicCurve() {
    const builder = new GeometricPathBuilder(200, 200, GeometricPathScaleType.Contain);
    return builder.moveTo(20, 180).cubicTo(60, 20, 140, 20, 180, 180).build();
  }

  private createArc() {
    const builder = new GeometricPathBuilder(200, 200, GeometricPathScaleType.Contain);
    return builder
      .moveTo(100, 20)
      .arcTo(100, 100, 80, -Math.PI / 2, this.state.arcAngle)
      .build();
  }

  // Animation shapes

  private createCheckmark() {
    const builder = new GeometricPathBuilder(100, 100, GeometricPathScaleType.Contain);
    return builder.moveTo(20, 50).lineTo(40, 70).lineTo(80, 30).build();
  }

  private createSpinner() {
    const builder = new GeometricPathBuilder(100, 100, GeometricPathScaleType.Contain);
    return builder.arcTo(50, 50, 40, 0, Math.PI * 2).build();
  }

  // Animation methods

  private animatePathDraw() {
    this.setState({ isAnimating: true, strokeStart: 0, strokeEnd: 0 });

    const options: PresetCurveAnimationOptions = {
      duration: 1.5,
      curve: AnimationCurve.EaseInOut,
    };

    this.animate(options, () => {
      this.setState({ strokeEnd: 1, isAnimating: false });
    });
  }

  // Helper methods

  private toDegrees(radians: number): number {
    return (radians * 180) / Math.PI;
  }

  private toRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
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
