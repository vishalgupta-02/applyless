'use client'

import dynamic from 'next/dynamic'

const Navbar = dynamic(() => import('@/components/custom/Navbar'), {
  ssr: false,
})

export default function NavbarWrapper() {
  return <Navbar />
}
