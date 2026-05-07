import {
  Navigation,
  Hero,
  Products,
  APISection,
  DemoSection,
  Testimonials,
  Timeline,
  Pricing,
  Footer
} from '@/components/sections'
import { MatrixRain } from '@/components/terminal'
import { VoiceNarrator } from '@/components/voice-narrator'

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <MatrixRain opacity={0.03} />
      <Navigation />
      <Hero />
      <Products />
      <DemoSection />
      <APISection />
      <Timeline />
      <Testimonials />
      <Pricing />
      <Footer />
      <VoiceNarrator />
    </main>
  )
}
