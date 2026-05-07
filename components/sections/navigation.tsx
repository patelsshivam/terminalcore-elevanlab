'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { GlitchText } from '@/components/terminal'

const navItems = [
  { label: 'products', href: '#products' },
  { label: 'api', href: '#api' },
  { label: 'research', href: '#research' },
  { label: 'pricing', href: '#pricing' },
]

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-primary/20 bg-background/90 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="text-primary text-lg font-bold tracking-tight">
              <GlitchText text="XI" glitchOnHover intensity="low" />
            </span>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              elevenlabs.io
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors relative group"
              >
                <span className="text-terminal-cyan opacity-50 group-hover:opacity-100">$</span>
                <span className="ml-1">{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-2">
            <a 
              href="#demo"
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <span className="text-terminal-dim">[</span>
              try_demo
              <span className="text-terminal-dim">]</span>
            </a>
            <a 
              href="#start"
              className="inline-flex items-center gap-1 px-4 py-1.5 text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors border border-primary"
            >
              <span className="hidden sm:inline">{'>'}</span>
              <span>get_started</span>
              <span className="cursor-blink">_</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-primary"
              aria-label="Toggle menu"
            >
              <span className="text-lg">{mobileMenuOpen ? '[x]' : '[=]'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-primary/20 py-4"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-colors"
              >
                <span className="text-terminal-cyan">$</span> {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
