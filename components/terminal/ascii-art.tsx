'use client'

import { motion } from 'framer-motion'

interface ASCIIArtProps {
  art: string
  className?: string
  delay?: number
  animated?: boolean
}

export function ASCIIArt({ 
  art, 
  className = '',
  delay = 0,
  animated = true
}: ASCIIArtProps) {
  const lines = art.split('\n')

  if (!animated) {
    return (
      <pre className={`text-primary text-glow-subtle leading-none ${className}`}>
        {art}
      </pre>
    )
  }

  return (
    <pre className={`text-primary text-glow-subtle leading-none ${className}`}>
      {lines.map((line, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            delay: delay / 1000 + index * 0.05,
            duration: 0.2
          }}
        >
          {line || ' '}
        </motion.div>
      ))}
    </pre>
  )
}

// ElevenLabs ASCII Logo
export const ELEVENLABS_ASCII = `
███████╗██╗     ███████╗██╗   ██╗███████╗███╗   ██╗
██╔════╝██║     ██╔════╝██║   ██║██╔════╝████╗  ██║
█████╗  ██║     █████╗  ██║   ██║█████╗  ██╔██╗ ██║
██╔══╝  ██║     ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║
███████╗███████╗███████╗ ╚████╔╝ ███████╗██║ ╚████║
╚══════╝╚══════╝╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝
                                                    
██╗      █████╗ ██████╗ ███████╗                   
██║     ██╔══██╗██╔══██╗██╔════╝                   
██║     ███████║██████╔╝███████╗                   
██║     ██╔══██║██╔══██╗╚════██║                   
███████╗██║  ██║██████╔╝███████║                   
╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝                   
`

export const WAVEFORM_ASCII = `
     ▁▂▃▄▅▆▇█▇▆▅▄▃▂▁     ▁▂▃▄▅▆▇█▇▆▅▄▃▂▁
   ▁▂▃▄▅▆▇████▇▆▅▄▃▂▁ ▁▂▃▄▅▆▇████▇▆▅▄▃▂▁
 ▁▂▃▄▅▆▇██████▇▆▅▄▃▂▁▂▃▄▅▆▇██████▇▆▅▄▃▂▁
`

export const VOICE_ICON_ASCII = `
  ╔══════╗
  ║ ◉  ◉ ║
  ║  ╰╯  ║
  ╚══════╝
    ║║║║
   ╔╝╚╝╚╗
   ╚════╝
`
