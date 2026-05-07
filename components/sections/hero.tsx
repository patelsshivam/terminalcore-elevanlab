'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { TerminalWindow, TypewriterText, CommandPrompt, ASCIIArt, ELEVENLABS_ASCII, ProgressBar } from '@/components/terminal'

const bootSequence = [
  { text: 'Initializing voice synthesis engine...', delay: 0 },
  { text: 'Loading neural network models...', delay: 800 },
  { text: 'Calibrating audio processors...', delay: 1600 },
  { text: 'Voice cloning modules ready.', delay: 2400 },
  { text: 'System operational.', delay: 3200 },
]

export function Hero() {
  const [bootProgress, setBootProgress] = useState(0)
  const [bootComplete, setBootComplete] = useState(false)
  const [showMainContent, setShowMainContent] = useState(false)

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setBootProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => setBootComplete(true), 500)
          setTimeout(() => setShowMainContent(true), 1000)
          return 100
        }
        return prev + 2
      })
    }, 80)

    return () => clearInterval(progressInterval)
  }, [])

  return (
    <section className="min-h-screen pt-20 pb-12 px-4 md:px-6 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full">
        {/* Boot Sequence */}
        {!showMainContent && (
          <TerminalWindow title="boot_sequence" status={bootComplete ? 'active' : 'processing'}>
            <div className="space-y-2 text-sm">
              {bootSequence.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: bootProgress > (index + 1) * 20 ? 1 : 0 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-terminal-cyan">[{String(index + 1).padStart(2, '0')}]</span>
                  <span className={index === bootSequence.length - 1 ? 'text-primary' : 'text-muted-foreground'}>
                    {line.text}
                  </span>
                  {index === bootSequence.length - 1 && bootProgress >= 100 && (
                    <span className="text-primary">OK</span>
                  )}
                </motion.div>
              ))}
              <div className="pt-4">
                <ProgressBar 
                  progress={bootProgress} 
                  label="SYSTEM BOOT"
                  variant={bootProgress >= 100 ? 'success' : 'loading'}
                />
              </div>
            </div>
          </TerminalWindow>
        )}

        {/* Main Hero Content */}
        {showMainContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* ASCII Logo */}
            <div className="overflow-x-auto pb-4">
              <ASCIIArt 
                art={ELEVENLABS_ASCII} 
                className="text-[6px] sm:text-[8px] md:text-xs leading-tight"
                delay={0}
              />
            </div>

            {/* Main Terminal */}
            <TerminalWindow title="voice_ai_platform" className="crt-effect">
              <div className="space-y-6">
                <CommandPrompt
                  command="cat /etc/motd"
                  output={
                    <div className="space-y-4">
                      <motion.h1 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary text-glow leading-tight"
                      >
                        <TypewriterText 
                          text="The most realistic AI voices."
                          speed={40}
                        />
                      </motion.h1>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="text-base sm:text-lg text-muted-foreground max-w-2xl"
                      >
                        Create natural AI voices, clone your voice, build conversational
                        AI agents. ElevenLabs brings the most compelling AI audio
                        capabilities to creators and developers.
                      </motion.p>
                    </div>
                  }
                />

                {/* Interactive Command Input */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  className="pt-4 border-t border-primary/20"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <CommandPrompt
                      command="./generate --voice neural --text 'Hello, world'"
                      output={
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                          <a 
                            href="#demo"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-all border border-primary hover:border-glow group"
                          >
                            <span className="text-terminal-dim group-hover:text-primary-foreground">{'>'}</span>
                            <span>try_voice_generator</span>
                            <span className="cursor-blink">_</span>
                          </a>
                          <a 
                            href="#api"
                            className="inline-flex items-center gap-2 px-6 py-3 border border-primary/50 text-primary hover:bg-primary/10 transition-all"
                          >
                            <span className="text-terminal-dim">$</span>
                            <span>explore_api</span>
                          </a>
                        </div>
                      }
                    />
                  </div>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-primary/20"
                >
                  {[
                    { label: 'voices_generated', value: '1B+' },
                    { label: 'active_users', value: '1M+' },
                    { label: 'languages', value: '32' },
                    { label: 'uptime', value: '99.9%' },
                  ].map((stat, index) => (
                    <div key={stat.label} className="text-center sm:text-left">
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary text-glow-subtle">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <span className="text-terminal-dim">--</span>{stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </TerminalWindow>
          </motion.div>
        )}
      </div>
    </section>
  )
}
