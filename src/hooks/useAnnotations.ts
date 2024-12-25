import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { annotationsApi } from '../api/annotations'

export function useAnnotations(audioFileId: number) {
  return useQuery({
    queryKey: ['annotations', audioFileId],
    queryFn: () => annotationsApi.getAnnotations(audioFileId),
  })
}

export function useCreateAnnotation(audioFileId: number) {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data) => annotationsApi.createAnnotation(audioFileId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['annotations', audioFileId] })
    },
  })
}

export function useUpdateAnnotation() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, ...data }) => annotationsApi.updateAnnotation(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['annotations'] })
    },
  })
}