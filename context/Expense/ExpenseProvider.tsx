import React, { useState, useEffect, useContext } from "react";
import { IExpense } from "../../interfaces/iExpense";
import ExpenseContext from "./ExpenseContext";
import UserContext from "../User/UserContext";

interface ExpenseProviderProps {
  children: React.ReactNode;
}

const ExpenseProvider: React.FC<ExpenseProviderProps> = ({ children }) => {
  const [expenseList, setExpenseList] = useState<IExpense[]>([]);
  const { userId } = useContext(UserContext); // Access the userId from UserContext

  useEffect(() => {
    fetchExpenses();
  }, [userId]); // Add userId as a dependency so that expenses are refetched whenever the user changes

  const fetchExpenses = async (queryParams?: { [key: string]: string[] }) => {
    try {
      let url = new URL(`http://10.100.102.98:5000/cost`);
      url.searchParams.append("user_id", userId!);

      if (queryParams) {
        Object.entries(queryParams).forEach(
          ([key, values]: [string, string[]]) => {
            values.forEach((value: string) =>
              url.searchParams.append(key, value)
            );
          }
        );

        console.log(url);
      }

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const expenses: IExpense[] = await res.json();
      setExpenseList(expenses);
    } catch (err) {
      console.error(err);
      setExpenseList([]);
    }
  };

  const addExpense = async (expense: IExpense) => {
    try {
      const url = `http://10.100.102.98:5000/cost/`; // Adjust URL as needed
      const body = { ...expense, user_id: userId };
      console.log(body);
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const newExpense: IExpense = await res.json(); // Assuming the API returns the added expense
      setExpenseList((prevExpenseList) => [newExpense, ...prevExpenseList]);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteExpense = (id: string) => {
    const newExpenseList = expenseList.filter((expense) => expense._id !== id);
    setExpenseList(newExpenseList);
  };

  return (
    <ExpenseContext.Provider
      value={{ expenseList, addExpense, deleteExpense, fetchExpenses }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;
