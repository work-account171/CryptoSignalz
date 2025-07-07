'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import Image from 'next/image'
import styles from './Features.module.css'

export default function Features() {
  const featuresRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    // Use a setTimeout to ensure DOM is fully loaded
    const timer = setTimeout(() => {
      if (featuresRef.current) {
        // Make the section visible first
        gsap.to(featuresRef.current, {
          opacity: 1,
          duration: 0.5
        })
        
        // Then animate feature cards
        const featureCards = featuresRef.current.querySelectorAll(`.${styles.featureCard}`)
        
        featureCards.forEach((card, index) => {
          // Set initial opacity to ensure cards are visible
          gsap.set(card, { opacity: 1, y: 0 })
          
          // Simple animation without ScrollTrigger for better reliability
          gsap.from(card, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            delay: 0.1 * (index + 1),
            ease: 'power2.out'
          })
          
          // Animate SVG icons
          const icon = card.querySelector(`.${styles.iconWrapper} svg`)
          if (icon) {
            gsap.from(icon, {
              scale: 0,
              rotation: -15,
              duration: 0.8,
              delay: 0.1 * (index + 1) + 0.2,
              ease: 'back.out(1.5)'
            })
          }
        })
      }
    }, 200)
    
    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  
  return (
    <section className={styles.features} ref={featuresRef} id="features">
      <div className="container">
        <motion.div 
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.sectionTitle}>
            Powerful <span className="gradient-text">Features</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Experience the next generation of cryptocurrency trading with our advanced platform
          </p>
        </motion.div>
        
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1V23" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="url(#paint1_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="paint0_linear" x1="12.5" y1="1" x2="12.5" y2="23" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#5b68df"/>
                    <stop offset="1" stopColor="#00f6ff"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear" x1="12" y1="5" x2="12" y2="19" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#5b68df"/>
                    <stop offset="1" stopColor="#00f6ff"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Real-time Trading</h3>
            <p className={styles.featureDescription}>
              Execute trades instantly with our high-performance trading engine that processes transactions in milliseconds.
            </p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 8L8 16" stroke="url(#paint1_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 16H8V8" stroke="url(#paint2_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="paint0_linear" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#5b68df"/>
                    <stop offset="1" stopColor="#00f6ff"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear" x1="12" y1="8" x2="12" y2="16" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#5b68df"/>
                    <stop offset="1" stopColor="#00f6ff"/>
                  </linearGradient>
                  <linearGradient id="paint2_linear" x1="12" y1="8" x2="12" y2="16" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#5b68df"/>
                    <stop offset="1" stopColor="#00f6ff"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Advanced Analytics</h3>
            <p className={styles.featureDescription}>
              Gain valuable insights with comprehensive charts, technical indicators, and AI-powered market analysis.
            </p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16V12" stroke="url(#paint1_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8H12.01" stroke="url(#paint2_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="paint0_linear" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#5b68df"/>
                    <stop offset="1" stopColor="#00f6ff"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear" x1="12.5" y1="12" x2="12.5" y2="16" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#5b68df"/>
                    <stop offset="1" stopColor="#00f6ff"/>
                  </linearGradient>
                  <linearGradient id="paint2_linear" x1="12.005" y1="8" x2="12.005" y2="8.01" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#5b68df"/>
                    <stop offset="1" stopColor="#00f6ff"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Enhanced Security</h3>
            <p className={styles.featureDescription}>
              Protect your assets with military-grade encryption, two-factor authentication, and cold storage solutions.
            </p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12H18L15 21L9 3L6 12H2" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="paint0_linear" x1="12" y1="3" x2="12" y2="21" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#5b68df"/>
                    <stop offset="1" stopColor="#00f6ff"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Market Alerts</h3>
            <p className={styles.featureDescription}>
              Stay informed with customizable alerts for price changes, market trends, and trading opportunities.
            </p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 7H17" stroke="url(#paint1_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 12H17" stroke="url(#paint2_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 17H13" stroke="url(#paint3_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="paint0_linear" x1="12" y1="3" x2="12" y2="21" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#5b68df"/>
                    <stop offset="1" stopColor="#00f6ff"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear" x1="12" y1="7" x2="12" y2="8" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#5b68df"/>
                    <stop offset="1" stopColor="#00f6ff"/>
                  </linearGradient>
                  <linearGradient id="paint2_linear" x1="12" y1="12" x2="12" y2="13" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#5b68df"/>
                    <stop offset="1" stopColor="#00f6ff"/>
                  </linearGradient>
                  <linearGradient id="paint3_linear" x1="10" y1="17" x2="10" y2="18" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#5b68df"/>
                    <stop offset="1" stopColor="#00f6ff"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Portfolio Management</h3>
            <p className={styles.featureDescription}>
              Track and manage your cryptocurrency portfolio with advanced tools for performance monitoring and analysis.
            </p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="url(#paint1_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 11L19 13L23 9" stroke="url(#paint2_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="paint0_linear" x1="8.5" y1="15" x2="8.5" y2="21" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#5b68df"/>
                    <stop offset="1" stopColor="#00f6ff"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear" x1="8.5" y1="3" x2="8.5" y2="11" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#5b68df"/>
                    <stop offset="1" stopColor="#00f6ff"/>
                  </linearGradient>
                  <linearGradient id="paint2_linear" x1="20" y1="9" x2="20" y2="13" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#5b68df"/>
                    <stop offset="1" stopColor="#00f6ff"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3 className={styles.featureTitle}>VIP Support</h3>
            <p className={styles.featureDescription}>
              Receive premium support with dedicated account managers and priority assistance for VIP users.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
