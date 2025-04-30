import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Subtitle = {
  id: number
  text: string
  startTime: string
  endTime: string
  font: string
  size: number
  color: string
  position: 'top' | 'center' | 'bottom'
}

const defaultSubtitle: Subtitle = {
  id: 0,
  text: '',
  startTime: '',
  endTime: '',
  font: 'Arial',
  size: 16,
  color: '#000000',
  position: 'bottom',
}

const SubTitleModifier = () => {
  const [subtitles, setSubtitles] = useState<Subtitle[]>([])
  const [currentSubtitle, setCurrentSubtitle] = useState<Subtitle>({ ...defaultSubtitle })
  console.log(subtitles)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCurrentSubtitle(prev => ({
      ...prev,
      [name]: name === 'size' ? Number(value) : value,
    }))
  }

  const handleFontChange = (value: string) => {
    setCurrentSubtitle(prev => ({
      ...prev,
      font: value,
    }))
  }

  const handlePositionChange = (value: 'top' | 'center' | 'bottom') => {
    setCurrentSubtitle(prev => ({
      ...prev,
      position: value,
    }))
  }

  const addSubtitle = () => {
    setSubtitles(prev => [
      ...prev,
      { ...currentSubtitle, id: Date.now() },
    ])
    setCurrentSubtitle({ ...defaultSubtitle })
  }

  return (
    <div className="p-2 space-y-4 w-full overflow-y-scroll h-[500px]  hide-scrollbar">
      <h2 className="text-lg font-semibold">Add Subtitle</h2>

      <Input
        name="text"
        value={currentSubtitle.text}
        onChange={handleChange}
        placeholder="Subtitle text"
      />

      <div className="flex gap-2">
        <Input
          name="startTime"
          value={currentSubtitle.startTime}
          onChange={handleChange}
          placeholder="Start time"
          type="text"
        />
        <Input
          name="endTime"
          value={currentSubtitle.endTime}
          onChange={handleChange}
          placeholder="End time"
          type="text"
        />
      </div>

      <div className="flex flex-col gap-2">
        {/* Font Picker */}
        <Select value={currentSubtitle.font} onValueChange={handleFontChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a font" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Arial">Arial</SelectItem>
              <SelectItem value="Verdana">Verdana</SelectItem>
              <SelectItem value="Courier New">Courier New</SelectItem>
              <SelectItem value="Times New Roman">Times New Roman</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Font Size */}
        <Input
          name="size"
          value={currentSubtitle.size}
          onChange={handleChange}
          type="number"
          placeholder="Font Size"
        />

        {/* Color Picker */}
        <Input
          name="color"
          value={currentSubtitle.color}
          onChange={handleChange}
          type="color"
        />

        {/* Position Picker */}
        <Select value={currentSubtitle.position} onValueChange={handlePositionChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select position" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="top">Top</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="bottom">Bottom</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={addSubtitle} className="bg-blue-400 hover:bg-blue-400 w-full text-white">
        Add Subtitle
      </Button>

     {subtitles.length > 0 && (
       <div className="mt-6 space-y-2">
       <h3 className="font-semibold">Subtitle Blocks:</h3>
       {subtitles.map(sub => (
         <div
           key={sub.id}
           className="p-2 border rounded shadow-sm"
           style={{
             fontFamily: sub.font,
             fontSize: `${sub.size}px`,
             color: sub.color,
             textAlign: 'center',
           }}
         >
           <div>Text: {sub.text}</div>
           <div>Timing: {sub.startTime} - {sub.endTime}</div>
           <div>Position: {sub.position}</div>
         </div>
       ))}
     </div>
     )}
    </div>
  )
}

export default SubTitleModifier
