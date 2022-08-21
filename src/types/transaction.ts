export type TransactionType = "deposit" | "withdraw";

export interface Transaction {
  id: number;
  title: string;
  type: TransactionType;
  category: string;
  amount: number;
  createdAt: Date | string;
}

export type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

