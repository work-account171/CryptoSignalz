'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  applyHardwareAcceleration, 
  optimizeGSAPPerformance 
} from '@/utils/smoothAnimations'
import styles from './Accordion.module.css'

interface AccordionItem {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
}

export default function Accordion({ items }: AccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  
  // Apply performance optimizations when component mounts
  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    // Optimize GSAP performance globally
    optimizeGSAPPerformance();
    
    // Apply hardware acceleration to accordion items
    const accordionItems = document.querySelectorAll(`.${styles.accordionItem}`);
    accordionItems.forEach(item => {
      applyHardwareAcceleration(item as HTMLElement);
    });
    
    // Also optimize the content areas that will animate
    const accordionContents = document.querySelectorAll(`.${styles.accordionContent}`);
    accordionContents.forEach(item => {
      applyHardwareAcceleration(item as HTMLElement);
    });
  }, []);
  
  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }
  
  // Optimized animation variants for a smoother experience
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05, // Faster delay between items
        duration: 0.4, // Slightly faster animation
        ease: "easeOut", // Simpler easing function for better performance
        type: "tween"
      }
    })
  }
  
  const contentVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: 'auto', 
      opacity: 1,
      transition: {
        height: {
          duration: 0.25, // Faster height transition
          ease: "easeOut"
        },
        opacity: {
          duration: 0.2,
          delay: 0.05
        },
        type: "tween"
      }
    },
    exit: { 
      height: 0, 
      opacity: 0,
      transition: {
        height: {
          duration: 0.2,
          ease: "easeIn"
        },
        opacity: {
          duration: 0.15
        },
        type: "tween"
      }
    }
  }
  
  return (
    <div className={styles.accordion}>
      {items.map((item, index) => (
        <motion.div 
          key={index} 
          className={`${styles.accordionItem} ${activeIndex === index ? styles.active : ''}`}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          custom={index}
          whileHover={{ scale: 1.01 }}
          transition={{ 
            type: 'spring', 
            stiffness: 400, 
            damping: 25, 
            mass: 0.8,  // Lighter mass for faster animation
            velocity: 0 // Start from rest for smoother motion
          }}
          style={{ 
            transform: 'translateZ(0)', // Force GPU acceleration
            backfaceVisibility: 'hidden',
            willChange: 'transform, opacity' // Hint to browser for optimization
          }}
        >
          <button 
            className={styles.accordionHeader}
            onClick={() => toggleItem(index)}
            aria-expanded={activeIndex === index}
          >
            <span className={styles.question}>
              {item.question}
              {activeIndex === index && (
                <motion.span 
                  className={styles.activeIndicator}
                  layoutId="activeIndicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }} // Faster transition
                  style={{ 
                    transform: 'translateZ(0)', // Force GPU acceleration 
                    willChange: 'opacity'
                  }}
                />
              )}
            </span>
            <motion.div 
              className={styles.icon}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ 
                type: 'spring',
                stiffness: 500,
                damping: 25, 
                mass: 0.5
              }}
              style={{ willChange: 'transform' }}
            >
              <motion.svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ 
                  duration: 0.25, // Faster rotation
                  ease: "easeInOut",
                  type: "tween"
                }}
                style={{ 
                  transform: 'translateZ(0)', // Force GPU acceleration
                  willChange: 'transform'
                }}
              >
                <path 
                  d="M6 9L12 15L18 9" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.div>
          </button>
          
          <AnimatePresence initial={false}> {/* Prevents initial animation when component mounts */}
            {activeIndex === index && (
              <motion.div 
                className={styles.accordionContent}
                key={`content-${index}`}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ 
                  transform: 'translateZ(0)', // Force GPU acceleration
                  backfaceVisibility: 'hidden',
                  willChange: 'height, opacity' // Hint to browser for optimization
                }}
              >
                <motion.div 
                  className={styles.answer}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.2, 
                    delay: 0.05, // Reduced delay for faster appearance
                    ease: "easeOut",
                    type: "tween"
                  }}
                  style={{ 
                    transform: 'translateZ(0)', // Force GPU acceleration
                    willChange: 'opacity, transform'
                  }}
                >
                  {item.answer}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}
