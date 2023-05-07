import React from "react";
import { IExpense } from "../../interfaces/iExpense";

export interface IExpenseContextData {
  expenseList: IExpense[];
  addExpense: (expense: IExpense) => void;
  deleteExpense: (expenseId: string) => void;
}

const ExpenseContext = React.createContext<IExpenseContextData>({
  expenseList: [],
  addExpense: () => {},
  deleteExpense: () => {},
});

export default ExpenseContext;
