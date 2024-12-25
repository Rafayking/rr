import { useProjects } from '../../hooks/useProjects';
import { ProjectProgress } from '../../components/projects/ProjectProgress';

export function AdminDashboard() {
  const { data: projects, isLoading } = useProjects();

  const stats = {
    totalFiles: projects?.length || 0,
    annotatedFiles: projects?.filter(p => p.status === 'completed').length || 0,
    reviewedFiles: projects?.filter(p => p.status === 'review').length || 0,
    completedFiles: projects?.filter(p => p.status === 'completed').length || 0,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-2">
          <ProjectProgress stats={stats} />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <a href="/admin/users" className="block p-2 hover:bg-gray-50 rounded-md">
              Manage Users
            </a>
            <a href="/admin/projects" className="block p-2 hover:bg-gray-50 rounded-md">
              Manage Projects
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}