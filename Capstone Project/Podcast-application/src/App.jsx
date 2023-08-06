import React, { useState } from 'react'
import Login from '../Components/login'
import Podcasts from '../Components/Podcasts'
import Header from '../Components/Header'
import Shows from '../Components/Shows'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


function App() {
  
  return (
    <BrowserRouter>
      <header className="bg-dark">
        <nav className="nav nav-pills flex-row P-2">
          <Link to="/podcasts" className="flex-sm-fill text-sm-center nav-link text-light" href="#">Home</Link>
          <Link to="/shows" className="flex-sm-fill text-sm-center nav-link text-light" href="#">Shows</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Podcasts />} />
        <Route path="/shows" element={<Shows />} />
        <Route path="/podcasts" element={<Podcasts />} />

      </Routes>
    </BrowserRouter>  
  )
}

export default App
