'use client'
import { useState, useEffect, useCallback } from 'react';
import Header from '../_components/Header';
import Review from './_components/page';
import BottomNav from '../_components/BottomNav';

export default function Avaliacao() {
  const [timeout, setTimeoutState] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [storeName, setStoreName] = useState('');
  const [selectedIndexes, setSelectedIndexes] = useState([0, 0, 0]);
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [evaluationCount, setEvaluationCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Carregar as imagens locais
  useEffect(() => {
    const imageUrls = [
      '/estabelecimentos/adidas/1.webp',
      '/estabelecimentos/ipiranga/1.webp',
      '/estabelecimentos/riachuelo/1.webp'
    ];
    setImages(imageUrls);
  }, []);

  const getStoreNameFromImage = useCallback((imagePath: string) => {
    if (imagePath.includes('adidas')) return 'Adidas';
    if (imagePath.includes('ipiranga')) return 'Ipiranga';
    if (imagePath.includes('riachuelo')) return 'Riachuelo';
    return '';
  }, []);

  // Função melhorada para animação das imagens
  const startImageAnimation = useCallback(() => {
    if (images.length === 0 || isAnimating) return;

    setIsAnimating(true);
    let counter = 0;
    const maxIterations = 20; // Número de trocas de imagem durante a animação
    const animationInterval = 150; // Intervalo entre cada troca (ms)

    const interval = setInterval(() => {
      if (counter >= maxIterations) {
        clearInterval(interval);
        const randomIndex = Math.floor(Math.random() * images.length);
        setCurrentImageIndex(randomIndex);
        setStoreName(getStoreNameFromImage(images[randomIndex]));
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
  }, [images, isAnimating, getStoreNameFromImage]);

  // Iniciar animação quando o componente montar ou quando as imagens forem carregadas
  useEffect(() => {
    if (images.length > 0 && !timeout) {
      startImageAnimation();
    }
  }, [images, timeout, startImageAnimation]);

  // Reset e reinício da avaliação
  // Reset e reinício da avaliação
  const handleEvaluation = useCallback(() => {
    setEvaluationCount(prevCount => prevCount + 1);
    setSelectedIndexes([0, 0, 0]);
    setPriceRange(null);
    setTimeoutState(false);

    // Primeiro executa o scroll
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Aguarda o scroll terminar antes de iniciar nova animação
    setTimeout(() => {
      // Força um segundo scroll para garantir
      window.scrollTo({ top: 0, behavior: 'smooth' });
      startImageAnimation();
    }, 500); // Aumentado para 500ms para dar tempo do scroll completar
  }, [startImageAnimation]);

  // Verificar contagem de avaliações para redirecionamento
  useEffect(() => {
    if (evaluationCount >= 3) {
      window.location.href = '/avaliacao/success';
    }
  }, [evaluationCount]);

  const allReviewsFilled = selectedIndexes.every(index => index > 0);
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
            <h3 className='mb-5 font-bold text-[1.7rem] text-primary'>
              {timeout ? 'Estabelecimento Encontrado' : 'Procurando estabelecimento'}
            </h3>
          </div>
          {images.length > 0 && (
            <div className='flex flex-col gap-2 mx-auto p-2 border rounded-2xl w-full max-w-[500px] max-sm:max-w-[90%]'>
              <div className='bg-gray-500 rounded-2xl w-full max-sm:h-[200px] min-h-[250px]'>
                <img
                  key={currentImageIndex} // Adiciona key para forçar re-render
                  src={images[currentImageIndex]}
                  alt="Imagem do Estabelecimento"
                  className="rounded-2xl w-full h-full object-cover"
                />
              </div>
            </div>
          )}
          <div className='flex flex-col justify-center items-center gap-4 max-sm:gap-2 mt-8 max-sm:mt-4 mb-[150px] text-center'>
            <p className='font-semibold text-3xl text-primary max-sm:text-2xl'>R$ 70,83</p>
            <p className='font-semibold text-3xl text-primary max-sm:text-2xl'>{storeName}</p>
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
              POSTAR FEEDBACK
            </button>
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
}