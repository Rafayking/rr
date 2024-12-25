import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { validateAudioFile } from '@/utils/audio';
import toast from 'react-hot-toast';

interface ProjectUploaderProps {
  projectId: number;
  onUpload: (files: File[]) => Promise<void>;
}

export function ProjectUploader({ projectId, onUpload }: ProjectUploaderProps) {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter(validateAudioFile);
    
    if (validFiles.length !== acceptedFiles.length) {
      toast.error('Some files were rejected. Only WAV and MP3 files are supported.');
    }
    
    if (validFiles.length > 0) {
      try {
        await onUpload(validFiles);
        toast.success('Files uploaded successfully');
      } catch (error) {
        toast.error('Failed to upload files');
      }
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/wav': ['.wav'],
      'audio/mpeg': ['.mp3'],
    },
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg p-8
        flex flex-col items-center justify-center
        cursor-pointer transition-colors
        ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'}
      `}
    >
      <input {...getInputProps()} />
      <Upload className="w-12 h-12 text-gray-400 mb-4" />
      <p className="text-sm text-gray-600 text-center">
        {isDragActive
          ? 'Drop the audio files here...'
          : 'Drag and drop audio files here, or click to select files'}
      </p>
      <p className="text-xs text-gray-500 mt-2">
        Supported formats: WAV, MP3
      </p>
    </div>
  );
}