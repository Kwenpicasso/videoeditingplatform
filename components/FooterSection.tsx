"use client";

import React from "react";
import { Dock, DockIcon } from "./ui/dock";
import { ChevronRight, Crop, ListVideo, RefreshCcw, Scissors, Trash, Volume2 ,Play, SkipForward, SkipBack, Plus} from "lucide-react";
import { Button } from "./ui/button";
import Timeline from "./Timeline";




export type IconProps = React.HTMLAttributes<SVGElement>;

export function FooterSection() {
  return (
 <div className="w-full">
     <div className="relative w-full  flex justify-between items-center px-4 ">
      <Dock iconMagnification={60} iconDistance={100}>
        <DockIcon className="bg-black/10 dark:bg-white/10">
        <Scissors  />
        </DockIcon>
        <DockIcon className="bg-black/10 dark:bg-white/10">
        <Trash />
        </DockIcon>
        <DockIcon className="bg-black/10 dark:bg-white/10">
        <ChevronRight />
        </DockIcon>
        <DockIcon className="bg-black/10 dark:bg-white/10">
        <ListVideo />
        </DockIcon>
        <DockIcon className="bg-black/10 dark:bg-white/10">
        <Volume2 />
        </DockIcon>
        <DockIcon className="bg-black/10 dark:bg-white/10">
        <Crop />
        </DockIcon>
        <DockIcon className="bg-black/10 dark:bg-white/10">
        <RefreshCcw />
        </DockIcon>
        
      </Dock>
      <Dock iconMagnification={60} iconDistance={50}>
        <DockIcon className="bg-black/10 dark:bg-white/10">
        <SkipBack fill='black'/>
        </DockIcon>
        <DockIcon className="bg-black/10 dark:bg-white/10">
        <Play fill='black'/>
        </DockIcon>
        <DockIcon className="bg-black/10 dark:bg-white/10">
        <SkipForward fill='black' />
        </DockIcon>
       <h1 className="text-sm">00:00:00 | 02:03:27</h1>
        
      </Dock>
      <Button className='rounded-full bg-blue-500'>
      <Plus /> Add scene
        </Button>


      
    </div>
      {/* scene section */}
      <div className="w-full ">
      <Timeline />
    
    </div>
 </div>
  );
}


