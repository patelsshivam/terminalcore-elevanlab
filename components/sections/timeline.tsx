'use client'

import { motion } from 'framer-motion'
import { TerminalWindow, CommandPrompt } from '@/components/terminal'

const timelineEvents = [
  {
    date: '2024.Q4',
    version: 'v3.0',
    title: 'Conversational AI Launch',
    description: 'Released real-time voice agents with <300ms latency',
    status: 'DEPLOYED'
  },
  {
    date: '2024.Q3',
    version: 'v2.5',
    title: 'Turbo Model Update',
    description: 'New Turbo v2.5 model with enhanced emotional range',
    status: 'DEPLOYED'
  },
  {
    date: '2024.Q2',
    version: 'v2.0',
    title: 'Voice Design',
    description: 'Create custom voices without source audio',
    status: 'DEPLOYED'
  },
  {
    date: '2024.Q1',
    version: 'v1.5',
    title: 'Multilingual Expansion',
    description: 'Expanded support to 32 languages with native quality',
    status: 'DEPLOYED'
  },
  {
    date: '2023.Q4',
    version: 'v1.0',
    title: 'Public API Launch',
    description: 'Opened API access for developers worldwide',
    status: 'DEPLOYED'
  },
  {
    date: '2022.Q4',
    version: 'v0.1',
    title: 'Beta Launch',
    description: 'Initial release of text-to-speech platform',
    status: 'ARCHIVED'
  }
]

export function Timeline() {
  return (
    <section id="research" className="py-20 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <TerminalWindow title="changelog.md" className="mb-8">
          <CommandPrompt
            command="git log --oneline --all"
            output={
              <span className="text-muted-foreground text-sm">
                Displaying version history...
              </span>
            }
          />
        </TerminalWindow>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-primary/20" />

          {/* Events */}
          <div className="space-y-6">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.version}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-12 sm:pl-20"
              >
                {/* Dot */}
                <div className="absolute left-2.5 sm:left-6.5 top-2 w-3 h-3 bg-primary pulse-glow" />

                <TerminalWindow 
                  title={event.version}
                  showControls={false}
                  status={event.status === 'DEPLOYED' ? 'active' : 'idle'}
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-terminal-cyan">{event.date}</span>
                      <span className={`text-xs px-2 py-0.5 ${
                        event.status === 'DEPLOYED' 
                          ? 'bg-primary/20 text-primary' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                    <h3 className="text-primary font-bold">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                </TerminalWindow>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
