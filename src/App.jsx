import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Nav from "./components/Nav.jsx"
import Home from "./components/Home"
import Profile from "./components/Profile"
import Watchlist from "./components/Watchlist"
import About from "./components/About"

import Register from "./components/auth/Register"
import Login from "./components/auth/Login"

import MovieDetails from "./components/media/MovieDetails"
import TvDetails from "./components/media/TvDetails"
import Media from "./components/Media"
import "./App.css"

const App = () => {
  return (
    <>
      <Nav />
      <div>
        <h1>Hello</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/watchlist" element={<Watchlist />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/tv/:id" element={<TvDetails />} />
          <Route path="/media" element={<Media />} />
        </Routes>
      </div>
    </>
  )
}

export default App
