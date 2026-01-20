'use client'

import Features from '@/components/custom/Features'
import Hero from '@/components/custom/Hero'
import PageLoader from '@/components/custom/PageLoader'

export default function Home() {
  return (
    <div>
      <PageLoader delay={1000} />
      <Hero />
      <Features />
    </div>
  )
}
