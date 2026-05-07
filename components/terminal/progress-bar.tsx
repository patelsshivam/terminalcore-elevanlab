'use client'

import { motion } from 'framer-motion'

interface ProgressBarProps {
  progress: number
  label?: string
  showPercentage?: boolean
  className?: string
  variant?: 'default' | 'loading' | 'success'
}

export function ProgressBar({ 
  progress, 
  label,
  showPercentage = true,
  className = '',
  variant = 'default'
}: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress))
  const blocks = Math.floor(clampedProgress / 5)
  const emptyBlocks = 20 - blocks

  const variantColors = {
    default: 'text-primary',
    loading: 'text-terminal-amber',
    success: 'text-primary'
  }

  return (
    <div className={`font-mono ${className}`}>
      {label && (
        <div className="text-xs text-muted-foreground mb-1">{label}</div>
      )}
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">[</span>
        <motion.span 
          className={variantColors[variant]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {'█'.repeat(blocks)}
          <span className="text-muted-foreground/30">{'░'.repeat(emptyBlocks)}</span>
        </motion.span>
        <span className="text-muted-foreground">]</span>
        {showPercentage && (
          <span className={`text-xs ${variantColors[variant]}`}>
            {clampedProgress.toFixed(0)}%
          </span>
        )}
      </div>
    </div>
  )
}
