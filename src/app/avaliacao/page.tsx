'use client'
import { useState, useEffect } from 'react';
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
  const [evaluationCount, setEvaluationCount] = useState(0); // Contador de avaliações

  // Array com 3 nomes de lojas
  const storeNames = ['Riachuelo', 'Ipiranga', 'Adidas'];

  // Carregar as imagens locais
  useEffect(() => {
    const loadImages = () => {
      const imageUrls: string[] = [];

      // Função para carregar imagens de uma pasta específica
      const loadImagesFromFolder = (folder: string) => {
        // Para Next.js 13+, use importação direta
        imageUrls.push(`/estabelecimentos/${folder}/1.webp`);
      };

      // Carregar imagens de todas as pastas
      loadImagesFromFolder('adidas');
      loadImagesFromFolder('ipiranga');
      loadImagesFromFolder('riachuelo');

      setImages(imageUrls);
    };

    loadImages();
  }, []);

  // Função para iniciar a animação das imagens
  const startImageAnimation = () => {
    let interval: any;
    if (images.length > 0) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Trocar a imagem de forma circular
      }, 55); // Trocar imagem a cada 55ms

      // Após 3 segundos, parar a animação e definir uma imagem aleatória
      setTimeout(() => {
        clearInterval(interval);
        setCurrentImageIndex(Math.floor(Math.random() * images.length)); // Definir uma imagem aleatória
        setStoreName(storeNames[Math.floor(Math.random() * storeNames.length)]); // Selecionar um nome aleatório
        setTimeoutState(true); // Indicar que a animação terminou
      }, 3000); // Parar após 3 segundos

      return () => clearInterval(interval); // Limpar intervalo ao sair
    }
  };

  // Iniciar a animação das imagens quando o componente carregar ou quando as imagens mudarem
  useEffect(() => {
    startImageAnimation();
  }, [images]);

  // Verifica se todas as avaliações estão preenchidas
  const allReviewsFilled = selectedIndexes.every((index) => index > 0);

  // Verifica se o botão "POSTAR FEEDBACK" deve estar habilitado
  const isPostButtonEnabled = allReviewsFilled && priceRange !== null;

  // Função para lidar com o clique no botão de avaliação
  const handleEvaluation = () => {
    setEvaluationCount((prevCount) => prevCount + 1); // Incrementar o contador de avaliações
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Subir o scroll para o topo
    setTimeoutState(false); // Reiniciar o estado da animação
    startImageAnimation(); // Reiniciar a animação das imagens
  };

  // Redirecionar para a página de sucesso após 4 avaliações
  useEffect(() => {
    if (evaluationCount >= 3) {
      window.location.href = '/avaliacao/success';
    }
  }, [evaluationCount]);

  // Componente dos botões de faixa de preço
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
                  src={images[currentImageIndex]}
                  alt="Imagem do Estabelecimento"
                  className="rounded-2xl w-full h-full object-cover"
                />
              </div>
              {/* <div className='flex gap-2 max-sm:gap-1'>
                {images.map((image, index) => (
                  <div key={index} className='bg-gray-400 rounded-2xl w-[180px] max-sm:w-[calc(33%-4px)] h-[100px] max-sm:h-[80px]'>
                    <img
                      src={images[(currentImageIndex + index) % images.length]}
                      alt={`Imagem ${index + 1}`}
                      className="rounded-2xl w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div> */}
            </div>
          )}
          <div className='flex flex-col justify-center items-center gap-4 max-sm:gap-2 mt-8 max-sm:mt-4 mb-[150px] text-center'>
            <p className='font-semibold text-3xl text-primary max-sm:text-2xl'>R$ 70,83</p>
            <p className='font-semibold text-3xl text-primary max-sm:text-2xl'>{storeName}</p>
            <div className="rounded-md text-white">
              <div className="flex">
                {/* 5 estrelas */}
                <span className="text-2xl text-primary max-sm:text-xl">&#9733;</span>
                <span className="text-2xl text-primary max-sm:text-xl">&#9733;</span>
                <span className="text-2xl text-primary max-sm:text-xl">&#9733;</span>
                <span className="text-2xl text-primary max-sm:text-xl">&#9733;</span>
                <span className="text-2xl text-primary max-sm:text-xl">&#9733;</span>
              </div>
            </div>
            <Review
              selectedIndexes={selectedIndexes}
              setSelectedIndexes={setSelectedIndexes}
              reviewIndex={0}
              perg={'Que nota você daria ao ambiente?'}
            />
            <Review
              selectedIndexes={selectedIndexes}
              setSelectedIndexes={setSelectedIndexes}
              reviewIndex={1}
              perg={'Qual foi a sua experiência com o atendimento?'}
            />
            <Review
              selectedIndexes={selectedIndexes}
              setSelectedIndexes={setSelectedIndexes}
              reviewIndex={2}
              perg={'Como você descreveria a qualidade dos produtos?'}
            />
            {ToggleButtons()}
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