'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import styles from './TeamCard.module.css'

interface TeamMember {
  id: number
  name: string
  role: string
  bio: string
  image: string
}

interface TeamCardProps {
  member: TeamMember
}

export default function TeamCard({ member }: TeamCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div 
      className={styles.teamCard}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
    >
      <div className={styles.imageContainer}>
        <Image 
          src={member.image}
          alt={member.name}
          width={300}
          height={300}
          className={styles.memberImage}
        />
        <motion.div 
          className={styles.socialOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.socialIcons}>
            <motion.a 
              href="#" 
              className={styles.socialIcon}
              whileHover={{ y: -5, color: '#1DA1F2' }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12392C16.6767 2.90116 15.7395 2.95718 14.8821 3.28444C14.0247 3.6117 13.2884 4.19439 12.773 4.9537C12.2575 5.71302 11.9877 6.61232 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43863 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48717 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22148 20.9723 6.94361 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
            <motion.a 
              href="#" 
              className={styles.socialIcon}
              whileHover={{ y: -5, color: '#0A66C2' }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
            <motion.a 
              href="#" 
              className={styles.socialIcon}
              whileHover={{ y: -5, color: '#333333' }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 19C4.58172 19 1 15.4183 1 11C1 6.58172 4.58172 3 9 3C13.4183 3 17 6.58172 17 11C17 12.5753 16.5338 14.0492 15.7208 15.2988L22.4162 22L20.9973 23.4142L14.3223 16.7383C13.0879 18.1002 11.1397 19 9 19ZM9 5C5.69029 5 3 7.69029 3 11C3 14.3097 5.69029 17 9 17C12.3097 17 15 14.3097 15 11C15 7.69029 12.3097 5 9 5Z" fill="currentColor"/>
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
      
      <div className={styles.cardContent}>
        <h3 className={styles.memberName}>{member.name}</h3>
        <p className={styles.memberRole}>{member.role}</p>
        <p className={styles.memberBio}>{member.bio}</p>
      </div>
    </motion.div>
  )
}
