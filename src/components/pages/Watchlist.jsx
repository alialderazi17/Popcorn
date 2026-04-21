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

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      // We use the same route but your controller logic handles the update
      await Client.put(`/watchlist/${userId}`, {
        mediaId: editingItem.media._id,
        ...editFormData,
      })
      alert('Updated successfully')
      setEditingItem(null)
      fetchUserList()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (mediaId) => {
    if (!window.confirm('Are you sure you want to remove this?')) return
    try {
      await Client.delete(`/watchlist/${userId}`, {
        data: { media: mediaId },
      })
      fetchUserList()
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div className='loading'>Loading...</div>

  const watchlistItems = list?.items || []

  return (
    <div className='watchlist-page'>
      <h1>My Media List</h1>
      {watchlistItems.length === 0 ? (
        <p>
          Your list is empty. <Link to='/media'>Browse Media</Link>
        </p>
      ) : (
        <div className='list-grid'>
          {watchlistItems.map((item) => (
            <div key={item._id} className='watchlist-item'>
              <img src={item.media?.image} alt={item.media?.title} />
              <div className='item-info'>
                <h3>{item.media?.title}</h3>
                <div className='stats'>
                  <span
                    className={`status ${item.status?.replace(/\s+/g, '-')}`}
                  >
                    {item.status}
                  </span>
                  <span className='rating'>⭐ {item.userRating}/10</span>
                </div>
                <p className='notes'>{item.description}</p>

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
              <h2>Edit {editingItem.media.title}</h2>
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
                <label>Rating</label>
                <input
                  type='number'
                  min='1'
                  max='10'
                  value={editFormData.userRating}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      userRating: e.target.value,
                    })
                  }
                />
              </div>
              <div className='form-section'>
                <label>Notes</label>
                <textarea
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
                <button type='button' onClick={() => setEditingItem(null)}>
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
