tv: details
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import MediaForm from "./MediaForm"

const TvDetails = ({ userId }) => {
  const { id } = useParams()
  const [show, setShow] = useState(null)

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const res = await axios.get(
          `https://popcorn-be.onrender.com/media/${id}`
        )
        setShow(res.data)
      } catch (err) {
        console.error("Error fetching TV details:", err)
      }
    }
    fetchShow()
  }, [id])

  if (!show) return <div>Loading...</div>

  return (
    <div className="details-page">
      <div className="details-card">
        <img src={show.image} alt={show.title} />
        <div className="info">
          <h1>{show.title}</h1>
          <div className="badge">TV SHOW</div>
          <p>{show.description}</p>
          <p>
            First Air Date: {new Date(show.releaseDate).toLocaleDateString()}
          </p>
          <p>Global Rating: {show.rating} / 10</p>
        </div>
      </div>

      <div className="add-to-list-section">
        <h2>Add to My Collection</h2>

        <MediaForm userId={userId} mediaId={show._id} />
      </div>
    </div>
  )
}

export default TvDetails
