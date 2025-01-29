import Link from 'next/link';

export default function Home() {
  return (
    <div className="mx-auto">
      <main className="min-h-screen">
        <header className='fixed bg-white px-4 sm:px-14 pt-5 pb-4 w-full'>
          <img className='w-16 sm:w-20' src="/logo-2.png" alt="logo-2" />
        </header>
        <div className='flex justify-center items-center bg-gradient-to-b from-[#09BA26] to-[#015205] px-4 min-h-[100vh] text-white'>
          <div className='flex flex-col justify-center items-center w-full'>
            <h3 className='opacity-0 mb-6 sm:mb-8 font-bold text-center text-xl sm:text-2xl translate-x-[-50px] translate-x-[-50px] animate-delay-200 animate-delay-700 animate-fade-in-left animate-fade-in-left animate-duration-1000 animate-duration-1000'>
              Seja Bem Vindo (a)
            </h3>
            <div className='bg-white opacity-0 px-6 sm:px-10 pt-8 sm:pt-14 pb-6 rounded-3xl w-full max-w-[400px] min-h-[380px] text-[#0BD11A] translate-x-[-50px] animate-delay-500 animate-fade-in-left animate-duration-1000'>
              <div className=''>
                <div className='font-bold text-[1.7rem] text-center sm:text-[1.70rem] leading-7 translate-x-[-50px] animate-delay-700 animate-fade-in-left animate-duration-1000'>
                  Ganhe até R$ 200 p/dia <br /> por dar Feedbacks para empresas!
                </div>
                <div className='opacity-0 my-6 text-center text-gray-500 text-sm sm:text-base translate-x-[-50px] animate-delay-700 animate-fade-in-left animate-duration-1000'>
                  <span className='underline'>Clique no Botão Abaixo</span> e faça seu cadastro para começar.
                </div>
                <div className='flex justify-center items-center mx-auto mb-4 w-full'>
                  <img src="/arrow.png" width={38} alt="arrow" />
                </div>
                <Link className='flex w-full' href={'/cadastro'}>
                  <button className='bg-[#2AD10A] shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.7),inset_2px_2px_4px_rgba(255,255,255,0.1)] mx-auto mt-2 px-1 sm:px-6 py-2 sm:py-3 rounded-md w-full max-w-[70%] md:max-w-full text-white text-xl sm:text-2xl transition-all animate-pulse hover:animate-none duration-300 hover:scale-105 active:scale-100 ease-in-out'>
                    Fazer Cadastro Agora
                  </button>
                </Link>
                <p className='opacity-0 mt-4 sm:mt-6 text-[15px] text-center text-gray-800 sm:text-sm translate-x-[-50px] animate-delay-1100 animate-fade-in-left animate-duration-1000'>
                  É rápido e garante a segurança dos seus dados.
                </p>
              </div>
            </div>
          </div>
        </div>

        <footer className='justify-center items-center gap-4 grid px-4 py-4 text-center'>
          <img className='mx-auto mt-4 sm:mt-8 w-16 sm:w-20' src="/logo-2.png" alt="logo-2" />
          <p className='text-gray-800 text-sm'>Todos os direitos reservados</p>
          <p className='mt-[-5px] text-gray-500 text-xs sm:text-sm'>
            Que tal ganhar uma renda extra dando feedback para empresas no Google?
          </p>
        </footer>
      </main>
    </div>
  );
}