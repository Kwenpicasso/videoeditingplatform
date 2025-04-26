'use client';

import { RootState } from '@/app/store';
import { setScenes } from '@/app/store/videoSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { DndContext, closestCenter, useDraggable, DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { v4 as uuidv4 } from 'uuid'; // install uuid package

export default function Timeline() {
  const scenes = useSelector((state: RootState) => state.video.scenes);
  const fileUrl = useSelector((state: RootState) => state.video.fileUrl);
  const dispatch = useDispatch();

  // Preload dummy scenes if empty
  useEffect(() => {
    if (scenes.length === 0) {
      dispatch(setScenes([
        { id: uuidv4(), thumbnail: 'https://via.placeholder.com/150?text=Scene+1' },
        { id: uuidv4(), thumbnail: 'https://via.placeholder.com/150?text=Scene+2' },
        { id: uuidv4(), thumbnail: 'https://via.placeholder.com/150?text=Scene+3' },
      ]));
    }
  }, [dispatch, scenes.length]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = scenes.findIndex((scene) => scene.id === active.id);
      const newIndex = scenes.findIndex((scene) => scene.id === over?.id);
      const newScenes = arrayMove(scenes, oldIndex, newIndex);
      dispatch(setScenes(newScenes));
    }
  }

  function handleAddScene() {
    const newScene = {
      id: uuidv4(),
      thumbnail: `https://via.placeholder.com/150?text=Scene+${scenes.length + 1}`,
    };
    dispatch(setScenes([...scenes, newScene]));
  }

  return (
    <div className="w-full p-4  rounded-md space-y-4">
      <div className="w-full overflow-x-auto flex items-center gap-2">
      {fileUrl ? (
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          {scenes.map((scene) => (
            <SceneBlock key={scene.id} id={scene.id} thumbnail={scene.thumbnail} />
          ))}
        </DndContext>
      ) : (
       <div className="w-full flex flex-col justify-center items-center gap-2">
         <div className='w-full bg-gray-300 h-[50px] rounded-lg'>
        </div>
        <div className='w-full bg-gray-300 h-[50px] rounded-lg'>
        </div>
       </div>
      )}
      </div>
    </div>
  );
}

function SceneBlock({ id, thumbnail }: { id: string; thumbnail: string }) {
  const { setNodeRef, attributes, listeners, transform, isDragging } = useDraggable({ id });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={`w-32 h-20 flex-shrink-0 border rounded-md overflow-hidden bg-white shadow ${isDragging ? 'opacity-50' : ''}`}
    >
      <img src={thumbnail} alt="Scene" className="object-cover w-full h-full" />
    </div>
  );
}
