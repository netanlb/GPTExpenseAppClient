import React, { useState } from "react";
import { IExpense, IExpenseContextData } from "../../interfaces/iExpense";
import ExpenseContext from "./ExpenseContext";

const initialExpenses: IExpense[] = [
  {
    expenseId: "1",
    cost: 50,
    name: "Groceries",
    category: "Food",
    date: new Date(),
  },
  {
    expenseId: "2",
    cost: 20,
    name: "Movie ticket",
    category: "Entertainment",
    date: new Date(),
  },
];

interface ExpenseProviderProps {
  children: React.ReactNode;
}

const ExpenseProvider: React.FC<ExpenseProviderProps> = ({ children }) => {
  const [expenseList, setExpenseList] = useState<IExpense[]>([]);

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
