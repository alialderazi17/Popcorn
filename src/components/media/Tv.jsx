import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

// 1. Destructure searchQuery from props
const Tv = ({ searchQuery }) => {
  const [tvShows, setTvShows] = useState([])

  useEffect(() => {
    const fetchTv = async () => {
      try {
        const res = await axios.get("https://popcorn-be.onrender.com/media/tv")
        setTvShows(res.data)
      } catch (err) {
        console.error("Error fetching TV shows:", err)
      }
    }
    fetchTv()
  }, [])

  // 2. Filter the shows based on the user's input
  const filteredTv = tvShows.filter((show) =>
    show.title.toLowerCase().includes(searchQuery?.toLowerCase() || "")
  )

  return (
    <div className="media-container">
      <div className="media-grid">
        {/* 3. Render filtered list or a "not found" message */}
        {filteredTv.length > 0 ? (
          filteredTv.map((show) => (
            <Link to={`/tv/${show._id}`} key={show._id} className="media-card">
              <img src={show.image} alt={show.title} />
              <h3>{show.title}</h3>
              <p>Rating: {show.rating}</p>
            </Link>
          ))
        ) : (
          <div className="no-results">
            <p>No TV shows found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Tv
