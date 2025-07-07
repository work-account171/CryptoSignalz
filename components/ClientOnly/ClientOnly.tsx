'use client'

import { useState, useEffect, ReactNode } from 'react'

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * A component that only renders its children on the client side
 * Useful for components that use browser APIs (window, document, etc.)
 * 
 * @param {ReactNode} children - The content to render on the client side
 * @param {ReactNode} fallback - Optional fallback to show during server-side rendering
 */
export default function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  return isClient ? <>{children}</> : <>{fallback}</>
}