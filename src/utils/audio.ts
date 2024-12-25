export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export function validateAudioFile(file: File): boolean {
  const validTypes = ['audio/wav', 'audio/mp3', 'audio/mpeg']
  return validTypes.includes(file.type)
}

export function calculateAudioDuration(buffer: AudioBuffer): number {
  return buffer.duration
}