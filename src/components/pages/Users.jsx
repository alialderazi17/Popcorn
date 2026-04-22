import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get('https://popcorn-be.onrender.com/user')
        setUsers(response.data)
      } catch (error) {
        console.error('Error getting users', error.message)
      }
    }
    getUsers()
  }, [])

  return (
    <div className='users-container'>
      <h1>Popcorn's Users</h1>
      <div className='user-grid'>
        {users.map((user) => (
          <Link
            to={`/profile/${user._id}`}
            key={user._id}
            className='user-card'
          >
            <img src={user.profilePic} alt={user.username} />
            <h3>{user.username}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}
export default Users
