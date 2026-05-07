'use client'

import { motion } from 'framer-motion'
import { StatusBar, CommandPrompt } from '@/components/terminal'

const footerLinks = {
  products: [
    { label: 'text_to_speech', href: '#' },
    { label: 'voice_cloning', href: '#' },
    { label: 'voice_agents', href: '#' },
    { label: 'dubbing', href: '#' },
    { label: 'voice_library', href: '#' },
  ],
  developers: [
    { label: 'documentation', href: '#' },
    { label: 'api_reference', href: '#' },
    { label: 'sdk_python', href: '#' },
    { label: 'sdk_node', href: '#' },
    { label: 'examples', href: '#' },
  ],
  company: [
    { label: 'about', href: '#' },
    { label: 'blog', href: '#' },
    { label: 'careers', href: '#' },
    { label: 'press', href: '#' },
    { label: 'contact', href: '#' },
  ],
  legal: [
    { label: 'privacy', href: '#' },
    { label: 'terms', href: '#' },
    { label: 'security', href: '#' },
    { label: 'cookies', href: '#' },
  ]
}

export function Footer() {
  return (
    <footer className="border-t border-primary/20 bg-card/50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-xs text-terminal-cyan mb-4 uppercase tracking-wider">
                /{category}
              </div>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                    >
                      <span className="text-terminal-dim group-hover:text-primary transition-colors">$</span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* ASCII Divider */}
        <div className="text-primary/20 text-xs overflow-hidden mb-8">
          {'═'.repeat(100)}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold text-primary text-glow">XI</span>
            <span className="text-xs text-muted-foreground">
              elevenlabs.io
            </span>
          </div>

          <div className="text-xs text-muted-foreground text-center">
            <CommandPrompt
              command="echo $COPYRIGHT"
              showPrompt={false}
              output={
                <span>
                  {'// '} 2024 ElevenLabs, Inc. All rights reserved.
                  <br className="md:hidden" />
                  <span className="hidden md:inline"> | </span>
                  Made with neural networks and coffee.
                </span>
              }
            />
          </div>

          <div className="flex items-center gap-4">
            {['github', 'twitter', 'discord', 'linkedin'].map((social) => (
              <a
                key={social}
                href={`#${social}`}
                className="text-muted-foreground hover:text-primary transition-colors text-xs"
              >
                [{social.slice(0, 2).toUpperCase()}]
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <StatusBar />
    </footer>
  )
}
