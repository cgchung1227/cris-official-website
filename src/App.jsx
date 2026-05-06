import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Features from './components/Features'
import Cases from './components/Cases'
import Contact from './components/Contact'
import APSProduct from './pages/APSProduct'
import About from './pages/About'
import ESGProduct from './pages/ESGProduct'
import AIBoxProduct from './pages/AIBoxProduct'
import ContactPage from './pages/ContactPage'

function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Cases />
      <Contact />
    </>
  )
}

export default function App() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('theme')
    if (stored) return stored === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar dark={dark} setDark={setDark} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/aps" element={<APSProduct />} />
          <Route path="/about" element={<About />} />
          <Route path="/products/esg" element={<ESGProduct />} />
          <Route path="/products/ai-box" element={<AIBoxProduct />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
