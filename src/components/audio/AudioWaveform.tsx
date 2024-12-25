import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugins/timeline.js';
import { formatTime } from '@/utils/audio';
import type { Annotation } from '@/types/annotation';

interface AudioWaveformProps {
  url: string;
  height?: number;
  annotations?: Annotation[];
  onRegionCreated?: (region: { start: number; end: number }) => void;
  onRegionUpdated?: (id: string, region: { start: number; end: number }) => void;
  onRegionSelected?: (id: string) => void;
}

export function AudioWaveform({
  url,
  height = 128,
  annotations = [],
  onRegionCreated,
  onRegionUpdated,
  onRegionSelected,
}: AudioWaveformProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !timelineRef.current) return;

    const wavesurfer = WaveSurfer.create({
      container: containerRef.current,
      height,
      waveColor: '#4f46e5',
      progressColor: '#818cf8',
      cursorColor: '#312e81',
      plugins: [
        RegionsPlugin.create(),
        TimelinePlugin.create({
          container: timelineRef.current,
        }),
      ],
    });

    wavesurfer.load(url);
    wavesurferRef.current = wavesurfer;

    // Add existing annotations as regions
    annotations.forEach((annotation) => {
      wavesurfer.regions.add({
        id: annotation.id.toString(),
        start: annotation.startTime,
        end: annotation.endTime,
        color: 'rgba(79, 70, 229, 0.2)',
      });
    });

    wavesurfer.on('timeupdate', (time) => {
      setCurrentTime(time);
    });

    wavesurfer.on('play', () => setIsPlaying(true));
    wavesurfer.on('pause', () => setIsPlaying(false));

    wavesurfer.on('region-created', (region) => {
      onRegionCreated?.({
        start: region.start,
        end: region.end,
      });
    });

    wavesurfer.on('region-updated', (region) => {
      onRegionUpdated?.(region.id, {
        start: region.start,
        end: region.end,
      });
    });

    wavesurfer.on('region-clicked', (region) => {
      onRegionSelected?.(region.id);
    });

    return () => {
      wavesurfer.destroy();
    };
  }, [url]);

  const togglePlayPause = () => {
    wavesurferRef.current?.playPause();
  };

  const handleZoom = (direction: 'in' | 'out') => {
    if (!wavesurferRef.current) return;
    const currentZoom = wavesurferRef.current.getZoom();
    const newZoom = direction === 'in' ? currentZoom * 1.2 : currentZoom / 1.2;
    wavesurferRef.current.zoom(newZoom);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div ref={containerRef} />
      <div ref={timelineRef} className="mt-2" />
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={togglePlayPause}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <span className="text-sm text-gray-600">
            {formatTime(currentTime)}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleZoom('out')}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            Zoom Out
          </button>
          <button
            onClick={() => handleZoom('in')}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            Zoom In
          </button>
        </div>
      </div>
    </div>
  );
}