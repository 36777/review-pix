'use client'
import { useState, useRef, useEffect } from 'react';
import { Play, Repeat } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Player({
  src,
  link,
  btnLabel,
  btnIcon,
  moldura,
  btnW,
  showBtn,
  store
}: {
  src: string;
  link: string;
  btnLabel: string;
  btnIcon?: string;
  moldura?: boolean;
  btnW: string;
  showBtn: string;
  store: string;
}) {
  const [isPaused, setIsPaused] = useState(true);
  const [showButtons, setShowButtons] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  // Convert timestamp string (MM:SS) to seconds
  const getTimeInSeconds = (timestamp: string) => {
    const [minutes, seconds] = timestamp.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  useEffect(() => {
    const started = localStorage.getItem(`hasStarted_${store}`);
    if (started === 'true') {
      setHasStarted(true);
    }

    const buttonsShown = localStorage.getItem(`buttonsShown_${store}`);
    if (buttonsShown === 'true') {
      setShowButtons(true);
    }
  }, [store]);

  // Check video time against showBtn timestamp
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = Math.floor(videoRef.current.currentTime);
      const targetTime = getTimeInSeconds(showBtn);
      const buttonsShown = localStorage.getItem(`buttonsShown_${store}`);

      if (currentTime >= targetTime && !buttonsShown) {
        setShowButtons(true);
        localStorage.setItem(`buttonsShown_${store}`, 'true');
      }
    }
  };

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

  const handlePlay = () => {
    setIsPaused(false);
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
    router.push(link);
  };

  return (
    <>
      <div className={`${moldura ? 'border border-black' : ''} relative flex justify-center items-center m-4 md:mx-auto p-2 rounded-xl xl:w-[1100px] select-none aspect-video`}>
        <video
          ref={videoRef}
          className="w-full h-full select-none object-cover"
          onClick={handleVideoClick}
          onPause={handlePause}
          onPlay={handlePlay}
          onTimeUpdate={handleTimeUpdate}
          disablePictureInPicture
          controlsList="nodownload noplaybackrate"
        >
          <source src={src} type="video/mp4" />
          Seu navegador não suporta a tag de vídeo.
        </video>

        <div className="absolute inset-0 p-4 pointer-events-none">
          {isPaused && (
            <div className="absolute inset-0 flex justify-center items-center bg-[#8EBF40] bg-opacity-95 m-[5px] p-4 rounded pointer-events-auto">
              <div className="md:space-y-4 bg-transparent p-6 rounded-lg text-center text-white">
                {hasStarted && (
                  <p className="md:font-bold text-[16px] md:text-3xl">Você já começou a assistir este vídeo</p>
                )}
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

      {showButtons && (
        <div className="inset-0 flex justify-center items-center pointer-events-auto">
          <div className="bg-white md:mx-auto p-2 rounded-xl xl:w-[1100px] text-center">
            <button
              onClick={handlePay}
              className={`${btnW} flex justify-center items-center gap-2 bg-primary px-14 py-3 rounded-full text-white text-sm md:text-2xl animate-pulse duration-1000 ease-in-out`}
            >
              {btnIcon && (
                <img className='w-5' src={btnIcon} alt="icon" />
              )}
              <p className="relative top-[0px] md:top-0 font-bold">
                {btnLabel}
              </p>
            </button>
          </div>
        </div>
      )}
    </>
  );
}