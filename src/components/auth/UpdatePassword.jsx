import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { updatePassword } from '../services/Auth'

const UpdatePassword = ({ user }) => {
  const navigate = useNavigate()
  const { id } = useParams()

  const initialState = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  }

  const [form, setFrom] = useState(initialState)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    setFrom({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (user && user.id !== id) {
      setError('Unauthorized action!')
      return
    }

    if (form.newPassword !== form.confirmPassword) {
      setError('Passwords do not match!')
      return
    }

    await updatePassword(
      {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword
      },
      id
    )

    setSuccess('Password updated successfully!')
    setFrom(initialState)

    setTimeout(() => {
      navigate('/profile')
    }, 1200)
  }

  return (
    <div>
      {console.log('URL id: ', id)}
      {console.log('User id:', user?.id)}
      <h3>Update Password</h3>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          onChange={handleChange}
          value={form.oldPassword}
          required
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          onChange={handleChange}
          value={form.newPassword}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={form.confirmPassword}
          required
        />

        <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default UpdatePassword
