import { useTransactions } from "../../hooks/useTransactions";
import { formatCurrenyValue, formatDateTime } from "../../utils";
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
                {formatCurrenyValue(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>
                {formatDateTime(transaction.createdAt)}
              </td>
              <td>
                <button
                  style={{
                    color: 'red',
                    fontWeight: 600,
                    border: 'none',
                    background: 'none',
                    height: '30px',
                    width: '30px',
                  }}
                  onClick={() => delTransaction(transaction.id)}
                >
                  -
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </S.Container>
  );
}
