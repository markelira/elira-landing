/**
 * Global Academic Harvard/Yale Style System
 * Toggle utility for transforming the entire platform
 */

export class AcademicModeController {
  private static instance: AcademicModeController;
  private isAcademicMode: boolean = false;

  static getInstance(): AcademicModeController {
    if (!AcademicModeController.instance) {
      AcademicModeController.instance = new AcademicModeController();
    }
    return AcademicModeController.instance;
  }

  /**
   * Initialize academic mode from localStorage
   */
  init(): void {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('academic-mode');
      this.isAcademicMode = savedMode === 'true';
      this.updateDOM();
    }
  }

  /**
   * Toggle academic mode on/off
   */
  toggle(): boolean {
    this.isAcademicMode = !this.isAcademicMode;
    this.updateDOM();
    this.saveToStorage();
    return this.isAcademicMode;
  }

  /**
   * Enable academic mode
   */
  enable(): void {
    this.isAcademicMode = true;
    this.updateDOM();
    this.saveToStorage();
  }

  /**
   * Disable academic mode
   */
  disable(): void {
    this.isAcademicMode = false;
    this.updateDOM();
    this.saveToStorage();
  }

  /**
   * Get current academic mode state
   */
  isEnabled(): boolean {
    return this.isAcademicMode;
  }

  /**
   * Update DOM classes and styles
   */
  private updateDOM(): void {
    if (typeof window === 'undefined') return;

    const body = document.body;
    
    if (this.isAcademicMode) {
      body.classList.add('academic-mode');
      // Update document title for academic feel
      document.documentElement.style.setProperty('--font-family', '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif');
    } else {
      body.classList.remove('academic-mode');
      document.documentElement.style.setProperty('--font-family', '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif');
    }
  }

  /**
   * Save mode to localStorage
   */
  private saveToStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('academic-mode', this.isAcademicMode.toString());
    }
  }

  /**
   * Add academic classes to elements
   */
  applyAcademicClasses(element: HTMLElement, classNames: string[]): void {
    if (!this.isAcademicMode) return;
    
    classNames.forEach(className => {
      element.classList.add(`academic-${className}`);
    });
  }

  /**
   * Remove academic classes from elements
   */
  removeAcademicClasses(element: HTMLElement, classNames: string[]): void {
    classNames.forEach(className => {
      element.classList.remove(`academic-${className}`);
    });
  }
}

// React Hook for academic mode
import { useState, useEffect } from 'react';

export const useAcademicMode = () => {
  const [isAcademicMode, setIsAcademicMode] = useState(false);
  const controller = AcademicModeController.getInstance();

  useEffect(() => {
    controller.init();
    setIsAcademicMode(controller.isEnabled());
  }, [controller]);

  const toggle = () => {
    const newState = controller.toggle();
    setIsAcademicMode(newState);
  };

  const enable = () => {
    controller.enable();
    setIsAcademicMode(true);
  };

  const disable = () => {
    controller.disable();
    setIsAcademicMode(false);
  };

  return {
    isAcademicMode,
    toggle,
    enable,
    disable,
  };
};

// Utility functions for React components
export const academicClass = (baseClasses: string, academicClasses?: string) => {
  const controller = AcademicModeController.getInstance();
  
  if (controller.isEnabled() && academicClasses) {
    return `${baseClasses} ${academicClasses}`;
  }
  
  return baseClasses;
};

export const academicStyle = (baseStyle: React.CSSProperties, academicStyle?: React.CSSProperties) => {
  const controller = AcademicModeController.getInstance();
  
  if (controller.isEnabled() && academicStyle) {
    return { ...baseStyle, ...academicStyle };
  }
  
  return baseStyle;
};

// Export singleton instance
export const academicMode = AcademicModeController.getInstance();