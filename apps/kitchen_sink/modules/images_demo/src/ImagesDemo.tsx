/**
 * Images & Media Demo (Placeholder)
 *
 * This placeholder page explains what will be demonstrated when the
 * Images & Media demo is fully implemented.
 *
 * **Planned Features:**
 *
 * 1. **Image Loading:**
 *    - <image> element with local assets
 *    - <image> element with remote URLs
 *    - Loading states and placeholders
 *    - Error handling for failed loads
 *
 * 2. **Image Scaling & Layout:**
 *    - Different scaleMode options (fill, fit, stretch, center)
 *    - Aspect ratio preservation
 *    - Image clipping and masks
 *
 * 3. **Media Playback (if supported):**
 *    - <video> element for video playback
 *    - Play/pause controls
 *    - Seeking and progress tracking
 *    - Volume control
 *
 * 4. **Performance Considerations:**
 *    - Image caching strategies
 *    - Memory management for large images
 *    - Lazy loading techniques
 *
 * **Estimated Implementation Effort:** 4-6 hours
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
 * Placeholder component explaining the planned Images & Media demo features.
 */
@NavigationPage(module)
export class ImagesDemo extends Component {
  onRender() {
    <view style={styles.page}>
      {/* Header */}
      <view style={styles.header}>
        <label style={styles.backButton} value="← Back" onTap={() => this.viewModel.navigationController.pop()} />
        <label style={styles.headerTitle} value="🖼️ Images & Media" />
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
            value="This demo will showcase Valdi's image and media capabilities, including local and remote image loading, scaling modes, and potentially video playback."
            numberOfLines={0}
          />

          {/* Planned Features Section */}
          <label style={styles.sectionTitle} value="Planned Features" />

          <DemoCard
            title="Image Loading"
            description="Local assets, remote URLs, loading states, and error handling"
            color={Colors.primary}
          />

          <DemoCard
            title="Image Scaling & Layout"
            description="Scale modes (fill, fit, stretch, center), aspect ratio preservation, clipping"
            color={Colors.secondary}
          />

          <DemoCard
            title="Media Playback"
            description="Video playback controls, seeking, progress tracking, volume control"
            color={Colors.accent}
          />

          <DemoCard
            title="Performance"
            description="Image caching, memory management, lazy loading techniques"
            color={Colors.success}
          />

          {/* Implementation Info */}
          <label style={styles.sectionTitle} value="Implementation Status" />
          <label
            style={styles.infoText}
            value="Estimated implementation effort: 4-6 hours"
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
