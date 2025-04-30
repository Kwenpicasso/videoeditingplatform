import { Download, Loader2,  X } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { Card } from '../ui/card';

const VideoModifier = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isRendering, setIsRendering] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { fileUrl} = useSelector((state: RootState) => state.video);
  const handleRender = () => {
    setIsRendering(true);
    setRendered(false);
    setTimeout(() => {
      setIsRendering(false);
      setRendered(true);
    }, 3000);
  };

  const handleDownload = () => {
    alert('Simulating download of rendered video...');
  };

  const openModal = () => {
    setShowModal(true);
    setTimeout(() => {
      videoRef.current?.play(); 
    }, 0);
  };

  const closeModal = () => {
    videoRef.current?.pause(); 
    setShowModal(false);
  };

  return (
   <>
   {fileUrl ? (
    <div className="w-full mx-auto  space-y-4">
    <h2 className="text-xl font-bold">Video Preview</h2>

    <div className=" w-full flex flex-col justify-center items-center space-y-2">
      <Button
        onClick={openModal}
        className=" py-2 bg-blue-400 hover:bg-blue-400 text-white rounded w-full"
      >
        Preview
      </Button>

      <Button
        onClick={handleRender}
        disabled={isRendering}
        className={` py-2 rounded text-white w-full hover:bg-blue-400 ${
          isRendering ? 'bg-blue-400' : 'bg-blue-400'
        }`}
      >
        {isRendering ? 
        (
          <Loader2 className="animate-spin w-4 h-4" size={20}/>
        ) : (
          'Render'
        )}
      </Button>

      <Button
        onClick={handleDownload}
        disabled={!rendered}
        className={` py-2 rounded text-white w-full hover:bg-blue-400 ${
          rendered ? 'bg-blue-400' : 'bg-blue-500'
        }`}
      >
       <Download /> Download
      </Button>
    </div>

    {isRendering && <p className="text-sm text-gray-500">Rendering in progress...🫣🫣🫣</p>}
    {rendered && <p className="text-sm text-green-600">Render complete! Ready to download.😁😁😁</p>}

    {/* Modal */}
    {showModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
        <div className="bg-white rounded-lg shadow-lg p-8 relative  w-[90%] lg:max-w-3xl">
          <button
            onClick={closeModal}
            className="absolute top-1 right-1 p-1 text-white w-[25px] h-[25px] rounded-full bg-blue-400 flex justify-center items-center"
          >
          <X/>
          </button>

          <video
            ref={videoRef}
            controls
            className="w-full rounded"
            src={fileUrl ?? undefined}
          />
        </div>
      </div>
    )}
  </div>
   ) : (
    <div className='w-full  h-full flex justify-center items-center  text-center flex-col'>
      <Card className='w-full flex justify-center items-center  text-center'>

No video found in the timeline, please add one first.🙄🙄🙄
      
    </Card>
    </div>
   )}
   </>
  );
};

export default VideoModifier;
