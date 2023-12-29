import { Text, StyleSheet, View } from "react-native";
import { useState, useContext } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { ExpenseContext } from "../../context";
import { DEV_SERVER_URL, PROD_SERVER_URL } from "@env";

let serverURL: string;
if (__DEV__) {
  serverURL = DEV_SERVER_URL;
} else {
  serverURL = PROD_SERVER_URL;
}

const AssistantScreen = () => {
  const { expenseList } = useContext(ExpenseContext);
  const [messages, setMessages] = useState([]);

  const parseDate = (date: Date | string): string => {
    const DateObject = new Date(date);
    return DateObject.toLocaleDateString();
  };

  const handleSend = async (newMessages: any[] = []) => {
    try {
      // Get the user's message
      const userMessage = newMessages[0];

      // Add the user's message to the messages state
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, userMessage)
      );

      // Create prompt for GPT based on the user's message and expenses
      const systemMessage = `The user has the following expenses: ${expenseList
        .map(
          (expense) =>
            `On ${parseDate(expense.date!)}, they spent ${
              expense.sum
            } shekels on ${expense.category} which was for ${
              expense.description
            }.`
        )
        .join(" ")}`;

      const userMessageContent = userMessage.text;

      if (!expenseList.length) return;

      const response = await fetch(`${serverURL}/openai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: systemMessage },
            { role: "user", content: userMessageContent },
          ],
          max_tokens: 250,
        }),
      });

      const data = await response.json();

      if (data.error) {
        const botMessage: any = {
          _id: new Date().getTime() + 1,
          text: data.error.message,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Assistant",
          },
        };

        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, botMessage)
        );
        return;
      }

      if (data.choices && data.choices.length > 0) {
        const botMessage: any = {
          _id: new Date().getTime() + 1,
          text: data.choices[0].message.content,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Assistant",
          },
        };

        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, botMessage)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => handleSend(newMessages)}
      ></GiftedChat>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
});

export default AssistantScreen;
