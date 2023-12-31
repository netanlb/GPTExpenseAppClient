import React, { useState, useEffect, useContext } from "react";
import { Transaction } from "../../interfaces/transaction.type";
import TransactionContext from "./TransactionContext";
import UserContext from "../User/UserContext";
import { DEV_SERVER_URL, PROD_SERVER_URL } from "@env";

interface TransactionProviderProps {
  children: React.ReactNode;
}

let serverURL: string;
if (__DEV__) {
  serverURL = DEV_SERVER_URL; // In development, use the local IP and port
} else {
  serverURL = PROD_SERVER_URL; // In production, use the production URL
}

const TransactionProvider: React.FC<TransactionProviderProps> = ({
  children,
}) => {
  const [transactionList, setTransactionList] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useContext(UserContext); // Access the userId from UserContext

  useEffect(() => {
    const [month, year] = getCurrentMonthAndYear();
    resetTransactions({ month: ["" + month], year: ["" + year] });
  }, [userId]); // Add userId as a dependency so that transactions are refetched whenever the user changes

  const fetchGroupedTransactions = async (
    year?: number,
    month?: number
  ): Promise<any[]> => {
    try {
      let url = new URL(
        `${process.env.API_URL ?? serverURL}/transaction/groupBy`
      );
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

      const groupedTransactions = await res.json();
      return groupedTransactions;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const fetchTransactions = async (queryParams?: {
    [key: string]: string[];
  }): Promise<Transaction[]> => {
    try {
      let url = new URL(`${process.env.API_URL ?? serverURL}/transaction`);
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

      const transactions: Transaction[] = await res.json();
      return transactions;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const resetTransactions = async (queryParams?: {
    [key: string]: string[];
  }) => {
    setIsLoading(true);
    const transactions = await fetchTransactions(queryParams);
    setTransactionList(transactions);
    setIsLoading(false);
  };

  const addTransaction = async (transaction: Transaction) => {
    setIsLoading(true);
    try {
      const url = `${process.env.API_URL ?? serverURL}/transaction`; // Adjust URL as needed
      const body = { ...transaction, user_id: userId };
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

      const newTransaction: Transaction = await res.json(); // Assuming the API returns the added transaction
      setTransactionList((prevTransactionList) => [
        newTransaction,
        ...prevTransactionList,
      ]);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  const updateTransaction = async (transaction: Transaction) => {
    setIsLoading(true);
    try {
      const url = `${process.env.API_URL ?? serverURL}/transaction/${
        transaction._id
      }`; // Adjust URL as needed
      const body = { ...transaction, user_id: userId };
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

      const newTransaction: Transaction = await res.json(); // Assuming the API returns the added transaction
      setTransactionList((prevTransactionList) => [
        newTransaction,
        ...prevTransactionList.filter((item) => item._id !== transaction._id),
      ]);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  const deleteTransaction = async (id: string) => {
    setIsLoading(true);
    try {
      const url = new URL(
        `${process.env.API_URL ?? serverURL}/transaction/${id}`
      );

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
      const newTransactionList = transactionList.filter(
        (transaction) => transaction._id !== id
      );
      setTransactionList(newTransactionList);
    } catch (error: any) {
      console.error(error.message);
    }
    setIsLoading(false);
  };

  const getCurrentMonthAndYear = () => {
    const date = new Date();
    return [date.getMonth(), date.getFullYear()];
  };

  return (
    <TransactionContext.Provider
      value={{
        transactionList,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        fetchTransactions,
        fetchGroupedTransactions,
        resetTransactions,
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
