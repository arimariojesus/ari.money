import { Transaction } from '../types/transaction'

export class StorageTransactions {
  protected key = '@app:transactions';

  set (transactions: Transaction[]): void {
    localStorage.setItem(this.key, JSON.stringify(transactions));
  }

  getAll (): Transaction[] {
    const value = localStorage.getItem(this.key);
    
    if (!value) return [];
    
    return JSON.parse(value) as Transaction[];
  }

  add (transaction: Transaction): void {
    const storedTransactions = this.getAll();
    const transactions = [...storedTransactions, transaction];
    this.set(transactions)
  }

  remote (id: number) {
    const transactions = this.getAll();
    const newTransactions = transactions.filter(t => t.id !== id);
    this.set(newTransactions);

  } 

  clear (): void {
    localStorage.removeItem(this.key);
  }
}

const storageTransactions = new StorageTransactions();
export { storageTransactions };
