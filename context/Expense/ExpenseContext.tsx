import React from "react";
import { IExpense } from "../../interfaces/iExpense";

export interface IExpenseContextData {
  expenseList: IExpense[];
  addExpense: (expense: IExpense) => void;
  deleteExpense: (expenseId: string) => void;
  fetchExpenses: (queryParams?: {
    [key: string]: string[];
  }) => Promise<IExpense[]>;
  resetExpenses: (queryParams?: { [key: string]: string[] }) => void;
  isLoading: boolean;
}

const ExpenseContext = React.createContext<IExpenseContextData>({
  expenseList: [],
  addExpense: () => {},
  deleteExpense: () => {},
  fetchExpenses: () => Promise.resolve([]),
  resetExpenses: () => {},
  isLoading: false,
});

export default ExpenseContext;
