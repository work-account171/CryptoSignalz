import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import BackToTop from '@/components/BackToTop/BackToTop'
import ClientOnly from '@/components/ClientOnly/ClientOnly'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'CryptoSignalz | Modern Cryptocurrency Platform',
  description: 'A cutting-edge cryptocurrency platform with advanced features for trading, analysis, and portfolio management.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        {/* Prevent layout shifts by ensuring visibility during hydration */}
        <style dangerouslySetInnerHTML={{ __html: `
          html, body, div, section, main {
            opacity: 1 !important;
            visibility: visible !important;
            overflow: visible !important;
          }
          
          section {
            position: relative !important;
            z-index: 1 !important;
            min-height: auto !important;
            display: block !important;
          }
          
          .home > * {
            opacity: 1 !important;
            visibility: visible !important;
            min-height: auto !important;
          }
        `}} />
      </head>
      <body>
        <a href="#main-content" className="skip-to-content">Skip to content</a>
        <ClientOnly>
          <Navbar />
        </ClientOnly>
        <main 
          id="main-content"
          style={{ 
            position: 'relative', 
            minHeight: '100vh', 
            width: '100%', 
            overflow: 'visible', 
            opacity: 1,
            visibility: 'visible',
            zIndex: 1,
            display: 'block'
          }}
          tabIndex={-1}
        >
          <Suspense fallback={
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              minHeight: '60vh' 
            }}>
              <div 
                className="loading-spinner"
                role="status"
                aria-label="Loading"
              />
            </div>
          }>
            {children}
          </Suspense>
        </main>
        <Footer />
        <ClientOnly>
          <BackToTop />
        </ClientOnly>
      </body>
    </html>
  )
}
