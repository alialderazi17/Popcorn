import { useState } from 'react'
import { registerUser } from '../services/Auth.js'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  let navigate = useNavigate()

  const initialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  const [form, setForm] = useState(initialState)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await registerUser(form)
    setForm(initialState)
    navigate('/login')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username: </label>
        <input
          type='text'
          name='username'
          onChange={handleChange}
          value={form.username}
          required
        />

        <label htmlFor='email'>Email:</label>
        <input
          type='text'
          name='email'
          onChange={handleChange}
          value={form.email}
          required
        />

        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          name='password'
          onChange={handleChange}
          value={form.password}
          required
        />

        <label htmlFor='confirmPassowrd'>Confirm password:</label>
        <input
          type='password'
          name='confirmPassword'
          onChange={handleChange}
          value={form.confirmPassword}
          required
        />

        <button
          disabled={
            !form.email ||
            (!form.password && form.password !== form.confirmPassword)
          }
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default Register
