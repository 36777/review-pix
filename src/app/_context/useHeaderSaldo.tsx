// contexts/HeaderSaldoContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface HeaderSaldoContextData {
  balance: number;
  setBalance: (value: number) => void;
  targetBalance: number;
  setTargetBalance: (value: number) => void;
}

interface HeaderSaldoProviderProps {
  children: ReactNode;
}

// Criando o contexto com um valor inicial definido
const HeaderSaldoContext = createContext<HeaderSaldoContextData>({
  balance: 0,
  setBalance: () => { },
  targetBalance: 0,
  setTargetBalance: () => { },
});

export function HeaderSaldoProvider({ children }: HeaderSaldoProviderProps): React.JSX.Element {
  const [balance, setBalance] = useState<number>(0);
  const [targetBalance, setTargetBalance] = useState<number>(0);

  const value = {
    balance,
    setBalance,
    targetBalance,
    setTargetBalance,
  };

  return (
    <HeaderSaldoContext.Provider value={value}>
      {children}
    </HeaderSaldoContext.Provider>
  );
}

export function useHeaderSaldo(): HeaderSaldoContextData {
  const context = useContext(HeaderSaldoContext);

  if (!context) {
    throw new Error('useHeaderSaldo must be used within a HeaderSaldoProvider');
  }

  return context;
}