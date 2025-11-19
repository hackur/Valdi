/**
 * HomePage Component
 * Main landing page with demo section cards
 */

import { Component } from 'valdi_core/src/Component';
import { Style } from 'valdi_core/src/Style';
import { NavigationController } from 'valdi_navigation/src/NavigationController';
import { NavigationPage } from 'valdi_navigation/src/NavigationPage';
import { View, Label, Layout, ScrollView } from 'valdi_tsx/src/NativeTemplateElements';

import { Colors, Fonts, Spacing, BorderRadius, Shadows } from '../../common/src/index';
import { LayoutsDemo } from '../../layouts_demo/src/LayoutsDemo';
import { TextDemo } from '../../text_demo/src/TextDemo';
import { StateDemo } from '../../state_demo/src/StateDemo';
import { AnimationDemo } from '../../animation_demo/src/AnimationDemo';
import { SlotsDemo } from '../../slots_demo/src/SlotsDemo';

export interface HomePageViewModel {
  navigationController: NavigationController;
}

/**
 * Demo section data structure
 */
interface DemoSection {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  // page: Component class to navigate to
}

@NavigationPage(module)
export class HomePage extends Component<HomePageViewModel> {
  private demoSections: DemoSection[] = [
    {
      id: 'layouts',
      title: 'Layouts & Flexbox',
      description: 'Explore <layout>, <view>, and flexbox positioning',
      emoji: '📐',
      color: Colors.primary,
    },
    {
      id: 'text',
      title: 'Text Elements',
      description: '<label>, <textfield>, <textview> with styling',
      emoji: '📝',
      color: Colors.secondary,
    },
    {
      id: 'media',
      title: 'Images & Media',
      description: '<image>, <video>, and animated content',
      emoji: '🖼️',
      color: Colors.success,
    },
    {
      id: 'scroll',
      title: 'Scrolling & Lists',
      description: '<scroll> with vertical and horizontal content',
      emoji: '📜',
      color: Colors.warning,
    },
    {
      id: 'gestures',
      title: 'Gestures',
      description: 'Tap, drag, pinch, rotate, and long press',
      emoji: '👆',
      color: Colors.error,
    },
    {
      id: 'styling',
      title: 'Advanced Styling',
      description: 'Gradients, shadows, borders, and transforms',
      emoji: '🎨',
      color: '#EC4899', // Pink
    },
    {
      id: 'state',
      title: 'State & Lifecycle',
      description: 'Component state management and lifecycle',
      emoji: '🔄',
      color: '#14B8A6', // Teal
    },
    {
      id: 'animations',
      title: 'Animations',
      description: 'Smooth transitions and spring animations',
      emoji: '✨',
      color: '#F59E0B', // Amber
    },
    {
      id: 'shapes',
      title: 'Shapes & Paths',
      description: 'Custom shapes with <shape> element',
      emoji: '⬛',
      color: '#6366F1', // Indigo
    },
    {
      id: 'slots',
      title: 'Slots & Composition',
      description: 'Content projection with <slot>',
      emoji: '🧩',
      color: '#8B5CF6', // Purple
    },
    {
      id: 'forms',
      title: 'Forms & Validation',
      description: 'Input handling and form validation',
      emoji: '📋',
      color: '#10B981', // Green
    },
    {
      id: 'lists',
      title: 'Dynamic Lists',
      description: 'Rendering and managing dynamic content',
      emoji: '📊',
      color: '#3B82F6', // Blue
    },
  ];

  onRender() {
    <view style={styles.page}>
      {/* Header */}
      <view style={styles.header}>
        <label style={styles.headerTitle} value="Valdi Kitchen Sink" />
        <label
          style={styles.headerSubtitle}
          value="Comprehensive demonstration of all Valdi features"
          numberOfLines={2}
        />
      </view>

      {/* Scrollable content */}
      <scroll style={styles.scroll}>
        <layout style={styles.grid}>
          {this.demoSections.forEach(section => this.renderDemoCard(section))}
        </layout>
      </scroll>
    </view>;
  }

  private renderDemoCard(section: DemoSection) {
    <view
      style={styles.card}
      onTap={() => this.navigateToDemo(section.id)}
    >
      {/* Color accent bar */}
      <view
        style={styles.cardAccent}
        backgroundColor={section.color}
      />

      {/* Card content */}
      <layout style={styles.cardContent}>
        {/* Emoji icon */}
        <label style={styles.cardEmoji} value={section.emoji} />

        {/* Title and description */}
        <layout style={styles.cardText}>
          <label style={styles.cardTitle} value={section.title} />
          <label
            style={styles.cardDescription}
            value={section.description}
            numberOfLines={2}
          />
        </layout>

        {/* Arrow indicator */}
        <label style={styles.cardArrow} value="→" />
      </layout>
    </view>;
  }

  private navigateToDemo(demoId: string) {
    const navController = this.viewModel.navigationController;

    switch (demoId) {
      // ✅ Implemented Demos
      case 'layouts':
        navController.push(LayoutsDemo, { navigationController: navController }, {});
        break;
      case 'text':
        navController.push(TextDemo, { navigationController: navController }, {});
        break;
      case 'state':
        navController.push(StateDemo, { navigationController: navController }, {});
        break;
      case 'animations':
        navController.push(AnimationDemo, { navigationController: navController }, {});
        break;

      // 🚧 Not Yet Implemented - See README.md "Roadmap & TODOs" section for details

      case 'media':
        // TODO: Implement ImagesDemo component
        // Should demonstrate: <image> with local/remote images, image scaling,
        // loading states, error handling, <video> playback (if supported)
        // Estimated effort: 4-6 hours
        console.log('Images & Media demo not yet implemented');
        break;

      case 'scroll':
        // TODO: Implement ScrollingDemo component
        // Should demonstrate: vertical/horizontal scroll, nested scroll views,
        // pull-to-refresh, scroll position tracking, virtual lists
        // Estimated effort: 6-8 hours
        console.log('Scrolling & Lists demo not yet implemented');
        break;

      case 'gestures':
        // TODO: Implement GesturesDemo component
        // Should demonstrate: onTap, onLongPress, onDrag, onPinch, onRotate,
        // gesture conflicts, multi-touch, velocity/position data
        // Estimated effort: 6-8 hours
        console.log('Gestures demo not yet implemented');
        break;

      case 'styling':
        // TODO: Implement StylingDemo component
        // Should demonstrate: gradients, advanced shadows, border styling,
        // clipping/masks, blend modes, transforms, backdrop blur
        // Estimated effort: 4-6 hours
        console.log('Advanced Styling demo not yet implemented');
        break;

      case 'shapes':
        // TODO: Implement ShapesDemo component
        // Should demonstrate: <shape> element, path drawing, filled vs stroked,
        // path animations, SVG-like capabilities
        // Estimated effort: 6-8 hours
        console.log('Shapes & Paths demo not yet implemented');
        break;

      case 'slots':
        navController.push(SlotsDemo, { navigationController: navController }, {});
        break;

      case 'forms':
        // TODO: Implement FormsDemo component
        // Should demonstrate: form state management, validation, error handling,
        // form submission, multi-step forms, keyboard management, accessibility
        // Estimated effort: 8-10 hours
        console.log('Forms & Validation demo not yet implemented');
        break;

      case 'lists':
        // TODO: Implement DynamicListsDemo component
        // Should demonstrate: list rendering with forEach (already shown here!),
        // list keys, add/remove items, filter/sort, search, virtualization
        // Estimated effort: 6-8 hours
        console.log('Dynamic Lists demo not yet implemented');
        break;

      default:
        console.log(`Unknown demo: '${demoId}'`);
        break;
    }
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
    backgroundColor: Colors.primary,
    paddingTop: 60, // Status bar + padding
    paddingBottom: Spacing.xl,
    paddingLeft: Spacing.lg,
    paddingRight: Spacing.lg,
    boxShadow: Shadows.md,
  }),

  headerTitle: new Style<Label>({
    font: Fonts.h1,
    color: Colors.white,
    marginBottom: Spacing.xs,
  }),

  headerSubtitle: new Style<Label>({
    font: Fonts.body,
    color: Colors.white,
    opacity: 0.9,
  }),

  scroll: new Style<ScrollView>({
    width: '100%',
    height: '100%',
  }),

  grid: new Style<Layout>({
    width: '100%',
    padding: Spacing.base,
  }),

  card: new Style<View>({
    width: '100%',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    boxShadow: Shadows.base,
  }),

  cardAccent: new Style<View>({
    width: '100%',
    height: 4,
  }),

  cardContent: new Style<Layout>({
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
  }),

  cardEmoji: new Style<Label>({
    font: Fonts.h1,
    width: 48,
    textAlign: 'center',
  }),

  cardText: new Style<Layout>({
    flexGrow: 1,
  }),

  cardTitle: new Style<Label>({
    font: Fonts.h4,
    color: Colors.textPrimary,
  }),

  cardDescription: new Style<Label>({
    font: Fonts.bodySmall,
    color: Colors.textSecondary,
  }),

  cardArrow: new Style<Label>({
    font: Fonts.h3,
    color: Colors.primary,
  }),
};
