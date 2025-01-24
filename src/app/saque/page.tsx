'use client'
import { useEffect, useState } from 'react';
import BottomNav from '../_components/BottomNav';
import Header from '../_components/Header';
import Form from './_components/Form';

export default function Saque() {
  const [balance, setBalance] = useState(0);
  const targetBalance = 235.67;
  const duration = 2000;

  useEffect(() => {
    let startTime = null as any;

    const increaseBalance = (timestamp: any) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const increment = Math.min(progress / duration * targetBalance, targetBalance) as any;

      setBalance(increment.toFixed(2));

      if (progress < duration) {
        requestAnimationFrame(increaseBalance);
      }
    };


    requestAnimationFrame(increaseBalance);
  }, []);

  return (
    <div className="">
      <main className="min-h-[130vh]">
        <Header />
        <div className=''>
          <h1 className='mt-[60px] font-bold text-[#4FC600] text-[2rem] text-center'>ATENÇÃO</h1>
          <div className='flex justify-center items-center mt-2 text-2xl'>
            <p className='relative top-[-8px] flex bg-primary mx-4 mt-2 px-4 py-2 rounded-xl w-fit max-w-[1000px] font-bold text-2xl text-center text-white fade-in-up'>
              Antes de realizar seu 1° saque, vamos te enviar um PIX TESTE de R$0,05 CENTAVOS para confirmar se está tudo certo com o seu cadastro!
            </p>
          </div>

        </div>
        <div className='flex justify-center items-center mx-auto w-full'>
          <div className='flex flex-col border-2 border-primary mx-4 mx-auto mt-3 p-5 rounded-2xl md:w-[800px] min-h-[400px]'>
            <p className='font-bold text-2xl text-primary'>Seu Saldo:</p>
            <p className='mt-[-2px] font-bold text-[2.10rem] text-primary'>R$ {balance}</p>
            <p className='my-5 font-light text-[15px]'>Escolha o tipo da sua chave Pix para realizar o saque:</p>

            <Form />

          </div>
        </div>

        <BottomNav />
      </main>
    </div>
  );
}
