import { apiClient } from './client'
import type { User } from '../types'

interface LoginResponse {
  token: string
  user: User
}

export const authApi = {
  login: async (email: string, password: string) => {
    const { data } = await apiClient.post<LoginResponse>('/auth/login', {
      email,
      password,
    })
    return data
  },

  logout: async () => {
    await apiClient.post('/auth/logout')
  },

  getCurrentUser: async () => {
    const { data } = await apiClient.get<User>('/auth/me')
    return data
  },
}