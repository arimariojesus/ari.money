import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
  
  it("should call function on click new transaction button", () => {
    const func = jest.fn();

    makeSut(func);

    const button = screen.getByRole('button', { name: /nova transação/i })

    userEvent.click(button)
    
    expect(func).toHaveBeenCalledTimes(1);
  });
});
