'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import styles from './WhitepaperModal.module.css'

interface WhitepaperModalProps {
  onClose: () => void
}

export default function WhitepaperModal({ onClose }: WhitepaperModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  
  // Handle escape key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    
    // Handle clicking outside the modal to close
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    
    // Lock body scroll when modal is open
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'auto'
    }
  }, [onClose])
  
  return (
    <div className={styles.modalOverlay}>
      <motion.div 
        className={styles.modalContainer}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        ref={modalRef}
      >
        <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>CryptoSignalz Whitepaper</h2>
          <div className={styles.modalSubtitle}>Preview Version 2.1 | June 2023</div>
        </div>
        
        <div className={styles.modalContent}>
          <div className={styles.previewContainer}>
            <div className={styles.previewHeader}>
              <div className={styles.previewLogo}>
                <span className={styles.logoText}>Crypto<span className={styles.highlight}>Pulse</span></span>
              </div>
              <h1 className={styles.previewTitle}>CryptoSignalz: Next-Generation Cryptocurrency Platform</h1>
              <p className={styles.previewSubtitle}>Technical Whitepaper</p>
            </div>
            
            <div className={styles.previewSection}>
              <h2>1. Executive Summary</h2>
              <p>
                CryptoSignalz introduces a revolutionary approach to cryptocurrency trading, combining
                advanced technical analysis, real-time market data, and AI-powered predictions into a
                unified platform. This whitepaper outlines our technical architecture, token economics,
                and roadmap for reshaping the future of digital asset trading.
              </p>
            </div>
            
            <div className={styles.previewSection}>
              <h2>2. Platform Architecture</h2>
              <p>
                The CryptoSignalz platform is built on a distributed microservices architecture that
                ensures high availability, scalability, and security. Key components include:
              </p>
              <ul className={styles.previewList}>
                <li><strong>Trading Engine:</strong> High-frequency, low-latency matching system</li>
                <li><strong>Analytics Core:</strong> Real-time data processing pipeline</li>
                <li><strong>Security Layer:</strong> Multi-level encryption and fraud detection</li>
                <li><strong>AI Module:</strong> Machine learning models for market prediction</li>
              </ul>
              <div className={styles.previewImage}>
                <div className={styles.architectureImage}>
                  {/* Placeholder for architecture diagram */}
                  <div className={styles.imagePlaceholder}>
                    <span>CryptoSignalz Architecture Diagram</span>
                  </div>
                </div>
                <span className={styles.imageCaption}>Fig 1: CryptoSignalz Platform Architecture</span>
              </div>
            </div>
            
            <div className={styles.previewSection}>
              <h2>3. Token Economics</h2>
              <p>
                The PULSE token serves as the utility token of the CryptoSignalz ecosystem, providing
                holders with benefits including reduced trading fees, governance rights, and access to
                premium features.
              </p>
              <div className={styles.tokenDistribution}>
                <div className={styles.distributionItem}>
                  <div className={styles.distributionPercentage}>40%</div>
                  <div className={styles.distributionLabel}>Public Sale</div>
                </div>
                <div className={styles.distributionItem}>
                  <div className={styles.distributionPercentage}>25%</div>
                  <div className={styles.distributionLabel}>Ecosystem Development</div>
                </div>
                <div className={styles.distributionItem}>
                  <div className={styles.distributionPercentage}>15%</div>
                  <div className={styles.distributionLabel}>Team & Advisors</div>
                </div>
                <div className={styles.distributionItem}>
                  <div className={styles.distributionPercentage}>10%</div>
                  <div className={styles.distributionLabel}>Marketing</div>
                </div>
                <div className={styles.distributionItem}>
                  <div className={styles.distributionPercentage}>10%</div>
                  <div className={styles.distributionLabel}>Reserve</div>
                </div>
              </div>
            </div>
            
            <div className={styles.previewContinue}>
              <p>Continue reading the full whitepaper to learn more about:</p>
              <ul>
                <li>Consensus mechanism and blockchain integration</li>
                <li>Security protocols and risk management</li>
                <li>Governance structure and community involvement</li>
                <li>Technical roadmap and implementation timeline</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className={styles.modalFooter}>
          <motion.button 
            className={`${styles.modalButton} ${styles.secondary}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
          >
            Close Preview
          </motion.button>
          <motion.a 
            href="#" 
            className={`${styles.modalButton} ${styles.primary}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download Full PDF
          </motion.a>
        </div>
      </motion.div>
    </div>
  )
}
