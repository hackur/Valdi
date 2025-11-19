/**
 * Gestures Demo
 *
 * Comprehensive demonstration of Valdi's gesture system including touch, tap, long press,
 * drag, pinch, and rotation gestures. Shows multi-touch tracking, velocity, and combined gestures.
 *
 * **Features Demonstrated:**
 *
 * 1. **Touch & Tap Gestures:**
 *    - onTouch event with state tracking (Started/Changed/Ended)
 *    - onTap for single tap
 *    - onLongPress for long press
 *    - Touch position visualization
 *    - Multi-touch tracking with pointerCount
 *
 * 2. **Drag Gesture:**
 *    - Draggable element with translationX/Y
 *    - Delta tracking (distance from start)
 *    - Velocity display in px/s
 *    - Visual feedback during drag
 *    - Reset to center button
 *
 * 3. **Pinch to Zoom:**
 *    - Two-finger pinch gesture
 *    - Scale value tracking
 *    - Min/max scale constraints
 *    - Visual feedback during pinch
 *    - Reset to original size
 *
 * 4. **Rotation Gesture:**
 *    - Two-finger rotation
 *    - Rotation in radians (converted to degrees for display)
 *    - Visual rotation of element
 *    - Snap to 90° increments toggle
 *    - Reset rotation
 *
 * 5. **Combined Gestures:**
 *    - Element responding to drag + pinch + rotate simultaneously
 *    - Interactive photo viewer simulation
 *    - Double-tap to reset all transforms
 *
 * @see {@link https://github.com/valdi-labs/valdi|Valdi Framework Documentation}
 */

import { StatefulComponent } from 'valdi_core/src/Component';
import { Style } from 'valdi_core/src/Style';
import { AnimationCurve, PresetCurveAnimationOptions } from 'valdi_core/src/Animation';
import { NavigationController } from 'valdi_navigation/src/NavigationController';
import { NavigationPage } from 'valdi_navigation/src/NavigationPage';
import {
  View,
  Label,
  Layout,
  ScrollView,
  TouchEvent,
  TouchEventState,
  DragEvent,
  PinchEvent,
  RotateEvent,
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

export interface GesturesDemoViewModel {
  navigationController: NavigationController;
}

interface GesturesDemoState {
  // Touch & Tap
  touchActive: boolean;
  touchPosition: { x: number; y: number };
  touchState: 'Started' | 'Changed' | 'Ended' | 'None';
  pointerCount: number;
  lastTapTime?: number;
  longPressActive: boolean;

  // Drag
  dragDelta: { x: number; y: number };
  dragVelocity: { x: number; y: number };
  isDragging: boolean;

  // Pinch
  scale: number;
  isPinching: boolean;
  minScale: number;
  maxScale: number;

  // Rotation
  rotation: number;
  isRotating: boolean;
  snapToAngles: boolean;

  // Combined
  combinedPosition: { x: number; y: number };
  combinedScale: number;
  combinedRotation: number;
  combinedLastTapTime?: number;
}

@NavigationPage(module)
export class GesturesDemo extends StatefulComponent<GesturesDemoViewModel, GesturesDemoState> {
  state: GesturesDemoState = {
    touchActive: false,
    touchPosition: { x: 0, y: 0 },
    touchState: 'None',
    pointerCount: 0,
    longPressActive: false,
    dragDelta: { x: 0, y: 0 },
    dragVelocity: { x: 0, y: 0 },
    isDragging: false,
    scale: 1,
    isPinching: false,
    minScale: 0.5,
    maxScale: 3,
    rotation: 0,
    isRotating: false,
    snapToAngles: false,
    combinedPosition: { x: 0, y: 0 },
    combinedScale: 1,
    combinedRotation: 0,
  };

  onRender() {
    <view style={styles.page}>
      {/* Header */}
      <Header
        title="Gestures"
        showBack={true}
        onBack={() => this.viewModel.navigationController.pop()}
      />

      {/* Content */}
      <scroll style={styles.scroll}>
        <layout style={styles.content}>
          {/* Touch & Tap Gestures */}
          <DemoSection
            title="Touch & Tap"
            description="Basic touch events with state tracking and long press"
          >
            <Card>
              <layout width="100%">
                <view
                  width="100%"
                  height={200}
                  backgroundColor={this.state.touchActive ? Colors.primary : Colors.gray100}
                  borderRadius={BorderRadius.base}
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                  onTouch={(e) => this.handleTouch(e)}
                  onTap={(e) => this.handleTap(e)}
                  onLongPress={(e) => this.handleLongPress(e)}
                >
                  <label
                    value={this.state.touchActive ? 'Touching!' : 'Touch Here'}
                    font={Fonts.h2}
                    color={this.state.touchActive ? Colors.white : Colors.text}
                  />

                  {/* Touch position indicator */}
                  {this.state.touchActive && (
                    <view
                      width={20}
                      height={20}
                      backgroundColor={Colors.error}
                      borderRadius={10}
                      position="absolute"
                      left={this.state.touchPosition.x - 10}
                      top={this.state.touchPosition.y - 10}
                    />
                  )}
                </view>

                {/* Touch info display */}
                <view
                  width="100%"
                  padding={Spacing.base}
                  backgroundColor={Colors.gray100}
                  borderRadius={BorderRadius.sm}
                  margin={Spacing.xs}
                >
                  <label
                    value={`State: ${this.state.touchState}`}
                    font={Fonts.body}
                    color={Colors.text}
                  />
                  <label
                    value={`Pointers: ${this.state.pointerCount}`}
                    font={Fonts.body}
                    color={Colors.text}
                  />
                  <label
                    value={`Position: (${this.state.touchPosition.x.toFixed(0)}, ${this.state.touchPosition.y.toFixed(0)})`}
                    font={Fonts.body}
                    color={Colors.text}
                  />
                  {this.state.longPressActive && (
                    <label
                      value="Long Press Detected!"
                      font={Fonts.body}
                      color={Colors.success}
                    />
                  )}
                </view>
              </layout>
            </Card>
          </DemoSection>

          {/* Drag Gesture */}
          <DemoSection
            title="Drag Gesture"
            description="Draggable element with velocity tracking"
          >
            <Card>
              <layout width="100%">
                <view
                  width="100%"
                  height={300}
                  backgroundColor={Colors.gray100}
                  borderRadius={BorderRadius.base}
                  position="relative"
                  alignItems="center"
                  justifyContent="center"
                >
                  {/* Draggable element */}
                  <view
                    width={80}
                    height={80}
                    backgroundColor={this.state.isDragging ? Colors.primary : Colors.secondary}
                    borderRadius={BorderRadius.base}
                    translationX={this.state.dragDelta.x}
                    translationY={this.state.dragDelta.y}
                    scaleX={this.state.isDragging ? 1.1 : 1}
                    scaleY={this.state.isDragging ? 1.1 : 1}
                    onDrag={(e) => this.handleDrag(e)}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <label value="Drag Me" font={Fonts.caption} color={Colors.white} />
                  </view>
                </view>

                {/* Drag metrics */}
                <view
                  width="100%"
                  padding={Spacing.base}
                  backgroundColor={Colors.gray100}
                  borderRadius={BorderRadius.sm}
                  margin={Spacing.xs}
                >
                  <label
                    value={`Delta: (${this.state.dragDelta.x.toFixed(0)}, ${this.state.dragDelta.y.toFixed(0)}) px`}
                    font={Fonts.body}
                    color={Colors.text}
                  />
                  <label
                    value={`Velocity: (${this.state.dragVelocity.x.toFixed(0)}, ${this.state.dragVelocity.y.toFixed(0)}) px/s`}
                    font={Fonts.body}
                    color={Colors.text}
                  />
                </view>

                <Button
                  title="Reset Position"
                  variant="outline"
                  onTap={() => this.resetDragPosition()}
                />
              </layout>
            </Card>
          </DemoSection>

          {/* Pinch to Zoom */}
          <DemoSection
            title="Pinch to Zoom"
            description="Two-finger pinch gesture with scale constraints"
          >
            <Card>
              <layout width="100%">
                <label
                  value="Use two fingers to pinch (works on touch devices)"
                  font={Fonts.caption}
                  color={Colors.textSecondary}
                  numberOfLines={0}
                />

                <view
                  width="100%"
                  height={300}
                  backgroundColor={Colors.gray100}
                  borderRadius={BorderRadius.base}
                  alignItems="center"
                  justifyContent="center"
                >
                  <view
                    width={150}
                    height={150}
                    backgroundColor={Colors.primary}
                    borderRadius={BorderRadius.base}
                    scaleX={this.state.scale}
                    scaleY={this.state.scale}
                    opacity={this.state.isPinching ? 0.8 : 1}
                    onPinch={(e) => this.handlePinch(e)}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <label
                      value={`${(this.state.scale * 100).toFixed(0)}%`}
                      font={Fonts.h2}
                      color={Colors.white}
                    />
                  </view>
                </view>

                {/* Scale info */}
                <view
                  width="100%"
                  padding={Spacing.base}
                  backgroundColor={Colors.gray100}
                  borderRadius={BorderRadius.sm}
                  margin={Spacing.xs}
                >
                  <label
                    value={`Scale: ${this.state.scale.toFixed(2)}x`}
                    font={Fonts.body}
                    color={Colors.text}
                  />
                  <label
                    value={`Range: ${this.state.minScale}x - ${this.state.maxScale}x`}
                    font={Fonts.caption}
                    color={Colors.textSecondary}
                  />
                </view>

                <Button title="Reset Zoom" variant="outline" onTap={() => this.resetScale()} />
              </layout>
            </Card>
          </DemoSection>

          {/* Rotation Gesture */}
          <DemoSection
            title="Rotation Gesture"
            description="Two-finger rotation with angle snapping"
          >
            <Card>
              <layout width="100%">
                <label
                  value="Use two fingers to rotate (works on touch devices)"
                  font={Fonts.caption}
                  color={Colors.textSecondary}
                  numberOfLines={0}
                />

                <view
                  width="100%"
                  height={300}
                  backgroundColor={Colors.gray100}
                  borderRadius={BorderRadius.base}
                  alignItems="center"
                  justifyContent="center"
                >
                  <view
                    width={120}
                    height={120}
                    backgroundColor={Colors.secondary}
                    borderRadius={BorderRadius.base}
                    rotation={this.state.rotation}
                    opacity={this.state.isRotating ? 0.8 : 1}
                    onRotate={(e) => this.handleRotate(e)}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <label value="↑" font={Fonts.h1} color={Colors.white} />
                    <label
                      value={`${this.toDegrees(this.state.rotation).toFixed(0)}°`}
                      font={Fonts.body}
                      color={Colors.white}
                    />
                  </view>
                </view>

                {/* Rotation info */}
                <view
                  width="100%"
                  padding={Spacing.base}
                  backgroundColor={Colors.gray100}
                  borderRadius={BorderRadius.sm}
                  margin={Spacing.xs}
                >
                  <label
                    value={`Rotation: ${this.toDegrees(this.state.rotation).toFixed(1)}°`}
                    font={Fonts.body}
                    color={Colors.text}
                  />
                  <label
                    value={`Radians: ${this.state.rotation.toFixed(2)}`}
                    font={Fonts.caption}
                    color={Colors.textSecondary}
                  />
                </view>

                <layout flexDirection="row" flexWrap="wrap">
                  <Button
                    title={this.state.snapToAngles ? 'Snap: ON' : 'Snap: OFF'}
                    variant={this.state.snapToAngles ? 'primary' : 'outline'}
                    size="small"
                    onTap={() => this.setState({ snapToAngles: !this.state.snapToAngles })}
                  />
                  <Button
                    title="Reset"
                    variant="outline"
                    size="small"
                    onTap={() => this.resetRotation()}
                  />
                </layout>
              </layout>
            </Card>
          </DemoSection>

          {/* Combined Gestures */}
          <DemoSection
            title="Combined Gestures"
            description="Drag, pinch, and rotate simultaneously - double-tap to reset"
          >
            <Card>
              <layout width="100%">
                <label
                  value="Drag, pinch, and rotate this element. Double-tap to reset all transforms."
                  font={Fonts.caption}
                  color={Colors.textSecondary}
                  numberOfLines={0}
                />

                <view
                  width="100%"
                  height={400}
                  backgroundColor={Colors.gray100}
                  borderRadius={BorderRadius.base}
                  alignItems="center"
                  justifyContent="center"
                >
                  <view
                    width={200}
                    height={150}
                    backgroundColor={Colors.primary}
                    borderRadius={BorderRadius.base}
                    translationX={this.state.combinedPosition.x}
                    translationY={this.state.combinedPosition.y}
                    scaleX={this.state.combinedScale}
                    scaleY={this.state.combinedScale}
                    rotation={this.state.combinedRotation}
                    onDrag={(e) => this.handleCombinedDrag(e)}
                    onPinch={(e) => this.handleCombinedPinch(e)}
                    onRotate={(e) => this.handleCombinedRotate(e)}
                    onTap={(e) => this.handleDoubleTap(e)}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <label value="Interactive" font={Fonts.h3} color={Colors.white} />
                    <label value="Photo Viewer" font={Fonts.body} color={Colors.white} />
                  </view>
                </view>

                {/* Transform summary */}
                <view
                  width="100%"
                  padding={Spacing.base}
                  backgroundColor={Colors.gray100}
                  borderRadius={BorderRadius.sm}
                  margin={Spacing.xs}
                >
                  <label
                    value={`Position: (${this.state.combinedPosition.x.toFixed(0)}, ${this.state.combinedPosition.y.toFixed(0)})`}
                    font={Fonts.caption}
                    color={Colors.text}
                  />
                  <label
                    value={`Scale: ${this.state.combinedScale.toFixed(2)}x`}
                    font={Fonts.caption}
                    color={Colors.text}
                  />
                  <label
                    value={`Rotation: ${this.toDegrees(this.state.combinedRotation).toFixed(0)}°`}
                    font={Fonts.caption}
                    color={Colors.text}
                  />
                </view>

                <Button
                  title="Reset All Transforms"
                  variant="primary"
                  onTap={() => this.resetAllTransforms()}
                />
              </layout>
            </Card>
          </DemoSection>
        </layout>
      </scroll>
    </view>;
  }

  // Touch & Tap handlers

  private handleTouch(event: TouchEvent) {
    const stateNames = ['Started', 'Changed', 'Ended'];

    this.setState({
      touchActive: event.state !== TouchEventState.Ended,
      touchPosition: { x: event.x, y: event.y },
      touchState: stateNames[event.state] as any,
      pointerCount: event.pointerCount,
    });
  }

  private handleTap(event: TouchEvent) {
    this.setState({ lastTapTime: Date.now() });
  }

  private handleLongPress(event: TouchEvent) {
    this.setState({ longPressActive: true });

    // Reset after animation
    setTimeout(() => {
      this.setState({ longPressActive: false });
    }, 1000);
  }

  // Drag handlers

  private handleDrag(event: DragEvent) {
    this.setState({
      isDragging: event.state !== TouchEventState.Ended,
      dragDelta: { x: event.deltaX, y: event.deltaY },
      dragVelocity: { x: event.velocityX, y: event.velocityY },
    });
  }

  private resetDragPosition() {
    const options: PresetCurveAnimationOptions = {
      duration: 0.3,
      curve: AnimationCurve.EaseOut,
    };

    this.animate(options, () => {
      this.setState({ dragDelta: { x: 0, y: 0 } });
    });
  }

  // Pinch handlers

  private handlePinch(event: PinchEvent) {
    // Constrain scale to min/max
    let newScale = event.scale;
    newScale = Math.max(this.state.minScale, newScale);
    newScale = Math.min(this.state.maxScale, newScale);

    this.setState({
      scale: newScale,
      isPinching: event.state !== TouchEventState.Ended,
    });
  }

  private resetScale() {
    const options: PresetCurveAnimationOptions = {
      duration: 0.3,
      curve: AnimationCurve.EaseInOut,
    };

    this.animate(options, () => {
      this.setState({ scale: 1 });
    });
  }

  // Rotation handlers

  private handleRotate(event: RotateEvent) {
    let newRotation = event.rotation;

    // Optional: Snap to 90-degree increments
    if (this.state.snapToAngles) {
      const degrees = this.toDegrees(newRotation);
      const snappedDegrees = Math.round(degrees / 90) * 90;
      newRotation = this.toRadians(snappedDegrees);
    }

    this.setState({
      rotation: newRotation,
      isRotating: event.state !== TouchEventState.Ended,
    });
  }

  private resetRotation() {
    const options: PresetCurveAnimationOptions = {
      duration: 0.3,
      curve: AnimationCurve.EaseInOut,
    };

    this.animate(options, () => {
      this.setState({ rotation: 0 });
    });
  }

  // Combined gesture handlers

  private handleCombinedDrag(event: DragEvent) {
    this.setState({
      combinedPosition: { x: event.deltaX, y: event.deltaY },
    });
  }

  private handleCombinedPinch(event: PinchEvent) {
    let newScale = event.scale;
    newScale = Math.max(0.5, newScale);
    newScale = Math.min(3, newScale);

    this.setState({
      combinedScale: newScale,
    });
  }

  private handleCombinedRotate(event: RotateEvent) {
    this.setState({
      combinedRotation: event.rotation,
    });
  }

  private handleDoubleTap(event: TouchEvent) {
    const now = Date.now();
    const timeSinceLastTap = this.state.combinedLastTapTime
      ? now - this.state.combinedLastTapTime
      : Infinity;

    if (timeSinceLastTap < 300) {
      // Double tap detected
      this.resetAllTransforms();
    }

    this.setState({ combinedLastTapTime: now });
  }

  private resetAllTransforms() {
    const options: PresetCurveAnimationOptions = {
      duration: 0.3,
      curve: AnimationCurve.EaseOut,
    };

    this.animate(options, () => {
      this.setState({
        combinedPosition: { x: 0, y: 0 },
        combinedScale: 1,
        combinedRotation: 0,
      });
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
