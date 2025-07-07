'use client'

import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PricingCards from '@/components/PricingCards/PricingCards'
import styles from './page.module.css'

export default function Pricing() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    // Staggered animation for page elements
    gsap.from('.pricing-content', {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
    })
    
    // Animate FAQ items on scroll
    gsap.from('.faq-question', {
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.faq-container',
        start: 'top 80%',
      }
    })
    
    // Animate FAQ heading
    gsap.from('.faq-heading', {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '.faq-heading',
        start: 'top 85%',
      }
    })
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  
  // State to track which FAQ is active/expanded
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Toggle FAQ item
  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };
  
  // FAQ data
  const faqItems = [
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 14-day money-back guarantee on all our plans. If you're not satisfied with our service, you can request a full refund within this period, no questions asked."
    },
    {
      question: "Can I upgrade my plan later?",
      answer: "Absolutely! You can upgrade your plan at any time, and we'll prorate the difference. This allows you to start with a basic plan and scale up as your needs grow without losing any investment."
    },
    {
      question: "Is there a contract or commitment?",
      answer: "No long-term contracts. All our plans are subscription-based with monthly or annual billing, and you can cancel your subscription at any time with no cancellation fees or penalties."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and cryptocurrency payments including Bitcoin, Ethereum, and USDC. Bank transfers are available for enterprise clients."
    },
    {
      question: "Do you offer educational resources?",
      answer: "Yes, all paid plans include access to our comprehensive educational resources, including video tutorials, trading guides, and weekly market analysis to help you make informed trading decisions."
    }
  ];
  
  return (
    <div className={styles.pricingPage}>
      <div className="container pricing-content">
        <div className={styles.header}>
          <h1 className={styles.title}>Choose Your <span className="gradient-text">Plan</span></h1>
          <p className={styles.subtitle}>
            Select the perfect pricing tier for your cryptocurrency journey, from beginners to advanced traders
          </p>
        </div>
        
        <PricingCards />
        
        <div className={styles.enterprise}>
          <div className={styles.enterpriseCard}>
            <h3>Enterprise Solutions</h3>
            <p>Need a custom solution for your organization? We offer tailored packages for institutions and large-scale operations.</p>
            <button className="btn btn-secondary">Contact Sales</button>
          </div>
        </div>
        
        {/* <div className={styles.faq}>
          <h3 className="faq-heading">Frequently Asked Questions</h3>
          
          <div className={`${styles.faqContainer} faq-container`}>
            {faqItems.map((item, index) => (
              <div 
                key={index} 
                className={`${styles.question} ${activeFaq === index ? styles.active : ''} faq-question`}
                onClick={() => toggleFaq(index)}
              >
                <h4>{item.question}</h4>
                {activeFaq === index && <p>{item.answer}</p>}
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  )
}
