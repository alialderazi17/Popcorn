import Client from './api'

export const registerUser = async (data) => {
  try {
    const res = await Client.post('/auth/register', data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const loginUser = async (data) => {
  try {
    const res = await Client.post('/auth/login', data)
    localStorage.setItem('token', res.data.token)
    return res.data.user
  } catch (error) {
    throw error
  }
}

export const updatePassword = async (data, userId) => {
  try {
    const res = await Client.put(`/auth/update-password/${userId}`, data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const checkSession = async (data) => {
  try {
    const res = await Client.get('/auth/session')
    return res.data
  } catch (error) {
    throw error
  }
}
