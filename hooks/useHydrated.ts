'use client'

import { useState, useEffect } from 'react'
import { isClient } from '@/utils/client'

/**
 * A hook that returns whether the component has been hydrated (client-side rendered).
 * Use this to safely render components that rely on browser-only APIs.
 * 
 * @returns {boolean} - Whether the component has been hydrated
 * 
 * @example
 * const isHydrated = useHydrated();
 * 
 * // Only render something with window/document when hydrated
 * return (
 *   <div>
 *     {isHydrated && <ComponentThatUsesWindowOrDocument />}
 *   </div>
 * );
 */
export function useHydrated() {
  // State to track if component is hydrated
  const [isHydrated, setIsHydrated] = useState(isClient)
  
  // Effect to update isHydrated state
  useEffect(() => {
    setIsHydrated(true)
  }, [])
  
  return isHydrated
}

export default useHydrated