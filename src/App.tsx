import './App.css'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
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
    <Routes>
        <Route index element={<Home anchors={anchors} />}/>
        <Route path="portfolio" element={<Portfolio anchors={anchors}/>} />
    </Routes>
  )
}

export default App
