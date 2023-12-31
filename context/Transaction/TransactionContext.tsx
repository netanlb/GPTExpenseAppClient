import React from "react";
import { Transaction } from "../../interfaces/transaction.type";

export interface ITransactionContextData {
  transactionList: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (transaction: Transaction) => void;
  deleteTransaction: (transactionId: string) => void;
  fetchTransactions: (queryParams?: {
    [key: string]: string[];
  }) => Promise<Transaction[]>;
  resetTransactions: (queryParams?: { [key: string]: string[] }) => void;
  fetchGroupedTransactions: (year?: number, month?: number) => Promise<any[]>;
  isLoading: boolean;
}

const TransactionContext = React.createContext<ITransactionContextData>({
  transactionList: [],
  addTransaction: () => {},
  updateTransaction: () => {},
  deleteTransaction: () => {},
  fetchTransactions: () => Promise.resolve([]),
  fetchGroupedTransactions: () => Promise.resolve([]),
  resetTransactions: () => {},
  isLoading: false,
});

export default TransactionContext;
