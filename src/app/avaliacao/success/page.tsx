import BottomNav from '@/app/_components/BottomNav';
import Link from 'next/link';

export default function SuccessAv() {
  return (
    <div className='flex flex-col justify-center items-center bg-primary min-h-screen text-white'>
      <div className='justify-center justify-items-center items-center gap-4 grid md:max-w-[1100px] text-center'>
        <img className='w-20 md:w-24 h-20 md:h-24' src="/check.png" alt="icon" />
        <p className='font-bold text-4xl text-white'>
          PARABÉNS!
        </p>
        <p className='px-4 text-white md:text-2xl'>
          Seu cadastro foi realizado e você acaba de ganhar R$ 235,67
        </p>
        <p className='px-4 text-white md:text-2xl'>
          Realize seu saque teste antes de receber todo seu dinheiro <b>SAQUE</b>
        </p>
        <Link href={'/saque'}>
          <button className='bg-white px-8 py-2 rounded-full font-bold text-2xl text-primary transition-all animate-pulse hover:scale-105'>FAZER SAQUE TESTE</button>
        </Link>
      </div>
      <BottomNav />
    </div>
  )
}
