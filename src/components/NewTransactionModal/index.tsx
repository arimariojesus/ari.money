import { FormEvent, useMemo } from "react";
import Modal from "react-modal";

import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import closeImg from "../../assets/close.svg";
import { useTransactions } from "../../hooks/use-transactions";

import * as S from "./styles";
import { TransactionInput } from "../../types/transaction";
import { useFormValues } from "../../hooks/use-form-values";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { addTransaction } = useTransactions();
  const {
    formValues,
    setFormValues,
    handleChangeFormValues,
    handleSubmitFormValues,
    handleClearFormValues,
  } = useFormValues<TransactionInput>({
    amount: 0,
    category: '',
    title: '',
    type: 'deposit',
  });

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await addTransaction(formValues);
    handleClearFormValues();
    onRequestClose();
  }

  const canSubmit = useMemo(
    () => 
      formValues.title &&
      formValues.category &&
      !Number.isNaN(formValues.amount),
    [formValues]
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <S.Container onSubmit={handleSubmitFormValues(handleCreateNewTransaction)}>
        <h2>Cadastrar transação</h2>

        <input
          type="text"
          placeholder="Título"
          name="title"
          value={formValues.title}
          onChange={handleChangeFormValues}
        />

        <input
          type="number"
          placeholder="Valor"
          name="amount"
          value={formValues.amount}
          onChange={handleChangeFormValues}
        />

        <S.TransactionTypeContainer>
          <S.RadioBox
            type="button"
            onClick={() => setFormValues(prev => ({ ...prev, type: "deposit" }))}
            isActive={formValues.type === "deposit"}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </S.RadioBox>

          <S.RadioBox
            type="button"
            onClick={() => setFormValues(prev => ({ ...prev, type: "withdraw" }))}
            isActive={formValues.type === "withdraw"}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </S.RadioBox>
        </S.TransactionTypeContainer>

        <input
          type="text"
          placeholder="Categoria"
          name="category"
          value={formValues.category}
          onChange={handleChangeFormValues}
        />

        <button type="submit" disabled={!canSubmit}>
          Cadastrar
        </button>
      </S.Container>
    </Modal>
  );
}
