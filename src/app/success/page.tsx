import Link from 'next/link';
import BottomNav from '../_components/BottomNav';

export default function Success() {
  return (
    <div className='flex flex-col justify-center items-center bg-primary min-h-screen text-white'>
      <div className='justify-center justify-items-center items-center gap-4 grid md:max-w-[1100px] text-center'>
        <img className='w-20 md:w-24 h-20 md:h-24' src="/check.png" alt="icon" />
        <p className='font-bold text-4xl text-white'>
          PIX CADASTRADO!
        </p>
        <p className='px-4 text-white md:text-2xl'>
          Você recebeu o seu saque teste de <b>R$ 0,05</b> em nome de <b>"S PAGAMENTOS"</b>.
          Verifique suas notificações ou extrato bancário!
        </p>
        <p className='px-4 text-white md:text-2xl italic'>
          Obs: O valor pode demorar até 1 minuto para cair.
        </p>
        {/* <p className='px-4 text-white md:text-2xl'>
          Agora basta <b>dar sua opinião</b> em mais estabelecimentos para realizar seu <b>primeiro saque</b>
        </p> */}
        <Link href={'/vsl'}>
          <button className='bg-white px-8 py-2 rounded-full font-bold text-2xl text-primary transition-all animate-pulse hover:scale-105'>CONTINUAR</button>
        </Link>
      </div>
      <BottomNav />
    </div>
  )
}