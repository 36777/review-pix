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
          <h1 className='px-5 font-bold text-[20px] text-center text-primary md:text-2xl md:text-start uppercase'>MEUS PARABÉNS PELA SUA COMPRA
          </h1>
        </div>
        <p className='px-11 text-[28px] text-center md:text-2xl underline italic leading-8'>
          Agora falta você desbloquear seu acesso ao ReviewPix, então não atualize, não clique em “voltar” e muito menos feche essa página!
        </p>
        <h3 className='mt-6 px-5 font-bold text-[19px] text-center text-primary md:text-2xl uppercase'>ATENÇÃO, VEJA ESSE VÍDEO ATÉ O FINAL PARA ACESSAR O FEEDFY!</h3>
        <Player store='success-payment' showBtn='00:58' btnW='w-full' btnIcon='/icons/cadeado.png' moldura={false} btnLabel='LIBERAR ACESSO AGORA' src="/vsl-2.mp4" link='https://checkout.perfectpay.com.br/pay/PPU38CPD6SH?upsell=true&utm_source=13b1b66d-a1d6-481d-a583-4094f2f21a53%3A%3A%3A%3A&subid=13b1b66d-a1d6-481d-a583-4094f2f21a53&xcod=13b1b66d-a1d6-481d-a583-4094f2f21a53%3A%3A%3A%3AhQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR&sck=13b1b66d-a1d6-481d-a583-4094f2f21a53%3A%3A%3A%3AhQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR' />
      </main>
    </div>
  );
}
