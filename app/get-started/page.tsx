'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import styles from './page.module.css'

export default function GetStarted() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    investmentGoals: '',
    riskPreference: 'moderate',
    investmentExperience: 'beginner',
    preferredCrypto: [] as string[],
    initialInvestment: '$1,000 - $10,000',
    notifications: true,
    marketUpdates: true,
    selectedPlan: 'pro',
    acceptTerms: false,
  })
  
  const totalSteps = 4
  const progressWidth = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`
  
  // Function to handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }
  
  // Function to handle multi-select checkboxes (for cryptocurrencies)
  const handleCryptoChange = (crypto: string) => {
    setFormData(prev => {
      const currentPreferred = [...prev.preferredCrypto]
      
      if (currentPreferred.includes(crypto)) {
        return {
          ...prev,
          preferredCrypto: currentPreferred.filter(item => item !== crypto)
        }
      } else {
        return {
          ...prev,
          preferredCrypto: [...currentPreferred, crypto]
        }
      }
    })
  }
  
  // Function to select a subscription plan
  const selectPlan = (plan: string) => {
    setFormData(prev => ({ ...prev, selectedPlan: plan }))
  }
  
  // Function to go to the next step
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  
  // Function to go to the previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  
  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    nextStep()
  }
  
  return (
    <div className={styles.getStartedContainer}>
      <div className={styles.bgPattern}></div>
      
      {/* Animated floating orbs */}
      <div className={`${styles.floatingOrb} ${styles.orb1}`}></div>
      <div className={`${styles.floatingOrb} ${styles.orb2}`}></div>
      <div className={`${styles.floatingOrb} ${styles.orb3}`}></div>
      
      <div className={styles.getStartedContent}>
        <h1 className={styles.title}>Get Started with CryptoSignalz</h1>
        <p className={styles.subtitle}>
          Complete the following steps to set up your personalized crypto tracking dashboard and start your investment journey.
        </p>
        
        {/* Progress bar */}
        <div className={styles.progressBar}>
          <div className={styles.progressBarFill} style={{ width: progressWidth }}></div>
          
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map(step => (
            <div 
              key={step}
              className={`${styles.stepMarker} ${
                step < currentStep 
                  ? styles.stepMarkerCompleted 
                  : step === currentStep 
                    ? styles.stepMarkerActive 
                    : ''
              }`}
            >
              {step < currentStep ? '✓' : step}
            </div>
          ))}
        </div>
        
        <div className={styles.stepperContainer}>
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className={styles.stepGrid}>
                  <div className={styles.step}>
                    <div className={styles.stepCard}>
                      <div className={styles.stepHeader}>
                        <div className={styles.stepNumber}>1</div>
                        <div className={styles.stepInfo}>
                          <h2 className={styles.stepTitle}>Personal Information</h2>
                          <p className={styles.stepDescription}>
                            Tell us about yourself so we can personalize your experience.
                          </p>
                        </div>
                      </div>
                      
                      <div className={styles.stepContent}>
                        <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                          <div className={styles.formGroup}>
                            <label htmlFor="fullName">Full Name</label>
                            <input
                              type="text"
                              id="fullName"
                              name="fullName"
                              className={styles.inputField}
                              placeholder="Enter your full name"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          
                          <div className={styles.formGroup}>
                            <label htmlFor="email">Email Address</label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              className={styles.inputField}
                              placeholder="Enter your email address"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          
                          <div className={styles.formGroup}>
                            <label htmlFor="phone">Phone Number (Optional)</label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              className={styles.inputField}
                              placeholder="Enter your phone number"
                              value={formData.phone}
                              onChange={handleInputChange}
                            />
                          </div>
                          
                          <div className={styles.formGroup}>
                            <label htmlFor="investmentGoals">Investment Goals</label>
                            <textarea
                              id="investmentGoals"
                              name="investmentGoals"
                              className={`${styles.inputField} ${styles.textarea}`}
                              placeholder="Tell us about your investment goals and what you hope to achieve"
                              value={formData.investmentGoals}
                              onChange={handleInputChange}
                              required
                            ></textarea>
                          </div>
                          
                          <div className={styles.buttonRow}>
                            <div></div> {/* Empty div for spacing */}
                            <motion.button
                              type="submit"
                              className={`${styles.button} ${styles.buttonPrimary}`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Continue
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                              </svg>
                            </motion.button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className={styles.stepGrid}>
                  <div className={styles.step}>
                    <div className={styles.stepCard}>
                      <div className={styles.stepHeader}>
                        <div className={styles.stepNumber}>2</div>
                        <div className={styles.stepInfo}>
                          <h2 className={styles.stepTitle}>Investment Preferences</h2>
                          <p className={styles.stepDescription}>
                            Help us understand your investment style and preferences.
                          </p>
                        </div>
                      </div>
                      
                      <div className={styles.stepContent}>
                        <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                          <div className={styles.preferencesGrid}>
                            <div className={styles.formGroup}>
                              <label htmlFor="riskPreference">Risk Tolerance</label>
                              <select
                                id="riskPreference"
                                name="riskPreference"
                                className={`${styles.inputField} ${styles.selectField}`}
                                value={formData.riskPreference}
                                onChange={handleInputChange}
                                required
                              >
                                <option value="conservative">Conservative</option>
                                <option value="moderate">Moderate</option>
                                <option value="aggressive">Aggressive</option>
                                <option value="very_aggressive">Very Aggressive</option>
                              </select>
                            </div>
                            
                            <div className={styles.formGroup}>
                              <label htmlFor="investmentExperience">Experience Level</label>
                              <select
                                id="investmentExperience"
                                name="investmentExperience"
                                className={`${styles.inputField} ${styles.selectField}`}
                                value={formData.investmentExperience}
                                onChange={handleInputChange}
                                required
                              >
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                                <option value="expert">Expert</option>
                              </select>
                            </div>
                          </div>
                          
                          <div className={styles.formGroup}>
                            <label>Cryptocurrencies You're Interested In</label>
                            <div className={styles.preferencesGrid}>
                              <div className={styles.checkboxGroup}>
                                <input
                                  type="checkbox"
                                  id="bitcoin"
                                  className={styles.checkbox}
                                  checked={formData.preferredCrypto.includes('bitcoin')}
                                  onChange={() => handleCryptoChange('bitcoin')}
                                />
                                <label htmlFor="bitcoin">Bitcoin (BTC)</label>
                              </div>
                              
                              <div className={styles.checkboxGroup}>
                                <input
                                  type="checkbox"
                                  id="ethereum"
                                  className={styles.checkbox}
                                  checked={formData.preferredCrypto.includes('ethereum')}
                                  onChange={() => handleCryptoChange('ethereum')}
                                />
                                <label htmlFor="ethereum">Ethereum (ETH)</label>
                              </div>
                              
                              <div className={styles.checkboxGroup}>
                                <input
                                  type="checkbox"
                                  id="solana"
                                  className={styles.checkbox}
                                  checked={formData.preferredCrypto.includes('solana')}
                                  onChange={() => handleCryptoChange('solana')}
                                />
                                <label htmlFor="solana">Solana (SOL)</label>
                              </div>
                              
                              <div className={styles.checkboxGroup}>
                                <input
                                  type="checkbox"
                                  id="cardano"
                                  className={styles.checkbox}
                                  checked={formData.preferredCrypto.includes('cardano')}
                                  onChange={() => handleCryptoChange('cardano')}
                                />
                                <label htmlFor="cardano">Cardano (ADA)</label>
                              </div>
                              
                              <div className={styles.checkboxGroup}>
                                <input
                                  type="checkbox"
                                  id="polkadot"
                                  className={styles.checkbox}
                                  checked={formData.preferredCrypto.includes('polkadot')}
                                  onChange={() => handleCryptoChange('polkadot')}
                                />
                                <label htmlFor="polkadot">Polkadot (DOT)</label>
                              </div>
                              
                              <div className={styles.checkboxGroup}>
                                <input
                                  type="checkbox"
                                  id="ripple"
                                  className={styles.checkbox}
                                  checked={formData.preferredCrypto.includes('ripple')}
                                  onChange={() => handleCryptoChange('ripple')}
                                />
                                <label htmlFor="ripple">Ripple (XRP)</label>
                              </div>
                            </div>
                          </div>
                          
                          <div className={styles.formGroup}>
                            <label htmlFor="initialInvestment">Initial Investment Amount</label>
                            <select
                              id="initialInvestment"
                              name="initialInvestment"
                              className={`${styles.inputField} ${styles.selectField}`}
                              value={formData.initialInvestment}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="Under $1,000">Under $1,000</option>
                              <option value="$1,000 - $10,000">$1,000 - $10,000</option>
                              <option value="$10,000 - $50,000">$10,000 - $50,000</option>
                              <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                              <option value="$100,000+">$100,000+</option>
                            </select>
                          </div>
                          
                          <div className={styles.buttonRow}>
                            <motion.button
                              type="button"
                              className={`${styles.button} ${styles.buttonSecondary}`}
                              onClick={prevStep}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H5M12 19l-7-7 7-7"/>
                              </svg>
                              Back
                            </motion.button>
                            
                            <motion.button
                              type="submit"
                              className={`${styles.button} ${styles.buttonPrimary}`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Continue
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                              </svg>
                            </motion.button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className={styles.stepGrid}>
                  <div className={styles.step}>
                    <div className={styles.stepCard}>
                      <div className={styles.stepHeader}>
                        <div className={styles.stepNumber}>3</div>
                        <div className={styles.stepInfo}>
                          <h2 className={styles.stepTitle}>Choose Your Plan</h2>
                          <p className={styles.stepDescription}>
                            Select the subscription plan that best fits your needs.
                          </p>
                        </div>
                      </div>
                      
                      <div className={styles.stepContent}>
                        <form onSubmit={handleSubmit}>
                          <div className={styles.planCards}>
                            <div 
                              className={`${styles.planCard} ${formData.selectedPlan === 'basic' ? styles.planCardSelected : ''}`}
                              onClick={() => selectPlan('basic')}
                            >
                              <input
                                type="radio"
                                name="plan"
                                id="basic"
                                className={styles.selectionRadio}
                                checked={formData.selectedPlan === 'basic'}
                                onChange={() => selectPlan('basic')}
                              />
                              
                              <div className={styles.planCardHeader}>
                                <div className={styles.planName}>Basic</div>
                                <div className={styles.planPrice}>$9.99</div>
                                <div className={styles.planPeriod}>per month</div>
                              </div>
                              
                              <div className={styles.planCardBody}>
                                <ul className={styles.planFeatures}>
                                  <li className={styles.planFeature}>
                                    <svg className={styles.featureIcon} viewBox="0 0 24 24">
                                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                    </svg>
                                    <span>Real-time price tracking</span>
                                  </li>
                                  <li className={styles.planFeature}>
                                    <svg className={styles.featureIcon} viewBox="0 0 24 24">
                                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                    </svg>
                                    <span>Portfolio management (up to 5 cryptocurrencies)</span>
                                  </li>
                                  <li className={styles.planFeature}>
                                    <svg className={styles.featureIcon} viewBox="0 0 24 24">
                                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                    </svg>
                                    <span>Basic market analysis</span>
                                  </li>
                                  <li className={styles.planFeature}>
                                    <svg className={styles.featureIcon} viewBox="0 0 24 24">
                                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                    </svg>
                                    <span>Daily market summaries</span>
                                  </li>
                                </ul>
                              </div>
                              
                              <div className={styles.planCardFooter}>
                                <motion.button
                                  type="button"
                                  className={`${styles.button} ${formData.selectedPlan === 'basic' ? styles.buttonPrimary : styles.buttonSecondary}`}
                                  onClick={() => selectPlan('basic')}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  {formData.selectedPlan === 'basic' ? 'Selected' : 'Select Plan'}
                                </motion.button>
                              </div>
                            </div>
                            
                            <div 
                              className={`${styles.planCard} ${formData.selectedPlan === 'pro' ? styles.planCardSelected : ''}`}
                              onClick={() => selectPlan('pro')}
                            >
                              <input
                                type="radio"
                                name="plan"
                                id="pro"
                                className={styles.selectionRadio}
                                checked={formData.selectedPlan === 'pro'}
                                onChange={() => selectPlan('pro')}
                              />
                              
                              <div className={styles.planCardHeader}>
                                <div className={styles.planName}>Pro</div>
                                <div className={styles.planPrice}>$24.99</div>
                                <div className={styles.planPeriod}>per month</div>
                              </div>
                              
                              <div className={styles.planCardBody}>
                                <ul className={styles.planFeatures}>
                                  <li className={styles.planFeature}>
                                    <svg className={styles.featureIcon} viewBox="0 0 24 24">
                                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                    </svg>
                                    <span>Everything in Basic</span>
                                  </li>
                                  <li className={styles.planFeature}>
                                    <svg className={styles.featureIcon} viewBox="0 0 24 24">
                                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                    </svg>
                                    <span>Portfolio management (unlimited cryptocurrencies)</span>
                                  </li>
                                  <li className={styles.planFeature}>
                                    <svg className={styles.featureIcon} viewBox="0 0 24 24">
                                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                    </svg>
                                    <span>Advanced technical analysis</span>
                                  </li>
                                  <li className={styles.planFeature}>
                                    <svg className={styles.featureIcon} viewBox="0 0 24 24">
                                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                    </svg>
                                    <span>Real-time market alerts</span>
                                  </li>
                                  <li className={styles.planFeature}>
                                    <svg className={styles.featureIcon} viewBox="0 0 24 24">
                                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                    </svg>
                                    <span>Expert market analysis reports</span>
                                  </li>
                                </ul>
                              </div>
                              
                              <div className={styles.planCardFooter}>
                                <motion.button
                                  type="button"
                                  className={`${styles.button} ${formData.selectedPlan === 'pro' ? styles.buttonPrimary : styles.buttonSecondary}`}
                                  onClick={() => selectPlan('pro')}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  {formData.selectedPlan === 'pro' ? 'Selected' : 'Select Plan'}
                                </motion.button>
                              </div>
                            </div>
                            
                            <div 
                              className={`${styles.planCard} ${formData.selectedPlan === 'enterprise' ? styles.planCardSelected : ''}`}
                              onClick={() => selectPlan('enterprise')}
                            >
                              <input
                                type="radio"
                                name="plan"
                                id="enterprise"
                                className={styles.selectionRadio}
                                checked={formData.selectedPlan === 'enterprise'}
                                onChange={() => selectPlan('enterprise')}
                              />
                              
                              <div className={styles.planCardHeader}>
                                <div className={styles.planName}>Enterprise</div>
                                <div className={styles.planPrice}>$49.99</div>
                                <div className={styles.planPeriod}>per month</div>
                              </div>
                              
                              <div className={styles.planCardBody}>
                                <ul className={styles.planFeatures}>
                                  <li className={styles.planFeature}>
                                    <svg className={styles.featureIcon} viewBox="0 0 24 24">
                                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                    </svg>
                                    <span>Everything in Pro</span>
                                  </li>
                                  <li className={styles.planFeature}>
                                    <svg className={styles.featureIcon} viewBox="0 0 24 24">
                                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                    </svg>
                                    <span>AI-powered trading suggestions</span>
                                  </li>
                                  <li className={styles.planFeature}>
                                    <svg className={styles.featureIcon} viewBox="0 0 24 24">
                                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                    </svg>
                                    <span>Personalized investment strategy</span>
                                  </li>
                                  <li className={styles.planFeature}>
                                    <svg className={styles.featureIcon} viewBox="0 0 24 24">
                                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                    </svg>
                                    <span>Priority support</span>
                                  </li>
                                  <li className={styles.planFeature}>
                                    <svg className={styles.featureIcon} viewBox="0 0 24 24">
                                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                    </svg>
                                    <span>Exclusive webinars and educational content</span>
                                  </li>
                                </ul>
                              </div>
                              
                              <div className={styles.planCardFooter}>
                                <motion.button
                                  type="button"
                                  className={`${styles.button} ${formData.selectedPlan === 'enterprise' ? styles.buttonPrimary : styles.buttonSecondary}`}
                                  onClick={() => selectPlan('enterprise')}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  {formData.selectedPlan === 'enterprise' ? 'Selected' : 'Select Plan'}
                                </motion.button>
                              </div>
                            </div>
                          </div>
                          
                          <div className={styles.formGroup} style={{ marginTop: '2rem' }}>
                            <div className={styles.checkboxGroup}>
                              <input
                                type="checkbox"
                                id="notifications"
                                name="notifications"
                                className={styles.checkbox}
                                checked={formData.notifications}
                                onChange={handleInputChange}
                              />
                              <label htmlFor="notifications">
                                Receive price alerts and important notifications
                              </label>
                            </div>
                          </div>
                          
                          <div className={styles.formGroup}>
                            <div className={styles.checkboxGroup}>
                              <input
                                type="checkbox"
                                id="marketUpdates"
                                name="marketUpdates"
                                className={styles.checkbox}
                                checked={formData.marketUpdates}
                                onChange={handleInputChange}
                              />
                              <label htmlFor="marketUpdates">
                                Subscribe to weekly market updates and newsletters
                              </label>
                            </div>
                          </div>
                          
                          <div className={styles.formGroup}>
                            <div className={styles.checkboxGroup}>
                              <input
                                type="checkbox"
                                id="acceptTerms"
                                name="acceptTerms"
                                className={styles.checkbox}
                                checked={formData.acceptTerms}
                                onChange={handleInputChange}
                                required
                              />
                              <label htmlFor="acceptTerms">
                                I agree to the <a href="#" style={{ color: 'var(--accent-primary)' }}>Terms of Service</a> and <a href="#" style={{ color: 'var(--accent-primary)' }}>Privacy Policy</a>
                              </label>
                            </div>
                          </div>
                          
                          <div className={styles.buttonRow}>
                            <motion.button
                              type="button"
                              className={`${styles.button} ${styles.buttonSecondary}`}
                              onClick={prevStep}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H5M12 19l-7-7 7-7"/>
                              </svg>
                              Back
                            </motion.button>
                            
                            <motion.button
                              type="submit"
                              className={`${styles.button} ${styles.buttonPrimary}`}
                              disabled={!formData.acceptTerms}
                              whileHover={formData.acceptTerms ? { scale: 1.02 } : {}}
                              whileTap={formData.acceptTerms ? { scale: 0.98 } : {}}
                              style={{ opacity: formData.acceptTerms ? 1 : 0.6 }}
                            >
                              Complete Setup
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                              </svg>
                            </motion.button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className={styles.stepGrid}>
                  <div className={styles.step}>
                    <div className={styles.stepCard}>
                      <div className={styles.completionCard}>
                        <svg className={styles.completionIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        
                        <div>
                          <h2 className={styles.completionTitle}>Your Account is Ready!</h2>
                          <p className={styles.completionText}>
                            Thank you for setting up your CryptoSignalz account. You're all set to start tracking your crypto investments and receive personalized insights based on your preferences.
                          </p>
                        </div>
                        
                        <div className={styles.completionButtons}>
                          <Link href="/" passHref>
                            <motion.button
                              className={`${styles.button} ${styles.buttonSecondary}`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Return to Homepage
                            </motion.button>
                          </Link>
                          
                          <Link href="/" passHref>
                            <motion.button
                              className={`${styles.button} ${styles.buttonPrimary}`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Go to Dashboard
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                              </svg>
                            </motion.button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}