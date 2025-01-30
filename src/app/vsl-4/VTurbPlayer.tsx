'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const VTurbPlayer = ({ moldura = false, videoId, thumbnail, script, link, btnW, btnIcon, btnLabel, timerValue = '00:03' }: any) => {
  const [showButtons, setShowButtons] = useState(false);

  // Inicializa o timer com o valor do localStorage ou '00:00'
  const [currentTimer, setCurrentTimer] = useState(() => {
    // Verifica se estamos no ambiente do cliente antes de acessar localStorage
    if (typeof window !== 'undefined') {
      const savedTimer = localStorage.getItem(`vturb_timer_${videoId}`);
      return savedTimer || '00:00';
    }
    return '00:00';
  });

  useEffect(() => {
    // Verifica se o script já foi carregado para evitar duplicação
    if (!document.getElementById(`scr_${videoId}`)) {
      const scriptElement = document.createElement('script');
      scriptElement.id = `scr_${videoId}`;
      scriptElement.src = script;
      scriptElement.async = true;
      document.head.appendChild(scriptElement);
    }

    // Recupera o estado dos botões do localStorage
    const savedShowButtons = localStorage.getItem(`vturb_buttons_${videoId}`);
    if (savedShowButtons === 'true') {
      setShowButtons(true);
    }

    // Timer que atualiza o valor do estado `currentTimer`
    const timerInterval = setInterval(() => {
      setCurrentTimer((prevValue) => {
        const [minutes, seconds] = prevValue.split(':').map(Number);

        // Incrementa os segundos
        let newSeconds = seconds + 1;
        let newMinutes = minutes;

        // Se os segundos atingirem 60, incrementa os minutos e zera os segundos
        if (newSeconds === 60) {
          newMinutes += 1;
          newSeconds = 0;
        }

        // Formata os valores para sempre ter dois dígitos
        const formattedMinutes = String(newMinutes).padStart(2, '0');
        const formattedSeconds = String(newSeconds).padStart(2, '0');

        const newTimer = `${formattedMinutes}:${formattedSeconds}`;

        // Salva o novo valor no localStorage
        localStorage.setItem(`vturb_timer_${videoId}`, newTimer);

        return newTimer;
      });
    }, 1000);

    // Limpa o intervalo ao desmontar o componente
    return () => clearInterval(timerInterval);
  }, [videoId, script]);

  useEffect(() => {
    // Quando o valor do timer atingir o valor da prop `timerValue`, exibe o botão
    if (currentTimer === timerValue) {
      setShowButtons(true);
      // Salva o estado dos botões no localStorage
      localStorage.setItem(`vturb_buttons_${videoId}`, 'true');
    }
  }, [currentTimer, timerValue, videoId]);

  // Função para resetar o timer (pode ser útil em algumas situações)
  const resetTimer = () => {
    localStorage.removeItem(`vturb_timer_${videoId}`);
    localStorage.removeItem(`vturb_buttons_${videoId}`);
    setCurrentTimer('00:00');
    setShowButtons(false);
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