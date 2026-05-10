import './App.css'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import AboutPage from './pages/AboutPage'
import Contact from './pages/Contact'
import ContactSubmission from './pages/ContactSubmission'
import Navbar from "./components/Navbar"
import Footer from './sections/Footer'
import { Routes, Route } from 'react-router'
import { ThemeProvider } from './context/ThemeContext'


function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <Routes>
          <Route index element={<Home />}/>
          <Route path="portfolio" element={<Portfolio/>} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="confirmation" element={<ContactSubmission />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  )
}

export default App
