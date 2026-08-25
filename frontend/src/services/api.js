import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:9500/api',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('eventhub_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const getApiError = (error, fallback = 'Wax baa khaldamay. Fadlan isku day mar kale.') =>
  error.response?.data?.message || fallback

export default api
