'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Accordion from '@/components/Accordion/Accordion'
import styles from './page.module.css'

export default function FAQ() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Create a context to ensure cleanup
    const ctx = gsap.context(() => {
      // Enhanced animations for elements
      gsap.from('.faq-title', {
        opacity: 0,
        y: -30,
        duration: 1,
        ease: 'power3.out',
      });
      
      gsap.from('.faq-subtitle', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
      });
      
      gsap.from('.faq-accordion', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        delay: 0.5,
        ease: 'power3.out',
      });
      
      gsap.from('.faq-contact', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        scrollTrigger: {
          trigger: '.faq-contact',
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse',
        },
        ease: 'power3.out',
      });
      
      // Floating decorative elements animation
      const decorElements = document.querySelectorAll('.faq-decor');
      decorElements.forEach((elem, index) => {
        gsap.to(elem, {
          y: index % 2 === 0 ? '20px' : '-20px',
          x: index % 3 === 0 ? '15px' : '-15px',
          rotation: index % 2 === 0 ? 10 : -10,
          duration: 3 + index,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2,
        });
      });
    });
    
    // Clean up all animations when component unmounts
    return () => {
      ctx.revert(); // This will kill all animations created in this context
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [])
  
  // FAQ data
  const faqItems = [
    {
      question: "What is CryptoPulse?",
      answer: "CryptoPulse is a comprehensive cryptocurrency platform that provides advanced trading tools, real-time analytics, and portfolio management features for both beginners and experienced traders."
    },
    {
      question: "How do I create an account?",
      answer: "Creating an account is simple - just click on the 'Sign Up' button in the top right corner of the homepage, enter your email address, create a password, and follow the verification steps."
    },
    {
      question: "Is CryptoPulse available worldwide?",
      answer: "Yes, CryptoPulse is available globally. However, certain features may be restricted in some regions due to local regulations. We're constantly working to expand our fully supported regions."
    },
    {
      question: "What cryptocurrencies does CryptoPulse support?",
      answer: "We support all major cryptocurrencies including Bitcoin, Ethereum, Cardano, Solana, and many others. Our platform currently supports over 100 different tokens and we're continuously adding more."
    },
    {
      question: "How secure is CryptoPulse?",
      answer: "Security is our top priority. We implement industry-leading security measures including 256-bit encryption, two-factor authentication, cold storage for the majority of assets, and regular security audits by third-party experts."
    },
    {
      question: "What fees does CryptoPulse charge?",
      answer: "Our fee structure is transparent and competitive. Trading fees range from 0.1% to 0.5% depending on your account tier and trading volume. There are no hidden fees, and we offer discounts for high-volume traders."
    },
    {
      question: "How can I deposit funds?",
      answer: "You can deposit funds using bank transfers, credit/debit cards, or by transferring cryptocurrency from an external wallet. All deposit methods and requirements are explained in detail in your account dashboard."
    },
    {
      question: "Does CryptoPulse offer a mobile app?",
      answer: "Yes, we offer native mobile applications for both iOS and Android devices. Our mobile apps provide all the functionality of the web platform, allowing you to trade and monitor your portfolio on the go."
    },
    {
      question: "What customer support options are available?",
      answer: "We provide 24/7 customer support through live chat, email, and an extensive knowledge base. Premium account holders also have access to dedicated account managers and priority support."
    },
    {
      question: "How does CryptoPulse protect my personal data?",
      answer: "We adhere to strict data protection policies compliant with GDPR and other international regulations. Your personal information is encrypted and never shared with third parties without your explicit consent."
    }
  ]
  
  return (
    <div className={styles.faqPage}>
      {/* Decorative elements */}
      <div className={`${styles.decorCircle1} faq-decor`}></div>
      <div className={`${styles.decorCircle2} faq-decor`}></div>
      <div className={`${styles.decorCircle3} faq-decor`}></div>
      <div className={`${styles.decorShape1} faq-decor`}></div>
      <div className={`${styles.decorShape2} faq-decor`}></div>
      
      <div className="container">
        <div className={styles.header}>
          <h1 className={`${styles.title} faq-title`}>Frequently Asked <span className="gradient-text">Questions</span></h1>
          <p className={`${styles.subtitle} faq-subtitle`}>
            Find answers to the most common questions about CryptoPulse and cryptocurrency trading
          </p>
        </div>
        
        <div className={styles.faqContent}>
          <div className={`${styles.faqContainer} faq-accordion`}>
            <Accordion items={faqItems} />
          </div>
        </div>
        
        <div className={styles.contactSection}>
          <div className={`${styles.contactCard} faq-contact`}>
            <h2>Still have questions?</h2>
            <p>Our support team is available 24/7 to assist you with any inquiries</p>
            <div className={styles.contactButtons}>
              <button className="btn btn-primary">Contact Support</button>
              <button className="btn btn-secondary">Browse Help Center</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
