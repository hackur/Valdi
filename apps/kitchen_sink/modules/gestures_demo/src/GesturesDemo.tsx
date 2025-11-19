/**
 * Gestures Demo (Placeholder)
 *
 * This placeholder page explains what will be demonstrated when the
 * Gestures demo is fully implemented.
 *
 * **Planned Features:**
 *
 * 1. **Basic Gestures:**
 *    - onTap - Single tap detection
 *    - onLongPress - Long press with duration threshold
 *    - onDoubleTap - Double tap detection
 *
 * 2. **Advanced Gestures:**
 *    - onDrag - Drag with position and velocity data
 *    - onPinch - Pinch-to-zoom with scale value
 *    - onRotate - Rotation gesture with angle data
 *    - onSwipe - Directional swipe detection
 *
 * 3. **Gesture Handling:**
 *    - Gesture conflict resolution
 *    - Multi-touch support
 *    - Gesture cancellation
 *    - Velocity and position tracking
 *
 * 4. **Interactive Examples:**
 *    - Draggable elements
 *    - Pinch-to-zoom image viewer
 *    - Rotatable objects
 *    - Swipe-to-dismiss cards
 *
 * **Estimated Implementation Effort:** 6-8 hours
 *
 * **References:**
 * @see {@link https://github.com/valdi-labs/valdi|Valdi Framework Documentation}
 *
 * **Contributing:**
 * If you'd like to implement this demo, check CONTRIBUTING.md for guidelines
 * and submit a pull request!
 */

import { Component } from 'valdi_core/src/Component';
import { Style } from 'valdi_core/src/Style';
import { NavigationPage } from 'valdi_navigation/src/NavigationPage';
import { View, Label, Scroll, Layout } from 'valdi_tsx/src/BuiltinComponents';
import { DemoCard } from 'common/src/DemoCard';
import { Colors } from 'common/src/Colors';

/**
 * Placeholder component explaining the planned Gestures demo features.
 */
@NavigationPage(module)
export class GesturesDemo extends Component {
  onRender() {
    <view style={styles.page}>
      {/* Header */}
      <view style={styles.header}>
        <label style={styles.backButton} value="← Back" onTap={() => this.viewModel.navigationController.pop()} />
        <label style={styles.headerTitle} value="👆 Gestures" />
        <label style={styles.headerSubtitle} value="Coming Soon" />
      </view>

      {/* Scrollable content */}
      <scroll style={styles.scroll}>
        <layout style={styles.content}>
          {/* Status badge */}
          <view style={styles.badge}>
            <label style={styles.badgeText} value="🚧 Under Construction" />
          </view>

          {/* Description */}
          <label
            style={styles.description}
            value="This demo will showcase Valdi's comprehensive gesture system, including tap, drag, pinch, rotate, long press, and multi-touch interactions with position and velocity tracking."
            numberOfLines={0}
          />

          {/* Planned Features Section */}
          <label style={styles.sectionTitle} value="Planned Features" />

          <DemoCard
            title="Basic Gestures"
            description="onTap, onLongPress, onDoubleTap with event data"
            color={Colors.primary}
          />

          <DemoCard
            title="Advanced Gestures"
            description="onDrag, onPinch, onRotate, onSwipe with position/velocity tracking"
            color={Colors.secondary}
          />

          <DemoCard
            title="Gesture Handling"
            description="Conflict resolution, multi-touch, cancellation, event propagation"
            color={Colors.accent}
          />

          <DemoCard
            title="Interactive Examples"
            description="Draggable elements, pinch-to-zoom, rotatable objects, swipe cards"
            color={Colors.success}
          />

          {/* Implementation Info */}
          <label style={styles.sectionTitle} value="Implementation Status" />
          <label
            style={styles.infoText}
            value="Estimated implementation effort: 6-8 hours"
            numberOfLines={0}
          />
          <label
            style={styles.infoText}
            value="Want to contribute? Check out CONTRIBUTING.md for guidelines on how to implement this demo!"
            numberOfLines={0}
          />
        </layout>
      </scroll>
    </view>;
  }
}

const styles = {
  page: new Style<View>({
    width: '100%',
    height: '100%',
    backgroundColor: Colors.background,
  }),

  header: new Style<View>({
    width: '100%',
    padding: 20,
    paddingTop: 60,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  }),

  backButton: new Style<Label>({
    fontSize: 16,
    color: Colors.primary,
    marginBottom: 10,
    cursor: 'pointer',
  }),

  headerTitle: new Style<Label>({
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 5,
  }),

  headerSubtitle: new Style<Label>({
    fontSize: 14,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  }),

  scroll: new Style<Scroll>({
    width: '100%',
    height: '100%',
  }),

  content: new Style<Layout>({
    padding: 20,
    gap: 15,
  }),

  badge: new Style<View>({
    alignSelf: 'flex-start',
    backgroundColor: '#FEF3C7',
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  }),

  badgeText: new Style<Label>({
    fontSize: 14,
    fontWeight: '600',
    color: '#92400E',
  }),

  description: new Style<Label>({
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text,
  }),

  sectionTitle: new Style<Label>({
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 10,
    marginBottom: 5,
  }),

  infoText: new Style<Label>({
    fontSize: 14,
    lineHeight: 20,
    color: Colors.textSecondary,
    marginTop: 5,
  }),
};
