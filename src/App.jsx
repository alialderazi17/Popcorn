import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { checkSession } from './components/services/Auth.js'
import ProtectedRoute from './components/auth/ProtectedRoute.jsx'
import Nav from './components/pages/Nav.jsx'
import Home from './components/pages/Home.jsx'
import Profile from './components/pages/Profile.jsx'
import Watchlist from './components/pages/Watchlist.jsx'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import UpdatePassword from './components/auth/UpdatePassword.jsx'
import MovieDetails from './components/media/MovieDetails'
import TvDetails from './components/media/TvDetails'
import Media from './components/media/Media.jsx'
import Genre from './components/media/Genre.jsx'
import GenreDetails from './components/media/GenreDetails.jsx'
import Users from './components/pages/Users.jsx'
import './App.css'

const App = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const sessionUser = await checkSession()
        setUser(sessionUser)
        setLoading(false)
      } catch (error) {
        console.log('No valid session')
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    checkUser()
  }, [])

  return (
    <>
      <Nav setLoading={setLoading} user={user} setUser={setUser} />
      <div className='main-content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/login'
            element={<Login setLoading={setLoading} setUser={setUser} />}
          />

          <Route
            path='/profile'
            element={
              <ProtectedRoute loading={loading} user={user}>
                <Profile user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/watchlist'
            element={
              <ProtectedRoute loading={loading} user={user}>
                <Watchlist user={user} />
              </ProtectedRoute>
            }
          />

          <Route
            path='/update-password/:id'
            element={
              <ProtectedRoute loading={loading} user={user}>
                <UpdatePassword user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/watchlist/:id'
            element={<Watchlist user={user} appLoading={loading} />}
          />
          <Route path='/user' element={<Users />} />
          <Route path='/profile/:id' element={<Profile user={user} />} />
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
