import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import MediaForm from "./MediaForm"
import { NavLink } from "react-router-dom"

const TvDetails = ({ user }) => {
  const { id } = useParams()
  const [show, setShow] = useState(null)

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const res = await axios.get(
          `https://popcorn-be.onrender.com/media/tv/${id}`
        )
        setShow(res.data)
      } catch (err) {
        console.error(err)
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
          <p>{show.description}</p>
          <p>
            First Air Date: {new Date(show.releaseDate).toLocaleDateString()}
          </p>
          <p>Global Rating: {show.rating}/10</p>
        </div>
      </div>
      <div className="add-to-list-section">
        <MediaForm user={user} mediaId={show._id} />
      </div>
      <NavLink to="/media" className="back-button">
        <button className="edit-btn-outline">Back to Media</button>
      </NavLink>
    </div>
  )
}

export default TvDetails
