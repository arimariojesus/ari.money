import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface Transaction {
  id: number;
  title: string;
  type: "deposit" | "withdraw";
  category: string;
  amount: number;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextProps {
  transactions: Transaction[];
  addTransaction: (transaction: TransactionInput) => Promise<void>;
  delTransaction: (id: number) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextProps>({} as TransactionsContextProps);

export const TransactionsProvider = ({ children }: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get("/transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  async function addTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    });
    const { transaction } = response.data;

    setTransactions(oldTransactions => ([
      ...oldTransactions,
      transaction,
    ]));
  }

  async function delTransaction(id: number) {
    await api.delete(`/transactions/${id}`);
    api
      .get("/transactions")
      .then((response) => setTransactions(response.data.transactions));
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
