import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'KFC95 Hub (Keeper Of The Nation)',
  description: 'Official tournament management web platform for Manganeng soccer fixtures.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
