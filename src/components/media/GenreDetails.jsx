import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import { NavLink } from "react-router-dom"

const GenreDetails = () => {
  const { id } = useParams()
  const [genre, setGenre] = useState(null)
  const [filterType, setFilterType] = useState("all")

  useEffect(() => {
    const getGenre = async () => {
      try {
        const response = await axios.get(
          `https://popcorn-be.onrender.com/genres/${id}`
        )
        setGenre(response.data)
      } catch (error) {
        console.error("Error getting genre details:", error.message)
      }
    }
    getGenre()
  }, [id])
  if (!genre) return <div>Loading...</div>

  const filteredMedia = genre.media
    ? genre.media.filter((item) => {
        if (filterType === "all") return true
        return item.mediaType === filterType
      })
    : []

  return (
    <div className="details-page">
      <div className="genre-header">
        <h1>{genre.name}</h1>
        <p className="genre-description">{genre.description}</p>

        <div className="filter-buttons">
          <button
            className={filterType === "all" ? "active" : ""}
            onClick={() => setFilterType("all")}
          >
            All
          </button>
          <button
            className={filterType === "movie" ? "active" : ""}
            onClick={() => setFilterType("movie")}
          >
            Movies
          </button>
          <button
            className={filterType === "tv" ? "active" : ""}
            onClick={() => setFilterType("tv")}
          >
            TV Shows
          </button>
        </div>
      </div>

      <hr />

      <div className="media-container">
        <div className="media-grid">
          {filteredMedia.length > 0 ? (
            filteredMedia.map((item) => (
              <Link
                to={`/${item.mediaType}/${item._id}`}
                key={item._id}
                className="media-card"
              >
                <img src={item.image} alt={item.title} />
                <div className="media-info">
                  <h3>{item.title}</h3>
                  <p>Rating: {item.rating}</p>
                </div>
              </Link>
            ))
          ) : (
            <p>No {filterType} titles found for this genre.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default GenreDetails
