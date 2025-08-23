// Mobile-First Component Library
// Export all mobile components and hooks for easy import

// Components
export { default as TouchTarget, useTouchTargetCheck } from './TouchTarget';
export { 
  default as ResponsiveContainer,
  ResponsiveGrid,
  ResponsiveFlex 
} from './ResponsiveContainer';
export { 
  default as MobileButton,
  MobileIconButton,
  MobileButtonGroup 
} from './MobileButton';
export { 
  default as MobileInput,
  MobileTextarea,
  MobileSelect 
} from './MobileInput';
export { 
  default as MobileMenu,
  MobileMenuButton,
  BottomNavigation 
} from './MobileMenu';
export { 
  default as MobileBottomSheet,
  MobileActionSheet,
  MobileDialog 
} from './MobileBottomSheet';
export { 
  default as MobileForm,
  InlineValidation,
  FormProgress 
} from './MobileForm';

// Hooks
export { 
  default as useMobileDevice,
  useBreakpoint,
  useOrientation,
  useViewportSize,
  useSafeArea 
} from './useMobileDevice';
export { 
  default as useSwipeGesture,
  useSwipeableCarousel,
  useSwipeToClose,
  useSwipeNavigation 
} from './useSwipeGesture';

// Type exports for TypeScript users
export type { default as TouchTargetProps } from './TouchTarget';
export type { default as ResponsiveContainerProps } from './ResponsiveContainer';
export type { default as MobileButtonProps } from './MobileButton';
export type { default as MobileInputProps } from './MobileInput';