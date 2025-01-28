"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Cadastro() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    nome: '',
    celular: '',
    email: ''
  })
  const [errors, setErrors] = useState({
    nome: '',
    celular: '',
    email: ''
  })

  const formatPhoneNumber = (value: any) => {
    const phoneNumber = value.replace(/\D/g, '')

    if (phoneNumber.length <= 2) {
      return phoneNumber
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`
    } else if (phoneNumber.length <= 10) {
      return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 6)}-${phoneNumber.slice(6)}`
    } else {
      return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7, 11)}`
    }
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    const formattedValue =
      name === 'celular'
        ? formatPhoneNumber(value)
        : name === 'nome'
          ? value.replace(/\d/g, '')
          : value;

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const validateStep = () => {
    let isValid = true;
    let newErrors = { nome: '', celular: '', email: '' };

    if (step === 1 && !formData.nome) {
      newErrors.nome = 'Digite um nome válido';
      isValid = false;
    }

    if (step === 2 && !formData.celular) {
      newErrors.celular = 'Celular é obrigatório';
      isValid = false;
    } else if (
      step === 2 &&
      !/^\(\d{2}\) \d{5}-\d{4}$/.test(formData.celular)
    ) {
      newErrors.celular = 'Digite um celular válido no formato (99) 99999-9999';
      isValid = false;
    }

    if (step === 3 && !formData.email) {
      newErrors.email = 'Email é obrigatório';
      isValid = false;
    } else if (step === 3 && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Digite um Email válido';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNextStep = () => {
    if (validateStep() && step < 3) setStep(prev => prev + 1)
  }

  const handlePreviousStep = () => {
    if (step > 1) setStep(prev => prev - 1)
  }

  const handleSubmit = async () => {
    if (!validateStep()) return;

    try {
      const payload = {
        ...formData,
        celular: formData.celular.replace(/\D/g, '')
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cadastro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        router.push('/avaliacao');
      } else {
        alert('Ocorreu um erro ao tentar realizar o cadastro!');
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
    }
  };

  const renderInput = () => {
    switch (step) {
      case 1:
        return (
          <>
            <input
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              placeholder='Digite seu nome'
              className={`placeholder:text-gray-400 font-light mt-2 mb-3 px-4 py-2 border ${errors.nome ? 'border-red-500' : 'border-gray-500'} rounded w-full`}
              type="text"
            />
            {errors.nome && <div className="relative top-[-6px] flex justify-start items-center px-4 border border-red-500 w-fit h-[80px] text-2xl text-red-500">{errors.nome}</div>}
          </>
        )
      case 2:
        return (
          <>
            <input
              name="celular"
              value={formData.celular}
              onChange={handleInputChange}
              placeholder='Digite o DDD + Seu Número'
              className={`placeholder:text-gray-400 font-light mt-8 mb-3 px-4 py-2 border ${errors.celular ? 'border-red-500' : 'border-gray-500'} rounded w-full`}
              type="tel"
              inputMode="numeric"
            />
            {errors.celular && <div className="relative top-[-6px] flex justify-start items-center px-4 border border-red-500 w-fit h-[80px] text-2xl text-red-500">{errors.celular}</div>}
          </>
        )
      case 3:
        return (
          <>
            <input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder='Digite seu email'
              className={`placeholder:text-gray-400 font-light mt-8 mb-3 px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-500'} rounded w-full`}
              type="email"
            />
            {errors.email && <div className="relative top-[-6px] flex justify-start items-center px-4 border border-red-500 w-fit h-[80px] text-2xl text-red-500">{errors.email}</div>}
          </>
        )
    }
  }

  const renderButtons = () => {
    if (step === 1) {
      return (
        <button
          type="button"
          onClick={handleNextStep}
          className='bg-primary hover:opacity-85 mb-2 px-4 py-2 rounded-full w-full font-bold text-sm text-white'
        >
          Próximo
        </button>
      )
    }

    if (step === 3) {
      return (
        <div className='flex gap-4'>
          <button
            type="button"
            onClick={handlePreviousStep}
            className='bg-gray-300 mb-2 px-4 py-2 rounded-full w-1/2 font-bold text-black text-sm'
          >
            Voltar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className='bg-primary hover:bg-primary-dark mb-2 px-4 py-2 rounded-full w-1/2 font-bold text-sm text-white'
          >
            Finalizar
          </button>
        </div>
      )
    }

    return (
      <div className='flex gap-4'>
        <button
          type="button"
          onClick={handlePreviousStep}
          className='bg-gray-300 hover:opacity-85 mb-2 px-4 py-2 rounded-full w-1/2 font-bold text-black text-sm'
        >
          Anterior
        </button>
        <button
          type="button"
          onClick={handleNextStep}
          className='bg-primary hover:bg-primary-dark hover:opacity-85 mb-2 px-4 py-2 rounded-full w-1/2 font-bold text-sm text-white'
        >
          Próximo
        </button>
      </div>
    )
  }

  return (
    <>
      <div className='justify-center justify-items-center items-center grid min-h-[90vh]'>
        <div className='text-center'>
          <img src="logo-2.png" alt="logo" className='relative top-[-18px] mx-auto w-[200px] md:w-[840px]' />
          <p className='pt-0 pb-8 font-bold text-[#467326] text-[1.5rem]'>Preencha os dados abaixo corretamente</p>
          <div className='flex flex-col border-primary mx-4 md:mx-auto px-6 pt-6 pb-3 border rounded-2xl max-w-[650px]'>
            <div className='relative flex items-center gap-4'>
              {[1, 2, 3].map((num, index) => (
                <div key={num} className={`flex flex-col items-center ${index === 2 ? 'w-fit' : 'w-[50%]'}`}>
                  <div className='flex justify-center items-center w-full'>
                    <div className='justify-center justify-items-center items-center gap-2 grid'>
                      <div
                        className={`flex justify-center items-center border rounded-full w-8 h-8 text-xs bg-white ${step > num
                          ? 'border-primary text-primary'
                          : step === num
                            ? 'border-primary text-primary'
                            : 'border-gray-300 text-gray-300'
                          }`}
                      >
                        {num}
                      </div>
                      <p
                        className={`text-xs mt-1 ${step > num
                          ? 'text-primary'
                          : step === num
                            ? 'text-primary font-bold'
                            : 'text-gray-300 font-bold'
                          }`}
                      >
                        {num === 1 ? 'Nome' : num === 2 ? 'Celular' : 'Email'}
                      </p>
                    </div>
                    {/* Linha de separação entre os círculos */}
                    {index !== 2 && (
                      <div className={`${index < 2 ? 'w-full' : '0'} ml-4 relative top-[-15px] bg-gray-300 h-0.5`} ></div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {renderInput()}
            {renderButtons()}
          </div>

        </div>

      </div>
      <div className='bg-[#03D72E] h-[91px]'>

      </div>
    </>

  )
}
