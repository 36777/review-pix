'use client'
import { useState, useRef, useEffect } from 'react';
import { Play, Repeat } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Player() {
  const [isPaused, setIsPaused] = useState(true);
  const [isEnded, setIsEnded] = useState(false);
  const [hasWatched, setHasWatched] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();


  useEffect(() => {
    const watched = localStorage.getItem('hasWatched');
    if (watched === 'true') {
      setHasWatched(true);
      setIsEnded(true)
    }

  }, []);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPaused(false);
      } else {
        videoRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleEnded = () => {
    setIsEnded(true);
    setHasWatched(true);
    localStorage.setItem('hasWatched', 'true');
  };

  const handleContinue = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPaused(false);
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPaused(false);
    }
  };

  const handlePay = () => {
    router.push('/pay');
  };

  return (
    <>
      <div className="relative flex justify-center items-center m-4 md:mx-auto p-2 border border-black rounded-xl xl:w-[1100px] select-none aspect-video">
        <video
          ref={videoRef}
          className="w-fit md:w-full h-full select-none"
          onClick={handleVideoClick}
          onPause={handlePause}
          onEnded={handleEnded}
          disablePictureInPicture
          controlsList="nodownload noplaybackrate"
        >
          <source src="/vsl.mp4" type="video/mp4" />
          Seu navegador não suporta a tag de vídeo.
        </video>

        <div className="absolute inset-0 p-4 pointer-events-none">
          {/* Pause Overlay */}
          {isPaused && (
            <div className="absolute inset-0 flex justify-center items-center bg-[#8EBF40] bg-opacity-95 m-[5px] p-4 rounded pointer-events-auto">
              <div className="md:space-y-4 bg-transparent p-6 rounded-lg text-center text-white">
                <p className="md:font-bold text-[16px] md:text-3xl">Você já começou a assistir este vídeo</p>
                <div className="flex md:flex-row flex-col justify-center md:space-x-4 mx-auto w-fit text-xs md:text-xl">
                  <button
                    onClick={handleContinue}
                    className="flex justify-center items-center gap-2 bg-transparent px-4 py-2 rounded w-full text-white transition-transform duration-300 hover:scale-105"
                  >
                    <Play className="w-4 md:w-8 h-4 md:h-8" />
                    <span className="text-sm md:text-xl whitespace-nowrap">
                      Continuar assistindo?
                    </span>
                  </button>

                  <button
                    onClick={handleRestart}
                    className="flex justify-center items-center gap-2 bg-transparent px-4 py-2 rounded w-full text-white transition-transform duration-300 hover:scale-105"
                  >
                    <Repeat className="w-4 md:w-8 h-4 md:h-8" />
                    <span className="text-sm md:text-xl">
                      Assistir do início?
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {isEnded && (
        <div className="inset-0 flex justify-center items-center p-4 pointer-events-auto">
          <div className="bg-white p-6 rounded-lg text-center">
            <button
              onClick={handlePay}
              className="flex justify-center items-center gap-2 bg-primary px-14 py-3 rounded-full text-white md:text-2xl animate-pulse duration-1000 ease-in-out"
            >
              <p className="relative top-[2px] md:top-0 font-bold">
                LIBERAR ACESSO AGORA
              </p>
            </button>
          </div>
        </div>
      )}
    </>
  );
}