'use client'

import React, { useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { setOverlayImage } from '@/app/store/videoSlice'
import { RootState } from '@/app/store'
import { Card } from '../ui/card'

type Size = {
  width: number
  height: number
}


type PhotoModifierProps = {
  size: Size
  setSize: React.Dispatch<React.SetStateAction<Size>>
}

const PhotoModifier: React.FC<PhotoModifierProps> = ({
  size,
  setSize,
}) => {
  const { fileUrl } = useSelector((state: RootState) => state.video);
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const imgDataUrl = reader.result as string
        dispatch(setOverlayImage(imgDataUrl))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }


  const handleResize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSize(prev => ({
      ...prev,
      [name]: Number(value),
    }))
  }

  return (
  <div className='w-full '>
  {fileUrl ? (
  <div className="space-y-4 w-full overflow-y-scroll h-[500px] hide-scrollbar">
  <h2 className="text-lg font-bold">Image Overlay Modifier</h2>

  <input
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    ref={fileInputRef}
    className="hidden"
  />

  <Button onClick={handleButtonClick} className="bg-blue-400 hover:bg-blue-400 w-full text-white">
    Upload Image
  </Button>

  <div className="flex gap-4">
    <Input
      type="number"
      name="width"
      value={size.width}
      onChange={handleResize}
      placeholder="Width"
      className="w-1/2"
    />
    <Input
      type="number"
      name="height"
      value={size.height}
      onChange={handleResize}
      placeholder="Height"
      className="w-1/2"
    />
  </div>

 
</div>
  ) : (
    <div className='w-full  h-full flex justify-center items-center  text-center flex-col'>
      <Card className='w-full flex justify-center items-center  text-center'>

No video found in the timeline, please add one first.🙄🙄🙄
      
    </Card>
    </div>
  )}
  </div>
  )
}

export default PhotoModifier
