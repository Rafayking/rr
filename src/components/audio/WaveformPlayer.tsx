import { useEffect, useRef } from 'react'
import WaveSurfer from 'wavesurfer.js'
import { formatTime } from '../../utils/audio'

interface WaveformPlayerProps {
  url: string
  onTimeUpdate?: (time: number) => void
}

export function WaveformPlayer({ url, onTimeUpdate }: WaveformPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wavesurferRef = useRef<WaveSurfer | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const wavesurfer = WaveSurfer.create({
      container: containerRef.current,
      waveColor: '#4f46e5',
      progressColor: '#818cf8',
      cursorColor: '#312e81',
      height: 100,
    })

    wavesurfer.load(url)
    wavesurferRef.current = wavesurfer

    wavesurfer.on('timeupdate', (time) => {
      onTimeUpdate?.(time)
    })

    return () => {
      wavesurfer.destroy()
    }
  }, [url])

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div ref={containerRef} />
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={() => wavesurferRef.current?.playPause()}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Play/Pause
        </button>
      </div>
    </div>
  )
}