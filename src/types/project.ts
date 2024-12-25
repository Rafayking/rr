export type ProjectStatus = 'draft' | 'in_progress' | 'review' | 'completed';

export interface Project {
  id: number;
  name: string;
  description: string;
  status: ProjectStatus;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectMember {
  id: number;
  projectId: number;
  userId: number;
  role: 'annotator' | 'reviewer';
  assignedAt: string;
}

export interface ProjectStats {
  totalFiles: number;
  annotatedFiles: number;
  reviewedFiles: number;
  completedFiles: number;
}