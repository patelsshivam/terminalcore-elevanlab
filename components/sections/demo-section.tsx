'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef, useCallback } from 'react'
import { TerminalWindow, CommandPrompt, ProgressBar, TypewriterText } from '@/components/terminal'
import { useElevenLabs } from '@/hooks/use-elevenlabs'

const defaultVoices = [
  { voice_id: 'JBFqnCBsd6RMkjVDRZzb', name: 'George', style: 'Warm, Narrative', gender: 'M' },
  { voice_id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel', style: 'Calm, Professional', gender: 'F' },
  { voice_id: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella', style: 'Soft, Youthful', gender: 'F' },
  { voice_id: 'ErXwobaYiN019PkySvjV', name: 'Antoni', style: 'Clear, Articulate', gender: 'M' },
]

const sampleTexts = [
  "Welcome to the future of voice technology, powered by ElevenLabs.",
  "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet.",
  "In a world where artificial intelligence meets human creativity, the possibilities are truly endless.",
  "Hello! I am your AI voice assistant, generated in real-time using state-of-the-art neural networks.",
]

export function DemoSection() {
  const [inputText, setInputText] = useState(sampleTexts[0])
  const [selectedVoice, setSelectedVoice] = useState(defaultVoices[0])
  const [waveform, setWaveform] = useState<number[]>(Array(40).fill(5))
  const [audioDuration, setAudioDuration] = useState<string | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  
  const { speak, stop, isLoading, isPlaying, error } = useElevenLabs()

  // Animate waveform based on audio analyser
  const animateWaveform = useCallback(() => {
    if (analyserRef.current && isPlaying) {
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
      analyserRef.current.getByteFrequencyData(dataArray)
      
      // Sample 40 points from the frequency data
      const step = Math.floor(dataArray.length / 40)
      const newWaveform = Array.from({ length: 40 }, (_, i) => {
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
      // Reset waveform when not playing
      setWaveform(Array(40).fill(5))
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isPlaying, animateWaveform])

  const handleGenerate = async () => {
    if (!inputText.trim()) return
    
    setAudioDuration(null)
    const startTime = Date.now()
    
    await speak(inputText, selectedVoice.voice_id, (analyser) => {
      analyserRef.current = analyser
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
      setAudioDuration(elapsed)
    })
  }

  const handleStop = () => {
    stop()
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    setWaveform(Array(40).fill(5))
  }

  return (
    <section id="demo" className="py-20 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <TerminalWindow 
          title="elevenlabs_voice_generator" 
          status={isLoading ? 'processing' : isPlaying ? 'active' : 'active'}
        >
          <div className="space-y-6">
            {/* Header */}
            <CommandPrompt
              command="./elevenlabs --mode=interactive --api=live"
              output={
                <div className="text-primary text-glow">
                  <TypewriterText 
                    text="ElevenLabs API Connected. Real-time voice synthesis ready." 
                    speed={30} 
                  />
                </div>
              }
            />

            {/* API Status */}
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-primary">API ONLINE</span>
              </div>
              <span className="text-terminal-dim">|</span>
              <span className="text-muted-foreground">model: eleven_turbo_v2_5</span>
              <span className="text-terminal-dim">|</span>
              <span className="text-muted-foreground">latency: ~500ms</span>
            </div>

            {/* Voice Selection */}
            <div className="space-y-2">
              <div className="text-xs text-terminal-dim">--select-voice:</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {defaultVoices.map((voice) => (
                  <button
                    key={voice.voice_id}
                    onClick={() => setSelectedVoice(voice)}
                    disabled={isLoading || isPlaying}
                    className={`p-3 text-left border transition-all ${
                      selectedVoice.voice_id === voice.voice_id
                        ? 'border-primary bg-primary/10'
                        : 'border-primary/20 hover:border-primary/50'
                    } ${(isLoading || isPlaying) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`text-xs ${selectedVoice.voice_id === voice.voice_id ? 'text-primary' : 'text-terminal-dim'}`}>
                        [{voice.gender}]
                      </span>
                      <span className="text-sm text-primary font-bold">{voice.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{voice.style}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Text Input */}
            <div className="space-y-2">
              <div className="text-xs text-terminal-dim">--input-text:</div>
              <div className="border border-primary/30 bg-secondary/50">
                <div className="flex items-center gap-2 px-3 py-2 border-b border-primary/20 text-xs text-muted-foreground">
                  <span className="text-terminal-cyan">stdin</span>
                  <span>|</span>
                  <span>{inputText.length} chars</span>
                  <span>|</span>
                  <span className="text-terminal-amber">~{Math.ceil(inputText.length / 150)}s audio</span>
                </div>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={isLoading || isPlaying}
                  className="w-full bg-transparent p-4 text-primary outline-none resize-none min-h-24 font-mono text-sm disabled:opacity-50"
                  placeholder="Enter text to synthesize with ElevenLabs..."
                />
              </div>
              {/* Quick Templates */}
              <div className="flex flex-wrap gap-2">
                {sampleTexts.map((text, i) => (
                  <button
                    key={i}
                    onClick={() => setInputText(text)}
                    disabled={isLoading || isPlaying}
                    className="text-xs px-2 py-1 text-muted-foreground hover:text-primary border border-primary/20 hover:border-primary/50 transition-colors disabled:opacity-50"
                  >
                    template_{i + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate/Stop Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {isPlaying ? (
                <button
                  onClick={handleStop}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-3 bg-terminal-red/20 text-terminal-red border border-terminal-red/50 hover:bg-terminal-red/30 transition-all"
                >
                  <span>{'>'}</span>
                  <span>stop_playback</span>
                  <span className="animate-pulse">■</span>
                </button>
              ) : (
                <button
                  onClick={handleGenerate}
                  disabled={isLoading || !inputText.trim()}
                  className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-3 transition-all ${
                    isLoading
                      ? 'bg-terminal-amber/20 text-terminal-amber border border-terminal-amber/50'
                      : 'bg-primary text-primary-foreground border border-primary hover:bg-primary/90 disabled:opacity-50'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin">⟳</span>
                      <span>generating...</span>
                    </>
                  ) : (
                    <>
                      <span>{'>'}</span>
                      <span>generate_speech</span>
                      <span className="cursor-blink">_</span>
                    </>
                  )}
                </button>
              )}
              
              <div className="text-xs text-muted-foreground">
                <span className="text-terminal-cyan">voice:</span> {selectedVoice.name}
                <span className="mx-2">|</span>
                <span className="text-terminal-cyan">id:</span> {selectedVoice.voice_id.slice(0, 8)}...
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <ProgressBar 
                  progress={100} 
                  label="CALLING ELEVENLABS API"
                  variant="loading"
                />
                <div className="mt-2 text-xs text-terminal-dim">
                  POST /api/tts → elevenlabs.io/v1/text-to-speech
                </div>
              </motion.div>
            )}

            {/* Error State */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border border-terminal-red/50 bg-terminal-red/10 p-4"
              >
                <div className="flex items-center gap-2 text-terminal-red">
                  <span>[ERROR]</span>
                  <span>{error}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  Check that your ELEVENLABS_API_KEY is set correctly.
                </div>
              </motion.div>
            )}

            {/* Audio Playing State */}
            {isPlaying && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-primary/30 bg-secondary/30 p-4"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs text-primary">NOW PLAYING</span>
                  <span className="text-xs text-muted-foreground">• voice: {selectedVoice.name}</span>
                  {audioDuration && (
                    <span className="text-xs text-terminal-cyan">• generated in {audioDuration}s</span>
                  )}
                </div>
                
                {/* Live Waveform Visualization */}
                <div className="flex items-end justify-center gap-px h-20 mb-4 bg-black/30 p-2 rounded">
                  {waveform.map((height, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 bg-gradient-to-t from-primary/50 to-primary rounded-t"
                      style={{ height: `${height}%` }}
                      transition={{ duration: 0.05 }}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Real-time audio playback via Web Audio API</span>
                </div>
              </motion.div>
            )}

            {/* Success state after playback */}
            {!isPlaying && !isLoading && audioDuration && !error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border border-primary/30 bg-primary/5 p-4"
              >
                <div className="flex items-center gap-2 text-primary text-sm">
                  <span>[SUCCESS]</span>
                  <span>Audio generated and played successfully</span>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  Generation time: {audioDuration}s | Voice: {selectedVoice.name} | Model: eleven_turbo_v2_5
                </div>
              </motion.div>
            )}

            {/* Footer Info */}
            <div className="pt-4 border-t border-primary/20 text-xs text-muted-foreground">
              <span className="text-terminal-cyan">NOTE:</span> This demo uses the live ElevenLabs API. 
              Audio is generated in real-time using neural voice synthesis.
            </div>
          </div>
        </TerminalWindow>
      </div>
    </section>
  )
}
