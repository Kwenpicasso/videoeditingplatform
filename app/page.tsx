'use client';
import { useRef, useState } from 'react';
import Modifier from '@/components/modifier';
import Sidenav from '@/components/sidenav';
import Topbar from '@/components/topbar';
import useWindowSize from '@/hooks/useWindowSize';
import {  FooterSection } from '@/components/FooterSection';
import VideoUploader from '@/components/videoUploader';

export default function Home() {
  const { width } = useWindowSize();
  const [selectedNav, setSelectedNav] = useState('Media');
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [size, setSize] = useState({ width: 150, height: 150 })
  const [dragging, setDragging] = useState(false)
  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true)
  }
  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragging && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left - size.width / 2
      const y = e.clientY - rect.top - size.height / 2
      setPosition({
        x: Math.max(0, Math.min(x, rect.width - size.width)),
        y: Math.max(0, Math.min(y, rect.height - size.height)),
      })
    }
  }
  const containerRef = useRef<HTMLDivElement>(null); 
  const handleDragEnd = () => {
    setDragging(false)
  }
  return (
    <div className="w-full bg-gray-300 h-[100dvh] flex gap-0.5 p-1.5">
      {width !== undefined && width > 1024 ? (
        <Sidenav onSelect={setSelectedNav}  selected={selectedNav}/>
      ) : (
        <div className='absolute w-[98%] right-0 left-0 mx-auto bg-red-100 bottom-2 h-[60px] rounded-full '>dnd</div>
      )}

      <div className="w-full lg:w-[94%] flex flex-col gap-1">
        <Topbar />
        <div className="w-full flex flex-col h-full gap-1">
          <div className="w-full h-[65dvh] flex gap-1">
            <div className="w-[20%] bg-white border  rounded-lg  overflow-hidden  ">
              <Modifier 
              selected={selectedNav}
                size={size}
                setSize={setSize}
               
                
              />
            </div>
            <div className="w-[80%] bg-white rounded-lg ">
              <VideoUploader 
              position={position}
              setPosition={setPosition}
              size={size}
              setSize={setSize}
              dragging={dragging}
              handleDragStart={handleDragStart}
              handleDrag={handleDrag}
              handleDragEnd={handleDragEnd}
              containerRef={containerRef}

              />
            </div>
           
          </div>
          <div className="w-full h-[35dvh] rounded-lg bg-white lg:flex hidden">
            <FooterSection/>
          </div>
        </div>
      </div>
    </div>
  );
}
