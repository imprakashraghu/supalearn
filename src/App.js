import React from 'react'
import Playground from './components/Playground'
import "nes.css/css/nes.min.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './components/Home';
import { AnimatePresence } from "framer-motion";
import Instructions from './components/Instructions';
import Summary from './components/Summary';

function App() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/lab" element={<Playground />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>  
      </AnimatePresence> 
    </BrowserRouter>
  )
}

export default App