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

const Sidenav: React.FC<SidenavProps> = ({ onSelect,selected }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <div className='w-[6%] bg-white rounded-lg flex flex-col justify-start items-center'>
      <div className='w-[80%] h-[65px] mx-auto'>
        <img src='/logo.png' className='w-full h-full object-cover' alt="Logo" />
      </div>
      <div className='bg-gray-200 w-[80%] mx-auto h-[1px] rounded-full' />
      <div className='w-full flex flex-col justify-start  items-center mt-4 gap-2'>
        {sidenavItems.map((item, index) => (
           <motion.div
           key={index}
           onClick={() => onSelect(item.label)}
           onMouseEnter={() => setHovered(item.label)}
           onMouseLeave={() => setHovered(null)}
           animate={{
             scale: hovered === item.label ? 1.2 : 1, 
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
            <h1 className='text-sm'>{item.label}</h1>
          </div>
</motion.div>
          
        ))}
      </div>
    </div>
  );
};

export default Sidenav;
