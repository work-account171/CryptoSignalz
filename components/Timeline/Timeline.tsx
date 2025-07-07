'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import styles from './Timeline.module.css'

interface TimelineItem {
  year: string
  title: string
  description: string
}

interface TimelineProps {
  items: TimelineItem[]
}

export default function Timeline({ items }: TimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    if (timelineRef.current) {
      // Animate timeline line growing
      gsap.from(`.${styles.timelineLine}`, {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none none'
        }
      })
      
      // Animate each timeline item
      const timelineItems = timelineRef.current.querySelectorAll(`.${styles.timelineItem}`)
      timelineItems.forEach((item, index) => {
        const direction = index % 2 === 0 ? -30 : 30
        
        gsap.from(item, {
          opacity: 0,
          x: direction,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
            // Uncomment for non-mobile devices to make items appear as they scroll into view
            // id: `timeline-item-${index}`
          },
          delay: index * 0.2
        })
      })
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [items])
  
  return (
    <div className={styles.timelineContainer} ref={timelineRef}>
      <div className={styles.timelineLine}></div>
      
      {items.map((item, index) => (
        <div 
          key={index} 
          className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right}`}
        >
          <div className={styles.timelinePoint}>
            <div className={styles.timelinePointInner}></div>
          </div>
          
          <motion.div 
            className={styles.timelineContent}
            whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.25)' }}
          >
            <div className={styles.timelineYear}>{item.year}</div>
            <h3 className={styles.timelineTitle}>{item.title}</h3>
            <p className={styles.timelineDescription}>{item.description}</p>
          </motion.div>
        </div>
      ))}
    </div>
  )
}
