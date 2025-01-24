import Link from 'next/link';

export default function Error() {
  return (
    <div className='flex flex-col justify-center items-center bg-primary min-h-screen text-white'>
      <div className='justify-center justify-items-center items-center gap-4 grid md:max-w-[1100px] text-center'>
        <img className='w-20 md:w-24 h-20 md:h-24' src="/icon-erro.png" alt="icon" />
        <p className='font-bold text-4xl text-white'>
          Você já recebeu seu saque de R$ 0,05
        </p>
        <p className='px-4 font-bold text-white md:text-2xl'>
          Clique no botão abaixo para dar sua opinião em mais estabelecimentos para realizar seu primeiro saque
        </p>
        <Link href={'/vsl'}>
          <button className='bg-white px-8 py-2 rounded-full font-bold text-2xl text-primary transition-all animate-pulse hover:scale-105'>CONTINUAR</button>
        </Link>
      </div>
    </div>
  )
}