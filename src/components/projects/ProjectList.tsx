import { useProjects } from '../../hooks/useProjects'
import { ProjectCard } from './ProjectCard'

export function ProjectList() {
  const { data: projects, isLoading, error } = useProjects()

  if (isLoading) return <div>Loading projects...</div>
  if (error) return <div>Error loading projects</div>
  if (!projects?.length) return <div>No projects found</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}