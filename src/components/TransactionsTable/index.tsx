import { useTransactions } from "../../hooks/useTransactions";
import { formatCurrenyValue, formatDateTime } from "../../utils";
import * as S from "./styles";

export function TransactionsTable() {
  const { transactions } = useTransactions();

  return (
    <S.Container>
      <table>
        <thead>
          <th>Título</th>
          <th>Valor</th>
          <th>Categoria</th>
          <th>Data</th>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {formatCurrenyValue(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>
                {formatDateTime(transaction.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </S.Container>
  );
}
