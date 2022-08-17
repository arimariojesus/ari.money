import { render, screen } from "../../utils/test-utils";
import { Summary } from ".";

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';

const makeSut = (): void => {
  render(<Summary />);
};

describe("Header", () => {
  it("should render titles", () => {
    makeSut();
    expect(screen.getByText(/entradas/i)).toBeInTheDocument();
    expect(screen.getByText(/saídas/i)).toBeInTheDocument();
    expect(screen.getByText(/total/i)).toBeInTheDocument();
  });

  it("should render images with correct src", () => {
    makeSut();
    expect(screen.getByRole('img', { name: /entradas/i })).toHaveAttribute('src', incomeImg);
    expect(screen.getByRole('img', { name: /saídas/i })).toHaveAttribute('src', outcomeImg);
    expect(screen.getByRole('img', { name: /total/i })).toHaveAttribute('src', totalImg);
  });
});
