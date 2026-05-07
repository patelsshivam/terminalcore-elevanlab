'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { TerminalWindow, CommandPrompt, TypewriterText } from '@/components/terminal'

const codeExamples = {
  curl: `curl -X POST "https://api.elevenlabs.io/v1/text-to-speech/{voice_id}" \\
  -H "xi-api-key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Hello! This is ElevenLabs speaking.",
    "model_id": "eleven_turbo_v2_5",
    "voice_settings": {
      "stability": 0.5,
      "similarity_boost": 0.75
    }
  }' \\
  --output speech.mp3`,
  python: `from elevenlabs import ElevenLabs

client = ElevenLabs(api_key="YOUR_API_KEY")

audio = client.generate(
    text="Hello! This is ElevenLabs speaking.",
    voice="Rachel",
    model="eleven_turbo_v2_5"
)

# Save the audio
with open("speech.mp3", "wb") as f:
    for chunk in audio:
        f.write(chunk)`,
  javascript: `import { ElevenLabsClient } from "elevenlabs";

const client = new ElevenLabsClient({
  apiKey: "YOUR_API_KEY"
});

const audio = await client.generate({
  text: "Hello! This is ElevenLabs speaking.",
  voice: "Rachel",
  model_id: "eleven_turbo_v2_5"
});

// Stream or save the audio
await streamAudio(audio);`
}

type Language = keyof typeof codeExamples

const languageLabels: Record<Language, string> = {
  curl: 'cURL',
  python: 'Python',
  javascript: 'Node.js'
}

export function APISection() {
  const [activeLanguage, setActiveLanguage] = useState<Language>('python')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[activeLanguage])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="api" className="py-20 px-4 md:px-6 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <TerminalWindow title="api_documentation" className="mb-8">
          <CommandPrompt
            command="man elevenlabs-api"
            output={
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-primary text-glow mb-4">
                    <TypewriterText text="Developer-first API." speed={50} />
                  </h2>
                  <p className="text-muted-foreground max-w-2xl">
                    Build voice-powered applications with our simple REST API.
                    Generate speech, clone voices, and create real-time conversations
                    with just a few lines of code.
                  </p>
                </motion.div>
              </div>
            }
          />
        </TerminalWindow>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Code Example */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <TerminalWindow title="code_example" showControls={true}>
              {/* Language Tabs */}
              <div className="flex items-center gap-1 mb-4 border-b border-primary/20 pb-2 overflow-x-auto">
                {(Object.keys(codeExamples) as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveLanguage(lang)}
                    className={`px-3 py-1 text-xs transition-colors whitespace-nowrap ${
                      activeLanguage === lang
                        ? 'bg-primary/20 text-primary'
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    {languageLabels[lang]}
                  </button>
                ))}
                <div className="ml-auto">
                  <button
                    onClick={handleCopy}
                    className="px-2 py-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    {copied ? '[copied]' : '[copy]'}
                  </button>
                </div>
              </div>

              {/* Code Block */}
              <pre className="text-xs md:text-sm overflow-x-auto">
                <code className="text-muted-foreground">
                  {codeExamples[activeLanguage].split('\n').map((line, i) => (
                    <div key={i} className="flex">
                      <span className="text-terminal-dim w-6 sm:w-8 shrink-0 select-none text-right pr-2 sm:pr-4">
                        {i + 1}
                      </span>
                      <span className="text-primary/90">{line}</span>
                    </div>
                  ))}
                </code>
              </pre>
            </TerminalWindow>
          </motion.div>

          {/* API Features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {[
              {
                command: '--latency',
                title: 'Ultra-low Latency',
                description: 'Stream audio in real-time with as low as 300ms latency. Perfect for conversational AI and live applications.'
              },
              {
                command: '--scale',
                title: 'Enterprise Scale',
                description: 'Process millions of requests with 99.9% uptime. Auto-scaling infrastructure handles any workload.'
              },
              {
                command: '--sdk',
                title: 'Native SDKs',
                description: 'Official libraries for Python, JavaScript, and more. Get started in minutes with type-safe code.'
              },
              {
                command: '--models',
                title: 'Latest Models',
                description: 'Access cutting-edge voice models including Turbo v2.5 for the most natural speech generation.'
              }
            ].map((feature, index) => (
              <TerminalWindow 
                key={feature.command}
                title={feature.command.replace('--', '')}
                showControls={false}
                className="border-primary/20"
              >
                <div className="flex items-start gap-3">
                  <span className="text-terminal-cyan shrink-0">{feature.command}</span>
                  <div>
                    <h3 className="text-primary font-bold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </TerminalWindow>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <TerminalWindow title="get_started" showControls={false} className="inline-block">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <span className="text-muted-foreground">Ready to build?</span>
              <a 
                href="#docs"
                className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
              >
                <span>{'>'}</span>
                <span>read_the_docs</span>
              </a>
              <a 
                href="#key"
                className="inline-flex items-center gap-2 px-6 py-2 border border-primary/50 text-primary hover:bg-primary/10 transition-all"
              >
                <span>$</span>
                <span>get_api_key</span>
              </a>
            </div>
          </TerminalWindow>
        </motion.div>
      </div>
    </section>
  )
}
