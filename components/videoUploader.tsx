'use client';

import { RootState } from '@/app/store';
import { setScenes, setVideoFile } from '@/app/store/videoSlice';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import Cloud from '../public/cloud.png';
import Drop from '../public/download.png';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { cn } from '@/lib/utils';

interface Size {
  width: number;
  height: number;
}

interface Position {
  x: number;
  y: number;
}

interface VideoUploaderProps {
  size: Size;
  setSize: (size: Size) => void;
  position: Position;
  setPosition: (position: Position) => void;
  dragging: boolean;
  handleDragStart: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleDrag: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleDragEnd: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>; 
  selectedText: string  | null
}

export default function VideoUploader({
  size,
  position,
  dragging,
  handleDragStart,
  handleDrag,
  handleDragEnd,
  containerRef,
  selectedText
}: VideoUploaderProps) {
  const dispatch = useDispatch();
  const { fileUrl, thumbnail, overlayImage } = useSelector((state: RootState) => state.video);
  const [inputPosition, setInputPosition] = useState<Position>({ x: 50, y: 50 });
const [draggingInput, setDraggingInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [inputSubmitted, setInputSubmitted] = useState(false);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const handleInputDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    setDraggingInput(true);
    e.stopPropagation();
  };
  
  const handleInputDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!draggingInput) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
  
    const newX = e.clientX - rect.left;
    const newY = e.clientY - rect.top;
    setInputPosition({ x: newX, y: newY });
  };
  
  const handleInputDragEnd = () => {
    setDraggingInput(false);
  };
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }

      const url = URL.createObjectURL(file);
      setCurrentUrl(url);
      setLoading(true);
      setProgress(0);
      dispatch(setVideoFile({ url, name: file.name }));

      const video = document.createElement('video');
      video.src = url;
      video.crossOrigin = 'anonymous';

      video.addEventListener('loadedmetadata', async () => {
        const duration = video.duration;
        const captureTimes = [0, duration * 0.25, duration * 0.5, duration * 0.75];
      
        const thumbnails: string[] = [];
      
        for (let i = 0; i < captureTimes.length; i++) {
          const time = captureTimes[i];
      
          await new Promise<void>((resolve) => {
            const seekHandler = () => {
              const canvas = document.createElement('canvas');
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const dataUrl = canvas.toDataURL('image/jpeg');
                thumbnails.push(dataUrl);
                setProgress(((i + 1) / captureTimes.length) * 100);
              }
              video.removeEventListener('seeked', seekHandler);
              resolve();
            };
      
            video.addEventListener('seeked', seekHandler);
            video.currentTime = time;
          });
        }
      
        const sceneObjects = thumbnails.map((thumb) => ({
          id: uuidv4(),
          thumbnail: thumb,
        }));
      
        dispatch(setScenes(sceneObjects));
        setLoading(false);
      });
      
    }
  }, [dispatch, currentUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    return () => {
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }
    };
  }, [currentUrl]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {/* Progress bar */}
      {loading && (
        <div className="w-1/2 h-2 bg-gray-300 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {/* Uploader */}
      {!fileUrl && !loading && (
        <div {...getRootProps()} className="w-full flex flex-col justify-center items-center gap-1 cursor-pointer">
          <input {...getInputProps()} />
          {isDragActive ? (
            <>
              <h1>Drop the video file here to upload</h1>
              <Image src={Drop} alt="drop" width={70} height={70} className="mx-auto" />
            </>
          ) : (
            <>
              <Image src={Cloud} alt="cloud" width={70} height={70} className="mx-auto" />
              <h1 className="underline font-semibold">Click to Upload</h1>
              <h1 className="text-gray-500">or drag and drop files here</h1>
            </>
          )}
        </div>
      )}

      {/* Video Player */}
      {fileUrl && !loading && (
        <div  
        ref={containerRef}
  onMouseMove={(e) => {
    handleDrag(e);
    handleInputDrag(e);
  }}
  onMouseUp={() => {
    handleDragEnd();
    handleInputDragEnd();
  }}
  onMouseLeave={() => {
    handleDragEnd();
    handleInputDragEnd();
  }} className="relative w-full h-full flex justify-center items-center p-2">
          <video
            src={fileUrl}
            controls
            poster={thumbnail || undefined}
            className="w-full rounded-xl object-contain"
            style={{ height: '100%', width: '100%' }}
          />
          {selectedText && (
  <div
    className="absolute z-20 cursor-move"
    onMouseDown={handleInputDragStart}
    style={{
      top: inputPosition.y,
      left: inputPosition.x,
      position: 'absolute',
    }}
  >
    <input
  type="text"
  defaultValue={selectedText}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      setInputSubmitted(true);
    }
  }}
  className={cn(
    "p-1 rounded text-white",
    inputSubmitted ? "border-transparent" : "border border-gray-400"
  )}
/>

  </div>
)}

          {/* Draggable Overlay */}
          {overlayImage && (
            <div
              className={cn(
                "absolute cursor-move transition-all border border-blue-400",
                dragging && "opacity-80"
              )}
              onMouseDown={handleDragStart}
              style={{
                top: position.y,
                left: position.x,
                width: size.width,
                height: size.height,
                backgroundImage: `url(${overlayImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '8px',
                opacity: 0.9,
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
