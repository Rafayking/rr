import type { ProjectStats } from '@/types/project';

interface ProjectProgressProps {
  stats: ProjectStats;
}

export function ProjectProgress({ stats }: ProjectProgressProps) {
  const progress = stats.totalFiles > 0
    ? Math.round((stats.completedFiles / stats.totalFiles) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Project Progress</h3>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Overall Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600">Files</div>
            <div className="mt-1 text-2xl font-semibold">
              {stats.annotatedFiles} / {stats.totalFiles}
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600">Reviewed</div>
            <div className="mt-1 text-2xl font-semibold">
              {stats.reviewedFiles}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}