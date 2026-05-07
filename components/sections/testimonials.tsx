'use client'

import { motion } from 'framer-motion'
import { TerminalWindow, CommandPrompt } from '@/components/terminal'

const testimonials = [
  {
    id: 1,
    user: 'sarah_dev',
    role: 'CTO @ TechStartup',
    message: "ElevenLabs API cut our voice integration time from months to days. The quality is indistinguishable from human voice actors.",
    timestamp: '2024-01-15 14:32:01',
    verified: true
  },
  {
    id: 2,
    user: 'marcus_audio',
    role: 'Lead Audio Engineer @ GameStudio',
    message: "We use ElevenLabs for all our NPC dialogue. The voice cloning feature lets us scale content without scaling costs.",
    timestamp: '2024-01-14 09:18:45',
    verified: true
  },
  {
    id: 3,
    user: 'elena_content',
    role: 'Content Director @ MediaCorp',
    message: "Dubbing our content into 20+ languages used to take weeks. Now it's hours. Same quality, fraction of the time.",
    timestamp: '2024-01-13 16:55:22',
    verified: true
  },
  {
    id: 4,
    user: 'james_founder',
    role: 'Founder @ VoiceApp',
    message: "The conversational AI latency is unreal. Our users can't tell they're talking to an AI. Game changer for customer support.",
    timestamp: '2024-01-12 11:42:33',
    verified: true
  }
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 md:px-6 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <TerminalWindow title="user_feedback.log" showControls={false}>
          <CommandPrompt
            command="tail -f /var/log/testimonials.log"
            output={
              <span className="text-muted-foreground text-sm">
                Streaming latest user feedback...
              </span>
            }
          />
        </TerminalWindow>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <TerminalWindow 
                title={`msg_${testimonial.id}`}
                showControls={false}
                className="h-full"
              >
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-terminal-cyan">@{testimonial.user}</span>
                    {testimonial.verified && (
                      <span className="text-primary">[VERIFIED]</span>
                    )}
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{testimonial.role}</span>
                  </div>

                  {/* Message */}
                  <div className="border-l-2 border-primary/30 pl-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {'"'}{testimonial.message}{'"'}
                    </p>
                  </div>

                  {/* Timestamp */}
                  <div className="text-xs text-terminal-dim">
                    {testimonial.timestamp} UTC
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
