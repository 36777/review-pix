'use client'
import { useState, } from 'react';
import { useRouter } from 'next/navigation';

export default function Form() {
  const [selection, setSelection] = useState('cpf');
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();



  const handleSelectionChange = (newSelection: string) => {
    setSelection(newSelection);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, '');
    setInputValue(numericValue);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/realizar-saque', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tipo: selection,
          valor: inputValue,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro na requisição');
      }

      alert('Saque realizado com sucesso!');
    } catch (error) {
      router.push('/error');
    }
  };

  return (
    <div className="flex flex-col gap-4 text-white">
      <div className='flex gap-4'>
        {/* Opção CPF */}
        <div
          className={`flex flex-col justify-center items-center border-2 ${selection === 'cpf' ? 'border-primary' : 'border-gray-300'} hover:bg-[#148305] ${selection === 'cpf' ? 'bg-[#148305]' : 'bg-primary'} p-4 rounded-xl w-full sm:w-[48%] min-h-[140px] transition-all hover:scale-105 cursor-pointer`}
          onClick={() => handleSelectionChange('cpf')}
        >
          <div>Icon</div>
          <p className="font-bold text-2xl">CPF</p>
        </div>

        {/* Opção Celular */}
        <div
          className={`flex flex-col justify-center items-center border-2 ${selection === 'celular' ? 'border-primary' : 'border-gray-300'} hover:bg-[#148305] ${selection === 'celular' ? 'bg-[#148305]' : 'bg-primary'} p-4 rounded-xl w-full sm:w-[48%] min-h-[140px] transition-all hover:scale-105 cursor-pointer`}
          onClick={() => handleSelectionChange('celular')}
        >
          <div>Icon</div>
          <p className="font-bold text-2xl">Celular</p>
        </div>
      </div>

      <div className="border-primary mt-4 mb-16 p-4 border rounded-2xl w-full">
        <input
          className="border-gray-500 px-4 py-2 border w-full placeholder:text-gray-400"
          type="text"
          placeholder={`Digite seu ${selection === 'cpf' ? 'CPF' : 'Celular'}`}
          value={inputValue}
          onChange={handleInputChange}
        />

        <div className="flex gap-4 mt-4 w-full sm:w-auto">
          <button
            onClick={handleSubmit}
            className="bg-primary hover:bg-[#148305] px-4 py-2 rounded-md w-full font-bold text-white transition-all"
          >
            Realizar Saque
          </button>
        </div>
      </div>
    </div>
  );
}