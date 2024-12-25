export interface Annotation {
  id: number;
  audioFileId: number;
  userId: number;
  startTime: number;
  endTime: number;
  label: string;
  text?: string;
  confidence?: number;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface AnnotationLabel {
  id: number;
  projectId: number;
  name: string;
  color: string;
  description?: string;
  shortcut?: string;
}