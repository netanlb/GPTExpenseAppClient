import React, { useState } from "react";
import { IExpense } from "../../interfaces/iExpense";
import ExpenseContext from "./ExpenseContext";
import { generateExpenses } from "../../devUtils";

const mock100Items = generateExpenses();
interface ExpenseProviderProps {
  children: React.ReactNode;
}

const ExpenseProvider: React.FC<ExpenseProviderProps> = ({ children }) => {
  const [expenseList, setExpenseList] = useState<IExpense[]>(
    mock100Items.sort(
      (a: IExpense, b: IExpense) => a.date.getTime() - b.date.getTime()
    )
  );

  const addExpense = (expense: IExpense) => {
    setExpenseList([expense, ...expenseList]);
  };
  const deleteExpense = (id: string) => {
    const newExpenseList = expenseList.filter((expense) => expense.id !== id);
    setExpenseList(newExpenseList);
  };

  return (
    <ExpenseContext.Provider value={{ expenseList, addExpense, deleteExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;
