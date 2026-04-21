import Axios from 'axios'

export const BASE_URL = 'https://popcorn-be.onrender.com'

const Client = Axios.create({ baseURL: BASE_URL })

Client.interceptors.request.use(
  (config) => {
<<<<<<< HEAD
    const token = localStorage.getItem('token')

=======
    const token = localStorage.getItem("token")
>>>>>>> 752c33f0971300dab7ec27fb1d63fdfc7abeae56
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default Client
