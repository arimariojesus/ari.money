import { render, screen } from "@testing-library/react";
import { Header } from ".";

const makeSut = (onOpenNewTransactionModal = () => {}): void => {
  render(<Header onOpenNewTransactionModal={onOpenNewTransactionModal} />);
};

describe("Header", () => {
  it("should render", () => {
    makeSut();
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
