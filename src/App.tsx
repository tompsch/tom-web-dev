import './App.css'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import AboutPage from './pages/AboutPage'
import Contact from './pages/Contact'
import Navbar from "./components/Navbar"
import Footer from './sections/Footer'
import { Routes, Route } from 'react-router'


function App() {
  return (
    <>
      <Navbar />
      <Routes>
          <Route index element={<Home />}/>
          <Route path="portfolio" element={<Portfolio/>} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
