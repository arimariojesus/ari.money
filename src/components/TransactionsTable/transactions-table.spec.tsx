import { render, screen } from "../../utils";
import { TransactionsTable } from ".";

describe('TransactionsTable Component', () => {
  it('should have correct header cells', () => {
    render(<TransactionsTable />);
    const table = screen.getByRole('table')
    expect(table).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /título/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /valor/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /categoria/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /data/i })).toBeInTheDocument();
  });
});
