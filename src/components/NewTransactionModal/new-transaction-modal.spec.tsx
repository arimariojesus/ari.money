import Modal from "react-modal";
import { act, render, screen } from "../../utils";
import { NewTransactionModal } from ".";
import { useEffect } from "react";
import userEvent from "@testing-library/user-event";

const makeSut = (isOpen = true, onRequestClose = () => undefined) => {
  const ElementHelper = () => {
    useEffect(() => {
      Modal.setAppElement('#test');
    });
    
    return (
      <div id="test">
        <NewTransactionModal isOpen={isOpen} onRequestClose={onRequestClose} />
      </div>
    );
  };
  
  render(<ElementHelper />);
};

describe("NewTransactionModal Component", () => {
  it("should not show the modal when isOpen is false", () => {
    makeSut(false);

    const modal = screen.queryByRole('dialog');
    expect(modal).toBeNull();
  });
  
  it("should show modal the when isOpen is true", () => {
    makeSut();

    const modal = screen.queryByRole('dialog');
    expect(modal).toBeInTheDocument();
  });
  
  it("should call onRequestClose when close button is clicked", () => {
    const onRequestClose = jest.fn();
    
    makeSut(true, onRequestClose);

    const closeButton = screen.getByAltText(/fechar modal/i);
    
    act(() => {
      userEvent.click(closeButton);
    });

    expect(onRequestClose).toBeCalledTimes(1);
  });
});
