import React, { useState } from 'react';
import {
  ClipboardType,
  CloudUpload,
  Film,
  Image,
  Music,
  Sparkles,
  Type,
} from 'lucide-react';
import { motion } from "framer-motion";

interface NavItem {
    icon: React.ReactNode;
    label: string;
  }
  
  const sidenavItems: NavItem[] = [
    { icon: <Film />, label: 'Preview' },
    { icon: <Image />, label: 'Photo' },
    { icon: <Music />, label: 'Audio' },
    { icon: <Type />, label: 'Text' },
    { icon: <ClipboardType />, label: 'Subtitles' },
  ];
  
  interface SidenavProps {
    onSelect: (label: string) => void;
    selected: string
  }
  const MobileSidenav: React.FC<SidenavProps> = ({ onSelect,selected }) => {
    const [hovered, setHovered] = useState<string | null>(null);
  return (
    <div className=' w-[100%] mx-auto bg-white  flex justify-center items-center gap-2  rounded-lg text-xs py-1'>
            {sidenavItems.map((item, index) => (
           <motion.div
           key={index}
           onClick={() => onSelect(item.label)}
           onMouseEnter={() => setHovered(item.label)}
           onMouseLeave={() => setHovered(null)}
           animate={{
             scale: hovered === item.label ? 1.1 : 1, 
           }}
           transition={{
             type: "spring",
             stiffness: 300,
             damping: 20,
           }}
           className={`cursor-pointer rounded-md w-[80%] py-1 `}
         >
<div
            key={index}
            onClick={() => onSelect(item.label)}
            className={`cursor-pointer flex flex-col w-[100%]  p-2 mx-auto justify-center items-center text-blue-500 hover:bg-gray-100 rounded-lg ${item.label == selected ? 'bg-gray-100' : 'bg-transparent'}`}
          >
            {item.icon}
            <h1 >{item.label}</h1>
          </div>
</motion.div>
          
        ))}
    </div>
  )
}

export default MobileSidenav