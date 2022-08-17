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

  describe("remove()", () => {
    it("should remove the item from localStorage", () => {
      window.localStorage.setItem(key, JSON.stringify(transactionsMock));

      storageTransactions.remove(transactionsMock[0].id);

      expect(window.localStorage.getItem(key)).toStrictEqual(
        JSON.stringify(transactionsMock.slice(1))
      );

      storageTransactions.remove(transactionsMock[1].id);

      expect(window.localStorage.getItem(key)).toStrictEqual(
        JSON.stringify(transactionsMock.slice(2))
      );
    });
  });

  describe("clear()", () => {
    it("should clear the items from localStorage", () => {
      window.localStorage.setItem(key, JSON.stringify(transactionsMock));

      expect(window.localStorage.getItem(key)).toStrictEqual(
        JSON.stringify(transactionsMock)
      );

      storageTransactions.clear();

      expect(window.localStorage.getItem(key)).toBeNull();
    });
  });
});
