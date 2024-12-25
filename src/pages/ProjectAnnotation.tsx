import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AudioWaveform } from '@/components/audio/AudioWaveform';
import { AnnotationEditor } from '@/components/annotations/AnnotationEditor';
import { AnnotationList } from '@/components/annotations/AnnotationList';
import { useAnnotations, useCreateAnnotation } from '@/hooks/useAnnotations';
import { useRealtime } from '@/hooks/useRealtime';
import type { Annotation } from '@/types/annotation';

export function ProjectAnnotation() {
  const { projectId, fileId } = useParams();
  const [selectedAnnotation, setSelectedAnnotation] = useState<Annotation | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const { data: annotations, isLoading } = useAnnotations(Number(fileId));
  const createAnnotation = useCreateAnnotation();
  
  // Setup realtime collaboration
  const { socket } = useRealtime(Number(projectId));

  const handleRegionCreated = async (region: { start: number; end: number }) => {
    setIsEditing(true);
    // Create a new annotation
  };

  const handleRegionUpdated = async (id: string, region: { start: number; end: number }) => {
    // Update existing annotation
  };

  const handleAnnotationSave = async (annotation: Partial<Annotation>) => {
    try {
      if (selectedAnnotation) {
        // Update existing annotation
      } else {
        // Create new annotation
        await createAnnotation.mutateAsync({
          audioFileId: Number(fileId),
          ...annotation,
        });
      }
      setIsEditing(false);
      setSelectedAnnotation(null);
    } catch (error) {
      console.error('Failed to save annotation:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-3 gap-8">
        {/* Main content - Waveform */}
        <div className="col-span-2">
          <AudioWaveform
            url={`/api/audio/${fileId}`}
            annotations={annotations}
            onRegionCreated={handleRegionCreated}
            onRegionUpdated={handleRegionUpdated}
            onRegionSelected={(id) => {
              const annotation = annotations?.find(a => a.id.toString() === id);
              if (annotation) {
                setSelectedAnnotation(annotation);
                setIsEditing(true);
              }
            }}
          />
        </div>

        {/* Sidebar - Annotations */}
        <div className="space-y-6">
          {isEditing ? (
            <AnnotationEditor
              annotation={selectedAnnotation || undefined}
              labels={[]} // Add your labels here
              onSave={handleAnnotationSave}
              onCancel={() => {
                setIsEditing(false);
                setSelectedAnnotation(null);
              }}
            />
          ) : (
            <AnnotationList
              annotations={annotations || []}
              onSelect={(annotation) => {
                setSelectedAnnotation(annotation);
                setIsEditing(true);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}