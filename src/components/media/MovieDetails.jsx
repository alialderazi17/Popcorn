import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import MediaForm from "./MediaForm"

const MovieDetails = ({ userId }) => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `https://popcorn-be.onrender.com/media/movies/${id}`
        )
        setMovie(res.data)
      } catch (err) {
        console.error("Error fetching movie details:", err)
      }
    }
    fetchMovie()
  }, [id])

  if (!movie) return <div>Loading...</div>

  return (
    <div className="details-page">
      <div className="details-card">
        <img src={movie.image} alt={movie.title} />
        <div className="info">
          <h1>{movie.title}</h1>
          <p>{movie.description}</p>
          <p>Released: {new Date(movie.releaseDate).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="add-to-list-section">
        <h2>Update My List</h2>
        <MediaForm userId={userId} mediaId={movie._id} />
      </div>
    </div>
  )
}

export default MovieDetails
