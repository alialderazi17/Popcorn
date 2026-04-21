import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Client from '../services/api'

const Watchlist = ({ user }) => {
  const [list, setList] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState(null)
  const [editFormData, setEditFormData] = useState({
    status: '',
    userRating: '',
    description: '',
  })

  const userId = user?.id || user?._id || user?.user?.id || user?.user?._id

  const fetchUserList = async () => {
    try {
      const res = await Client.get(`/watchlist/${userId}`)
      setList(res.data)
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userId) fetchUserList()
  }, [userId])

  const handleEditClick = (item) => {
    setEditingItem(item)
    setEditFormData({
      status: item.status,
      userRating: item.userRating,
      description: item.description || '',
    })
  }

  const handleRatingChange = (e) => {
    let val = e.target.value
    if (val === '') {
      setEditFormData({ ...editFormData, userRating: '' })
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
      await Client.put(`/watchlist/${userId}`, {
        mediaId: editingItem.media._id,
        ...editFormData,
      })
      alert('Updated successfully!')
      setEditingItem(null)
      fetchUserList()
    } catch (err) {
      console.error(err)
      alert('Error updating entry')
    }
  }

  const handleDelete = async (mediaId) => {
    if (!window.confirm('Are you sure you want to remove this from your list?'))
      return
    try {
      await Client.delete(`/watchlist/${userId}`, {
        data: { media: mediaId },
      })
      fetchUserList()
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div className='loading'>Loading your list...</div>

  const watchlistItems = list?.items || []

  return (
    <div className='watchlist-page'>
      <h1>My Media List</h1>

      {watchlistItems.length === 0 ? (
        <div className='empty-list'>
          <p>Your list is empty.</p>
          <Link to='/media' className='browse-link'>
            Browse Media
          </Link>
        </div>
      ) : (
        <div className='list-grid'>
          {watchlistItems.map((item) => (
            <div key={item._id} className='watchlist-item'>
              <div className='item-card'>
                <img src={item.media?.image} alt={item.media?.title} />
                <div className='item-info'>
                  <div className='item-header'>
                    <h3>{item.media?.title}</h3>
                    <span className='media-type-badge'>
                      {item.media?.mediaType?.toUpperCase()}
                    </span>
                  </div>

                  <div className='stats'>
                    <span
                      className={`status-pill ${item.status?.replace(/\s+/g, '-')}`}
                    >
                      {item.status}
                    </span>
                    <span className='user-score'>⭐ {item.userRating}/10</span>
                  </div>

                  {item.description && (
                    <p className='notes-preview'>"{item.description}"</p>
                  )}

                  <div className='actions'>
                    <button
                      onClick={() => handleEditClick(item)}
                      className='edit-btn'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.media?._id)}
                      className='delete-btn'
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingItem && (
        <>
          <div
            className='modal-overlay'
            onClick={() => setEditingItem(null)}
          ></div>
          <div className='modal-content'>
            <form onSubmit={handleUpdate} className='media-form'>
              <h2>Edit Entry: {editingItem.media?.title}</h2>

              <div className='form-section'>
                <label>Status</label>
                <select
                  value={editFormData.status}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, status: e.target.value })
                  }
                >
                  <option value='watching'>Watching</option>
                  <option value='completed'>Completed</option>
                  <option value='onhold'>On-Hold</option>
                  <option value='dropped'>Dropped</option>
                  <option value='plan to watch'>Plan to Watch</option>
                </select>
              </div>

              <div className='form-section'>
                <label>Your Rating (1-10)</label>
                <div className='rating-input-wrapper'>
                  <input
                    type='number'
                    min='1'
                    max='10'
                    value={editFormData.userRating}
                    onChange={handleRatingChange}
                  />
                  <span>/ 10</span>
                </div>
              </div>

              <div className='form-section'>
                <label>Personal Notes</label>
                <textarea
                  rows='4'
                  value={editFormData.description}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className='button-group'>
                <button type='submit' className='submit-btn'>
                  Save Changes
                </button>
                <button
                  type='button'
                  className='cancel-btn'
                  onClick={() => setEditingItem(null)}
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

export default Watchlist
