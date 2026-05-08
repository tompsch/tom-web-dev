import './App.css'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import AboutPage from './pages/AboutPage'
import Navbar from "./components/Navbar"
import Footer from './sections/Footer'
import { useRef } from 'react'
import { Routes, Route } from 'react-router'


function App() {
  const workRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const anchors = {
    work: workRef,
    about: aboutRef
  }
  return (
    <>
      <Navbar anchors={anchors} />
      <Routes>
          <Route index element={<Home anchors={anchors} />}/>
          <Route path="portfolio" element={<Portfolio anchors={anchors}/>} />
          <Route path="about" element={<AboutPage />} />
      </Routes>
      <Footer anchors={anchors} />
    </>
  )
}

export default App
