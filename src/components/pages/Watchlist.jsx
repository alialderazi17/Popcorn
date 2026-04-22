import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Client from "../services/api"

const Watchlist = ({ user }) => {
  const [editingItem, setEditingItem] = useState(null)
  const [editFormData, setEditFormData] = useState({
    status: "",
    userRating: "",
    description: "",
  })
  const { id } = useParams()
  const [list, setList] = useState(null)
  const [loading, setLoading] = useState(true)

  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const loggedInUserId =
    user?.id || user?._id || user?.user?.id || user?.user?._id
  const targetUserId = id || loggedInUserId
  const isOwner = loggedInUserId && (!id || id === loggedInUserId)

  const fetchUserList = async () => {
    try {
      const res = await Client.get(`/watchlist/${targetUserId}`)
      setList(res.data)
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (targetUserId) fetchUserList()
  }, [targetUserId])

  const handleEditClick = (item) => {
    setEditingItem(item)
    setEditFormData({
      status: item.status,
      userRating: item.userRating,
      description: item.description || "",
    })
  }

  const handleRatingChange = (e) => {
    let val = e.target.value
    if (val === "") {
      setEditFormData({ ...editFormData, userRating: "" })
      return
    }
    let num = parseInt(val)
    if (num > 10) num = 10
    if (num < 1) num = 1
    setEditFormData({ ...editFormData, userRating: num.toString() })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await Client.put(`/watchlist/${loggedInUserId}`, {
        mediaId: editingItem.media._id,
        ...editFormData,
      })
      setEditingItem(null)
      fetchUserList()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (mediaId) => {
    if (!window.confirm("Are you sure you want to remove this from your list?"))
      return
    try {
      await Client.delete(`/watchlist/${loggedInUserId}`, {
        data: { media: mediaId },
      })
      fetchUserList()
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div className="loading">Loading list...</div>

  const filteredItems =
    list?.items?.filter((item) => {
      const matchesType =
        typeFilter === "all" || item.media?.mediaType === typeFilter
      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter
      return matchesType && matchesStatus
    }) || []

  return (
    <div className="watchlist-page">
      <header className="watchlist-header">
        <h1>
          {isOwner
            ? "My Media List"
            : `${list?.user?.username || "User"}'s Media List`}
        </h1>

        <div className="filter-system">
          <div className="filter-group">
            <button
              className={typeFilter === "all" ? "active" : ""}
              onClick={() => setTypeFilter("all")}
            >
              All Media
            </button>
            <button
              className={typeFilter === "movie" ? "active" : ""}
              onClick={() => setTypeFilter("movie")}
            >
              Movies
            </button>
            <button
              className={typeFilter === "tv" ? "active" : ""}
              onClick={() => setTypeFilter("tv")}
            >
              TV Shows
            </button>
          </div>

          <div className="filter-group status-filters">
            <button
              className={statusFilter === "all" ? "active" : ""}
              onClick={() => setStatusFilter("all")}
            >
              All
            </button>
            <button
              className={statusFilter === "watching" ? "active" : ""}
              onClick={() => setStatusFilter("watching")}
            >
              Watching
            </button>
            <button
              className={statusFilter === "completed" ? "active" : ""}
              onClick={() => setStatusFilter("completed")}
            >
              Completed
            </button>
            <button
              className={statusFilter === "onhold" ? "active" : ""}
              onClick={() => setStatusFilter("onhold")}
            >
              On-Hold
            </button>
            <button
              className={statusFilter === "dropped" ? "active" : ""}
              onClick={() => setStatusFilter("dropped")}
            >
              Dropped
            </button>
            <button
              className={statusFilter === "plan to watch" ? "active" : ""}
              onClick={() => setStatusFilter("plan to watch")}
            >
              Plan to Watch
            </button>
          </div>
        </div>
      </header>

      {filteredItems.length === 0 ? (
        <div className="empty-list">
          <p>No titles found matching these filters.</p>
        </div>
      ) : (
        <div className="list-grid">
          {filteredItems.map((item) => (
            <div key={item._id} className="watchlist-item">
              <div className="item-card">
                <img src={item.media?.image} alt={item.media?.title} />

                <div className="item-info">
                  <div className="item-header">
                    <h3>{item.media?.title}</h3>
                  </div>

                  <div className="stats-row">
                    <span
                      className={`status-pill ${item.status?.replace(/\s+/g, "-")}`}
                    >
                      {item.status}
                    </span>
                    <div className="score-box">
                      <span className="star">★</span>
                      <span className="score-value">{item.userRating}</span>
                      <span className="score-max">/10</span>
                    </div>
                  </div>

                  {item.description && (
                    <p className="notes-preview">"{item.description}"</p>
                  )}

                  {isOwner && (
                    <div className="actions">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="edit-btn-outline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.media?._id)}
                        className="delete-btn-outline"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingItem && (
        <>
          <div
            className="modal-overlay"
            onClick={() => setEditingItem(null)}
          ></div>
          <div className="modal-content">
            <form onSubmit={handleUpdate} className="media-form">
              <h2>Edit Entry</h2>
              <div className="editing-title">{editingItem.media?.title}</div>

              <div className="form-section">
                <label>Status</label>
                <select
                  value={editFormData.status}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, status: e.target.value })
                  }
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
                    min="1"
                    max="10"
                    value={editFormData.userRating}
                    onChange={handleRatingChange}
                  />
                  <span>/ 10</span>
                </div>
              </div>

              <div className="form-section">
                <label>Notes</label>
                <textarea
                  rows="3"
                  placeholder="Personal thoughts..."
                  value={editFormData.description}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="button-group">
                <button type="submit" className="edit-btn-outline">
                  Update
                </button>
                <button
                  type="button"
                  className="delete-btn-outline"
                  onClick={() => setEditingItem(null)}
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

export default Watchlist
