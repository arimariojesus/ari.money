import { render, screen } from "@testing-library/react";
import { Header } from ".";

import logoImg from '../../assets/logo.svg';

const makeSut = (onOpenNewTransactionModal = () => {}): void => {
  render(<Header onOpenNewTransactionModal={onOpenNewTransactionModal} />);
};

describe("Header", () => {
  it("should render", () => {
    makeSut();
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
  
  it("should img have correct src", () => {
    makeSut();
    expect(screen.getByAltText('ari money')).toHaveAttribute('src', logoImg);
  });
});
