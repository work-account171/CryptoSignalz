'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import styles from './Footer.module.css'

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const [currentYear, setCurrentYear] = useState<number>()
  
  useEffect(() => {
    // Set current year
    setCurrentYear(new Date().getFullYear())
    
    // GSAP animations
    gsap.registerPlugin(ScrollTrigger)
    
    if (footerRef.current) {
      // Animate footer sections on scroll
      gsap.from(footerRef.current.querySelectorAll(`.${styles.footerColumn}`), {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      })
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  
  return (
    <footer className={styles.footer} ref={footerRef}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div className={styles.footerColumn}>
            <div className={styles.logoContainer}>
              <Link href="/" className={styles.logo}>
                Crypto<span className={styles.highlight}>Pulse</span>
              </Link>
              <p className={styles.tagline}>
                The future of cryptocurrency trading
              </p>
            </div>
            <div className={styles.socials}>
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialIcon}
                whileHover={{ y: -5, color: '#1DA1F2' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3.00005C22.0424 3.67552 20.9821 4.19216 19.86 4.53005C19.2577 3.83756 18.4573 3.34674 17.567 3.12397C16.6767 2.90121 15.7395 2.95724 14.8821 3.2845C14.0247 3.61176 13.2884 4.19445 12.773 4.95376C12.2575 5.71308 11.9877 6.61238 12 7.53005V8.53005C10.2426 8.57561 8.50127 8.18586 6.93101 7.39549C5.36074 6.60513 4.01032 5.43868 3 4.00005C3 4.00005 -1 13 8 17C5.94053 18.398 3.48716 19.099 1 19C10 24 21 19 21 7.50005C20.9991 7.2215 20.9723 6.94364 20.92 6.67005C21.9406 5.66354 22.6608 4.39276 23 3.00005Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.a>
              <motion.a 
                href="https://discord.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialIcon}
                whileHover={{ y: -5, color: '#5865F2' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 9C18 9 16.5 7.5 14 7.5L13.8 7.74C15.8 8.19 16.7 9 17.5 10C16.1 9.3 14.7 8.7 12 8.7C9.3 8.7 7.9 9.3 6.5 10C7.3 9 8.3 8.19 10.2 7.74L10 7.5C7.5 7.5 6 9 6 9C6 9 4.2 11.98 4 17.5C5.5 19.5 8.5 19.5 8.5 19.5L9.2 18.6C8 18.2 6.9 17.5 6 16.5C7 17.2 8.7 18 12 18C15.3 18 17 17.2 18 16.5C17.1 17.5 16 18.2 14.8 18.6L15.5 19.5C15.5 19.5 18.5 19.5 20 17.5C19.8 11.98 18 9 18 9ZM9.7 15.5C8.8 15.5 8 14.8 8 13.9C8 13 8.8 12.2 9.7 12.2C10.6 12.2 11.4 13 11.4 13.9C11.4 14.8 10.6 15.5 9.7 15.5ZM14.3 15.5C13.4 15.5 12.6 14.8 12.6 13.9C12.6 13 13.4 12.2 14.3 12.2C15.2 12.2 16 13 16 13.9C16 14.8 15.2 15.5 14.3 15.5Z" fill="currentColor"/>
                </svg>
              </motion.a>
              <motion.a 
                href="https://telegram.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialIcon}
                whileHover={{ y: -5, color: '#0088CC' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.a>
              <motion.a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialIcon}
                whileHover={{ y: -5, color: '#FFFFFF' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 22.0001V18.1301C16.0375 17.6532 15.9731 17.1739 15.811 16.7239C15.6489 16.2738 15.3929 15.8635 15.06 15.5201C18.2 15.1701 21.5 14.0001 21.5 8.52006C21.4997 7.12389 20.9627 5.78126 20 4.77006C20.4559 3.54857 20.4236 2.19841 19.91 1.00006C19.91 1.00006 18.73 0.65006 16 2.48006C13.708 1.85888 11.292 1.85888 9 2.48006C6.27 0.65006 5.09 1.00006 5.09 1.00006C4.57638 2.19841 4.54414 3.54857 5 4.77006C4.03013 5.78876 3.49252 7.14352 3.5 8.55006C3.5 13.9701 6.8 15.1401 9.94 15.5501C9.611 15.89 9.35726 16.2955 9.19531 16.74C9.03335 17.1845 8.96681 17.658 9 18.1301V22.0001M9 19.0001C4 20.5001 4 16.5001 2 16.0001L9 19.0001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.a>
            </div>
          </div>
          
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Company</h3>
            <ul className={styles.footerLinks}>
              <li>
                <Link href="/about" className={styles.footerLink}>About Us</Link>
              </li>
              <li>
                <Link href="#" className={styles.footerLink}>Careers</Link>
              </li>
              <li>
                <Link href="#" className={styles.footerLink}>Press Kit</Link>
              </li>
              <li>
                <Link href="#" className={styles.footerLink}>Contact</Link>
              </li>
            </ul>
          </div>
          
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Product</h3>
            <ul className={styles.footerLinks}>
              <li>
                <Link href="#" className={styles.footerLink}>Features</Link>
              </li>
              <li>
                <Link href="/pricing" className={styles.footerLink}>Pricing</Link>
              </li>
              <li>
                <Link href="/whitepaper" className={styles.footerLink}>Whitepaper</Link>
              </li>
              <li>
                <Link href="#" className={styles.footerLink}>Roadmap</Link>
              </li>
            </ul>
          </div>
          
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Resources</h3>
            <ul className={styles.footerLinks}>
              <li>
                <Link href="/faq" className={styles.footerLink}>FAQs</Link>
              </li>
              <li>
                <Link href="#" className={styles.footerLink}>Blog</Link>
              </li>
              <li>
                <Link href="#" className={styles.footerLink}>Support</Link>
              </li>
              <li>
                <Link href="#" className={styles.footerLink}>Documentation</Link>
              </li>
            </ul>
          </div>
          
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Legal</h3>
            <ul className={styles.footerLinks}>
              <li>
                <Link href="#" className={styles.footerLink}>Terms of Service</Link>
              </li>
              <li>
                <Link href="#" className={styles.footerLink}>Privacy Policy</Link>
              </li>
              <li>
                <Link href="#" className={styles.footerLink}>Cookie Policy</Link>
              </li>
              <li>
                <Link href="#" className={styles.footerLink}>Compliance</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            © {currentYear || 2023} CryptoSignalz. All rights reserved.
          </div>
          <div className={styles.currencies}>
            <span>BTC</span>
            <span>ETH</span>
            <span>SOL</span>
            <span>ADA</span>
            <span>DOT</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
