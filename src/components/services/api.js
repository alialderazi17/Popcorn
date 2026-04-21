import axios from "axios"

export const BASE_URL = 'https://popcorn-be.onrender.com/'

const Client = axios.create({ baseURL: BASE_URL })

Client.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers["authorization"] = `Bearer ${token}`
    }
    return config
  },
  async (error) => {
    console.log({ msg: "Axios Interceptor Error!", error })
    throw error
  }
)

export default Client
