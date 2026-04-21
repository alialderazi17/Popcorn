import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const Watchlist = ({ userId }) => {
  const [watchlist, setWatchlist] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const res = await axios.get(
          `https://popcorn-be.onrender.com/mediaList/${userId}`
        )
        setWatchlist(res.data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching watchlist:", err)
        setLoading(false)
      }
    }

    if (userId) {
      fetchWatchlist()
    }
  }, [userId])

  if (loading) return <div className="loader">Loading your list...</div>

  return (
    <div className="watchlist-container">
      <h1>My Watchlist</h1>

      {watchlist.length === 0 ? (
        <p>Your list is empty. Start adding some movies or TV shows!</p>
      ) : (
        <div className="watchlist-table-wrapper">
          <table className="watchlist-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Score</th>
                <th>Status</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {watchlist.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={item.mediaId?.image}
                      alt={item.mediaId?.title}
                      width="50"
                    />
                  </td>
                  <td>
                    <Link
                      to={`/${item.mediaId?.mediaType === "movie" ? "movies" : "tv"}/${item.mediaId?._id}`}
                    >
                      {item.mediaId?.title}
                    </Link>
                  </td>
                  <td>{item.userRating || "N/A"}</td>
                  <td>
                    <span
                      className={`status-badge ${item.status.replace(/\s+/g, "-")}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>{item.mediaId?.mediaType?.toUpperCase()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Watchlist
