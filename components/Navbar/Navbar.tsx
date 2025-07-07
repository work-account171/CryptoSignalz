'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import useHydrated from '@/hooks/useHydrated'
import { 
  addWindowEventListener, 
  scrollToTop as smoothScrollToTop,
  scrollToElement,
  getElementById,
  querySelector,
  isClient,
  getWindow
} from '@/utils/client'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [featuresDropdownOpen, setFeaturesDropdownOpen] = useState(false)
  const pathname = usePathname()
  const isHydrated = useHydrated()
  
  // Check if current path matches the link
  const isActive = (path: string) => {
    return pathname === path
  }
  
  // Toggle the features dropdown
  const toggleFeaturesDropdown = () => {
    setFeaturesDropdownOpen(prev => !prev)
  }
  
  useEffect(() => {
    if (!isClient) return;
    
    const handleScroll = () => {
      const window = getWindow();
      if (!window) return;
      
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    
    // Run once on mount to set initial state
    handleScroll();
    
    // Use our safe utility for event listeners
    const cleanup = addWindowEventListener('scroll', handleScroll);
    return cleanup;
  }, [])
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])
  
  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)
  
  // Scroll to top function for smoother navigation
  const scrollToTop = () => {
    smoothScrollToTop({ behavior: 'smooth' });
  }
  
  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId: string, event?: React.MouseEvent) => {
    if (!isClient) return;
    
    if (event) {
      event.preventDefault()
    }
    
    // First close mobile menu if open
    if (isOpen) {
      setIsOpen(false)
    }
    
    // Get the section element
    const section = getElementById(sectionId);
    if (section) {
      // Calculate header height for offset
      const headerElement = querySelector<HTMLElement>('header');
      const headerHeight = headerElement?.offsetHeight || 0;
      
      // Scroll to section with offset for the header
      const yOffset = -headerHeight - 20; // Add extra padding
      scrollToElement(sectionId, yOffset, 'smooth');
    } else if (pathname !== '/') {
      // If not on homepage, navigate there first then scroll to section
      const window = getWindow();
      if (window) {
        window.location.href = `/#${sectionId}`;
      }
    }
  }
  
  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logo}>
            Crypto<span className={styles.highlight}>Signalz</span>
          </Link>
        </div>
        
        <nav className={styles.desktopNav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link 
                href="/" 
                className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
                onClick={scrollToTop}
              >
                Home
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link 
                href="/pricing" 
                className={`${styles.navLink} ${isActive('/pricing') ? styles.active : ''}`}
                onClick={scrollToTop}
              >
                Pricing
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link 
                href="/whitepaper" 
                className={`${styles.navLink} ${isActive('/whitepaper') ? styles.active : ''}`}
                onClick={scrollToTop}
              >
                Whitepaper
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link 
                href="/about" 
                className={`${styles.navLink} ${isActive('/about') ? styles.active : ''}`}
                onClick={scrollToTop}
              >
                About
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link 
                href="/faq" 
                className={`${styles.navLink} ${isActive('/faq') ? styles.active : ''}`}
                onClick={scrollToTop}
              >
                FAQ
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className={styles.buttons}>
          <Link href="/login" className={`${styles.btn} ${styles.btnSecondary} ${isActive('/login') ? styles.btnSecondaryActive : ''}`}>
            Login
          </Link>
          <Link href="/get-started" className={`${styles.btn} ${styles.btnPrimary} ${isActive('/get-started') ? styles.btnPrimaryActive : ''}`}>
            Get Started
          </Link>
        </div>
        
        <button 
          className={`${styles.mobileMenuBtn} ${isOpen ? styles.open : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className={styles.mobileNav}>
              <ul className={styles.mobileNavList}>
                <motion.li 
                  className={styles.mobileNavItem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link 
                    href="/" 
                    className={`${styles.mobileNavLink} ${isActive('/') ? styles.active : ''}`} 
                    onClick={() => {
                      closeMenu();
                      scrollToTop();
                    }}
                  >
                    Home
                  </Link>
                </motion.li>
                <motion.li 
                  className={styles.mobileNavItem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link 
                    href="/pricing" 
                    className={`${styles.mobileNavLink} ${isActive('/pricing') ? styles.active : ''}`} 
                    onClick={() => {
                      closeMenu();
                      scrollToTop();
                    }}
                  >
                    Pricing
                  </Link>
                </motion.li>
                <motion.li 
                  className={styles.mobileNavItem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link 
                    href="/whitepaper" 
                    className={`${styles.mobileNavLink} ${isActive('/whitepaper') ? styles.active : ''}`} 
                    onClick={() => {
                      closeMenu();
                      scrollToTop();
                    }}
                  >
                    Whitepaper
                  </Link>
                </motion.li>
                <motion.li 
                  className={styles.mobileNavItem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link 
                    href="/about" 
                    className={`${styles.mobileNavLink} ${isActive('/about') ? styles.active : ''}`} 
                    onClick={() => {
                      closeMenu();
                      scrollToTop();
                    }}
                  >
                    About
                  </Link>
                </motion.li>
                <motion.li 
                  className={styles.mobileNavItem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link 
                    href="/faq" 
                    className={`${styles.mobileNavLink} ${isActive('/faq') ? styles.active : ''}`} 
                    onClick={() => {
                      closeMenu();
                      scrollToTop();
                    }}
                  >
                    FAQ
                  </Link>
                </motion.li>
              </ul>
              
              <div className={styles.mobileButtons}>
                <Link 
                  href="/login" 
                  className={`${styles.btn} ${styles.btnSecondary} ${isActive('/login') ? styles.btnSecondaryActive : ''}`}
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link 
                  href="/get-started" 
                  className={`${styles.btn} ${styles.btnPrimary} ${isActive('/get-started') ? styles.btnPrimaryActive : ''}`}
                  onClick={closeMenu}
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
