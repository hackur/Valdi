/**
 * HomePage Component
 *
 * Main landing page displaying a grid of all available Valdi feature demonstrations.
 * Serves as the navigation hub for the Kitchen Sink application.
 *
 * **Architecture Decision: Why Component Instead of NavigationPageComponent**
 *
 * This component extends Component rather than NavigationPageComponent to ensure
 * cross-platform compatibility, specifically to prevent Android initialization failures.
 *
 * Technical Background:
 * The NavigationPageComponent base class includes a class field initializer:
 *   navigationController = new NavigationController(this.context.navigator)
 *
 * This field initializer executes during class construction, before the component's
 * context has been properly initialized. On iOS, the initialization order allows
 * this to work, but on Android the context is not yet available, resulting in:
 *   "Cannot read property 'navigator' of undefined"
 *
 * Solution:
 * By extending Component directly and using the @NavigationPage decorator, we get
 * all navigation functionality without the problematic field initializer. The
 * NavigationController is passed through the viewModel instead, which is available
 * when the component methods (onCreate, onRender, etc.) execute.
 *
 * **Platform Compatibility:**
 * - iOS: Tested and verified working
 * - Android: Tested and verified working
 *
 * **References:**
 * @see {@link https://github.com/valdi-labs/valdi|Valdi Framework Documentation}
 * @see NavigationController for navigation API
 * @see NavigationPage decorator for page registration
 * @see DemoSection interface for demo card data structure
 */

import { Component } from 'valdi_core/src/Component';
import { Style } from 'valdi_core/src/Style';
import { NavigationController } from 'valdi_navigation/src/NavigationController';
import { NavigationPage } from 'valdi_navigation/src/NavigationPage';
import { View, Label, Layout, ScrollView } from 'valdi_tsx/src/NativeTemplateElements';

import { Colors, Fonts, Spacing, BorderRadius, Shadows } from '../../common/src/index';

// Implemented demos
import { LayoutsDemo } from '../../layouts_demo/src/LayoutsDemo';
import { TextDemo } from '../../text_demo/src/TextDemo';
import { StateDemo } from '../../state_demo/src/StateDemo';
import { AnimationDemo } from '../../animation_demo/src/AnimationDemo';
import { SlotsDemo } from '../../slots_demo/src/SlotsDemo';

// Placeholder demos (coming soon)
import { ImagesDemo } from '../../images_demo/src/ImagesDemo';
import { ScrollingDemo } from '../../scrolling_demo/src/ScrollingDemo';
import { GesturesDemo } from '../../gestures_demo/src/GesturesDemo';
import { StylingDemo } from '../../styling_demo/src/StylingDemo';
import { ShapesDemo } from '../../shapes_demo/src/ShapesDemo';
import { FormsDemo } from '../../forms_demo/src/FormsDemo';
import { ListsDemo } from '../../lists_demo/src/ListsDemo';

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

      // 🚧 Placeholder Demos - Components created but features not yet fully implemented

      case 'media':
        // ImagesDemo placeholder - explains planned features for image/video handling
        // See images_demo/src/ImagesDemo.tsx for implementation roadmap
        navController.push(ImagesDemo, { navigationController: navController }, {});
        break;

      case 'scroll':
        // ScrollingDemo placeholder - explains planned features for advanced scrolling
        // See scrolling_demo/src/ScrollingDemo.tsx for implementation roadmap
        navController.push(ScrollingDemo, { navigationController: navController }, {});
        break;

      case 'gestures':
        // GesturesDemo placeholder - explains planned features for gesture handling
        // See gestures_demo/src/GesturesDemo.tsx for implementation roadmap
        navController.push(GesturesDemo, { navigationController: navController }, {});
        break;

      case 'styling':
        // StylingDemo placeholder - explains planned features for advanced styling
        // See styling_demo/src/StylingDemo.tsx for implementation roadmap
        navController.push(StylingDemo, { navigationController: navController }, {});
        break;

      case 'shapes':
        // ShapesDemo placeholder - explains planned features for shape drawing
        // See shapes_demo/src/ShapesDemo.tsx for implementation roadmap
        navController.push(ShapesDemo, { navigationController: navController }, {});
        break;

      case 'slots':
        // ✅ Fully implemented - demonstrates slot-based composition
        navController.push(SlotsDemo, { navigationController: navController }, {});
        break;

      case 'forms':
        // FormsDemo placeholder - explains planned features for form handling
        // See forms_demo/src/FormsDemo.tsx for implementation roadmap
        navController.push(FormsDemo, { navigationController: navController }, {});
        break;

      case 'lists':
        // ListsDemo placeholder - explains planned features for dynamic list rendering
        // See lists_demo/src/ListsDemo.tsx for implementation roadmap
        navController.push(ListsDemo, { navigationController: navController }, {});
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
