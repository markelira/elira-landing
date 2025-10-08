/**
 * ELIRA PREMIUM DESIGN PHILOSOPHY
 * 
 * Core Principle: Typography dominates. Everything else supports.
 * 
 * Visual Weight Distribution:
 * - Typography: 75%
 * - White space: 20%  
 * - Icons/decoration: 5%
 */

export const designPhilosophy = {
  
  // TYPOGRAPHY IS KING
  typography: {
    // Massive, confident headlines
    h1: 'text-7xl md:text-8xl lg:text-9xl font-display font-light tracking-tight',
    h2: 'text-5xl md:text-6xl lg:text-7xl font-display font-light tracking-tight',
    h3: 'text-3xl md:text-4xl font-sans font-medium',
    
    // Generous body text
    body: 'text-xl md:text-2xl leading-relaxed',
    
    // Hierarchy through size, not color/weight
    dominance: 'Size differential creates hierarchy. H1 should be 3-4x larger than body.',
    
    // Typography color rules
    colors: {
      primary: 'text-slate-900',    // Headlines - maximum contrast
      secondary: 'text-slate-600',  // Body text - still readable
      muted: 'text-slate-400',      // Captions, metadata
    }
  },
  
  // ICONS ARE ACCENTS ONLY
  icons: {
    // Icons should be SMALLER than you think
    size: 'w-6 h-6',             // Never larger than 24px (reduced from w-8 h-8)
    stroke: 'stroke-[1px]',      // Hairline only
    color: 'text-slate-300',     // Barely visible (lighter than slate-400)
    usage: 'Notational only. Never illustrative.',
    
    rule: 'If removing an icon changes understanding, you relied on it too much.',
    
    // Icon containers (if needed) should be invisible
    container: 'bg-transparent border-0 p-0',  // No colored backgrounds
    
    // Maximum visual weight for icons
    maxVisualWeight: '5% of total design attention'
  },
  
  // WHITE SPACE IS A DESIGN ELEMENT
  spacing: {
    sections: 'py-32 md:py-48 lg:py-64',  // Massive section spacing
    elements: 'space-y-16 md:space-y-24', // Large element spacing
    content: 'space-y-12',                // Generous content spacing
    
    rule: 'When it feels too spacious, you are getting close to premium.',
    
    // Container constraints for readability
    maxWidth: 'max-w-4xl',  // Narrower for focus
    margins: 'mx-auto',     // Center everything
  },
  
  // DECORATION IS MINIMAL
  decoration: {
    backgrounds: 'white or slate-50 only. No gradients.',
    shapes: 'None. Pure surfaces.',
    illustrations: 'None. Typography is the art.',
    borders: 'border-slate-200 max. Hairline only.',
    shadows: 'shadow-sm max. Barely perceptible.',
    
    rule: 'If it is not text or functional UI, remove it.',
    
    // Banned elements
    banned: [
      'gradients',
      'colored icon containers', 
      'decorative arrows',
      'quote mark graphics',
      'star rating visuals',
      'large checkmarks',
      'decorative shapes',
      'background patterns',
      'colored cards'
    ]
  },
  
  // COMPONENT ARCHITECTURE
  components: {
    // Card design philosophy
    cards: {
      background: 'bg-white',
      border: 'border border-slate-100',
      padding: 'p-12',  // Generous padding
      shadow: 'shadow-sm',
      radius: 'rounded-lg',
      
      rule: 'Cards should disappear visually. Content should dominate.'
    },
    
    // Button design philosophy  
    buttons: {
      primary: 'bg-slate-900 text-white px-12 py-6 text-xl',
      secondary: 'border-2 border-slate-900 text-slate-900 px-12 py-6 text-xl',
      sizes: 'Large buttons only. Small buttons feel cheap.',
      
      rule: 'Buttons should feel substantial, not decorative.'
    },
    
    // Navigation philosophy
    navigation: {
      background: 'bg-white/95 backdrop-blur',
      text: 'text-slate-900 text-lg',
      spacing: 'px-8 py-6',
      
      rule: 'Navigation should be invisible until needed.'
    }
  },
  
  // MEASUREMENTS FOR PREMIUM FEEL
  measurements: {
    // Typography scale ratios
    scaleRatio: 1.618,  // Golden ratio for type scale
    
    // Minimum click targets
    minClickTarget: '44px',  // Accessibility standard
    
    // Optical spacing
    opticalSpacing: {
      tight: '0.8em',
      normal: '1.2em', 
      loose: '1.8em',
      extraLoose: '2.4em'
    },
    
    // Container widths
    containers: {
      narrow: 'max-w-2xl',   // For focused content
      standard: 'max-w-4xl', // Default container
      wide: 'max-w-6xl',     // For grids only
    }
  },
  
  // VALIDATION RULES
  validation: {
    // Visual hierarchy test
    squintTest: 'If you squint, only headlines should be visible.',
    
    // Icon test  
    iconTest: 'Remove all icons. Does the design still work? If no, fix the typography.',
    
    // Spacing test
    spacingTest: 'Does it feel uncomfortably spacious? Good. Ship it.',
    
    // Typography test
    typographyTest: 'Is the largest text 4x bigger than the smallest? If no, increase heading sizes.',
    
    // Decoration test
    decorationTest: 'Can you remove 50% of visual elements and improve the design? If yes, remove them.',
  }
  
} as const;

// Export specific design tokens for easy access
export const { typography, icons, spacing, decoration, components, measurements, validation } = designPhilosophy;

// Export utility functions
export const getTypographyClass = (level: 'h1' | 'h2' | 'h3' | 'body') => {
  return typography[level];
};

export const getIconClass = () => {
  return `${icons.size} ${icons.stroke} ${icons.color}`;
};

export const getSpacingClass = (type: 'section' | 'element' | 'content') => {
  return spacing[type as keyof typeof spacing];
};