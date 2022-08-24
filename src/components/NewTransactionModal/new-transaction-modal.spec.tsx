import Modal from "react-modal";
import { render, screen } from "../../utils";
import { NewTransactionModal } from ".";
import { useEffect } from "react";

const makeSut = (isOpen = false, onRequestClose = () => undefined) => {
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
    makeSut();

    const modal = screen.queryByRole('dialog');
    expect(modal).toBeNull();
  });
  
  it("should show modal the when isOpen is true", () => {
    makeSut(true);

    const modal = screen.queryByRole('dialog');
    expect(modal).toBeInTheDocument();
  });
});
