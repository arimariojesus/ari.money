import { useTransactions } from "../../hooks/useTransactions";
import { formatCurrencyValue, formatDateTime } from "../../utils";
import minusImg from "../../assets/minus.svg";
import * as S from "./styles";

export function TransactionsTable() {
  const { transactions, delTransaction } = useTransactions();

  return (
    <S.Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {formatCurrencyValue(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>{formatDateTime(transaction.createdAt)}</td>
              <td>
                <S.RemoveButton
                  type="button"
                  title="Remover transação"
                  onClick={() => delTransaction(transaction.id)}
                >
                  <img src={minusImg} alt="Remover transação" />
                </S.RemoveButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </S.Container>
  );
}
