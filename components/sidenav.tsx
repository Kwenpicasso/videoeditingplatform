import React from 'react';
import {
  ClipboardType,
  CloudUpload,
  Film,
  Image,
  Music,
  Sparkles,
  Type,
} from 'lucide-react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
}

const sidenavItems: NavItem[] = [
  { icon: <CloudUpload />, label: 'Media' },
  { icon: <Film />, label: 'Video' },
  { icon: <Image />, label: 'Photo' },
  { icon: <Music />, label: 'Audio' },
  { icon: <Type />, label: 'Text' },
  { icon: <ClipboardType />, label: 'Subtitles' },
  { icon: <Sparkles />, label: 'Effect' },
];

interface SidenavProps {
  onSelect: (label: string) => void;
  selected: string
}

const Sidenav: React.FC<SidenavProps> = ({ onSelect,selected }) => {
  return (
    <div className='w-[6%] bg-white rounded-lg flex flex-col justify-start items-center'>
      <div className='w-[80%] h-[65px] mx-auto'>
        <img src='/logo.png' className='w-full h-full object-cover' alt="Logo" />
      </div>
      <div className='bg-gray-200 w-[80%] mx-auto h-[1px] rounded-full' />
      <div className='w-full flex flex-col justify-start items-center mt-4 gap-2'>
        {sidenavItems.map((item, index) => (
          <div
            key={index}
            onClick={() => onSelect(item.label)}
            className={`cursor-pointer flex flex-col w-[90%] p-2 mx-auto justify-center items-center hover:bg-gray-100 rounded-lg ${item.label == selected ? 'bg-gray-100' : 'bg-transparent'}`}
          >
            {item.icon}
            <h1 className='text-sm'>{item.label}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidenav;
