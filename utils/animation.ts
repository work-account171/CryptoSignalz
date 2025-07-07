import gsap from 'gsap'

/**
 * Creates a parallax scrolling effect
 * @param target - The element to apply the effect to
 * @param speed - The speed factor (1 is normal speed, 0.5 is half speed)
 * @param direction - The direction of the parallax ('vertical' or 'horizontal')
 */
export const createParallax = (
  target: string | Element,
  speed: number = 0.5,
  direction: 'vertical' | 'horizontal' = 'vertical'
) => {
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : [target]
  
  const handleScroll = () => {
    const scrollTop = window.pageYOffset
    
    elements.forEach((element) => {
      const offset = scrollTop * speed
      const transform = direction === 'vertical' 
        ? `translateY(${offset}px)`
        : `translateX(${offset}px)`
      
      gsap.to(element, {
        transform,
        ease: 'none',
        duration: 0.3
      })
    })
  }
  
  window.addEventListener('scroll', handleScroll)
  
  // Return cleanup function
  return () => window.removeEventListener('scroll', handleScroll)
}

/**
 * Creates a smooth scrolling effect to a target element
 * @param targetId - The ID of the element to scroll to
 * @param duration - The duration of the animation in seconds
 * @param offset - Additional offset from the top of the element
 */
export const smoothScrollTo = (
  targetId: string,
  duration: number = 1,
  offset: number = 0
) => {
  const targetElement = document.getElementById(targetId)
  
  if (targetElement) {
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset
    
    gsap.to(window, {
      duration,
      scrollTo: { y: targetPosition, autoKill: true },
      ease: 'power2.inOut'
    })
  }
}

/**
 * Creates a typing animation effect
 * @param target - The element to apply the effect to
 * @param text - The text to type
 * @param speed - The typing speed in characters per second
 * @param startDelay - The delay before typing starts
 */
export const typeText = (
  target: string | Element,
  text: string,
  speed: number = 50,
  startDelay: number = 0
) => {
  const element = typeof target === 'string' ? document.querySelector(target) : target
  
  if (!element) return
  
  // Clear the element
  element.textContent = ''
  
  // Convert speed to seconds per character
  const speedInSeconds = 1 / speed
  
  // Create timeline
  const tl = gsap.timeline({ delay: startDelay })
  
  // Add characters one by one
  for (let i = 0; i < text.length; i++) {
    tl.add(() => {
      element.textContent += text.charAt(i)
    }, i * speedInSeconds)
  }
  
  return tl
}

/**
 * Creates a 3D rotation effect
 * @param target - The element to apply the effect to
 * @param duration - The duration for a full rotation
 * @param axis - The axis to rotate around ('x', 'y', or 'z')
 */
export const create3DRotation = (
  target: string | Element,
  duration: number = 20,
  axis: 'x' | 'y' | 'z' = 'y'
) => {
  const rotationProperty = `rotation${axis.toUpperCase()}`
  
  const timeline = gsap.timeline({ repeat: -1 })
  timeline.to(target, {
    [rotationProperty]: 360,
    duration,
    ease: 'none'
  })
  
  return timeline
}

/**
 * Creates a floating animation effect
 * @param target - The element to apply the effect to
 * @param amplitude - The distance to float
 * @param duration - The duration of one cycle
 */
export const createFloatingEffect = (
  target: string | Element,
  amplitude: number = 15,
  duration: number = 2
) => {
  const timeline = gsap.timeline({ repeat: -1, yoyo: true })
  
  timeline.to(target, {
    y: `-=${amplitude}`,
    duration,
    ease: 'sine.inOut'
  })
  
  return timeline
}

/**
 * Creates a gradient animation that shifts colors
 * @param target - The element to apply the effect to
 * @param colors - Array of colors to cycle through
 * @param duration - The duration for the full cycle
 */
export const animateGradient = (
  target: string | Element,
  colors: string[],
  duration: number = 10
) => {
  const element = typeof target === 'string' ? document.querySelector(target) : target
  
  if (!element) return
  
  const stepDuration = duration / colors.length
  
  // Create a timeline with color transitions
  const tl = gsap.timeline({ repeat: -1 })
  
  colors.forEach((color, index) => {
    const nextColor = colors[(index + 1) % colors.length]
    
    tl.to(element, {
      background: `linear-gradient(135deg, ${color} 0%, ${nextColor} 100%)`,
      duration: stepDuration,
      ease: 'none'
    })
  })
  
  return tl
}
