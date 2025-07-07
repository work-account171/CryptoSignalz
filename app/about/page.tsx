'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import TeamCard from '@/components/TeamCard/TeamCard'
import Timeline from '@/components/Timeline/Timeline'
import styles from './page.module.css'

export default function About() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    // Animate main content
    gsap.from('.about-content', {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out',
    })
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  
  // Team members data
  const team = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      bio: 'Former blockchain developer at Ethereum Foundation with 8+ years of experience in cryptocurrency markets',
      image: 'https://images.unsplash.com/photo-1573496130141-209d200cebd8'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'CTO',
      bio: 'Ph.D in Computer Science specializing in cryptography and secure systems architecture',
      image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd'
    },
    {
      id: 3,
      name: 'David Williams',
      role: 'Lead Developer',
      bio: 'Full-stack developer with expertise in building scalable financial platforms and trading systems',
      image: 'https://images.unsplash.com/photo-1739298061757-7a3339cee982'
    },
    {
      id: 4,
      name: 'Jessica Park',
      role: 'Head of Security',
      bio: 'Former cybersecurity analyst for major financial institutions, specialized in threat prevention',
      image: 'https://images.unsplash.com/photo-1516880711640-ef7db81be3e1'
    }
  ]
  
  // Roadmap data
  const roadmapItems = [
    {
      year: 'Q3 2023',
      title: 'Platform Launch',
      description: 'Initial release of CryptoSignalz with core trading features',
    },
    {
      year: 'Q4 2023',
      title: 'Advanced Analytics',
      description: 'Introduction of AI-powered market analysis and predictions',
    },
    {
      year: 'Q1 2024',
      title: 'Mobile App Release',
      description: 'Launch of iOS and Android applications with full platform functionality',
    },
    {
      year: 'Q2 2024',
      title: 'Institutional Tools',
      description: 'Enterprise-grade features for institutional investors and traders',
    },
    {
      year: 'Q3 2024',
      title: 'Global Expansion',
      description: 'Regulatory compliance and platform availability in 50+ countries',
    }
  ]
  
  return (
    <div className={styles.aboutPage}>
      <div className="container">
        <div className={`${styles.header} about-content`}>
          <h1 className={styles.title}>About <span className="gradient-text">CryptoSignalz</span></h1>
          <p className={styles.subtitle}>
            We're building the future of cryptocurrency trading and investment
          </p>
        </div>
        
        <div className={`${styles.mission} about-content`}>
          <div className={styles.missionContent}>
            <h2>Our Mission</h2>
            <p>
              CryptoSignalz is on a mission to democratize access to cryptocurrency markets
              by providing intuitive, secure, and powerful tools for traders and investors
              of all experience levels. We believe in the transformative potential of
              blockchain technology and are committed to creating a platform that empowers
              users to participate in this financial revolution.
            </p>
            <p>
              Founded in 2023 by a team of blockchain experts and financial technology
              innovators, CryptoSignalz combines cutting-edge technology with user-centered
              design to deliver an unparalleled cryptocurrency experience.
            </p>
          </div>
          <div className={styles.missionImage}>
            <div className={styles.imageWrapper}>
              <Image 
                src="https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae" 
                alt="Crypto abstract visualization" 
                width={500} 
                height={400}
                className={styles.image}
              />
            </div>
          </div>
        </div>
        
        <div className={`${styles.timelineSection} about-content`}>
          <h2 className={styles.sectionTitle}>Our Roadmap</h2>
          <Timeline items={roadmapItems} />
        </div>
        
        <div className={`${styles.teamSection} about-content`}>
          <h2 className={styles.sectionTitle}>Our Team</h2>
          <div className={styles.teamGrid}>
            {team.map(member => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
        
        <div className={`${styles.values} about-content`}>
          <h2 className={styles.sectionTitle}>Our Values</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <h3>Innovation</h3>
              <p>Pushing boundaries and embracing new technologies to solve complex challenges</p>
            </div>
            <div className={styles.valueCard}>
              <h3>Security</h3>
              <p>Protecting our users' assets and data with the highest standards of security</p>
            </div>
            <div className={styles.valueCard}>
              <h3>Transparency</h3>
              <p>Operating with complete openness and honesty in all aspects of our business</p>
            </div>
            <div className={styles.valueCard}>
              <h3>Accessibility</h3>
              <p>Making cryptocurrency accessible to everyone, regardless of technical expertise</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
