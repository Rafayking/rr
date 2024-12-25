export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'annotator' | 'reviewer';
}

export interface Project {
  id: number;
  name: string;
  description: string;
  createdBy: number;
  createdAt: string;
}

export interface AudioFile {
  id: number;
  projectId: number;
  filename: string;
  duration: number;
  sampleRate: number;
  uploadedAt: string;
}

export interface Annotation {
  id: number;
  audioFileId: number;
  userId: number;
  startTime: number;
  endTime: number;
  label: string;
  createdAt: string;
}