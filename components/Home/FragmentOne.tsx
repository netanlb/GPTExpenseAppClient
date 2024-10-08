import React, { useRef, useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DEV_SERVER_URL, PROD_SERVER_URL } from "@env";
import TransactionContext from "../../context/Transaction/TransactionContext";
import { UserContext } from "../../context";

let serverURL: string;
if (__DEV__) {
  serverURL = DEV_SERVER_URL;
} else {
  serverURL = PROD_SERVER_URL;
}

type ViewRef = React.RefObject<View>;

const FragmentOne: React.FC = () => {
  const { fetchTransactions } = useContext(TransactionContext);
  const { user } = useContext(UserContext);
  const [tip, setTip] = useState<string>(`Hello ${user?.name}`);

  useEffect(() => {
    generateChatGptTip();
  }, []);

  const getCurrentMonthAndYear = () => {
    const date = new Date();
    return ["" + date.getMonth(), "" + date.getFullYear()];
  };
  const generateChatGptTip = async (): Promise<void> => {
    const [month, year] = getCurrentMonthAndYear();
    const currentMonthTransactions = await fetchTransactions({
      month: [month],
      year: [year],
    });

    let systemMessage;
    let userMessage;

    if (currentMonthTransactions.length) {
      systemMessage = `You are a motivational advisor who inspires positive financial decisions and habits. This month's transactions include: ${currentMonthTransactions
        .map(
          (transaction) =>
            `On ${parseDate(transaction.date!)}, ${
              transaction.sum
            } shekels were spent on ${transaction.category} for ${
              transaction.description
            }.`
        )
        .join(" ")}`;

      userMessage =
        "Please provide a concise, informative fact or observation about these transactions, in no more than 12 words.";
    } else {
      systemMessage =
        "You are a motivational advisor who inspires positive financial decisions and habits. I haven't recorded any transactions for this month.";
      userMessage =
        "Can you provide a fun and helpful financial tip or habit that I should consider adopting? in no more than 12 words.";
    }

    const body = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: userMessage },
      ],
      max_tokens: 35,
    };

    try {
      const response = await fetch(
        `${process.env.API_URL ?? serverURL}/openai`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (data.choices?.length) {
        setTip(data.choices[0].message.content);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const parseDate = (date: Date | string): string => {
    const DateObject = new Date(date);
    return DateObject.toLocaleDateString();
  };

  const viewRef: ViewRef = useRef<View>(null);

  return (
    <View ref={viewRef} style={styles.container}>
      <Text style={styles.text}>{tip}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    height: 80,
    backgroundColor: "#007AFF",
    elevation: 5,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    padding: 10,
    fontSize: 16,
    fontWeight: "600",
  },
  addButton: {
    marginLeft: 10,
  },
});

export default FragmentOne;
