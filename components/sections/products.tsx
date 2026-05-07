'use client'

import { motion } from 'framer-motion'
import { TerminalWindow, CommandPrompt, GlitchText } from '@/components/terminal'

const products = [
  {
    id: 'text-to-speech',
    command: 'tts',
    name: 'Text to Speech',
    description: 'Convert text to speech online with the most realistic AI voices. Create natural-sounding content in any voice, style, and language.',
    features: ['32+ languages', '100+ voice presets', 'Custom voice styles', 'SSML support'],
    status: 'STABLE',
    icon: `
  ┌─────┐
  │ TXT │ → 🔊
  └─────┘
    `
  },
  {
    id: 'voice-cloning',
    command: 'clone',
    name: 'Voice Cloning',
    description: 'Create a synthetic voice clone from just a few minutes of audio. Professional or instant cloning available.',
    features: ['Instant clone (1 min)', 'Professional clone', 'Voice editing', 'Style transfer'],
    status: 'STABLE',
    icon: `
  ┌─────┐
  │ DNA │ → 👤
  └─────┘
    `
  },
  {
    id: 'voice-agents',
    command: 'agent',
    name: 'Conversational AI',
    description: 'Build AI agents that can talk to your customers in real-time. Ultra-low latency, human-like conversations.',
    features: ['<300ms latency', 'Natural interruptions', 'Custom personalities', 'Call routing'],
    status: 'BETA',
    icon: `
  ┌─────┐
  │ BOT │ ↔ 💬
  └─────┘
    `
  },
  {
    id: 'dubbing',
    command: 'dub',
    name: 'AI Dubbing',
    description: 'Automatically dub videos into 32+ languages while preserving the original speaker voices and emotions.',
    features: ['32+ languages', 'Voice preservation', 'Lip sync', 'Batch processing'],
    status: 'STABLE',
    icon: `
  ┌─────┐
  │ VID │ → 🌍
  └─────┘
    `
  },
]

export function Products() {
  return (
    <section id="products" className="py-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <TerminalWindow title="product_catalog" showControls={false}>
          <CommandPrompt
            command="ls -la /products/"
            output={
              <div className="text-xs text-muted-foreground mb-6">
                <span className="text-terminal-cyan">total 4</span>
                <br />
                drwxr-xr-x  4 elevenlabs voice 4096 Jan 15 09:00 .
              </div>
            }
          />
        </TerminalWindow>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <TerminalWindow 
                title={product.id} 
                status={product.status === 'BETA' ? 'processing' : 'active'}
                className="h-full"
              >
                <div className="space-y-4">
                  {/* Product Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-terminal-cyan">$</span>
                        <span className="text-primary font-bold">{product.command}</span>
                        <span className={`text-xs px-2 py-0.5 ${product.status === 'BETA' ? 'bg-terminal-amber/20 text-terminal-amber' : 'bg-primary/20 text-primary'}`}>
                          {product.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-primary">
                        <GlitchText text={product.name} glitchOnHover intensity="low" />
                      </h3>
                    </div>
                    <pre className="text-xs text-terminal-dim hidden sm:block">{product.icon}</pre>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-1">
                    <div className="text-xs text-terminal-dim">--features:</div>
                    <div className="grid grid-cols-2 gap-1">
                      {product.features.map((feature) => (
                        <div key={feature} className="text-xs text-muted-foreground flex items-center gap-1">
                          <span className="text-primary">+</span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="pt-2 border-t border-primary/20">
                    <a 
                      href={`#${product.id}`}
                      className="inline-flex items-center gap-2 text-sm text-primary hover:text-terminal-bright transition-colors group"
                    >
                      <span className="text-terminal-dim group-hover:text-primary">{'>'}</span>
                      <span>./run --help</span>
                    </a>
                  </div>
                </div>
              </TerminalWindow>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
