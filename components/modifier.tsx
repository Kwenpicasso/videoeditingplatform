import React, { Dispatch, SetStateAction } from 'react';
import MediaModifier from './Modifiers/MediaModifier';
import VideoModifier from './Modifiers/VideoModifier';
import PhotoModifier from './Modifiers/PhotoModifier';
import AudioModifier from './Modifiers/AudioModifier';
import TextModifier from './Modifiers/TextModifier';
import SubTitleModifier from './Modifiers/SubTitleModifier';
import EffectModifier from './Modifiers/EffectModifier';

interface Size {
  width: number;
  height: number;
}

interface ModifierProps {
  selected: string;
  size: Size;
  setSize: Dispatch<SetStateAction<Size>>;
  onSelectText: (text: string) => void 
}


const Modifier: React.FC<ModifierProps> = ({
  selected,
  size,
  setSize,
  onSelectText

}) => {
  const renderComponent = () => {
    switch (selected) {
      case 'Preview':
        return <VideoModifier />;
      case 'Photo':
        return (
          <PhotoModifier
          size={size}
          setSize={setSize}
        />
        
        );
      case 'Audio':
        return <AudioModifier />;
      case 'Text':
        return <TextModifier
        onSelectText={onSelectText}
        />;
      case 'Subtitles':
        return <SubTitleModifier />;
      default:
        return <div className="text-white">Please select an item from the sidebar.</div>;
    }
  };

  return <div className={`p-2  flex ${selected == 'Subtitles' && 'justify-start items-start'} ${selected == 'Photo' && 'justify-center items-center'}   text-center flex-col w-full`}>{renderComponent()}</div>;
};

export default Modifier;
