import React from 'react'
import { CircleAlert, Download, Hand, MousePointer2, Settings } from 'lucide-react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { Button } from './ui/button'
const Topbar = () => {
  return (
    <div className='w-full bg-white flex justify-between items-center p-[1%] rounded-lg'>
        <div className='flex  justify-center items-center gap-3'>
            <div className='w-[35px] h-[35px] flex  justify-center items-center bg-gray-200 rounded-sm '>
            <MousePointer2 />
            </div>
        <Hand />
        </div>
        <div className='flex  justify-center items-center gap-6'>

        <Button className='rounded-full'>
        <Download /> Export
        </Button>
        <Settings/>
        <CircleAlert />
       
        <Avatar className='w-10 h-10'>
      <AvatarImage  src="https://res.cloudinary.com/dequoncot/image/upload/v1740402935/Image_aqsk68.png" alt="img" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
        </div>

    </div>
  )
}

export default Topbar