import { apiClient } from './client'
import type { Project } from '../types'

export const projectsApi = {
  getProjects: async () => {
    const { data } = await apiClient.get<Project[]>('/projects')
    return data
  },

  getProject: async (id: number) => {
    const { data } = await apiClient.get<Project>(`/projects/${id}`)
    return data
  },

  createProject: async (project: Omit<Project, 'id' | 'createdAt' | 'createdBy'>) => {
    const { data } = await apiClient.post<Project>('/projects', project)
    return data
  },

  updateProject: async (id: number, project: Partial<Project>) => {
    const { data } = await apiClient.patch<Project>(`/projects/${id}`, project)
    return data
  },

  deleteProject: async (id: number) => {
    await apiClient.delete(`/projects/${id}`)
  },
}