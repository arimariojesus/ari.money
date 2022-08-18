import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { Transaction, TransactionInput } from '../../types/transaction';
import { storageTransactions } from '../../utils';

export interface TransactionsProviderProps {
  children: ReactNode;
}

export interface TransactionsContextProps {
  transactions: Transaction[];
  addTransaction: (transaction: TransactionInput) => Promise<void>;
  delTransaction: (id: number) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextProps>({} as TransactionsContextProps);

export const TransactionsProvider = ({ children }: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    setTransactions(storageTransactions.getAll());
  }, []);

  async function addTransaction(transactionInput: TransactionInput) {
    const transaction = {
      ...transactionInput,
      id: Date.now(),
      createdAt: new Date(),
    };
    
    storageTransactions.add(transaction);

    setTransactions(oldTransactions => ([
      ...oldTransactions,
      transaction,
    ]));
  }

  async function delTransaction(id: number) {
    storageTransactions.remove(id);
    setTransactions(storageTransactions.getAll());
  }
  
  return (
    <TransactionsContext.Provider value={{
      transactions,
      addTransaction,
      delTransaction,
    }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionsContext);
