'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface TerminalWindowProps {
  title?: string
  children: ReactNode
  className?: string
  showControls?: boolean
  status?: 'active' | 'idle' | 'processing'
}

export function TerminalWindow({ 
  title = 'terminal', 
  children, 
  className = '',
  showControls = true,
  status = 'active'
}: TerminalWindowProps) {
  const statusColors = {
    active: 'bg-primary',
    idle: 'bg-terminal-dim',
    processing: 'bg-terminal-amber'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`border border-primary/30 bg-card/80 backdrop-blur-sm ${className}`}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between border-b border-primary/20 px-4 py-2 bg-secondary/50">
        <div className="flex items-center gap-3">
          {showControls && (
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-terminal-red/80" />
              <span className="w-2.5 h-2.5 bg-terminal-amber/80" />
              <span className="w-2.5 h-2.5 bg-primary/80" />
            </div>
          )}
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            [{title}]
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 ${statusColors[status]} pulse-glow`} />
          <span className="text-xs text-muted-foreground uppercase">
            {status}
          </span>
        </div>
      </div>
      
      {/* Terminal Content */}
      <div className="p-4 md:p-6">
        {children}
      </div>
    </motion.div>
  )
}
