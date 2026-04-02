import MidiWriter from 'midi-writer-js'

interface ArrangementSection {
  name: string
  bars: number
  energy: number
  elements?: string
  notes?: string
}

// Maps section names to MIDI pitches so each section type is visually distinct in the piano roll
const SECTION_PITCHES: Record<string, string> = {
  'intro': 'C3',
  'build': 'D3',
  'build 1': 'D3',
  'build 2': 'E3',
  'drop': 'F3',
  'drop 1': 'F3',
  'drop 2': 'G3',
  'breakdown': 'A3',
  'breakdown 1': 'A3',
  'breakdown 2': 'B3',
  'bridge': 'A3',
  'outro': 'C4',
  'verse': 'D3',
  'chorus': 'F3',
  'pre-chorus': 'E3',
}

function getPitch(sectionName: string): string {
  const lower = sectionName.toLowerCase().trim()
  // Try exact match first
  if (SECTION_PITCHES[lower]) return SECTION_PITCHES[lower]
  // Try partial match
  for (const [key, pitch] of Object.entries(SECTION_PITCHES)) {
    if (lower.includes(key)) return pitch
  }
  // Default
  return 'C3'
}

/**
 * Generates a MIDI file from arrangement sections.
 * Each section becomes a note at a unique pitch, with length = bar count.
 * Returns a Blob ready for download.
 */
export function generateArrangementMidi(
  sections: ArrangementSection[],
  bpm = 128
): Blob {
  const track = new MidiWriter.Track()
  track.setTempo(bpm)
  track.addTrackName('Arrangement Map')

  let currentTick = 0

  for (const section of sections) {
    const pitch = getPitch(section.name)
    // Duration in whole notes (1 bar = 1 whole note in 4/4)
    // midi-writer-js uses 'T' prefix for tick values. 1 bar = 512 ticks (128 per beat × 4 beats)
    const ticks = section.bars * 512

    const note = new MidiWriter.NoteEvent({
      pitch: [pitch],
      duration: `T${ticks}`,
      startTick: currentTick,
      velocity: Math.min(100, Math.max(40, section.energy * 10)),
    })

    track.addEvent(note)
    currentTick += ticks
  }

  const writer = new MidiWriter.Writer([track])
  const dataUri = writer.dataUri()

  // Convert data URI to Blob
  const byteString = atob(dataUri.split(',')[1])
  const arrayBuffer = new ArrayBuffer(byteString.length)
  const uint8Array = new Uint8Array(arrayBuffer)
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i)
  }

  return new Blob([uint8Array], { type: 'audio/midi' })
}

/**
 * Triggers a browser download of the arrangement MIDI file.
 */
export function downloadArrangementMidi(
  sections: ArrangementSection[],
  bpm = 128,
  filename = 'arrangement-map.mid'
) {
  const blob = generateArrangementMidi(sections, bpm)
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
