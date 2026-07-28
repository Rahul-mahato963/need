import React from 'react'
import './styles.css'
import type { Metadata, Viewport } from 'next'

import { PWARegister } from './PWARegister'

export const metadata: Metadata = {
  applicationName: 'NEED',
  description:
    'NEED is a home services platform for booking verified plumbing, electrical, AC, cleaning, painting, pest control, security, gardening, and maintenance experts.',
  icons: {
    icon: '/icon.svg',
  },
  manifest: '/manifest.webmanifest',
  title: 'NEED | Verified Home Services',
}

export const viewport: Viewport = {
  themeColor: '#052447',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html className="scroll-smooth bg-[#fbf7ef] text-[#17221f]" data-scroll-behavior="smooth" lang="en">
      <body className="m-0 overflow-x-hidden font-sans">
        <PWARegister />
        <main>{children}</main>
      </body>
    </html>
  )
}
