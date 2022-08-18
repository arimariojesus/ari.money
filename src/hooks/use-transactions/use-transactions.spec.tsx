import { renderHook } from "@testing-library/react-hooks";

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

describe("useTransactions", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("should load initial transactions correctly", async () => {
    const firstRender = makeSut();

    expect(firstRender.result.current.transactions).toEqual([]);

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(transactionsMock));

    const secondRender = makeSut();

    expect(secondRender.result.current.transactions).toEqual(transactionsMock);
  });
});
