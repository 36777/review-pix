import BottomNav from '../_components/BottomNav';
import Header from '../_components/Header';
import Player from '../_components/Player';

export default function SuccessPayment() {
  return (
    <div className="">
      <main className="min-h-[130vh]">
        <Header />
        <BottomNav />

        <div className="flex justify-center items-center mt-[35px] mb-[25px] px-4 md:px-0">
          <h1 className='px-5 font-bold text-[19px] text-center text-primary md:text-2xl md:text-start uppercase'>MEUS PARABÉNS PELA SUA COMPRA
          </h1>
        </div>
        <p className='px-11 text-2xl text-center underline italic'>
          Agora falta você desbloquear seu acesso ao ReviewPix, então não atualize, não clique em “voltar” e muito menos feche essa página!
        </p>
        <h3 className='mt-4 px-5 font-bold text-[19px] text-center text-primary md:text-2xl uppercase'>ATENÇÃO, VEJA ESSE VÍDEO ATÉ O FINAL PARA ACESSAR O FEEDFY!</h3>
        <Player src="/vsl-2.mp4" link='/pay' />
      </main>
    </div>
  );
}
