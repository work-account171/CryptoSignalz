'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './page.module.css'

export default function LoginPage() {
  const [isLoginForm, setIsLoginForm] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  
  // Function to handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    
    if (isLoginForm) {
      console.log('Login submitted:', { email, password, rememberMe })
      // Here you would typically make an API call to authenticate the user
    } else {
      console.log('Register submitted:', { name, email, password })
      // Here you would typically make an API call to register the user
    }
  }
  
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBackground}></div>
      <div className={styles.backgroundPattern}></div>
      
      {/* Animated floating orbs */}
      <div className={`${styles.floatingOrb} ${styles.orb1}`}></div>
      <div className={`${styles.floatingOrb} ${styles.orb2}`}></div>
      <div className={`${styles.floatingOrb} ${styles.orb3}`}></div>
      
      {/* Glowing lines */}
      <div className={`${styles.glowingLine} ${styles.line1}`}></div>
      <div className={`${styles.glowingLine} ${styles.line2}`}></div>
      
      <div className={styles.loginGrid}>
        <div className={styles.leftColumn}>
          <motion.div
            className={styles.formCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className={styles.formTitle}>
              {isLoginForm ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className={styles.formDescription}>
              {isLoginForm 
                ? 'Enter your credentials to access your account' 
                : 'Fill in the details below to start your journey'}
            </p>
            
            {/* Form Type Toggle Tabs */}
            <div className={styles.tabs}>
              <div 
                className={`${styles.tab} ${isLoginForm ? styles.activeTab : ''}`}
                onClick={() => setIsLoginForm(true)}
              >
                Login
              </div>
              <div 
                className={`${styles.tab} ${!isLoginForm ? styles.activeTab : ''}`}
                onClick={() => setIsLoginForm(false)}
              >
                Register
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={isLoginForm ? 'login' : 'register'}
                  initial={{ opacity: 0, x: isLoginForm ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isLoginForm ? 20 : -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {!isLoginForm && (
                    <div className={styles.formGroup}>
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        className={styles.inputField}
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required={!isLoginForm}
                      />
                    </div>
                  )}
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      className={styles.inputField}
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      className={styles.inputField}
                      placeholder={isLoginForm ? "Enter your password" : "Create a password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  {isLoginForm && (
                    <div className={styles.formActions}>
                      <div className={styles.rememberMe}>
                        <input
                          type="checkbox"
                          id="rememberMe"
                          className={styles.checkbox}
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label htmlFor="rememberMe">Remember me</label>
                      </div>
                      <a href="#" className={styles.forgotPassword}>
                        Forgot Password?
                      </a>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
              
              <div className={styles.buttonGroup}>
                <motion.button
                  type="submit"
                  className={styles.submitButton}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoginForm ? 'Login to Dashboard' : 'Create Account'}
                </motion.button>
              </div>
            </form>
            
            <div className={styles.divider}>
              <div className={styles.dividerLine}></div>
              <span className={styles.dividerText}>or continue with</span>
              <div className={styles.dividerLine}></div>
            </div>
            
            <div className={styles.socialButtons}>
              <button className={styles.socialButton}>
                <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button className={styles.socialButton}>
                <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
                Facebook
              </button>
            </div>
            
            <div className={styles.registerLink}>
              {isLoginForm ? (
                <>
                  Don't have an account?{' '}
                  <a 
                    href="#" 
                    className={styles.registerLinkText}
                    onClick={(e) => {
                      e.preventDefault()
                      setIsLoginForm(false)
                    }}
                  >
                    Sign up
                  </a>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <a 
                    href="#" 
                    className={styles.registerLinkText}
                    onClick={(e) => {
                      e.preventDefault()
                      setIsLoginForm(true)
                    }}
                  >
                    Sign in
                  </a>
                </>
              )}
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className={styles.rightColumn}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className={styles.heroContent}>
            <h2 className={styles.heroTitle}>
              {isLoginForm 
                ? 'Access Your Crypto Dashboard' 
                : 'Join Our Crypto Community'}
            </h2>
            <p className={styles.heroSubtitle}>
              {isLoginForm 
                ? 'Get real-time insights, track your investments, and stay ahead of market trends with our intuitive dashboard.' 
                : 'Create an account to get started with personalized crypto insights, portfolio tracking, and exclusive market updates.'}
            </p>
            
            <div className={styles.featuresGrid}>
              <motion.div 
                className={styles.featureCard}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.featureIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                  </svg>
                </div>
                <div className={styles.featureText}>
                  <h3 className={styles.featureTitle}>Real-time Market Data</h3>
                  <p className={styles.featureDescription}>
                    Access live cryptocurrency prices, market caps, and trading volumes.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className={styles.featureCard}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.featureIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <div className={styles.featureText}>
                  <h3 className={styles.featureTitle}>Portfolio Tracking</h3>
                  <p className={styles.featureDescription}>
                    Monitor your crypto assets and track performance over time.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className={styles.featureCard}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.featureIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <div className={styles.featureText}>
                  <h3 className={styles.featureTitle}>Advanced Analytics</h3>
                  <p className={styles.featureDescription}>
                    Visualize trends with powerful charts and technical indicators.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}