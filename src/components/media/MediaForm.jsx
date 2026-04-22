import React, { useState } from "react"
import Client from "../services/api"

const MediaForm = ({ user, mediaId, initialData }) => {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    status: initialData?.status || "plan to watch",
    userRating: initialData?.userRating || "",
    description: initialData?.description || "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "userRating") {
      const val = parseInt(value)
      if (val < 1) return setFormData({ ...formData, [name]: "1" })
      if (val > 10) return setFormData({ ...formData, [name]: "10" })
    }
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const currentUserId =
      user?.id || user?._id || user?.user?.id || user?.user?._id

    if (!currentUserId) {
      alert("Please login first")
      return
    }

    try {
      const payload = {
        media: mediaId,
        status: formData.status,
        userRating: formData.userRating,
        description: formData.description,
      }
      await Client.post(`/watchlist/${currentUserId}`, payload)
      alert("Updated your list!")
      setShowForm(false)
    } catch (err) {
      alert(err.response?.data?.message || "Error adding item")
    }
  }

  return (
    <div className="media-form-wrapper">
      <button className="edit-btn-outline" onClick={() => setShowForm(true)}>
        Add to list
      </button>

      {showForm && (
        <>
          /* Change MediaForm.jsx return statement to match Watchlist style */
          <div className="modal-content">
            <form onSubmit={handleSubmit} className="media-form">
              <h2>Add to List</h2>

              <div className="form-section">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="watching">Watching</option>
                  <option value="completed">Completed</option>
                  <option value="onhold">On-Hold</option>
                  <option value="dropped">Dropped</option>
                  <option value="plan to watch">Plan to Watch</option>
                </select>
              </div>

              <div className="form-section">
                <label>Your Rating</label>
                <div className="rating-input-wrapper">
                  <input
                    type="number"
                    name="userRating"
                    min="1"
                    max="10"
                    value={formData.userRating}
                    onChange={handleChange}
                  />
                  <span>/ 10</span>
                </div>
              </div>

              <div className="form-section">
                <label>Notes</label>
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="button-group">
                <button type="submit" className="edit-btn-outline">
                  Save
                </button>
                <button
                  type="button"
                  className="delete-btn-outline"
                  onClick={() => setShowForm(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  )
}

export default MediaForm
