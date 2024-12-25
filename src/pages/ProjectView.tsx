import { useParams } from 'react-router-dom'
import { useProject } from '../hooks/useProjects'
import { useAnnotations } from '../hooks/useAnnotations'
import { WaveformPlayer } from '../components/audio/WaveformPlayer'
import { AnnotationList } from '../components/annotations/AnnotationList'

export function ProjectView() {
  const { id } = useParams<{ id: string }>()
  const projectId = parseInt(id!, 10)
  
  const { data: project, isLoading: projectLoading } = useProject(projectId)
  const { data: annotations, isLoading: annotationsLoading } = useAnnotations(projectId)

  if (projectLoading) return <div>Loading project...</div>
  if (!project) return <div>Project not found</div>

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{project.name}</h2>
        <p className="mt-1 text-gray-600">{project.description}</p>
      </div>

      {/* Audio player will be implemented when we have audio files */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Annotations</h3>
          {annotationsLoading ? (
            <div>Loading annotations...</div>
          ) : annotations && annotations.length > 0 ? (
            <AnnotationList
              annotations={annotations}
              onSelect={(annotation) => {
                // Handle annotation selection
                console.log('Selected annotation:', annotation)
              }}
            />
          ) : (
            <div>No annotations found</div>
          )}
        </div>
      </div>
    </div>
  )
}