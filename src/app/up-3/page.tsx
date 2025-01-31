import BottomNav from '../_components/BottomNav';
import Header from '../_components/Header';
import Player from '../_components/Player';
import VTurbPlayer from '../vsl-4/VTurbPlayer';

export default function SuccessPayment() {
  return (
    <div className="">
      <main className="min-h-[118vh]">
        <Header />
        <BottomNav />
        <h3 className='mt-8 px-5 font-bold text-[22px] text-center text-primary md:text-[25px] uppercase leading-5'>ATENÇÃO, VEJA ESSE VÍDEO ATÉ O FINAL PARA ACESSAR O REVIEWPIX!</h3>

        <VTurbPlayer
          key={'679be9533ca340137751a4b7'}
          moldura={true}
          videoId="679be9533ca340137751a4b7"
          thumbnail="https://images.converteai.net/bf49b45e-b78d-47d5-8043-902101442a42/players/679be9533ca340137751a4b7/thumbnail.jpg"
          script="https://scripts.converteai.net/bf49b45e-b78d-47d5-8043-902101442a42/players/679be9533ca340137751a4b7/player.js"
          link="https://go.perfectpay.com.br/PPU38CPFMS7?upsell=true"
          btnW="w-full"
          btnIcon="/icons/cadeado.png"
          btnLabel="Quero Participar"
          timerValue={'01:10'}
        />
        {/* <Player store='up-3' showBtn='01:10' btnW={'w-full'} moldura={false} btnIcon='/icons/cadeado.png' btnLabel={'Quero Participar'} src="/vsl-up-3.mp4" link='https://go.perfectpay.com.br/PPU38CPFMS7?upsell=true' /> */}

        <p className='mt-4 px-7 text-[16px] text-center text-primary md:text-2xl leading-4'><strong>Atenção:</strong> ao sair desta página você perderá essa oportunidade para sempre!</p>
      </main>
    </div>
  );
}
