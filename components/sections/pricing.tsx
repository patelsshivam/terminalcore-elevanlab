'use client'

import { motion } from 'framer-motion'
import { TerminalWindow, CommandPrompt, GlitchText } from '@/components/terminal'

const plans = [
  {
    name: 'free',
    price: '$0',
    period: '/month',
    description: 'For personal projects and exploration',
    features: [
      '10,000 characters/month',
      '3 custom voices',
      'API access',
      'Community support'
    ],
    cta: 'start_free',
    highlighted: false
  },
  {
    name: 'creator',
    price: '$22',
    period: '/month',
    description: 'For content creators and small teams',
    features: [
      '100,000 characters/month',
      '10 custom voices',
      'Voice cloning',
      'Priority support',
      'Commercial license'
    ],
    cta: 'upgrade_now',
    highlighted: true
  },
  {
    name: 'pro',
    price: '$99',
    period: '/month',
    description: 'For professionals and growing businesses',
    features: [
      '500,000 characters/month',
      'Unlimited custom voices',
      'Professional voice cloning',
      'Dedicated support',
      'Higher rate limits',
      'Usage analytics'
    ],
    cta: 'go_pro',
    highlighted: false
  },
  {
    name: 'enterprise',
    price: 'Custom',
    period: '',
    description: 'For large-scale deployments',
    features: [
      'Unlimited characters',
      'On-premise deployment',
      'Custom model training',
      'SLA guarantees',
      '24/7 support',
      'Dedicated account manager'
    ],
    cta: 'contact_sales',
    highlighted: false
  }
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 md:px-6 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <TerminalWindow title="pricing_table" showControls={false} className="mb-8">
          <CommandPrompt
            command="cat /etc/pricing.conf"
            output={
              <div className="text-primary text-glow">
                Loading subscription tiers...
              </div>
            }
          />
        </TerminalWindow>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <TerminalWindow 
                title={plan.name}
                showControls={false}
                className={`h-full ${plan.highlighted ? 'border-primary border-glow' : ''}`}
              >
                <div className="space-y-4">
                  {/* Price */}
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl md:text-3xl font-bold text-primary text-glow">
                        <GlitchText text={plan.price} glitchOnHover intensity="low" />
                      </span>
                      <span className="text-sm text-muted-foreground">{plan.period}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{plan.description}</p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 py-4 border-t border-b border-primary/20">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2 text-sm">
                        <span className="text-primary shrink-0">+</span>
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href={`#${plan.cta}`}
                    className={`block w-full text-center py-2 text-sm transition-all ${
                      plan.highlighted
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'border border-primary/50 text-primary hover:bg-primary/10'
                    }`}
                  >
                    <span>{'>'}</span> {plan.cta}
                  </a>
                </div>
              </TerminalWindow>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
