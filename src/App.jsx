import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { ScrollToTop } from './components/ScrollToTop'
import { HeroSection } from './features/home/HeroSection'
import { CurrentProject } from './features/projects/CurrentProject'
import { AboutUs } from './features/about/AboutUs'
import { PastProjects } from './features/projects/PastProjects'
import { AllProjectsPage } from './features/home/AllProjectsPage'
import { ProjectDetailPage } from './features/projects/ProjectDetailPage'

// HomePage: maneja el scroll a una sección si viene con state.scrollTo
const HomePage = () => {
  const { state } = useLocation()

  useEffect(() => {
    if (state?.scrollTo) {
      const el = document.getElementById(state.scrollTo)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
      }
    }
  }, [state])

  return (
    <main className="flex-grow">
      <HeroSection />
      <CurrentProject />
      <AboutUs />
      <PastProjects />
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/proyectos" element={<AllProjectsPage />} />
          <Route path="/proyectos/:id" element={<ProjectDetailPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
