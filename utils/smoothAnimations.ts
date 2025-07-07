'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Optimized animation utility functions for smoother animations
 */

/**
 * Boosts GSAP performance by configuring optimal rendering settings
 * Should be called early during initialization
 */
export const optimizeGSAPPerformance = () => {
  // Use requestAnimationFrame for smoother animations
  gsap.ticker.fps(0);
  
  // Prevent GSAP from using setTimeout as a fallback
  gsap.ticker.lagSmoothing(0);
  
  // Use transforms where possible for better performance
  gsap.config({
    force3D: true,
    autoSleep: 60,
    nullTargetWarn: false
  });
};

/**
 * Apply hardware acceleration for smoother animations
 * @param element The element to optimize
 */
export const applyHardwareAcceleration = (element: HTMLElement) => {
  // Force GPU acceleration
  element.style.willChange = 'transform';
  element.style.transform = 'translateZ(0)';
  element.style.backfaceVisibility = 'hidden';
};

/**
 * Optimizes all animations within a container
 * @param container The container to optimize
 */
export const optimizeAllAnimations = (container: HTMLElement) => {
  // Apply to container itself
  applyHardwareAcceleration(container);
  
  // Apply to all animated elements
  const animatedElements = container.querySelectorAll('[class*="animate"], [class*="motion"], [class*="fade"], [class*="slide"]');
  animatedElements.forEach(el => {
    applyHardwareAcceleration(el as HTMLElement);
  });
};

/**
 * Hook for applying hardware acceleration to elements matching the selector
 * @param selector CSS selector for elements to optimize
 */
export const useHardwareAcceleration = (selector: string) => {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      applyHardwareAcceleration(el as HTMLElement);
    });
  }, [selector]);
};

/**
 * Hook for improved scroll-based animations with better performance
 * @param config Configuration options
 */
export const useOptimizedScrollAnimation = (config: {
  trigger: string;
  start?: string;
  end?: string;
  animation: (element: HTMLElement) => gsap.core.Tween;
}) => {
  const animationRef = useRef<gsap.core.Tween | null>(null);
  
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    
    const element = document.querySelector(config.trigger) as HTMLElement;
    if (!element) return;
    
    // Apply hardware acceleration
    applyHardwareAcceleration(element);
    
    // Import and register ScrollTrigger
    try {
      const { ScrollTrigger } = require('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      
      // Create the animation
      const animation = config.animation(element);
      animationRef.current = animation;
      
      // Add ScrollTrigger
      ScrollTrigger.create({
        trigger: element,
        start: config.start || 'top bottom',
        end: config.end || 'bottom top',
        animation: animation,
        scrub: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        preventOverlaps: true,
      });
      
      return () => {
        if (animationRef.current) {
          animationRef.current.kill();
        }
        
        // Type-safe way to access all triggers
        ScrollTrigger.getAll().forEach((st: any) => {
          if (st.vars.trigger === element) {
            st.kill();
          }
        });
      };
    } catch (error) {
      console.warn('ScrollTrigger not available', error);
      return;
    }
  }, [config]);
};

/**
 * Applies smooth transitions to an element
 * @param element The element to enhance
 * @param properties CSS properties to transition
 * @param duration Duration in seconds
 */
export const applySmoothTransitions = (
  element: HTMLElement, 
  properties: string[] = ['all'], 
  duration: number = 0.3
) => {
  const transitionValue = properties
    .map(prop => `${prop} ${duration}s cubic-bezier(0.4, 0, 0.2, 1)`)
    .join(', ');
  
  element.style.transition = transitionValue;
};