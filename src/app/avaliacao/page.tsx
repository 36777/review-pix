'use client'
import { useState, useEffect, useCallback, useRef } from 'react';
import Header from '../_components/Header';
import Review from './_components/page';
import BottomNav from '../_components/BottomNav';

export default function Avaliacao() {
  const [timeout, setTimeoutState] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [usedImages, setUsedImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [storeName, setStoreName] = useState('');
  const [selectedIndexes, setSelectedIndexes] = useState([0, 0, 0]);
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [evaluationCount, setEvaluationCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const storeList = [
    'adidas',
    'americanas',
    'c&a',
    'casa-bahia',
    'correfour',
    'extra',
    'ipiranga',
    'magalu',
    'mcdonalds',
    'riachuelo',
    'vivo'
  ];

  useEffect(() => {
    audioRef.current = new Audio('/coin.mp3');
  }, []);

  useEffect(() => {
    const imageUrls = storeList.map(store => `/estabelecimentos/${store}/1.webp`);
    setImages(imageUrls);
  }, []);

  const getStoreNameFromImage = useCallback((imagePath: string) => {
    const storeMap: { [key: string]: string } = {
      'adidas': 'Adidas',
      'americanas': 'Americanas',
      'c&a': 'C&A',
      'casa-bahia': 'Casas Bahia',
      'correfour': 'Carrefour',
      'extra': 'Extra',
      'ipiranga': 'Ipiranga',
      'magalu': 'Magazine Luiza',
      'mcdonalds': "McDonald's",
      'riachuelo': 'Riachuelo',
      'vivo': 'Vivo'
    };

    for (const [key, value] of Object.entries(storeMap)) {
      if (imagePath.includes(key)) return value;
    }
    return '';
  }, []);

  const getRandomUnusedImage = useCallback(() => {
    const availableImages = images.filter(img => !usedImages.includes(img));
    if (availableImages.length === 0) {
      // If all images have been used, reset the used images list
      setUsedImages([]);
      return images[Math.floor(Math.random() * images.length)];
    }
    return availableImages[Math.floor(Math.random() * availableImages.length)];
  }, [images, usedImages]);

  const startImageAnimation = useCallback(() => {
    if (images.length === 0 || isAnimating) return;

    setIsAnimating(true);
    let counter = 0;
    const maxIterations = 20;
    const animationInterval = 150;

    const interval = setInterval(() => {
      if (counter >= maxIterations) {
        clearInterval(interval);
        const selectedImage = getRandomUnusedImage();
        const newIndex = images.indexOf(selectedImage);
        setCurrentImageIndex(newIndex);
        setStoreName(getStoreNameFromImage(selectedImage));
        setUsedImages(prev => [...prev, selectedImage]);
        setTimeoutState(true);
        setIsAnimating(false);
        return;
      }

      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
      counter++;
    }, animationInterval);

    return () => {
      clearInterval(interval);
      setIsAnimating(false);
    };
  }, [images, isAnimating, getStoreNameFromImage, getRandomUnusedImage]);

  useEffect(() => {
    if (images.length > 0 && !timeout) {
      startImageAnimation();
    }
  }, [images, timeout, startImageAnimation]);

  const allReviewsFilled = selectedIndexes.every(index => index > 0);

  const handleEvaluation = useCallback(() => {
    if (audioRef.current && allReviewsFilled && priceRange !== null) {
      audioRef.current.play();
    }

    setEvaluationCount(prevCount => prevCount + 1);
    setSelectedIndexes([0, 0, 0]);
    setPriceRange(null);
    setTimeoutState(false);

    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      startImageAnimation();
    }, 500);
  }, [startImageAnimation, allReviewsFilled, priceRange]);

  useEffect(() => {
    if (evaluationCount >= 3) {
      window.location.href = '/avaliacao/success';
    }
  }, [evaluationCount]);

  const isPostButtonEnabled = allReviewsFilled && priceRange !== null;

  function ToggleButtons() {
    return (
      <div className="flex gap-2 mb-12">
        <button
          className={`border-[#aaaaaa] border-2 hover:border-primary hover:bg-white hover:text-primary px-10 py-2 rounded-xl transition-all ${priceRange === '$' ? 'bg-primary text-white' : 'bg-[#DDDDDD]'}`}
          onClick={() => setPriceRange('$')}
        >
          $
        </button>
        <button
          className={`border-[#aaaaaa] border-2 hover:border-primary hover:bg-white hover:text-primary px-10 py-2 rounded-xl transition-all ${priceRange === '$$' ? 'bg-primary text-white' : 'bg-[#DDDDDD]'}`}
          onClick={() => setPriceRange('$$')}
        >
          $$
        </button>
        <button
          className={`border-[#aaaaaa] border-2 hover:border-primary hover:bg-white hover:text-primary px-10 py-2 rounded-xl transition-all ${priceRange === '$$$' ? 'bg-primary text-white' : 'bg-[#DDDDDD]'}`}
          onClick={() => setPriceRange('$$$')}
        >
          $$$
        </button>
      </div>
    );
  }

  return (
    <>
      <div>
        <Header />
        <div className='justify-center items-center gap-4 grid mt-14'>
          <div className='flex justify-center items-center gap-4'>
            <h3 className='mb-5 font-bold text-primary text-xl md:text-[1.7rem]'>
              {timeout ? 'Estabelecimento Encontrado' : 'Procurando Estabelecimento'}
            </h3>
          </div>
          {images.length > 0 && (
            <div className='flex flex-col gap-2 mx-auto p-2 border rounded-2xl w-full max-w-[500px] max-sm:max-w-[90%]'>
              <div className='flex items-center bg-transparent rounded-2xl w-full max-sm:h-[250px] md:min-h-[360px]'>
                <img
                  key={currentImageIndex}
                  src={images[currentImageIndex]}
                  alt="Imagem do Estabelecimento"
                  className="rounded-2xl w-full h-full object-cover"
                />
              </div>
            </div>
          )}
          <div className='flex flex-col justify-center items-center gap-4 max-sm:gap-2 mt-8 max-sm:mt-4 mb-[150px] text-center'>
            <p className='font-semibold text-3xl text-primary max-sm:text-2xl'>R$ 70,83</p>
            <p className='font-semibold text-3xl text-primary max-sm:text-2xl'>{timeout && storeName}</p>
            <div className="rounded-md text-white">
              <div className="flex">
                {Array(5).fill(0).map((_, i) => (
                  <span key={i} className="text-2xl text-primary max-sm:text-xl">&#9733;</span>
                ))}
              </div>
            </div>
            {[
              'Que nota você daria ao ambiente?',
              'Qual foi a sua experiência com o atendimento?',
              'Como você descreveria a qualidade dos produtos?'
            ].map((perg, index) => (
              <Review
                key={index}
                selectedIndexes={selectedIndexes}
                setSelectedIndexes={setSelectedIndexes}
                reviewIndex={index}
                perg={perg}
              />
            ))}
            <ToggleButtons />
            <button
              disabled={!isPostButtonEnabled}
              onClick={handleEvaluation}
              className={`hover:scale-110 text-2xl mb-[50px] max-sm:mb-[20px] p-4 max-sm:p-3 rounded-md md:w-full w-[80%] text-white transition-all ${isPostButtonEnabled ? 'bg-primary' : 'bg-[#A7E27F] cursor-not-allowed'}`}
            >
              Postar Feedback
            </button>
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
}