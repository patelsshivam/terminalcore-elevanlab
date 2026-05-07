'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface CommandPromptProps {
  command: string
  output?: ReactNode
  prompt?: string
  delay?: number
  showPrompt?: boolean
}

export function CommandPrompt({ 
  command, 
  output,
  prompt = 'elevenlabs@voice-ai:~$',
  delay = 0,
  showPrompt = true
}: CommandPromptProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay / 1000, duration: 0.3 }}
      className="space-y-2"
    >
      {showPrompt && (
        <div className="flex items-start gap-2 flex-wrap">
          <span className="text-terminal-cyan text-glow-subtle shrink-0">{prompt}</span>
          <span className="text-primary">{command}</span>
        </div>
      )}
      {output && (
        <div className="pl-0 md:pl-4 text-muted-foreground">
          {output}
        </div>
      )}
    </motion.div>
  )
}
