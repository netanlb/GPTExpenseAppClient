import React, { useState, useEffect, useContext } from "react";
import { IExpense } from "../../interfaces/iExpense";
import ExpenseContext from "./ExpenseContext";
import UserContext from "../User/UserContext";
import { DEV_SERVER_URL, PROD_SERVER_URL } from "@env";

interface ExpenseProviderProps {
  children: React.ReactNode;
}

let serverURL: string;
if (__DEV__) {
  serverURL = DEV_SERVER_URL; // In development, use the local IP and port
} else {
  serverURL = PROD_SERVER_URL; // In production, use the production URL
}

const ExpenseProvider: React.FC<ExpenseProviderProps> = ({ children }) => {
  const [expenseList, setExpenseList] = useState<IExpense[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useContext(UserContext); // Access the userId from UserContext

  useEffect(() => {
    const [month, year] = getCurrentMonthAndYear();
    resetExpenses({ month: ["" + month], year: ["" + year] });
  }, [userId]); // Add userId as a dependency so that expenses are refetched whenever the user changes

  const fetchGroupedExpenses = async (
    year?: number,
    month?: number
  ): Promise<any[]> => {
    try {
      console.log(serverURL);
      let url = new URL(`${serverURL}/cost/groupBy`);
      url.searchParams.append("user_id", userId!);
      if (year) url.searchParams.append("year", year.toString());
      if (month) url.searchParams.append("month", month.toString());

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const groupedExpenses = await res.json();
      return groupedExpenses;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const fetchExpenses = async (queryParams?: {
    [key: string]: string[];
  }): Promise<IExpense[]> => {
    try {
      console.log("fetching...");
      let url = new URL(`${serverURL}/cost`);
      url.searchParams.append("user_id", userId!);

      if (queryParams) {
        Object.entries(queryParams).forEach(
          ([key, values]: [string, string[]]) => {
            values.forEach((value: string) =>
              url.searchParams.append(key, value)
            );
          }
        );
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
      return expenses;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const resetExpenses = async (queryParams?: { [key: string]: string[] }) => {
    setIsLoading(true);
    const expenses = await fetchExpenses(queryParams);
    setExpenseList(expenses);
    setIsLoading(false);
  };

  const addExpense = async (expense: IExpense) => {
    setIsLoading(true);
    try {
      const url = `${serverURL}/cost`; // Adjust URL as needed
      const body = { ...expense, user_id: userId };
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
    setIsLoading(false);
  };

  const updateExpense = async (expense: IExpense) => {
    setIsLoading(true);
    try {
      const url = `${serverURL}/cost/${expense._id}`; // Adjust URL as needed
      const body = { ...expense, user_id: userId };
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const newExpense: IExpense = await res.json(); // Assuming the API returns the added expense
      setExpenseList((prevExpenseList) => [
        newExpense,
        ...prevExpenseList.filter((item) => item._id !== expense._id),
      ]);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  const deleteExpense = async (id: string) => {
    setIsLoading(true);
    try {
      const url = new URL(`${serverURL}/cost/${id}`);

      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      // delete on the client
      const newExpenseList = expenseList.filter(
        (expense) => expense._id !== id
      );
      setExpenseList(newExpenseList);
    } catch (error: any) {
      console.log(error.message);
    }
    setIsLoading(false);
  };

  const getCurrentMonthAndYear = () => {
    const date = new Date();
    return [date.getMonth(), date.getFullYear()];
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenseList,
        addExpense,
        updateExpense,
        deleteExpense,
        fetchExpenses,
        fetchGroupedExpenses,
        resetExpenses,
        isLoading,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;
