import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="main">
      <Header />
      <main className="content">
        {children}
      </main>
      <Footer />
    </div>
  )
}
