'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { 
  applyHardwareAcceleration, 
  optimizeGSAPPerformance 
} from '@/utils/smoothAnimations'
import styles from './Hero.module.css'

export default function Hero() {
  const cryptoLogoRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    
    // Optimize GSAP performance
    optimizeGSAPPerformance();
    
    // Apply hardware acceleration to improve animation performance
    if (cryptoLogoRef.current) {
      applyHardwareAcceleration(cryptoLogoRef.current);
    }
    
    if (heroRef.current) {
      // Optimize all parallax elements
      heroRef.current.querySelectorAll('.parallax').forEach(element => {
        applyHardwareAcceleration(element as HTMLElement);
      });
    }
    
    // Run animations with a slight delay to ensure DOM is fully ready
    const timer = setTimeout(() => {
      // GSAP 3D rotating animation for crypto logo with improved performance
      if (cryptoLogoRef.current) {
        gsap.to(cryptoLogoRef.current, {
          rotationY: 360,
          duration: 20,
          repeat: -1,
          ease: 'none',
          force3D: true, // Force 3D transforms for better performance
          overwrite: 'auto'
        });
      }
      
      // Optimized fade-in animation for background elements
      if (heroRef.current) {
        const parallaxElements = heroRef.current.querySelectorAll('.parallax')
        
        gsap.to(parallaxElements, {
          opacity: 0.8,
          duration: 1,
          stagger: 0.3,
          ease: 'power2.out',
          force3D: true,
          overwrite: 'auto'
        });
      }
    }, 50); // Reduced delay for faster initial animation
    
    return () => clearTimeout(timer);
  }, [])
  
  return (
    <section className={styles.hero} ref={heroRef}>
      <div className={`${styles.bgElement} ${styles.bg1} parallax`}></div>
      <div className={`${styles.bgElement} ${styles.bg2} parallax`}></div>
      
      <div className="container">
        <div className={styles.content}>
          <motion.div 
            className={styles.textContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut", 
              type: 'tween',
              willChange: 'opacity, transform' // Optimize performance
            }}
          >
            <h1 className={styles.title}>
              The Future of <span className="gradient-text">Cryptocurrency</span> Trading
            </h1>
            <p className={styles.subtitle}>
              Advanced tools, real-time analytics, and secure trading for the modern investor
            </p>
            <div className={styles.buttons}>
              <motion.button 
                className="btn btn-primary btn-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 500, 
                  damping: 30,
                  willChange: 'transform' // Optimize performance
                }}
              >
                Get Started
              </motion.button>
              <motion.button 
                className="btn btn-secondary btn-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 500, 
                  damping: 30,
                  willChange: 'transform' // Optimize performance
                }}
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
          
          <motion.div 
            className={styles.imageContent}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.3, 
              ease: "easeOut",
              willChange: 'opacity, transform' // Optimize performance
            }}
          >
            <div className={styles.logoWrapper} ref={cryptoLogoRef}>
              <div className={styles.cryptoLogoContainer}>
                <Image 
                  src="/icons/bitcoin.svg"
                  alt="Bitcoin"
                  width={200}
                  height={200}
                  className={styles.cryptoLogo}
                  priority={true}
                  quality={100}
                />
                <Image 
                  src="/icons/ethereum.svg"
                  alt="Ethereum"
                  width={180}
                  height={180}
                  className={`${styles.cryptoLogo} ${styles.ethLogo}`}
                  priority={true}
                  quality={100}
                />
              </div>
            </div>
            <div className={styles.glowEffect}></div>
          </motion.div>
        </div>
        
        <div className={styles.stats}>
          <motion.div 
            className={styles.statItem}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.6,
              willChange: 'opacity, transform'
            }}
          >
            <span className={styles.statValue}>$2.5B+</span>
            <span className={styles.statLabel}>Trading Volume</span>
          </motion.div>
          <motion.div 
            className={styles.statItem}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.7,
              willChange: 'opacity, transform'
            }}
          >
            <span className={styles.statValue}>100+</span>
            <span className={styles.statLabel}>Cryptocurrencies</span>
          </motion.div>
          <motion.div 
            className={styles.statItem}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.8,
              willChange: 'opacity, transform'
            }}
          >
            <span className={styles.statValue}>1M+</span>
            <span className={styles.statLabel}>Active Users</span>
          </motion.div>
          <motion.div 
            className={styles.statItem}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.9,
              willChange: 'opacity, transform'
            }}
          >
            <span className={styles.statValue}>50+</span>
            <span className={styles.statLabel}>Countries</span>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          delay: 1.5, 
          duration: 0.8,
          willChange: 'opacity'
        }}
        onClick={() => {
          if (typeof window === 'undefined' || typeof document === 'undefined') return;
          
          // Smooth scroll to features section
          const featuresSection = document.querySelector('#features');
          if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: 'smooth' });
          } else {
            // If features section isn't found, just scroll down a bit
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth'
            });
          }
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{ 
          transform: 'translateZ(0)', // Force GPU acceleration
          backfaceVisibility: 'hidden'
        }}
      >
        <div className={styles.mouse}>
          <div className={styles.scroller}></div>
        </div>
        <motion.span 
          animate={{ y: [0, 5, 0] }} 
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: 'easeInOut',
            willChange: 'transform'
          }}
          style={{ transform: 'translateZ(0)' }} // Force GPU acceleration
        >
          Scroll Down
        </motion.span>
      </motion.div>
    </section>
  )
}
