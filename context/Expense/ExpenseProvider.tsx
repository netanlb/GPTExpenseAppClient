import React, { useState } from "react";
import { IExpense } from "../../interfaces/iExpense";
import ExpenseContext from "./ExpenseContext";
import { generateExpenses } from "../../devUtils";

const mock100Items = generateExpenses();
interface ExpenseProviderProps {
  children: React.ReactNode;
}

const ExpenseProvider: React.FC<ExpenseProviderProps> = ({ children }) => {
  const [expenseList, setExpenseList] = useState<IExpense[]>(mock100Items);

  const addExpense = (expense: IExpense) => {
    setExpenseList([...expenseList, expense]);
  };
  const deleteExpense = (expenseId: string) => {
    const newExpenseList = expenseList.filter(
      (expense) => expense.expenseId !== expenseId
    );
    setExpenseList(newExpenseList);
  };

  return (
    <ExpenseContext.Provider value={{ expenseList, addExpense, deleteExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;
