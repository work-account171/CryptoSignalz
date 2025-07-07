'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import styles from './Testimonials.module.css'

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Brandon Schaefer',
    role: 'Crypto Tax Consultant (Seattle, WA)',
    image: '/avatars/avatar1.svg',
    content: "The automated IRS Form 8949 generator saved my firm 200+ hours this tax season. My clients with crypto mining income especially love the cost-basis tracking."
  },
  {
    id: 2,
    name: 'Olivia Tremblay',
    role: 'Quebec-Based NFT Artist',
    image: '/avatars/avatar2.svg',
    content: "As a French-Canadian creator, I needed multilingual support. The platform's CAD gas fee alerts helped me time my mints perfectly during Montreal’s NFT Week."
  },
  {
    id: 3,
    name: 'Derek Okafor',
    role: 'Texas Bitcoin Miner',
    image: '/avatars/avatar3.svg',
    content: "The real-time ERCOT energy pricing integration cut our mining ops costs by 22% during the July heatwave. Critical for our Austin-based operation."
  },
  {
    id: 4,
    name: 'Sophie Chen',
    role: 'Vancouver Real Estate (Crypto Payments)',
    image: '/avatars/avatar1.svg',
    content: "We closed 3 home sales in BC with Bitcoin thanks to the escrow smart contract templates. Canadians trust the compliance features for large transactions."
  },
  {
    id: 5,
    name: 'Mitch Reynolds',
    role: 'Chicago Day Trader',
    image: '/avatars/avatar2.svg',
    content: "The CME futures correlation tools gave me an edge during last week's 20% BTC swing. I scalped $14k in profits using the liquidation heatmaps."
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }
  
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    // Force the section to be visible immediately with a timeout
    const timer = setTimeout(() => {
      if (testimonialsRef.current) {
        // Make sure section is visible first
        gsap.set(testimonialsRef.current, { opacity: 1, visibility: 'visible' })
        
        // Set initial state of header to ensure it's visible
        gsap.set(testimonialsRef.current.querySelector(`.${styles.sectionHeader}`), { 
          opacity: 1, 
          y: 0 
        })
        
        // Smooth animation without ScrollTrigger for better reliability
        gsap.from(testimonialsRef.current.querySelector(`.${styles.sectionHeader}`), {
          opacity: 0,
          y: 20,
          duration: 1.5, // Slightly longer duration for smoother transition
          ease: 'power3.out', // Smooth easing to create a natural feel
          delay: 0.3 // Optional slight delay for a more subtle effect
        })
      }
    }, 100)
    
    // Auto advance testimonials
    const interval = setInterval(() => {
      nextTestimonial()
    }, 5000)
    
    return () => {
      clearTimeout(timer)
      clearInterval(interval)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  
  
  return (
    <section className={styles.testimonials} ref={testimonialsRef} id="testimonials">
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            What Our <span className="gradient-text">Users</span> Say
          </h2>
          <p className={styles.sectionSubtitle}>
            Join thousands of satisfied traders who have chosen CryptoSignalz
          </p>
        </div>
        
        <div className={styles.testimonialContainer}>
          <div className={styles.wrapper}>
            <AnimatePresence mode="wait">
              <motion.div 
                key={testimonials[currentIndex].id}
                className={styles.testimonialCard}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <div className={styles.quote}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 11H6C4.89543 11 4 10.1046 4 9V7C4 5.89543 4.89543 5 6 5H8C9.10457 5 10 5.89543 10 7V11ZM10 11V13C10 14.1046 9.10457 15 8 15H7C6.44772 15 6 14.5523 6 14V13.5" stroke="url(#quote-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 11H16C14.8954 11 14 10.1046 14 9V7C14 5.89543 14.8954 5 16 5H18C19.1046 5 20 5.89543 20 7V11ZM20 11V13C20 14.1046 19.1046 15 18 15H17C16.4477 15 16 14.5523 16 14V13.5" stroke="url(#quote-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <defs>
                      <linearGradient id="quote-gradient" x1="12" y1="5" x2="12" y2="15" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#5b68df"/>
                        <stop offset="1" stopColor="#00f6ff"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                
                <p className={styles.testimonialContent}>
                  {testimonials[currentIndex].content}
                </p>
                
                <div className={styles.testimonialAuthor}>
                  <div className={styles.authorImage}>
                    <Image 
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      width={60}
                      height={60}
                      className={styles.avatar}
                    />
                  </div>
                  <div className={styles.authorInfo}>
                    <h4 className={styles.authorName}>{testimonials[currentIndex].name}</h4>
                    <p className={styles.authorRole}>{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className={styles.controls}>
              <button 
                className={styles.controlButton}
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <div className={styles.indicators}>
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                className={styles.controlButton}
                onClick={nextTestimonial}
                aria-label="Next testimonial"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
