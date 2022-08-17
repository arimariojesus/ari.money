import { render, screen } from "../../utils/test-utils";
import { Summary } from ".";

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
});
