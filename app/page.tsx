'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from '@/components/Hero/Hero'
import Features from '@/components/Features/Features'
import PricingPreview from '@/components/PricingPreview/PricingPreview'
import Testimonials from '@/components/Testimonials/Testimonials'
import { 
  optimizeGSAPPerformance, 
  optimizeAllAnimations, 
  useHardwareAcceleration 
} from '@/utils/smoothAnimations'
import styles from './page.module.css'

export default function Home() {
  // Apply hardware acceleration to common animated elements
  useHardwareAcceleration('.btn, .navLink, [class*="animate"], [class*="motion"], [class*="fade"], [class*="slide"]');

  // Optimize all animations and ensure visibility
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    
    // Optimize GSAP performance
    optimizeGSAPPerformance();
    
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Force visibility and optimize animations
    const makeEverythingVisible = () => {
      // Kill any existing ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Select the main container
      const mainContainer = document.querySelector(`.${styles.home}`) as HTMLElement;
      if (mainContainer) {
        optimizeAllAnimations(mainContainer);
      }
      
      // Select all sections and major content elements
      const allElements = document.querySelectorAll('section, div, main, article, aside, header, footer');
      
      // Force visibility with inline styles
      allElements.forEach(element => {
        const htmlElement = element as HTMLElement;
        htmlElement.style.opacity = '1';
        htmlElement.style.visibility = 'visible';
        
        // Don't override display property if it's already set
        if (htmlElement.style.display === 'none') {
          htmlElement.style.display = 'block';
        }
      });
      
      // Specifically target all animation-related classes and optimize them
      document.querySelectorAll('[class*="animate"], [class*="motion"], [class*="fade"], [class*="slide"]').forEach(el => {
        const htmlElement = el as HTMLElement;
        htmlElement.style.opacity = '1';
        htmlElement.style.visibility = 'visible';
        htmlElement.style.transform = 'translateZ(0)'; // Force GPU acceleration
      });
    };
    
    // Run immediately
    makeEverythingVisible();
    
    // And also after a brief delay to catch any animations that might start later
    const visibilityTimer = setTimeout(makeEverythingVisible, 300);
    
    // Set up a lighter mutation observer to catch any dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length > 0) {
          makeEverythingVisible();
        }
      });
    });
    
    // Start observing the document with the configured parameters
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      clearTimeout(visibilityTimer);
      observer.disconnect();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className={styles.home} style={{ 
      opacity: 1, 
      visibility: 'visible',
      position: 'relative',
      zIndex: 1,
      display: 'block',
      overflow: 'visible'
    }}>
      {/* Each component wrapped with inline styles to ensure visibility */}
      <div style={{ opacity: 1, visibility: 'visible', position: 'relative', zIndex: 2 }}>
        <Hero />
      </div>
      <div style={{ opacity: 1, visibility: 'visible', position: 'relative', zIndex: 3 }}>
        <Features />
      </div>
      <div style={{ opacity: 1, visibility: 'visible', position: 'relative', zIndex: 4 }}>
        <PricingPreview />
      </div>
      <div style={{ opacity: 1, visibility: 'visible', position: 'relative', zIndex: 5 }}>
        <Testimonials />
      </div>
    </div>
  )
}
