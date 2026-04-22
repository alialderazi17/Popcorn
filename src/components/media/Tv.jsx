import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Tv = () => {
  const [tvShows, setTvShows] = useState([])

  useEffect(() => {
    const fetchTv = async () => {
      try {
        const res = await axios.get('https://popcorn-be.onrender.com/media/tv')
        setTvShows(res.data)
      } catch (err) {
        console.error('Error fetching TV shows:', err)
      }
    }
    fetchTv()
  }, [])

  return (
    <div className="media-container">
      <div className="media-grid">
        {tvShows.map((show) => (
          <Link to={`/tv/${show._id}`} key={show._id} className="media-card">
            <img src={show.image} alt={show.title} />
            <h3>{show.title}</h3>
            <p>Rating: {show.rating}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Tv
