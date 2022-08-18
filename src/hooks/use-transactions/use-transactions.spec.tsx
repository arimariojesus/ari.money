import { act, renderHook } from "@testing-library/react-hooks";

import { TransactionInput } from '../../types/transaction';
import { storageTransactions } from '../../utils/storage';
import {
  TransactionsProvider,
  TransactionsProviderProps,
  useTransactions,
} from ".";
import { transactionsMock } from "../../mocks";

const STORAGE_KEY = storageTransactions.key;

const makeSut = () => {
  const wrapper = ({ children }: TransactionsProviderProps) => (
    <TransactionsProvider>{children}</TransactionsProvider>
  );
  return renderHook(() => useTransactions(), { wrapper });
};

const dateMock = new Date('2022-08-18');

describe("useTransactions", () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(dateMock);
  });
  
  beforeEach(() => {
    window.localStorage.clear();
  });

  describe('transactions', () => {
    it("should load initial transactions correctly", async () => {
      const firstRender = makeSut();
  
      expect(firstRender.result.current.transactions).toEqual([]);
  
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(transactionsMock));
  
      const secondRender = makeSut();
  
      expect(secondRender.result.current.transactions).toEqual(transactionsMock);
    });
  });

  describe('addTransaction()', () => {
    it("should add new transaction to transactions state", async () => {
      const { result } = makeSut();
  
      expect(result.current.transactions).toEqual([]);

      const { amount, category, title, type } = transactionsMock[0];
      const transactionInput: TransactionInput = {
        amount,
        category,
        title,
        type
      };

      act(() => {
        result.current.addTransaction(transactionInput);
      });

      const transaction = {
        ...transactionInput,
        id: dateMock.getTime(),
        createdAt: dateMock,
      };

      expect(result.current.transactions).toEqual([transaction]);
    });
    
    it("should call storageTransactions.add with correct value", async () => {
      const addSpy = jest.spyOn(storageTransactions, 'add');
      
      const { result } = makeSut();
  
      expect(result.current.transactions).toEqual([]);
  
      const { amount, category, title, type } = transactionsMock[0];
      const transactionInput: TransactionInput = {
        amount,
        category,
        title,
        type
      };
  
      act(() => {
        result.current.addTransaction(transactionInput);
      });
  
      const transaction = {
        ...transactionInput,
        id: dateMock.getTime(),
        createdAt: dateMock,
      };
  
      expect(addSpy).toHaveBeenCalledWith(transaction);

      addSpy.mockReset();
      addSpy.mockRestore();
    });
  });

  describe('delTransaction()', () => {
    it("should call storageTransactions.remove with correct value", async () => {
      const removeSpy = jest.spyOn(storageTransactions, 'remove');
      
      const { result } = makeSut();

      act(() => {
        result.current.delTransaction(transactionsMock[0].id);
      });

      expect(removeSpy).toHaveBeenCalledWith(transactionsMock[0].id);

      removeSpy.mockReset();
      removeSpy.mockRestore();
    });
    
    it("should delete transaction from transactions state", async () => {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(transactionsMock));
      
      const { result } = makeSut();
  
      expect(result.current.transactions).toEqual(transactionsMock);

      act(() => {
        result.current.delTransaction(transactionsMock[0].id);
      });

      expect(result.current.transactions).toEqual(transactionsMock.slice(1));

      act(() => {
        result.current.delTransaction(transactionsMock[1].id);
      });

      expect(result.current.transactions).toEqual(transactionsMock.slice(2));
    });
  });
});
