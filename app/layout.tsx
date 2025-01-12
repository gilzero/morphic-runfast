/**
 * @fileoverview This file defines the root layout for the RunFast AI application.
 * It includes the main structure of the application, such as the header, footer,
 * sidebar, and main content area. It also sets up global styles and metadata.
 * @filepath app/layout.tsx
 */

import type { Metadata, Viewport } from 'next'
import { Inter as FontSans, Racing_Sans_One } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Sidebar } from '@/components/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { AppStateProvider } from '@/lib/utils/app-state'

// Load primary font
const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

// Load racing-style display font
const fontRacing = Racing_Sans_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-racing'
})

const title = 'RunFast AI'
const description =
    'Lightning-fast AI answer engine. Built for speed, powered by intelligence.'

/**
 * Metadata for the application, including title, description, and social media settings.
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://runfa.st'),
  title,
  description,
  openGraph: {
    title,
    description,
    images: ['/og-image.png'],
    type: 'website'
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    creator: '@gilzero'
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
}

/**
 * Viewport settings for the application, defining responsive behavior and theme colors.
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' }
  ]
}

/**
 * RootLayout component that defines the main structure of the application.
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The root layout of the application.
 */
export default function RootLayout({
                                     children
                                   }: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body
          className={cn(
              'font-sans antialiased',
              fontSans.variable,
              fontRacing.variable,
              'bg-background text-foreground'
          )}
      >
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
        <AppStateProvider>
          {/* Speed-optimized layout structure */}
          <div className="relative flex min-h-screen flex-col">
            <Header />

            {/* Main content with subtle gradient */}
            <main className="flex-1 flex flex-col bg-gradient-to-b from-background to-muted/20">
              <div className="container max-w-6xl mx-auto px-4 py-4 flex-1">
                {children}
              </div>
            </main>

            {/* Side elements */}
            <div className="fixed top-[4.5rem] bottom-0 right-0 w-[300px] hidden lg:block">
              <Sidebar />
            </div>

            <Footer />
          </div>

          {/* Enhanced toaster for speed metrics */}
          <Toaster
              position="bottom-right"
              toastOptions={{
                className: 'speed-glass border border-border',
                duration: 2000
              }}
          />
        </AppStateProvider>
      </ThemeProvider>
      </body>
      </html>
  )
}