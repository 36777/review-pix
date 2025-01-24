'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

export default function Header() {
  const [balance, setBalance] = useState(0);
  const targetBalance = 235.67;
  const duration = 2000;

  useEffect(() => {
    let startTime = null as any;

    const increaseBalance = (timestamp: any) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const increment = Math.min(progress / duration * targetBalance, targetBalance) as any;

      setBalance(increment.toFixed(2));

      if (progress < duration) {
        requestAnimationFrame(increaseBalance);
      }
    };


    requestAnimationFrame(increaseBalance);
  }, []);

  return (
    <div>
      <header className="relative flex bg-white">
        <div className="relative flex justify-between px-4 md:px-[3.12rem] py-5 w-full">
          <Link href={'/'}>
            <img
              className="relative top-[-3px] z-10 w-[150px] h-fit"
              src="/logo.png"
              alt="logo"
              fetchPriority="high"
            />
          </Link>

          <div className="relative top-[-5px] right-8 z-[999] flex justify-center items-center">
            <button className="relative flex justify-center items-center border-white bg-primary px-4 py-[0.35rem] border rounded-full text-white">
              <span className="top-[-10px] left-5 z-[999] absolute bg-primary px-[3px] font-medium text-[1.0rem]">
                Saldo
              </span>
              <span className="relative top-[3px] md:top-0 z-[9999] font-bold text-[1.20rem]">
                R$ {balance}
              </span>
            </button>
          </div>

          <svg width="74%" height="79" viewBox="0 0 1913 79" fill="none"
            className="top-[-4px] absolute inset-0 w-full object-cover"
            preserveAspectRatio="xMidYMid slice">
            <path d="M29.5 68.0396C756.304 85.792 1161.95 86.5569 1882 70.6583H1912V1H29.5H1V68.0396H29.5Z" fill="#4FC500" stroke="#4FC600" />
          </svg>
        </div>
      </header>
    </div>
  );
}
