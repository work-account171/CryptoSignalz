import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AnimationOptions {
  trigger: string | Element
  start?: string
  end?: string
  scrub?: boolean | number
  markers?: boolean
  toggleActions?: string
  animation?: gsap.core.Tween
  onEnter?: () => void
  onLeave?: () => void
  onEnterBack?: () => void
  onLeaveBack?: () => void
}

export function useScrollAnimation(options: AnimationOptions) {
  useEffect(() => {
    const {
      trigger,
      start = 'top 80%',
      end = 'bottom 20%',
      scrub = false,
      markers = false,
      toggleActions = 'play none none none',
      animation,
      onEnter,
      onLeave,
      onEnterBack,
      onLeaveBack
    } = options

    const scrollTrigger = ScrollTrigger.create({
      trigger,
      start,
      end,
      scrub,
      markers,
      toggleActions,
      animation,
      onEnter,
      onLeave,
      onEnterBack,
      onLeaveBack
    })

    return () => {
      scrollTrigger.kill()
    }
  }, [options])
}

export function useFadeIn(
  element: string,
  delay = 0,
  duration = 0.8,
  y = 30,
  stagger = 0.1,
  trigger?: string | Element,
  start?: string
) {
  useEffect(() => {
    const elements = document.querySelectorAll(element)

    let animation: gsap.core.Tween | undefined

    if (elements.length) {
      animation = gsap.from(elements, {
        opacity: 0,
        y,
        duration,
        ease: 'power2.out',
        stagger,
        delay
      })

      if (trigger) {
        ScrollTrigger.create({
          trigger,
          start: start || 'top 80%',
          animation
        })
      }
    }

    return () => {
      if (animation) {
        ScrollTrigger.getAll().forEach(trigger => {
          const vars = trigger.vars as { animation?: gsap.core.Animation }

          if (vars.animation === animation) {
            trigger.kill()
          }
        })
      }
    }
  }, [element, delay, duration, y, stagger, trigger, start])
}


export default useScrollAnimation;
