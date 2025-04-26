'use client';

import { RootState } from '@/app/store';
import { setScenes, setThumbnail, setVideoFile } from '@/app/store/videoSlice';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import Cloud from '../public/cloud.png';
import Drop from '../public/download.png';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

export default function VideoUploader() {
  const dispatch = useDispatch();
  const fileUrl = useSelector((state: RootState) => state.video.fileUrl);
  const thumbnail = useSelector((state: RootState) => state.video.thumbnail);
  
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setLoading(true);
      const url = URL.createObjectURL(file);
      dispatch(setVideoFile({ url, name: file.name }));
  
      const video = document.createElement('video');
      video.src = url;
      video.crossOrigin = 'anonymous';
  
      video.addEventListener('loadedmetadata', () => {
        const duration = video.duration; // get video length
        const captureTimes = [0, duration * 0.25, duration * 0.5, duration * 0.75]; // 4 thumbnails: start, 25%, 50%, 75%
  
        const scenesPromises = captureTimes.map((time) => {
          return new Promise<string>((resolve) => {
            video.currentTime = time;
            video.addEventListener(
              'seeked',
              () => {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                  const dataUrl = canvas.toDataURL('image/jpeg');
                  resolve(dataUrl);
                }
              },
              { once: true } // only trigger once
            );
          });
        });
  
        Promise.all(scenesPromises).then((thumbnails) => {
          const sceneObjects = thumbnails.map((thumb) => ({
            id: uuidv4(),
            thumbnail: thumb,
          }));
          dispatch(setScenes(sceneObjects));
          setLoading(false);
        });
      });
    }
  }, [dispatch]);
  

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setLoading(false); 
            return 100;
          }
          return prev + 5; 
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [loading]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {/* Progress bar */}
      {loading && (
        <div className="w-1/2 h-2 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-100"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {/* Show uploader if there's no fileUrl and not loading */}
      {!fileUrl && !loading && (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <div className="w-full flex flex-col justify-center items-center gap-1">
              <h1>Drop the video file here to upload</h1>
              <Image src={Drop} alt="cloud" width={70} height={70} className="mx-auto" />
            </div>
          ) : (
            <div className="w-full flex flex-col justify-center items-center gap-1 cursor-pointer">
              <Image src={Cloud} alt="cloud" width={70} height={70} className="mx-auto" />
              <h1 className="underline font-semibold">Click to Upload</h1>
              <h1 className="text-gray-500">or drag and drop files here</h1>
            </div>
          )}
        </div>
      )}

      {/* Show video if uploaded and loading is done */}
      {fileUrl && !loading && (
        <div className="w-full h-full flex justify-center items-center p-2">
          <video
            src={fileUrl}
            controls
            poster={thumbnail || undefined}
            className="w-full  rounded-xl object-contain"
            style={{ height: '100%', width: '100%' }}
          />
        </div>
      )}
    </div>
  );
}
