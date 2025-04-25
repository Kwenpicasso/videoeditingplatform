import React from 'react';
import MediaModifier from './Modifiers/MediaModifier';
import VideoModifier from './Modifiers/VideoModifier';
import PhotoModifier from './Modifiers/PhotoModifier';
import AudioModifier from './Modifiers/AudioModifier';
import TextModifier from './Modifiers/TextModifier';
import SubTitleModifier from './Modifiers/SubTitleModifier';
import EffectModifier from './Modifiers/EffectModifier';


interface ModifierProps {
  selected: string;
}

const Modifier: React.FC<ModifierProps> = ({ selected }) => {
  const renderComponent = () => {
    switch (selected) {
      case 'Media':
        return <MediaModifier />;
      case 'Video':
        return <VideoModifier />;
      case 'Photo':
        return <PhotoModifier/>;
      case 'Audio':
        return <AudioModifier/>;
      case 'Text':
        return <TextModifier/>
      case 'Subtitles':
        return <SubTitleModifier/>
      case 'Effect':
        return <EffectModifier/>
      
      default:
        return <div className="text-white">Please select an item from the sidebar.</div>;
    }
  };

  return <div className="p-4">{renderComponent()}</div>;
};

export default Modifier;
