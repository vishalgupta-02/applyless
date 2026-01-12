'use client'

import Link from 'next/link'

const Footer = () => {
  return (
    <div className="w-full px-24 py-12 text-center space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-12">
          <Link href="#">
            <p>Features</p>
          </Link>
          <Link href="#">
            <p>About</p>
          </Link>
          <Link href="#">
            <p>Contact</p>
          </Link>
        </div>
        <div className="flex justify-center items-center gap-12">
          <Link href="#">
            <p>Instagram</p>
          </Link>
          <Link href="#">
            <p>Facebook</p>
          </Link>
          <Link href="#">
            <p>Twitter</p>
          </Link>
        </div>
      </div>
      <div className="text-sm text-gray-500">
        &copy; 2026 <span className="text-gray-900">Chrono</span> Privacy Policy
      </div>
    </div>
  )
}

export default Footer
