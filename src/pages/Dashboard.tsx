import { ProjectList } from '../components/projects/ProjectList'

export function Dashboard() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
      </div>
      <ProjectList />
    </div>
  )
}