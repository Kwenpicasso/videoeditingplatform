// components/TextModifier.tsx
import React from 'react';
import { Card } from '../ui/card';

const textOptions = [
  'Headline Title',
  'Regular Title',
  'Body Text',
  'Digital',
  'GAME OVER',
  'WARNING',
];

const TextModifier = ({ onSelectText }: { onSelectText: (text: string) => void }) => {
  return (
    <div className='w-full flex flex-col justify-center items-center gap-2 font-medium italic'>
      {textOptions.slice(0, 3).map((text) => (
        <Card
          key={text}
          onClick={() => onSelectText(text)}
          className='w-full rounded-sm h-[25px] flex justify-center items-center text-sm cursor-pointer'
        >
          {text}
        </Card>
      ))}
      <div className="w-full flex gap-2 flex-wrap justify-start items-center font-semibold">
        {textOptions.slice(3).map((text) => (
          <Card
            key={text}
            onClick={() => onSelectText(text)}
            className='w-[48%] rounded-sm flex justify-center items-center text-sm cursor-pointer'
          >
            {text}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TextModifier;
