'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useHydrated from '@/hooks/useHydrated'
import { addWindowEventListener, scrollToTop as smoothScrollToTop } from '@/utils/client'
import styles from './BackToTop.module.css'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const isHydrated = useHydrated()
  
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }
    
    // Run once on mount to set initial state
    toggleVisibility();
    
    // Use our safe client utility for event listeners
    const cleanup = addWindowEventListener('scroll', toggleVisibility)
    return cleanup
  }, [])
  
  const handleScrollToTop = () => {
    smoothScrollToTop({ behavior: 'smooth' })
  }
  
  // Don't render anything during server-side rendering
  if (!isHydrated) return null
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className={styles.backToTop}
          onClick={handleScrollToTop}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 19V5M12 5L5 12M12 5L19 12" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}