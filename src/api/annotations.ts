import { apiClient } from './client'
import type { Annotation } from '../types'

export const annotationsApi = {
  getAnnotations: async (audioFileId: number) => {
    const { data } = await apiClient.get<Annotation[]>(`/audio-files/${audioFileId}/annotations`)
    return data
  },

  createAnnotation: async (audioFileId: number, annotation: Omit<Annotation, 'id' | 'audioFileId' | 'userId' | 'createdAt'>) => {
    const { data } = await apiClient.post<Annotation>(`/audio-files/${audioFileId}/annotations`, annotation)
    return data
  },

  updateAnnotation: async (id: number, annotation: Partial<Annotation>) => {
    const { data } = await apiClient.patch<Annotation>(`/annotations/${id}`, annotation)
    return data
  },

  deleteAnnotation: async (id: number) => {
    await apiClient.delete(`/annotations/${id}`)
  },
}