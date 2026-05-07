'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface StatusBarProps {
  className?: string
}

export function StatusBar({ className = '' }: StatusBarProps) {
  const [time, setTime] = useState('')
  const [memory, setMemory] = useState(0)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toISOString().replace('T', ' ').slice(0, 19))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    
    // Simulate memory usage
    setMemory(Math.floor(Math.random() * 30) + 60)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex flex-wrap items-center justify-between gap-2 text-xs border-t border-primary/20 px-4 py-2 bg-secondary/30 ${className}`}
    >
      <div className="flex items-center gap-4 flex-wrap">
        <span className="text-muted-foreground">
          <span className="text-terminal-cyan">SYS</span> {time} UTC
        </span>
        <span className="text-muted-foreground hidden sm:inline">
          <span className="text-terminal-amber">MEM</span> {memory}%
        </span>
        <span className="text-muted-foreground hidden md:inline">
          <span className="text-primary">NET</span> CONNECTED
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-primary pulse-glow" />
        <span className="text-primary uppercase tracking-wider">voice_engine_v2.5</span>
      </div>
    </motion.div>
  )
}
