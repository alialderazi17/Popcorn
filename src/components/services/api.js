import axios from "axios"
import Axios from "axios"

export const BASE_URL = "https://popcorn-be.onrender.com/"

const Client = Axios.create({ baseURL: BASE_URL })

Client.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token")
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers["authorization"] = `Bearer ${token}`
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  async (error) => {
    console.log({ msg: "Axios Interceptor Error!", error })
    throw error
  }
  (error) => Promise.reject(error)
)

export default Client
