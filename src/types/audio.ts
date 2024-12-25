export interface AudioFile {
  id: number;
  projectId: number;
  filename: string;
  duration: number;
  sampleRate: number;
  format: string;
  size: number;
  url: string;
  uploadedBy: number;
  uploadedAt: string;
  status: 'pending' | 'processing' | 'ready' | 'error';
}

export interface AudioMetadata {
  duration: number;
  sampleRate: number;
  channels: number;
  format: string;
  bitrate: number;
}