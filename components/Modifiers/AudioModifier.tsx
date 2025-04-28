import React, { useRef, useState, ChangeEvent } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from '../ui/input'
import { Plus, Search } from 'lucide-react'
import { Button } from '../ui/button'

const AudioModifier = () => {
  type Segment = {
    id: number
    muted: boolean
    audioFile?: File | null 
  }

  const initialSegments: Segment[] = [
    { id: 1, muted: false },
    { id: 2, muted: false },
    { id: 3, muted: false },
    { id: 4, muted: false },
  ]

  const [segments, setSegments] = useState<Segment[]>(initialSegments)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const toggleMute = (id: number) => {
    setSegments(prev =>
      prev.map(seg =>
        seg.id === id ? { ...seg, muted: !seg.muted } : seg
      )
    )
  }

  const moveSegment = (index: number, direction: 'left' | 'right') => {
    if ((direction === 'left' && index === 0) || (direction === 'right' && index === segments.length - 1)) return

    const newSegments = [...segments]
    const [movedSegment] = newSegments.splice(index, 1)
    newSegments.splice(direction === 'left' ? index - 1 : index + 1, 0, movedSegment)
    setSegments(newSegments)
  }

  const handleBackgroundMusicChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSegments(prevSegments => [
        ...prevSegments,
        {
          id: prevSegments.length + 1,
          muted: false,
        },
      ])
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className='w-full h-full'>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all" className='w-1/2 flex justify-center items-center'>All</TabsTrigger>
          <TabsTrigger value="music" className='w-1/2 flex justify-center items-center'>Music</TabsTrigger>

        </TabsList>

     <TabsContent  value="all">
     <div
 
  className="overflow-y-auto h-[500px] w-full hide-scrollbar  pb-6"
>

          <div className="w-full relative mb-4 ">
            <Input className='pl-7 outline-none text-sm' placeholder="Search..." />
            <Search className='absolute top-1/2 transform -translate-y-1/2 left-2 ' size={18} />
          </div>

          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            {/* Static Waveform */}
            <div className='w-full flex justify-center flex-col items-center flex-wrap gap-3'>
              {segments.map((seg, index) => (
                <div
                  key={seg.id}
                  className='w-full bg-muted text-black flex justify-between h-[40px] p-2'
                >
                  <span>#{seg.id} {seg.audioFile && `(Audio: ${seg.audioFile.name})`}</span>

                  <button
                    onClick={() => toggleMute(seg.id)}
                    style={{ marginTop: '4px', fontSize: '10px' }}
                  >
                    {seg.muted ? 'Unmute' : 'Mute'}
                  </button>

                  <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                    <button
                      onClick={() => moveSegment(index, 'left')}
                      disabled={index === 0}
                      style={{ fontSize: '10px' }}
                    >
                      ⬅️
                    </button>
                    <button
                      onClick={() => moveSegment(index, 'right')}
                      disabled={index === segments.length - 1}
                      style={{ fontSize: '10px' }}
                    >
                      ➡️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Background Music Upload */}
            <div style={{ marginBottom: '20px' }}>
              <input
                type="file"
                accept="audio/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleBackgroundMusicChange}
              />
              <Button
                type="button"
                onClick={handleButtonClick}
                className='bg-blue-400 text-white w-full hover:bg-blue-400 mt-3'
              >
                <Plus /> Upload Audio
              </Button>
            </div>
          </div>
        </div>
     </TabsContent>

        <TabsContent value="music">Music tab content</TabsContent>
        <TabsContent value="sound">Sound Effect tab content</TabsContent>
      </Tabs>
    </div>
  )
}

export default AudioModifier
