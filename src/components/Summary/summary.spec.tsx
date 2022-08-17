import { render, screen } from "../../utils/test-utils";
import { Summary } from ".";

import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";
import { transactionsMock } from "../../mocks";

const makeSut = (): void => {
  render(<Summary />);
};

describe("Summary", () => {
  it("should render titles", () => {
    makeSut();
    expect(screen.getByText(/entradas/i)).toBeInTheDocument();
    expect(screen.getByText(/saídas/i)).toBeInTheDocument();
    expect(screen.getByText(/total/i)).toBeInTheDocument();
  });

  it("should render images with correct src", () => {
    makeSut();
    expect(screen.getByRole("img", { name: /entradas/i })).toHaveAttribute(
      "src",
      incomeImg
    );
    expect(screen.getByRole("img", { name: /saídas/i })).toHaveAttribute(
      "src",
      outcomeImg
    );
    expect(screen.getByRole("img", { name: /total/i })).toHaveAttribute(
      "src",
      totalImg
    );
  });

  it("should render values correctly", () => {
    makeSut();
    expect(screen.getAllByText('R$ 0,00')).toHaveLength(2);
    expect(screen.getAllByText('- R$ 0,00')).toHaveLength(1);

    window.localStorage.setItem('@app:transactions', JSON.stringify(transactionsMock));

    makeSut();
    
    // income
    expect(screen.getByText('R$ 1.500,00')).toBeInTheDocument();
    // expense
    expect(screen.getByText('- R$ 760,00')).toBeInTheDocument();
    // total
    expect(screen.getByText('R$ 740,00')).toBeInTheDocument();
  });
});
