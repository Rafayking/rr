import { useState } from 'react';
import type { Annotation, AnnotationLabel } from '@/types/annotation';

interface AnnotationEditorProps {
  annotation?: Partial<Annotation>;
  labels: AnnotationLabel[];
  onSave: (annotation: Partial<Annotation>) => Promise<void>;
  onCancel: () => void;
}

export function AnnotationEditor({
  annotation,
  labels,
  onSave,
  onCancel,
}: AnnotationEditorProps) {
  const [label, setLabel] = useState(annotation?.label || '');
  const [text, setText] = useState(annotation?.text || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSave({
        ...annotation,
        label,
        text,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Label
        </label>
        <select
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        >
          <option value="">Select a label</option>
          {labels.map((l) => (
            <option key={l.id} value={l.name}>
              {l.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Transcription
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={4}
          placeholder="Enter transcription or notes..."
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
}