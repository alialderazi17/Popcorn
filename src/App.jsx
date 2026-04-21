import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { checkSession } from './components/services/Auth.js'
import ProtectedRoute from './components/auth/ProtectedRoute.jsx'
import Nav from './components/pages/Nav.jsx'
import Home from './components/pages/Home.jsx'
import Profile from './components/pages/Profile.jsx'
import Watchlist from './components/pages/Watchlist.jsx'
import About from './components/pages/About.jsx'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import MovieDetails from './components/media/MovieDetails'
import TvDetails from './components/media/TvDetails'
import Media from './components/Media'
import Genre from './components/media/Genre.jsx'
import GenreDetails from './components/media/GenreDetails.jsx'
import './App.css'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const sessionUser = await checkSession()
        setUser(sessionUser)
      } catch (error) {
        console.log('No valid session')
      }
    }
    checkUser()
  }, [])

  return (
    <>
      <Nav user={user} setUser={setUser} />
      <div className='main-content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login setUser={setUser} />} />

          <Route
            path='/profile'
            element={
              <ProtectedRoute user={user}>
                <Profile user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/watchlist'
            element={
              <ProtectedRoute user={user}>
                <Watchlist user={user} />
              </ProtectedRoute>
            }
          />

          <Route path='/movie/:id' element={<MovieDetails user={user} />} />
          <Route path='/tv/:id' element={<TvDetails user={user} />} />
          <Route path='/media' element={<Media />} />
          <Route path='/genres' element={<Genre />} />
          <Route path='/genres/:id' element={<GenreDetails />} />
        </Routes>
      </div>
    </>
  )
}

export default App
