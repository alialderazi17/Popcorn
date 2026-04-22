import { useState } from 'react'
import { loginUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'

const Login = ({ setLoading, setUser }) => {
  let navigate = useNavigate()

  const initialState = {
    email: '',
    password: '',
  }

  const [form, setForm] = useState(initialState)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userData = await loginUser(form)
    setLoading(true)
    setForm(initialState)
    setUser(userData)
    navigate('/')
  }

  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={handleSubmit}>
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

        <button disabled={!form.email || !form.password}>Log In</button>
      </form>
      <br />
      <h4>
        Don't have an account?
        {<button onClick={() => navigate('/register')}>Register</button>}
      </h4>
    </div>
  )
}

export default Login
