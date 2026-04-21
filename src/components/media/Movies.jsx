import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Movies = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          'https://popcorn-be.onrender.com/media/movies'
        )
        setMovies(res.data)
      } catch (err) {
        console.error('Error fetching movies:', err)
      }
    }
    fetchMovies()
  }, [])

  return (
    <div className='media-container'>
      <h1>Movies</h1>
      <div className='media-grid'>
        {movies.map((movie) => (
          <Link
            to={`/movie/${movie._id}`}
            key={movie._id}
            className='media-card'
          >
            <img src={movie.image} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>Rating: {movie.rating}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Movies
