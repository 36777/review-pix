'use client'

import { useState } from 'react';

export default function Review({
  perg,
  reviewIndex,
  selectedIndexes,
  setSelectedIndexes
}: {
  perg: string;
  reviewIndex: number;
  selectedIndexes: number[];
  setSelectedIndexes: (indexes: number[]) => void;
}) {
  const [isHovered, setIsHovered] = useState(-1);
  const currentSelectedIndex = selectedIndexes[reviewIndex] ?? -1;

  return (
    <div className="w-full">
      <p className='mb-4 font-bold text-2xl max-sm:text-lg'>{perg}</p>
      <div className="flex justify-center items-center gap-1">
        <p className='flex items-end max-sm:hidden text-gray-600 text-sm max-sm:text-xs'>Muito Ruim</p>
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="p-2 max-sm:p-1 cursor-pointer"
            onMouseEnter={() => setIsHovered(index)}
            onMouseLeave={() => setIsHovered(-1)}
            onClick={() => {
              const newSelectedIndexes = [...selectedIndexes];
              newSelectedIndexes[reviewIndex] = index;
              setSelectedIndexes(newSelectedIndexes);
            }}
          >
            <svg
              className="w-10 max-sm:w-7 h-10 max-sm:h-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="gray"
              strokeWidth="0.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon
                points="12 17.27 18.18 21 15.54 13.97 21 9.24 13.81 8.63 12 2 10.19 8.63 3 9.24 8.46 13.97 5.82 21 12 17.27"
                className={(currentSelectedIndex !== 0 && (isHovered >= index || currentSelectedIndex >= index))
                  ? 'fill-primary stroke-primary'
                  : 'fill-[#DDDDDD] stroke-gray-500'
                }
              />
            </svg>
          </div>
        ))}
        <p className='flex items-end max-sm:hidden text-gray-600 text-sm max-sm:text-xs'>Muito Bom</p>
      </div>
    </div>
  );
}