'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import Link from 'next/link'
import styles from './PricingPreview.module.css'

export default function PricingPreview() {
  const pricingRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    // Use a setTimeout to make sure the DOM is fully rendered
    const timer = setTimeout(() => {
      if (pricingRef.current) {
        // Force the section to be visible first
        gsap.set(pricingRef.current, { opacity: 1, visibility: 'visible' })
        
        // Set initial states for header and cards to ensure they are visible
        gsap.set(pricingRef.current.querySelector(`.${styles.sectionHeader}`), { opacity: 1, y: 0 })
        
        const cards = pricingRef.current.querySelectorAll(`.${styles.pricingCard}`)
        gsap.set(cards, { opacity: 1, y: 0 })
        
        // Simple animations without ScrollTrigger for better reliability
        gsap.from(pricingRef.current.querySelector(`.${styles.sectionHeader}`), {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: 'power2.out'
        })
        
        // Staggered animation for pricing cards
        gsap.from(cards, {
          opacity: 0,
          y: 30,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.3
        })
      }
    }, 100)
    
    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  
  return (
    <section className={styles.pricingPreview} ref={pricingRef} id="pricing">
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Choose the plan that fits your trading needs, with no hidden fees
          </p>
        </div>
        
        <div className={styles.pricingGrid}>
          <motion.div 
            className={styles.pricingCard}
            whileHover={{ y: -10, boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.3)' }}
          >
            <div className={styles.cardHeader}>
              <h3 className={styles.planName}>Basic</h3>
              <div className={styles.planPrice}>
                <span className={styles.currency}>$</span>
                <span className={styles.amount}>0</span>
                <span className={styles.period}>/month</span>
              </div>
              <p className={styles.planDescription}>Perfect for beginners</p>
            </div>
            
            <ul className={styles.features}>
              <li className={styles.feature}>
                <span className={styles.checkmark}>✓</span>
                <span>Real-time market data</span>
              </li>
              <li className={styles.feature}>
                <span className={styles.checkmark}>✓</span>
                <span>Basic portfolio tracking</span>
              </li>
              <li className={styles.feature}>
                <span className={styles.checkmark}>✓</span>
                <span>5 market alerts</span>
              </li>
              <li className={styles.feature}>
                <span className={styles.checkmark}>✓</span>
                <span>Standard trading fees</span>
              </li>
              <li className={`${styles.feature} ${styles.disabled}`}>
                <span className={styles.checkmark}>✗</span>
                <span>Advanced analytics</span>
              </li>
            </ul>
            
            <div className={styles.cardFooter}>
              <motion.button 
                className={`${styles.ctaButton} ${styles.secondary}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
          
          <motion.div 
            className={`${styles.pricingCard} ${styles.featured}`}
            whileHover={{ y: -10, boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.3)' }}
          >
            <div className={styles.popularTag}>Most Popular</div>
            <div className={styles.cardHeader}>
              <h3 className={styles.planName}>Pro</h3>
              <div className={styles.planPrice}>
                <span className={styles.currency}>$</span>
                <span className={styles.amount}>29</span>
                <span className={styles.period}>/month</span>
              </div>
              <p className={styles.planDescription}>For active traders</p>
            </div>
            
            <ul className={styles.features}>
              <li className={styles.feature}>
                <span className={styles.checkmark}>✓</span>
                <span>All Basic features</span>
              </li>
              <li className={styles.feature}>
                <span className={styles.checkmark}>✓</span>
                <span>Advanced analytics</span>
              </li>
              <li className={styles.feature}>
                <span className={styles.checkmark}>✓</span>
                <span>20 market alerts</span>
              </li>
              <li className={styles.feature}>
                <span className={styles.checkmark}>✓</span>
                <span>Reduced trading fees</span>
              </li>
              <li className={styles.feature}>
                <span className={styles.checkmark}>✓</span>
                <span>Priority support</span>
              </li>
            </ul>
            
            <div className={styles.cardFooter}>
              <motion.button 
                className={`${styles.ctaButton} ${styles.primary}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
          
          <motion.div 
            className={styles.pricingCard}
            whileHover={{ y: -10, boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.3)' }}
          >
            <div className={styles.cardHeader}>
              <h3 className={styles.planName}>Enterprise</h3>
              <div className={styles.planPrice}>
                <span className={styles.currency}>$</span>
                <span className={styles.amount}>99</span>
                <span className={styles.period}>/month</span>
              </div>
              <p className={styles.planDescription}>For professional traders</p>
            </div>
            
            <ul className={styles.features}>
              <li className={styles.feature}>
                <span className={styles.checkmark}>✓</span>
                <span>All Pro features</span>
              </li>
              <li className={styles.feature}>
                <span className={styles.checkmark}>✓</span>
                <span>API access</span>
              </li>
              <li className={styles.feature}>
                <span className={styles.checkmark}>✓</span>
                <span>Unlimited market alerts</span>
              </li>
              <li className={styles.feature}>
                <span className={styles.checkmark}>✓</span>
                <span>Lowest trading fees</span>
              </li>
              <li className={styles.feature}>
                <span className={styles.checkmark}>✓</span>
                <span>Dedicated account manager</span>
              </li>
            </ul>
            
            <div className={styles.cardFooter}>
              <motion.button 
                className={`${styles.ctaButton} ${styles.secondary}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        <div className={styles.viewMore}>
          <Link href="/pricing" passHref>
            <motion.div
              className={styles.viewMoreLink}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Full Pricing Details
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  )
}
