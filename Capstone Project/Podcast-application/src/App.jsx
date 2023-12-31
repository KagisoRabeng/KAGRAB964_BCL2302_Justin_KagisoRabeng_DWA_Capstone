import Login from '../Components/login'
import Podcast from '../Components/Podcasts'
import Header from '../Components/Header'
import Shows from '../Components/Shows'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Favs from '../Components/Favs'



function App() {
  
  return (
    <BrowserRouter>
    {/* <Header /> */}
    
      <header className="bg-dark">
        <nav className="nav nav-pills flex-row P-2">
          <Link to="/podcasts" className="flex-sm-fill text-sm-center nav-link text-light" href="#">Home</Link>
          {/* <Link to="/shows" className="flex-sm-fill text-sm-center nav-link text-light" href="#">Shows</Link> */}
          <Link to="/favourites" className="flex-sm-fill text-sm-center nav-link text-light" href="#">Favourites</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Podcast />} />
        {/* <Route path="/shows" element={<Shows />} /> */}
        <Route path="/podcasts" element={<Podcast />} />
        <Route path="/favourites" element={<Favs />} />

      </Routes>
    </BrowserRouter>  
  )
}

export default App
