import React from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { HeroSection } from './features/home/HeroSection'
import { CurrentProject } from './features/projects/CurrentProject'
import { AboutUs } from './features/about/AboutUs'
import { PastProjects } from './features/projects/PastProjects'

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <CurrentProject />
        <AboutUs />
        <PastProjects />
      </main>
      <Footer />
    </div>
  )
}

export default App
