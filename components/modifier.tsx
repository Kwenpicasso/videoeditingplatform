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
}


const Modifier: React.FC<ModifierProps> = ({
  selected,
  size,
  setSize

}) => {
  const renderComponent = () => {
    switch (selected) {
      case 'Media':
        return <MediaModifier />;
      case 'Video':
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
        return <TextModifier />;
      case 'Subtitles':
        return <SubTitleModifier />;
      case 'Effect':
        return <EffectModifier />;
      default:
        return <div className="text-white">Please select an item from the sidebar.</div>;
    }
  };

  return <div className="p-2 h-full flex justify-center items-center  text-center flex-col w-full">{renderComponent()}</div>;
};

export default Modifier;
