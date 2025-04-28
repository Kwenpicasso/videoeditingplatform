import React from 'react'
import { Card } from '../ui/card'

const TextModifier = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center gap-2 font-medium italic'>
      <Card className='w-full rounded-sm h-[25px] flex justify-center items-center text-sm'>
     Headline Title
      </Card>
      <Card className='w-full rounded-sm h-[25px] flex justify-center items-center text-sm'>
     Regular Title
      </Card>
      <Card className='w-full rounded-sm h-[25px] flex justify-center items-center text-sm'>
     Body Text
      </Card>
      <div className="w-full flex gap-2 flex-wrap  justify-start items-center font-semibold">
      <Card className='w-[48%] rounded-sm  flex justify-center items-center text-sm text-yellow-300'>
     Digital
      </Card>
      <Card className='w-[48%] rounded-sm  flex justify-center items-center text-sm text-pink-400'>
     GAME OVER
      </Card>
      <Card className='w-[48%] rounded-sm  flex justify-center items-center text-sm text-orange-400'>
    WARNING
      </Card>
      
      </div>
    </div>
  )
}

export default TextModifier