'use client'

import { useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import WhitepaperModal from '@/components/WhitepaperModal/WhitepaperModal'
import styles from './page.module.css'

export default function Whitepaper() {
  const [showModal, setShowModal] = useState(false)
  
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Use a timeout to ensure that animations run after hydration is complete
    const animationTimeout = setTimeout(() => {
      // Initial title animation
      gsap.from('.whitepaper-title', {
        opacity: 0,
        y: -50,
        duration: 1.2,
        ease: 'back.out(1.7)',
      });
      
      // Animate the introduction section
      gsap.from('.whitepaper-intro', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3,
      });
      
      // Animate highlight cards with stagger
      gsap.from('.whitepaper-highlight', {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.whitepaper-highlights',
          start: 'top 80%',
        }
      });
      
      // Animate CTA with special effects
      gsap.from('.whitepaper-cta', {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: 'elastic.out(1, 0.75)',
        scrollTrigger: {
          trigger: '.whitepaper-cta',
          start: 'top 80%',
        }
      });
    }, 100); // Small delay to ensure DOM is ready
    
    // Clean up all scroll triggers and timeout on unmount
    return () => {
      clearTimeout(animationTimeout);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  }, [])
  
  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)
  
  return (
    <div className={styles.whitepaperPage}>
      <div className="container">
        <div className={styles.content}>
          <h1 className={`${styles.title} whitepaper-title`}>
            <span className="gradient-text">CryptoSignalz</span> Whitepaper
          </h1>
          
          <div className={`${styles.introduction} whitepaper-intro`}>
            <h2>Revolutionizing Cryptocurrency Trading</h2>
            <p>
              Our comprehensive whitepaper outlines the technology, methodology, and vision behind
              CryptoSignalz's next-generation cryptocurrency platform. Learn how our innovative approach
              to trading, security, and blockchain integration sets a new industry standard.
            </p>
          </div>
          
          <div className={`${styles.highlights} whitepaper-highlights`}>
            <div className={`${styles.highlight} whitepaper-highlight`}>
              <h3>Advanced Trading Algorithms</h3>
              <p>
                Proprietary AI-powered trading systems that analyze market patterns and execute
                trades with unprecedented speed and accuracy.
              </p>
            </div>
            
            <div className={`${styles.highlight} whitepaper-highlight`}>
              <h3>Blockchain Architecture</h3>
              <p>
                Multi-chain support with cross-chain compatibility, ensuring seamless
                transactions across different blockchain networks.
              </p>
            </div>
            
            <div className={`${styles.highlight} whitepaper-highlight`}>
              <h3>Security Framework</h3>
              <p>
                Military-grade encryption and multi-layer security protocols to protect
                user assets and data from threats.
              </p>
            </div>
          </div>
          
          <motion.div 
            className={`${styles.cta} whitepaper-cta`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button 
              className={`btn btn-primary btn-lg ${styles.ctaButton}`}
              onClick={openModal}
            >
              Preview Whitepaper
            </button>
            <a href="#" className={styles.downloadLink}>Download Full PDF</a>
          </motion.div>
        </div>
      </div>
      
      {showModal && <WhitepaperModal onClose={closeModal} />}
    </div>
  )
}
