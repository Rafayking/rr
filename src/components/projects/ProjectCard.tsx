import { Link } from 'react-router-dom'
import type { Project } from '../../types'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link 
      to={`/projects/${project.id}`}
      className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
      <p className="mt-2 text-sm text-gray-600">{project.description}</p>
      <div className="mt-4 text-xs text-gray-500">
        Created: {new Date(project.createdAt).toLocaleDateString()}
      </div>
    </Link>
  )
}