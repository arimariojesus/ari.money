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
});
