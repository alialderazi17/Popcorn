import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState, useEffect, use } from "react"
import { checkSession } from "./components/services/Auth.js"
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx"

import Nav from "./components/pages/Nav.jsx"
import Home from "./components/pages/Home.jsx"
import Profile from "./components/pages/Profile.jsx"
import Watchlist from "./components/pages/Watchlist.jsx"
import About from "./components/pages/About.jsx"

import Register from "./components/auth/Register"
import Login from "./components/auth/Login"

import MovieDetails from "./components/media/MovieDetails"
import TvDetails from "./components/media/TvDetails"
import Media from "./components/Media"
import "./App.css"

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await checkSession()
        setUser(user)
      } catch (error) {
        console.log(error)
      }
    }
    checkUser()
  }, [])

  return (
    <>
      <Nav user={user} setUser={setUser} />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute user={user}>
                <Profile user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/watchlist"
            element={
              <ProtectedRoute user={user}>
                <Watchlist user={user} />
              </ProtectedRoute>
            }
          />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUser={setUser} />} />

          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/tv/:id" element={<TvDetails />} />
          <Route path="/media" element={<Media />} />
        </Routes>
      </div>
    </>
  )
}

export default App
