'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import styles from './PricingCards.module.css'

export default function PricingCards() {
  const cardsRef = useRef<HTMLDivElement>(null)
  const [isAnnual, setIsAnnual] = useState(false)
  
  // Pricing data with monthly and annual options
  const pricingPlans = {
    starter: {
      monthly: 0,
      annual: 0
    },
    pro: {
      monthly: 29,
      annual: 278 // 20% off monthly price
    },
    enterprise: {
      monthly: 99,
      annual: 950 // 20% off monthly price
    }
  }
  
  // Toggle between monthly and annual billing
  const handleToggleChange = () => {
    setIsAnnual((prev: boolean) => !prev)
  }
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    if (cardsRef.current) {
      // Staggered animation for pricing cards
      const cards = cardsRef.current.querySelectorAll(`.${styles.pricingCard}`)
      
      gsap.from(cards, {
        opacity: 0,
      
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      })
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  
  return (
    <div className={styles.pricingCardsContainer} ref={cardsRef}>
      <div className={styles.toggle}>
        <span className={`${styles.toggleOption} ${!isAnnual ? styles.active : ''}`}>Monthly</span>
        <div className={styles.toggleSwitch}>
          <input 
            type="checkbox" 
            id="pricing-toggle" 
            className={styles.toggleInput} 
            checked={isAnnual}
            onChange={handleToggleChange}
          />
          <label htmlFor="pricing-toggle" className={styles.toggleLabel}>
            <span className={styles.toggleButton}></span>
          </label>
        </div>
        <span className={`${styles.toggleOption} ${isAnnual ? styles.active : ''}`}>
          Annually <span className={styles.discount}>Save 20%</span>
        </span>
      </div>
      
      <div className={styles.pricingGrid}>
        <motion.div 
          className={styles.pricingCard}
          whileHover={{ 
            y: -10, 
            boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.3)',
            borderColor: 'var(--primary)' 
          }}
        >
          <div className={styles.cardHeader}>
            <h3 className={styles.planName}>Starter</h3>
            <div className={styles.planPrice}>
              <span className={styles.currency}>$</span>
              <span className={styles.amount}>{pricingPlans.starter[isAnnual ? 'annual' : 'monthly']}</span>
              <span className={styles.period}>{isAnnual ? '/year' : '/month'}</span>
            </div>
            <p className={styles.planDescription}>Perfect for beginners</p>
          </div>
          
          <ul className={styles.features}>
            <li className={styles.feature}>
              <span className={styles.checkmark}>✓</span>
              <span>Access to basic trading tools</span>
            </li>
            <li className={styles.feature}>
              <span className={styles.checkmark}>✓</span>
              <span>Real-time market data</span>
            </li>
            <li className={styles.feature}>
              <span className={styles.checkmark}>✓</span>
              <span>Portfolio tracking (up to 5 coins)</span>
            </li>
            <li className={styles.feature}>
              <span className={styles.checkmark}>✓</span>
              <span>Market alerts (5 per day)</span>
            </li>
            <li className={styles.feature}>
              <span className={styles.checkmark}>✓</span>
              <span>Email support</span>
            </li>
            <li className={`${styles.feature} ${styles.disabled}`}>
              <span className={styles.xmark}>✗</span>
              <span>Advanced analytics</span>
            </li>
            <li className={`${styles.feature} ${styles.disabled}`}>
              <span className={styles.xmark}>✗</span>
              <span>API access</span>
            </li>
          </ul>
          
          <div className={styles.cardFooter}>
            <motion.button 
              className={`${styles.ctaButton} ${styles.secondary}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Free
            </motion.button>
          </div>
        </motion.div>
        
        <motion.div 
          className={`${styles.pricingCard} ${styles.featured}`}
          whileHover={{ 
            y: -10, 
            boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.3)'
          }}
        >
          <div className={styles.popularTag}>Most Popular</div>
          <div className={styles.cardHeader}>
            <h3 className={styles.planName}>Pro</h3>
            <div className={styles.planPrice}>
              <span className={styles.currency}>$</span>
              <span className={styles.amount}>{pricingPlans.pro[isAnnual ? 'annual' : 'monthly']}</span>
              <span className={styles.period}>{isAnnual ? '/year' : '/month'}</span>
            </div>
            <p className={styles.planDescription}>For active traders</p>
          </div>
          
          <ul className={styles.features}>
            <li className={styles.feature}>
              <span className={styles.checkmark}>✓</span>
              <span>All Starter features</span>
            </li>
            <li className={styles.feature}>
              <span className={styles.checkmark}>✓</span>
              <span>Advanced analytics & charting</span>
            </li>
            <li className={styles.feature}>
              <span className={styles.checkmark}>✓</span>
              <span>Portfolio tracking (unlimited)</span>
            </li>
            <li className={styles.feature}>
              <span className={styles.checkmark}>✓</span>
              <span>Market alerts (50 per day)</span>
            </li>
            <li className={styles.feature}>
              <span className={styles.checkmark}>✓</span>
              <span>Priority email & chat support</span>
            </li>
            <li className={styles.feature}>
              <span className={styles.checkmark}>✓</span>
              <span>Trading fee discounts (25%)</span>
            </li>
            <li className={styles.feature}>
              <span className={styles.checkmark}>✓</span>
              <span>Custom watchlists</span>
            </li>
          </ul>
          
          <div className={styles.cardFooter}>
            <motion.button 
              className={`${styles.ctaButton} ${styles.primary}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Pro Trial
            </motion.button>
          </div>
        </motion.div>
        
        <motion.div 
          className={styles.pricingCard}
          whileHover={{ 
            y: -10, 
            boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.3)',
            borderColor: 'var(--primary)' 
          }}
        >
          <div className={styles.cardHeader}>
            <h3 className={styles.planName}>Enterprise</h3>
            <div className={styles.planPrice}>
              <span className={styles.currency}>$</span>
              <span className={styles.amount}>{pricingPlans.enterprise[isAnnual ? 'annual' : 'monthly']}</span>
              <span className={styles.period}>{isAnnual ? '/year' : '/month'}</span>
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
              <span>Institutional-grade analytics</span>
            </li>
            <li className={styles.feature}>
              <span className={styles.checkmark}>✓</span>
              <span>API access with higher rate limits</span>
            </li>
            <li className={styles.feature}>
              <span className={styles.checkmark}>✓</span>
              <span>Market alerts (unlimited)</span>
            </li>
            <li className={styles.feature}>
              <span className={styles.checkmark}>✓</span>
              <span>24/7 dedicated support</span>
            </li>
            <li className={styles.feature}>
              <span className={styles.checkmark}>✓</span>
              <span>Trading fee discounts (50%)</span>
            </li>
            <li className={styles.feature}>
              <span className={styles.checkmark}>✓</span>
              <span>Custom reporting & integrations</span>
            </li>
          </ul>
          
          <div className={styles.cardFooter}>
            <motion.button 
              className={`${styles.ctaButton} ${styles.secondary}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Sales
            </motion.button>
          </div>
        </motion.div>
      </div>
      
      <div className={styles.comparisonLink}>
        <a href="#comparison">View full feature comparison</a>
      </div>
    </div>
  )
}
