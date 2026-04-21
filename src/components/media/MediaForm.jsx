import React, { useState } from "react"
import axios from "axios"

const MediaForm = ({ userId, mediaId, initialData }) => {
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
    try {
      await axios.post(`/mediaList/${userId}`, {
        mediaId,
        ...formData,
      })
      alert("Updated your list!")
      setShowForm(false)
    } catch (err) {
      console.error("Error saving media:", err)
    }
  }

  return (
    <div className="media-form-wrapper">
      <button className="add-to-list-btn" onClick={() => setShowForm(true)}>
        Add to list
      </button>

      {showForm && (
        <>
          {/* Dark background overlay */}
          <div
            className="modal-overlay"
            onClick={() => setShowForm(false)}
          ></div>

          {/* The actual pop-up form */}
          <div className="modal-content">
            <form onSubmit={handleSubmit} className="media-form">
              <h2>Update Media</h2>

              <div className="form-section">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
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
                <label htmlFor="userRating">Rating (1-10)</label>
                <div className="rating-input-wrapper">
                  <input
                    id="userRating"
                    type="number"
                    name="userRating"
                    placeholder="Score"
                    min="1"
                    max="10"
                    value={formData.userRating}
                    onChange={handleChange}
                  />
                  <span>/ 10</span>
                </div>
              </div>

              <div className="form-section">
                <label htmlFor="description">Notes</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                />
              </div>

              <div className="button-group">
                <button type="submit" className="submit-btn">
                  Save
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
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
