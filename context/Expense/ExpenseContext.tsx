import React from "react";
import { IExpense } from "../../interfaces/iExpense";

export interface IExpenseContextData {
  expenseList: IExpense[];
  addExpense: (expense: IExpense) => void;
  updateExpense: (expense: IExpense) => void;
  deleteExpense: (expenseId: string) => void;
  fetchExpenses: (queryParams?: {
    [key: string]: string[];
  }) => Promise<IExpense[]>;
  resetExpenses: (queryParams?: { [key: string]: string[] }) => void;
  fetchGroupedExpenses: (year?: number, month?: number) => Promise<any[]>;
  isLoading: boolean;
}

const ExpenseContext = React.createContext<IExpenseContextData>({
  expenseList: [],
  addExpense: () => {},
  updateExpense: () => {},
  deleteExpense: () => {},
  fetchExpenses: () => Promise.resolve([]),
  fetchGroupedExpenses: () => Promise.resolve([]),
  resetExpenses: () => {},
  isLoading: false,
});

export default ExpenseContext;
