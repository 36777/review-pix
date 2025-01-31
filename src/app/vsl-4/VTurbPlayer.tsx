'use client';
import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';

const VTurbPlayer = ({ moldura = false, videoId, thumbnail, script, link, btnW, btnIcon, btnLabel, timerValue = '00:03' }: any) => {
  const [showButtons, setShowButtons] = useState(false);
  const checkTimeInterval = useRef<NodeJS.Timeout | null>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null); // Referência ao script

  useEffect(() => {
    // Verifica se o script já foi carregado
    if (!document.getElementById(`scr_${videoId}`)) {
      const scriptElement = document.createElement('script');
      scriptElement.id = `scr_${videoId}`;
      scriptElement.src = script;
      scriptElement.async = true;

      scriptElement.onload = () => {
        setupTimeCheck();
      };

      document.head.appendChild(scriptElement);
      scriptRef.current = scriptElement; // Armazena a referência do script
    } else {
      setupTimeCheck();
    }

    return () => {
      // Limpa o intervalo ao desmontar
      if (checkTimeInterval.current) {
        clearInterval(checkTimeInterval.current);
      }

      // Remove o script ao desmontar
      if (scriptRef.current) {
        document.head.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
    };
  }, [videoId, script]);

  const setupTimeCheck = () => {
    const targetSeconds = convertTimeStringToSeconds(timerValue);

    checkTimeInterval.current = setInterval(() => {
      const videoTimeRaw = localStorage.getItem(videoId);
      if (videoTimeRaw) {
        const videoTimeSeconds = parseFloat(videoTimeRaw);

        if (videoTimeSeconds >= targetSeconds) {
          setShowButtons(true);
          if (checkTimeInterval.current) {
            clearInterval(checkTimeInterval.current);
          }
        }
      }
    }, 100); // Checagem mais frequente para maior precisão
  };

  // Função auxiliar para converter string de tempo (00:03) para segundos
  const convertTimeStringToSeconds = (timeString: string): number => {
    const [minutes, seconds] = timeString.split(':').map(Number);
    return (minutes * 60) + seconds;
  };

  return (
    <>
      <div
        className={`${moldura ? 'border border-black' : 'border border-black'
          } relative flex justify-center items-center m-4 md:mx-auto p-2 rounded-xl xl:w-[1100px] select-none aspect-video`}
      >
        <div
          id={`vid_${videoId}`}
          className="relative w-full h-full"
        >
          <img
            id={`thumb_${videoId}`}
            src={thumbnail}
            className="block top-0 left-0 absolute w-full h-full object-cover"
            alt="thumbnail"
          />
          <div
            id={`backdrop_${videoId}`}
            className="top-0 absolute backdrop-blur-sm w-full h-full"
          ></div>
        </div>
      </div>
      {showButtons && (
        <div className="inset-0 flex justify-center items-center pointer-events-auto">
          <Link href={link} className="bg-white md:mx-auto p-2 rounded-xl xl:w-[1100px] text-center">
            <button
              className={`${btnW} flex justify-center items-center gap-2 bg-primary px-14 py-3 rounded-full text-white text-sm md:text-2xl animate-pulse duration-1000 ease-in-out`}
            >
              {btnIcon && (
                <img className="w-5" src={btnIcon} alt="icon" />
              )}
              <p className="relative top-[0px] md:top-0 font-bold">
                {btnLabel}
              </p>
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default VTurbPlayer;