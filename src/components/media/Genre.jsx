import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const Genre = () => {
  const [genres, setGenres] = useState([])

  useEffect(() => {
    const getGenres = async () => {
      try {
        const response = await axios.get(
          "https://popcorn-be.onrender.com/genres"
        )
        setGenres(response.data)
      } catch (error) {
        console.error("Error getting genres:", error.message)
      }
    }
    getGenres()
  }, [])
  return (
    <div className="media-container">
      <h1>Genres</h1>
      <div className="media-grid">
        {genres.map((genre) => (
          <Link
            to={`/genres/${genre._id}`}
            key={genre._id}
            className="media-card"
          >
            <img src={genre.image} alt={genre.name} />
            <h3>{genre.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Genre
