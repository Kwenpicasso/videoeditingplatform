'use client';
import { useState } from 'react';
import Modifier from '@/components/modifier';
import Sidenav from '@/components/sidenav';
import Topbar from '@/components/topbar';
import useWindowSize from '@/hooks/useWindowSize';

export default function Home() {
  const { width } = useWindowSize();
  const [selectedNav, setSelectedNav] = useState('Media');

  return (
    <div className="w-full bg-gray-300 h-[100dvh] flex gap-0.5">
      {width !== undefined && width > 1024 ? (
        <Sidenav onSelect={setSelectedNav}  selected={selectedNav}/>
      ) : (
        <div>dnd</div>
      )}

      <div className="w-[94%] flex flex-col">
        <Topbar />
        <div className="w-full flex flex-col h-full">
          <div className="w-full bg-purple-200 h-full flex">
            <div className="w-[20%] bg-blue-400">
              <Modifier selected={selectedNav} />
            </div>
            <div className="w-[60%] bg-red-400">fhhh</div>
            <div className="w-[20%] bg-blue-400">fhhh</div>
          </div>
          <div className="w-full h-[300px]">down</div>
        </div>
      </div>
    </div>
  );
}
