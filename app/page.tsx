'use client';
import { useRef, useState } from 'react';
import Modifier from '@/components/modifier';
import Sidenav from '@/components/sidenav';
import Topbar from '@/components/topbar';
import useWindowSize from '@/hooks/useWindowSize';
import {  FooterSection } from '@/components/FooterSection';
import VideoUploader from '@/components/videoUploader';
import MobileSidenav from '@/components/MobileSidenav';

export default function Home() {
  const { width } = useWindowSize();
  const [selectedNav, setSelectedNav] = useState('Preview');
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [size, setSize] = useState({ width: 150, height: 150 })
  const [dragging, setDragging] = useState(false)
  const [selectedText, setSelectedText] = useState<string | null>(null);
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
      {width !== undefined && width > 1024 && (
        <Sidenav onSelect={setSelectedNav}  selected={selectedNav}/>
      )}

      <div className="w-full lg:w-[94%] flex flex-col gap-1  h-full">
        <Topbar />
        {width !== undefined && width < 1024 && (
           <MobileSidenav onSelect={setSelectedNav}  selected={selectedNav}/>
        )}
        <div className="w-full flex flex-col h-full gap-1">
          <div className="w-full   h-full flex gap-1 flex-col lg:flex-row ">
            <div className="w-full lg:w-[20%] lg:h-full hide-scrollbar overflow-y-auto  bg-white h-full  lg:justify-start lg:items-start border  rounded-lg  overflow-hidden  ">
              <Modifier 
              selected={selectedNav}
                size={size}
                setSize={setSize}
                onSelectText={setSelectedText}
                
              />
            </div>
            <div className="w-full lg:w-[80%] h-full bg-white rounded-lg ">
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
              selectedText={selectedText}

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
