/**
 * Images & Media Demo
 *
 * Comprehensive demonstration of Valdi's media capabilities including static images,
 * video playback, and animated content (Lottie). Shows loading states, error handling,
 * and different display modes.
 *
 * **Features Demonstrated:**
 *
 * 1. **Basic Image Loading:**
 *    - Loading from remote URLs with loading states
 *    - Error handling with fallback messages
 *    - onAssetLoad callback for load success/failure tracking
 *    - onImageDecoded for dimension tracking
 *
 * 2. **ObjectFit Modes:**
 *    - fill - Stretch to fill bounds (may distort)
 *    - contain - Fit within bounds preserving aspect ratio (may have blank space)
 *    - cover - Fill bounds preserving aspect ratio (may crop)
 *    - none - No scaling, centered
 *
 * 3. **Video Playback:** (Commented out - requires video assets)
 *    - Play/pause control
 *    - Volume control
 *    - Seek bar with progress tracking
 *    - Current time / duration display
 *
 * 4. **Animated Images (Lottie):** (Commented out - requires Lottie assets)
 *    - Play/pause animation
 *    - Speed control (0.5x, 1x, 2x, reverse)
 *    - Loop toggle
 *
 * 5. **Image Effects:**
 *    - Color tint
 *    - Content scaling
 *    - Content rotation
 *
 * @see {@link https://github.com/valdi-labs/valdi|Valdi Framework Documentation}
 */

import { StatefulComponent } from 'valdi_core/src/Component';
import { Style } from 'valdi_core/src/Style';
import { NavigationController } from 'valdi_navigation/src/NavigationController';
import { NavigationPage } from 'valdi_navigation/src/NavigationPage';
import { View, Label, Layout, ScrollView, ImageView } from 'valdi_tsx/src/NativeTemplateElements';

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

export interface ImagesDemoViewModel {
  navigationController: NavigationController;
}

interface ImagesDemoState {
  // Basic image loading
  imageLoading: boolean;
  imageError?: string;
  imageDimensions?: { width: number; height: number };

  // ObjectFit demonstration
  selectedObjectFit: 'fill' | 'contain' | 'cover' | 'none';

  // Image effects
  tintColor?: string;
  contentScale: number;
  contentRotation: number;  // In radians
}

@NavigationPage(module)
export class ImagesDemo extends StatefulComponent<ImagesDemoViewModel, ImagesDemoState> {
  state: ImagesDemoState = {
    imageLoading: true,
    selectedObjectFit: 'contain',
    contentScale: 1,
    contentRotation: 0,
  };

  onRender() {
    <view style={styles.page}>
      {/* Header */}
      <Header
        title="Images & Media"
        showBack={true}
        onBack={() => this.viewModel.navigationController.pop()}
      />

      {/* Content */}
      <scroll style={styles.scroll}>
        <layout style={styles.content}>
          {/* Basic Image Loading */}
          <DemoSection
            title="Basic Image Loading"
            description="Load images from URLs with loading states and error handling"
          >
            <Card>
              <layout width="100%" alignItems="center">
                {/* Image with loading state */}
                <view
                  width={300}
                  height={200}
                  backgroundColor={Colors.gray100}
                  borderRadius={BorderRadius.base}
                  alignItems="center"
                  justifyContent="center"
                >
                  {this.state.imageLoading && (
                    <label
                      value="Loading image..."
                      font={Fonts.body}
                      color={Colors.textSecondary}
                    />
                  )}

                  <image
                    width={300}
                    height={200}
                    src="https://picsum.photos/600/400"
                    objectFit="cover"
                    borderRadius={BorderRadius.base}
                    onAssetLoad={(success, error) => {
                      this.setState({
                        imageLoading: false,
                        imageError: success ? undefined : error,
                      });
                    }}
                    onImageDecoded={(width, height) => {
                      this.setState({ imageDimensions: { width, height } });
                    }}
                  />
                </view>

                {/* Error state */}
                {this.state.imageError && (
                  <label
                    value={`Error: ${this.state.imageError}`}
                    font={Fonts.caption}
                    color={Colors.error}
                  />
                )}

                {/* Image dimensions */}
                {this.state.imageDimensions && !this.state.imageLoading && (
                  <label
                    value={`Dimensions: ${this.state.imageDimensions.width} x ${this.state.imageDimensions.height}`}
                    font={Fonts.caption}
                    color={Colors.success}
                  />
                )}
              </layout>
            </Card>
          </DemoSection>

          {/* ObjectFit Modes */}
          <DemoSection
            title="ObjectFit Modes"
            description="Different image scaling and fitting modes"
          >
            <Card>
              <layout width="100%">
                {/* Mode selector */}
                <label value="Select ObjectFit Mode:" font={Fonts.body} />
                <layout flexDirection="row" flexWrap="wrap">
                  <Button
                    title="Fill"
                    variant={this.state.selectedObjectFit === 'fill' ? 'primary' : 'outline'}
                    size="small"
                    onTap={() => this.setState({ selectedObjectFit: 'fill' })}
                  />
                  <Button
                    title="Contain"
                    variant={this.state.selectedObjectFit === 'contain' ? 'primary' : 'outline'}
                    size="small"
                    onTap={() => this.setState({ selectedObjectFit: 'contain' })}
                  />
                  <Button
                    title="Cover"
                    variant={this.state.selectedObjectFit === 'cover' ? 'primary' : 'outline'}
                    size="small"
                    onTap={() => this.setState({ selectedObjectFit: 'cover' })}
                  />
                  <Button
                    title="None"
                    variant={this.state.selectedObjectFit === 'none' ? 'primary' : 'outline'}
                    size="small"
                    onTap={() => this.setState({ selectedObjectFit: 'none' })}
                  />
                </layout>

                {/* Mode description */}
                <label
                  value={this.getObjectFitDescription(this.state.selectedObjectFit)}
                  font={Fonts.caption}
                  color={Colors.textSecondary}
                  numberOfLines={0}
                />

                {/* Image with selected objectFit */}
                <view
                  width="100%"
                  height={200}
                  backgroundColor={Colors.gray100}
                  borderRadius={BorderRadius.base}
                  alignItems="center"
                  justifyContent="center"
                >
                  <image
                    width={300}
                    height={200}
                    src="https://picsum.photos/800/400"
                    objectFit={this.state.selectedObjectFit}
                    borderRadius={BorderRadius.base}
                  />
                </view>

                {/* All modes comparison */}
                <label value="All Modes Comparison:" font={Fonts.h3} />
                <layout flexDirection="row" flexWrap="wrap" justifyContent="space-around">
                  {(['fill', 'contain', 'cover', 'none'] as const).forEach(mode => (
                    <layout key={mode} alignItems="center">
                      <label value={mode} font={Fonts.caption} color={Colors.textSecondary} />
                      <view
                        width={140}
                        height={100}
                        backgroundColor={Colors.gray100}
                        borderRadius={BorderRadius.base}
                        margin={Spacing.xs}
                      >
                        <image
                          width={140}
                          height={100}
                          src="https://picsum.photos/800/400"
                          objectFit={mode}
                          borderRadius={BorderRadius.base}
                        />
                      </view>
                    </layout>
                  ))}
                </layout>
              </layout>
            </Card>
          </DemoSection>

          {/* Image Effects */}
          <DemoSection
            title="Image Effects & Transformations"
            description="Apply tint, scaling, and rotation to images"
          >
            <Card>
              <layout width="100%">
                {/* Tint Controls */}
                <label value="Color Tint:" font={Fonts.body} />
                <layout flexDirection="row" flexWrap="wrap">
                  <Button
                    title="No Tint"
                    variant={!this.state.tintColor ? 'primary' : 'outline'}
                    size="small"
                    onTap={() => this.setState({ tintColor: undefined })}
                  />
                  <Button
                    title="Blue"
                    variant={this.state.tintColor === Colors.primary ? 'primary' : 'outline'}
                    size="small"
                    onTap={() => this.setState({ tintColor: Colors.primary })}
                  />
                  <Button
                    title="Red"
                    variant={this.state.tintColor === Colors.error ? 'primary' : 'outline'}
                    size="small"
                    onTap={() => this.setState({ tintColor: Colors.error })}
                  />
                  <Button
                    title="Green"
                    variant={this.state.tintColor === Colors.success ? 'primary' : 'outline'}
                    size="small"
                    onTap={() => this.setState({ tintColor: Colors.success })}
                  />
                </layout>

                {/* Scale Controls */}
                <label value={`Content Scale: ${this.state.contentScale.toFixed(1)}x`} font={Fonts.body} />
                <layout flexDirection="row" flexWrap="wrap">
                  <Button
                    title="0.5x"
                    variant="outline"
                    size="small"
                    onTap={() => this.setState({ contentScale: 0.5 })}
                  />
                  <Button
                    title="1x"
                    variant="outline"
                    size="small"
                    onTap={() => this.setState({ contentScale: 1 })}
                  />
                  <Button
                    title="1.5x"
                    variant="outline"
                    size="small"
                    onTap={() => this.setState({ contentScale: 1.5 })}
                  />
                  <Button
                    title="2x"
                    variant="outline"
                    size="small"
                    onTap={() => this.setState({ contentScale: 2 })}
                  />
                </layout>

                {/* Rotation Controls */}
                <label value={`Rotation: ${this.toDegrees(this.state.contentRotation).toFixed(0)}°`} font={Fonts.body} />
                <layout flexDirection="row" flexWrap="wrap">
                  <Button
                    title="0°"
                    variant="outline"
                    size="small"
                    onTap={() => this.setState({ contentRotation: 0 })}
                  />
                  <Button
                    title="45°"
                    variant="outline"
                    size="small"
                    onTap={() => this.setState({ contentRotation: Math.PI / 4 })}
                  />
                  <Button
                    title="90°"
                    variant="outline"
                    size="small"
                    onTap={() => this.setState({ contentRotation: Math.PI / 2 })}
                  />
                  <Button
                    title="180°"
                    variant="outline"
                    size="small"
                    onTap={() => this.setState({ contentRotation: Math.PI })}
                  />
                </layout>

                {/* Image with effects */}
                <view
                  width="100%"
                  height={250}
                  backgroundColor={Colors.gray100}
                  borderRadius={BorderRadius.base}
                  alignItems="center"
                  justifyContent="center"
                >
                  <image
                    width={200}
                    height={200}
                    src="https://picsum.photos/400/400"
                    objectFit="contain"
                    tint={this.state.tintColor}
                    contentScaleX={this.state.contentScale}
                    contentScaleY={this.state.contentScale}
                    contentRotation={this.state.contentRotation}
                  />
                </view>
              </layout>
            </Card>
          </DemoSection>

          {/* Video Playback - Placeholder (requires video assets) */}
          <DemoSection
            title="Video Playback"
            description="Video playback requires video assets (not yet configured)"
          >
            <Card>
              <view style={styles.placeholderBox}>
                <label
                  value="🎥 Video Playback Demo"
                  font={Fonts.h3}
                  color={Colors.textSecondary}
                />
                <label
                  value="This section will demonstrate video playback with play/pause, volume, and seek controls once video assets are added."
                  font={Fonts.body}
                  color={Colors.textSecondary}
                  numberOfLines={0}
                  textAlign="center"
                />
              </view>
            </Card>
          </DemoSection>

          {/* Animated Images - Placeholder (requires Lottie assets) */}
          <DemoSection
            title="Animated Images (Lottie)"
            description="Lottie animations require JSON animation assets (not yet configured)"
          >
            <Card>
              <view style={styles.placeholderBox}>
                <label
                  value="✨ Lottie Animation Demo"
                  font={Fonts.h3}
                  color={Colors.textSecondary}
                />
                <label
                  value="This section will demonstrate Lottie animations with speed control, looping, and playback controls once Lottie assets are added."
                  font={Fonts.body}
                  color={Colors.textSecondary}
                  numberOfLines={0}
                  textAlign="center"
                />
              </view>
            </Card>
          </DemoSection>
        </layout>
      </scroll>
    </view>;
  }

  // Helper methods

  private getObjectFitDescription(mode: 'fill' | 'contain' | 'cover' | 'none'): string {
    const descriptions = {
      fill: 'Stretch to fill bounds (may distort aspect ratio)',
      contain: 'Fit within bounds preserving aspect ratio (may have blank space)',
      cover: 'Fill bounds preserving aspect ratio (may crop edges)',
      none: 'No scaling, display at original size (centered)',
    };
    return descriptions[mode];
  }

  private toDegrees(radians: number): number {
    return (radians * 180) / Math.PI;
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

  placeholderBox: new Style<View>({
    width: '100%',
    padding: Spacing.xl,
    backgroundColor: Colors.gray100,
    borderRadius: BorderRadius.base,
    alignItems: 'center',
    justifyContent: 'center',
  }),
};
