import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import axios from 'axios'
import MediaForm from './MediaForm'
import Nav from '../pages/Nav'
const MovieDetails = ({ user }) => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `https://popcorn-be.onrender.com/media/movie/${id}`
        )
        setMovie(res.data)
      } catch (err) {
        console.error('Error fetching movie details:', err)
      }
    }
    fetchMovie()
  }, [id])

  if (!movie) return <div>Loading...</div>

  return (
    <div className='details-page'>
      <div className='details-card'>
        <img src={movie.image} alt={movie.title} />
        <div className='info'>
          <h1>{movie.title}</h1>
          <p>{movie.description}</p>
          <p>Released: {new Date(movie.releaseDate).toLocaleDateString()}</p>
        </div>
      </div>
      <div className='add-to-list-section'>
        <MediaForm user={user} mediaId={movie._id} />
      </div>
      <NavLink to='/media' className='back-button'>
        <button className='back-button'>Back to Media</button>
      </NavLink>
    </div>
  )
}

export default MovieDetails
