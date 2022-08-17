import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import { TransactionsProvider } from "../hooks/useTransactions";

type CustomRenderProps = Omit<RenderOptions, 'queries'>;

const customRender = (ui: ReactElement, options?: CustomRenderProps) => {
  render(
    <TransactionsProvider>
      {ui}
    </TransactionsProvider>,
    options
  );
};

export * from '@testing-library/react';
export { customRender as render };
