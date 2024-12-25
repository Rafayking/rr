import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem('token', token)
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    localStorage.removeItem('token')
    delete apiClient.defaults.headers.common.Authorization
  }
}