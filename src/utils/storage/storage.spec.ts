import { storageTransactions } from ".";
import { transactionsMock } from "../../mocks";

const { key } = storageTransactions;

describe("StorageTransactions", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  describe("set()", () => {
    it("should add the items to localStorage", () => {
      storageTransactions.set(transactionsMock);

      expect(window.localStorage.getItem(key)).toStrictEqual(
        JSON.stringify(transactionsMock)
      );
    });
  });

  describe("add()", () => {
    it("should add the item to localStorage", () => {
      storageTransactions.add(transactionsMock[0]);

      expect(window.localStorage.getItem(key)).toStrictEqual(
        JSON.stringify([transactionsMock[0]])
      );
      
      storageTransactions.add(transactionsMock[1]);

      expect(window.localStorage.getItem(key)).toStrictEqual(
        JSON.stringify([transactionsMock[0], transactionsMock[1]])
      );
    });
  });

  describe("getAll()", () => {
    it("should return the items from localStorage", () => {
      window.localStorage.setItem(key, JSON.stringify(transactionsMock));

      expect(storageTransactions.getAll()).toStrictEqual(transactionsMock);
    });
  });
});
