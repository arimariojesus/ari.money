import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from "miragejs";
import App from './App';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Conta de energia',
          type: 'withdraw',
          category: 'Casa',
          amount: 160,
          createdAt: new Date('2021-02-12 09:00:00'),
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 600,
          createdAt: new Date('2021-02-09 09:00:00'),
        },
        {
          id: 3,
          title: 'Salário',
          type: 'deposit',
          category: 'Trabalho',
          amount: 1500,
          createdAt: new Date('2021-02-05 09:00:00'),
        }
      ],
    });
  },

  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return this.schema.all('transaction');
    });

    this.post('/transactions', async (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
