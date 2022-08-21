import { TransactionsTable } from ".";
import { formatCurrencyValue, render, screen, storageTransactions } from "../../utils";
import { transactionsMock } from "../../mocks";

const { key } = storageTransactions;

describe('TransactionsTable Component', () => {
  it('should have correct header cells', () => {
    render(<TransactionsTable />);
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /título/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /valor/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /categoria/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /data/i })).toBeInTheDocument();
  });
  
  it('should render empty initally', () => {
    render(<TransactionsTable />);
    expect(screen.queryAllByRole('cell')).toHaveLength(0);
  });
  
  it('should map correct amount of items', () => {
    window.localStorage.setItem(key, JSON.stringify(transactionsMock));
    
    const { unmount } = render(<TransactionsTable />);
    
    expect(screen.getAllByRole('row')).toHaveLength(transactionsMock.length + 1); // items + rowheader
    
    unmount();
    window.localStorage.clear();
    render(<TransactionsTable />);
    
    expect(screen.getAllByRole('row')).toHaveLength(1);
  });
  
  it('should render items correctly', () => {
    const item = transactionsMock[0];
    window.localStorage.setItem(key, JSON.stringify([item]));
    
    render(<TransactionsTable />);
    
    expect(screen.getByRole('cell', { name: item.title }))
      .toHaveTextContent(item.title);
    expect(screen.getByRole('cell', { name: formatCurrencyValue(item.amount) }))
      .toHaveClass(item.type);
    expect(screen.getByRole('cell', { name: formatCurrencyValue(item.amount) }))
      .toHaveTextContent(new RegExp(`${item.amount}`));
  });
});
