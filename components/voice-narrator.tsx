'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useElevenLabs } from '@/hooks/use-elevenlabs'

const narrationScripts = [
  {
    id: 'welcome',
    title: 'System Boot',
    text: 'Welcome to ElevenLabs Terminal. Voice synthesis systems online. Neural networks initialized.',
  },
  {
    id: 'products',
    title: 'Products',
    text: 'Explore our suite of voice AI tools. From text-to-speech synthesis to conversational AI agents.',
  },
  {
    id: 'api',
    title: 'API',
    text: 'Integrate voice AI into your applications with our powerful API. Just a few lines of code to get started.',
  },
  {
    id: 'demo',
    title: 'Live Demo',
    text: 'Try the interactive demo below. Enter any text and hear it spoken in real-time.',
  },
]

export function VoiceNarrator() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [currentScript, setCurrentScript] = useState<string | null>(null)
  const [waveform, setWaveform] = useState<number[]>(Array(20).fill(5))
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  
  const { speak, stop, isLoading, isPlaying } = useElevenLabs()

  const animateWaveform = useCallback(() => {
    if (analyserRef.current && isPlaying) {
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
      analyserRef.current.getByteFrequencyData(dataArray)
      
      const step = Math.floor(dataArray.length / 20)
      const newWaveform = Array.from({ length: 20 }, (_, i) => {
        const value = dataArray[i * step] || 0
        return Math.max(5, (value / 255) * 100)
      })
      setWaveform(newWaveform)
      
      animationFrameRef.current = requestAnimationFrame(animateWaveform)
    }
  }, [isPlaying])

  useEffect(() => {
    if (isPlaying) {
      animateWaveform()
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      setWaveform(Array(20).fill(5))
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isPlaying, animateWaveform])

  const handleNarrate = async (script: typeof narrationScripts[0]) => {
    if (isPlaying) {
      stop()
      setCurrentScript(null)
      return
    }
    
    setCurrentScript(script.id)
    await speak(script.text, 'JBFqnCBsd6RMkjVDRZzb', (analyser) => {
      analyserRef.current = analyser
    })
    setCurrentScript(null)
  }

  const handleNarrateAll = async () => {
    for (const script of narrationScripts) {
      setCurrentScript(script.id)
      await new Promise<void>((resolve) => {
        speak(script.text, 'JBFqnCBsd6RMkjVDRZzb', (analyser) => {
          analyserRef.current = analyser
        }).then(() => {
          setTimeout(resolve, 500) // Small pause between sections
        })
      })
    }
    setCurrentScript(null)
  }

  if (!isOpen) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-background border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all group"
        title="Open Voice Navigator"
      >
        <span className="text-lg group-hover:animate-pulse">🎙</span>
        <span className="text-sm hidden sm:inline">Voice Guide</span>
      </motion.button>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className={`fixed bottom-6 right-6 z-50 bg-background border border-primary shadow-2xl shadow-primary/20 ${
          isMinimized ? 'w-64' : 'w-80'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-primary/30 bg-primary/10">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="w-3 h-3 rounded-full bg-terminal-red hover:brightness-110"
              />
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="w-3 h-3 rounded-full bg-terminal-amber hover:brightness-110"
              />
              <div className="w-3 h-3 rounded-full bg-primary" />
            </div>
            <span className="text-xs text-primary ml-2">voice_navigator.sh</span>
          </div>
          {isPlaying && (
            <div className="flex items-center gap-1">
              {waveform.slice(0, 8).map((h, i) => (
                <div
                  key={i}
                  className="w-0.5 bg-primary transition-all duration-75"
                  style={{ height: `${Math.max(4, h / 10)}px` }}
                />
              ))}
            </div>
          )}
        </div>

        {!isMinimized && (
          <div className="p-4 space-y-4">
            {/* Status */}
            <div className="flex items-center gap-2 text-xs">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-primary animate-pulse' : 'bg-terminal-dim'}`} />
              <span className="text-muted-foreground">
                {isPlaying ? 'Speaking...' : isLoading ? 'Loading...' : 'Ready'}
              </span>
            </div>

            {/* Narration Scripts */}
            <div className="space-y-2">
              <div className="text-xs text-terminal-dim">--available-narrations:</div>
              {narrationScripts.map((script) => (
                <button
                  key={script.id}
                  onClick={() => handleNarrate(script)}
                  disabled={isLoading}
                  className={`w-full text-left px-3 py-2 border transition-all text-sm ${
                    currentScript === script.id
                      ? 'border-primary bg-primary/20 text-primary'
                      : 'border-primary/20 hover:border-primary/50 text-muted-foreground hover:text-primary'
                  } disabled:opacity-50`}
                >
                  <div className="flex items-center justify-between">
                    <span>{currentScript === script.id ? '▶' : '○'} {script.title}</span>
                    {currentScript === script.id && isPlaying && (
                      <span className="text-xs animate-pulse">playing</span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex gap-2">
              <button
                onClick={handleNarrateAll}
                disabled={isPlaying || isLoading}
                className="flex-1 px-3 py-2 bg-primary text-primary-foreground text-xs hover:bg-primary/90 disabled:opacity-50 transition-all"
              >
                {isPlaying ? 'Playing...' : 'Narrate All'}
              </button>
              {isPlaying && (
                <button
                  onClick={() => {
                    stop()
                    setCurrentScript(null)
                  }}
                  className="px-3 py-2 bg-terminal-red/20 text-terminal-red text-xs hover:bg-terminal-red/30 transition-all"
                >
                  Stop
                </button>
              )}
            </div>

            {/* Waveform */}
            {isPlaying && (
              <div className="flex items-end justify-center gap-0.5 h-8 bg-black/30 rounded p-1">
                {waveform.map((height, i) => (
                  <div
                    key={i}
                    className="w-1 bg-primary rounded-t transition-all duration-75"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            )}

            {/* Footer */}
            <div className="text-xs text-center text-terminal-dim">
              Powered by ElevenLabs API
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
