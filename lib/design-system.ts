/**
 * Unified Design System
 * Consistent spacing, typography, and component sizing for optimal readability and navigation
 */

export const spacing = {
  // Section spacing - consistent across all major sections
  section: {
    padding: 'py-16',        // Standard section padding
    container: 'px-6',       // Container horizontal padding
    maxWidth: 'max-w-5xl',   // Standard max width for content
    center: 'mx-auto'        // Center content
  },
  
  // Element spacing
  element: {
    mb: {
      xs: 'mb-4',   // Small margin bottom
      sm: 'mb-6',   // Medium margin bottom  
      md: 'mb-8',   // Large margin bottom
      lg: 'mb-12',  // Extra large margin bottom
      xl: 'mb-16'   // Section-level margin bottom
    },
    mt: {
      xs: 'mt-4',   // Small margin top
      sm: 'mt-6',   // Medium margin top
      md: 'mt-8',   // Large margin top
      lg: 'mt-12',  // Extra large margin top
      xl: 'mt-16'   // Section-level margin top
    },
    gap: {
      xs: 'gap-3',  // Small gap
      sm: 'gap-4',  // Medium gap
      md: 'gap-6',  // Large gap
      lg: 'gap-8'   // Extra large gap
    },
    padding: {
      xs: 'p-4',    // Small padding
      sm: 'p-6',    // Medium padding
      md: 'p-8',    // Large padding
      lg: 'p-12'    // Extra large padding
    }
  }
};

export const typography = {
  // Heading hierarchy - clear scale for readability
  heading: {
    h1: 'text-4xl md:text-5xl font-bold leading-tight',     // Main hero headlines
    h2: 'text-3xl md:text-4xl font-bold leading-tight',     // Section headlines
    h3: 'text-2xl md:text-3xl font-bold leading-tight',     // Subsection headlines
    h4: 'text-xl md:text-2xl font-bold leading-tight',      // Component headlines
    h5: 'text-lg md:text-xl font-bold leading-tight',       // Small headlines
    h6: 'text-base md:text-lg font-bold leading-tight'      // Micro headlines
  },
  
  // Body text - optimized for reading
  body: {
    large: 'text-lg md:text-xl leading-relaxed',            // Large body text
    base: 'text-base md:text-lg leading-relaxed',           // Standard body text
    small: 'text-sm md:text-base leading-relaxed'           // Small body text
  },
  
  // UI elements
  ui: {
    button: {
      large: 'text-lg md:text-xl font-bold',                 // Primary CTAs
      medium: 'text-base md:text-lg font-bold',              // Secondary buttons
      small: 'text-sm md:text-base font-semibold'            // Small buttons
    },
    caption: 'text-sm text-gray-600',                        // Captions, hints
    badge: 'text-xs md:text-sm font-semibold',               // Badges, tags
    meta: 'text-xs text-gray-500'                            // Meta information
  }
};

export const components = {
  // Button sizing - consistent across all buttons
  button: {
    large: 'px-8 py-4 md:px-12 md:py-6',      // Primary CTAs
    medium: 'px-6 py-3 md:px-8 md:py-4',      // Secondary buttons
    small: 'px-4 py-2 md:px-6 md:py-3',       // Small buttons
    radius: 'rounded-2xl',                      // Consistent border radius
    shadow: 'shadow-xl hover:shadow-2xl'       // Consistent shadow
  },
  
  // Card sizing
  card: {
    padding: 'p-6 md:p-8',                     // Standard card padding
    radius: 'rounded-2xl md:rounded-3xl',      // Consistent border radius
    shadow: 'shadow-lg hover:shadow-xl',       // Consistent shadow
    border: 'border border-white/20'           // Consistent border
  },
  
  // Form elements
  form: {
    input: 'px-4 py-3 md:px-6 md:py-4 rounded-xl',  // Input padding
    label: 'text-sm md:text-base font-medium',       // Label styling
    error: 'text-sm text-red-600',                   // Error text
    help: 'text-xs md:text-sm text-gray-500'         // Help text
  },
  
  // Grid and layout
  grid: {
    cols: {
      two: 'md:grid-cols-2',
      three: 'md:grid-cols-3',
      four: 'lg:grid-cols-4'
    },
    gap: 'gap-6 md:gap-8'
  }
};

// Color system for consistent theming
export const colors = {
  primary: {
    gradient: 'bg-gradient-to-r from-teal-600 to-cyan-600',
    solid: 'bg-teal-600',
    text: 'text-teal-600',
    light: 'bg-teal-50 text-teal-700'
  },
  
  secondary: {
    gradient: 'bg-gradient-to-r from-green-600 to-emerald-600',
    solid: 'bg-green-600', 
    text: 'text-green-600',
    light: 'bg-green-50 text-green-700'
  },
  
  accent: {
    gradient: 'bg-gradient-to-r from-purple-600 to-pink-600',
    solid: 'bg-purple-600',
    text: 'text-purple-600',
    light: 'bg-purple-50 text-purple-700'
  },
  
  neutral: {
    white: 'bg-white',
    gray: {
      50: 'bg-gray-50',
      100: 'bg-gray-100',
      500: 'bg-gray-500',
      900: 'bg-gray-900'
    }
  }
};

// Animation system for consistent motion
export const animations = {
  duration: {
    fast: 'duration-200',
    normal: 'duration-300',
    slow: 'duration-500'
  },
  
  transition: 'transition-all',
  
  hover: {
    scale: 'hover:scale-105',
    lift: 'hover:-translate-y-2',
    shadow: 'hover:shadow-2xl'
  },
  
  focus: {
    ring: 'focus:ring-4 focus:ring-teal-500/20',
    outline: 'focus:outline-none'
  }
};

// Helper function to combine design system classes
export const createClasses = (...classes: string[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Common class combinations
export const commonClasses = {
  sectionContainer: createClasses(
    spacing.section.padding,
    spacing.section.container
  ),
  
  contentWrapper: createClasses(
    spacing.section.maxWidth,
    spacing.section.center
  ),
  
  primaryButton: createClasses(
    components.button.large,
    components.button.radius,
    components.button.shadow,
    typography.ui.button.large,
    colors.primary.gradient,
    'text-white',
    animations.transition,
    animations.duration.normal,
    animations.hover.scale,
    animations.focus.ring,
    animations.focus.outline
  ),
  
  secondaryButton: createClasses(
    components.button.medium,
    components.button.radius,
    'bg-white/10 backdrop-blur-xl',
    'border-2 border-white/30 hover:border-white/50',
    'text-white hover:bg-white/15',
    typography.ui.button.medium,
    animations.transition,
    animations.duration.normal,
    animations.hover.lift,
    animations.focus.ring,
    animations.focus.outline
  ),
  
  card: createClasses(
    components.card.padding,
    components.card.radius,
    components.card.shadow,
    components.card.border,
    'bg-white/95 backdrop-blur-sm',
    animations.transition,
    animations.duration.normal,
    animations.hover.lift
  ),
  
  sectionHeading: createClasses(
    typography.heading.h2,
    spacing.element.mb.md,
    'text-center'
  ),
  
  bodyText: createClasses(
    typography.body.base,
    spacing.element.mb.sm
  )
};