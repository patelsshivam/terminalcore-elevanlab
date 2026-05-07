'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface GlitchTextProps {
  text: string
  className?: string
  glitchOnHover?: boolean
  intensity?: 'low' | 'medium' | 'high'
}

export function GlitchText({ 
  text, 
  className = '',
  glitchOnHover = false,
  intensity = 'medium'
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(!glitchOnHover)
  const [glitchedText, setGlitchedText] = useState(text)

  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789'
  
  const intensityConfig = {
    low: { interval: 200, chance: 0.02 },
    medium: { interval: 100, chance: 0.05 },
    high: { interval: 50, chance: 0.1 }
  }

  useEffect(() => {
    if (!isGlitching) {
      setGlitchedText(text)
      return
    }

    const { interval, chance } = intensityConfig[intensity]
    
    const glitchInterval = setInterval(() => {
      const newText = text
        .split('')
        .map(char => {
          if (Math.random() < chance && char !== ' ') {
            return glitchChars[Math.floor(Math.random() * glitchChars.length)]
          }
          return char
        })
        .join('')
      setGlitchedText(newText)
    }, interval)

    return () => clearInterval(glitchInterval)
  }, [text, isGlitching, intensity])

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => glitchOnHover && setIsGlitching(true)}
      onMouseLeave={() => glitchOnHover && setIsGlitching(false)}
      data-text={text}
    >
      <span className={isGlitching && !glitchOnHover ? 'glitch' : ''} data-text={text}>
        {glitchedText}
      </span>
    </motion.span>
  )
}
