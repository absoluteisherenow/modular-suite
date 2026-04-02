import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Signal Lab OS | Tailored Artist OS',
  description: 'Signal Lab OS — tailored artist OS for electronic music. Tour management, content scheduling, production analysis, DJ set prep, and release management — one system.',
  viewport: 'width=device-width, initial-scale=1',
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Unbounded:wght@200;300;400&display=swap" rel="stylesheet" />
        <style>{`.display-font{font-family:'Unbounded',sans-serif}.mono-font{font-family:'DM Mono',monospace}`}</style>
      </head>
      <body style={{ background: "#070706", color: "#f0ebe2", margin: 0, padding: 0 }}>
        <main style={{ width: "100%", minHeight: "100vh" }}>
          {children}
        </main>
      </body>
    </html>
  )
}
