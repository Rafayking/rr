import type { Annotation } from '../../types'
import { formatTime } from '../../utils/audio'

interface AnnotationListProps {
  annotations: Annotation[]
  onSelect: (annotation: Annotation) => void
}

export function AnnotationList({ annotations, onSelect }: AnnotationListProps) {
  return (
    <div className="space-y-2">
      {annotations.map((annotation) => (
        <div
          key={annotation.id}
          onClick={() => onSelect(annotation)}
          className="p-3 bg-white rounded shadow-sm hover:shadow cursor-pointer"
        >
          <div className="flex justify-between items-center">
            <span className="font-medium">{annotation.label}</span>
            <span className="text-sm text-gray-500">
              {formatTime(annotation.startTime)} - {formatTime(annotation.endTime)}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}