import { useState } from 'react';
import { useProjects } from '../../hooks/useProjects';
import { ProjectProgress } from '../../components/projects/ProjectProgress';

export function ProjectManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: projects, isLoading } = useProjects();

  const filteredProjects = projects?.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Project Management</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full px-4 py-2 rounded-md border border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid gap-4 p-4">
          {filteredProjects?.map((project) => (
            <div key={project.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium">{project.name}</h3>
                  <p className="text-sm text-gray-600">{project.description}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  project.status === 'completed' ? 'bg-green-100 text-green-800' : 
                  project.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {project.status}
                </span>
              </div>
              
              <ProjectProgress stats={{
                totalFiles: 10, // Replace with actual stats
                annotatedFiles: 5,
                reviewedFiles: 3,
                completedFiles: 2
              }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}