import React, { useRef, useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ExpenseContext, UserContext } from "../../context";
import { GPT_API_KEY_ADAM as GPT_API_KEY } from "@env";

type ViewRef = React.RefObject<View>;

const FragmentOne: React.FC = () => {
  const { fetchExpenses } = useContext(ExpenseContext);
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
    const currentMonthExpenses = await fetchExpenses({
      month: [month],
      year: [year],
    });

    const systemMessage = `My expenses are as follows: ${currentMonthExpenses
      .map(
        (expense) =>
          `On ${parseDate(expense.date)}, I spent ${expense.sum} shekels on ${
            expense.category
          } which was for ${expense.description}.`
      )
      .join(" ")}`;

    const userMessage =
      "generate a fact about my expenses this month, it could be a crictism, humorous comment, informative observation, warning of bad or encouragement of good behavior, no longer than 12 words, refer to the user as 'you'.";

    const url = "https://api.openai.com/v1/chat/completions";
    const body = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: userMessage },
      ],
      max_tokens: 35,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GPT_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.choices?.length) {
        setTip(data.choices[0].message.content);
      }
    } catch (error: any) {
      console.log(error.message);
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
