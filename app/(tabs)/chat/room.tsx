import { API_BASE_URL } from "@/config/api";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Room() {
  const { chatId, title } = useLocalSearchParams<{
    chatId: string;
    title?: string;
  }>();

  const CHAT_ID = chatId;          
  const USER_ID = "U003";         

  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState("");
  const scrollRef = useRef<ScrollView>(null);

  // Load messages
  const loadMessages = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/messages/${CHAT_ID}`
      );
      setMessages(res.data);
    } catch (err) {
      console.log("Load messages error", err);
    }
  };

  useEffect(() => {
    if (CHAT_ID) {
      loadMessages();
    }
  }, [CHAT_ID]);

  const sendMessage = async () => {
    if (!inputText.trim() || !CHAT_ID) return;

    const payload = {
      ChatId: CHAT_ID,
      SenderId: USER_ID,
      Text: inputText,
    };

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/messages/send`,
        payload
      );

      setMessages((prev) => [...prev, res.data]);
      setInputText("");

      setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (err) {
      console.log("Send message error", err);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView ref={scrollRef} style={styles.messages}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={
              msg.SenderId === USER_ID
                ? styles.messageSent
                : styles.messageReceived
            }
          >
            <Text>{msg.Text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  messages: {
    flex: 1,
    paddingHorizontal: 15,
  },
  messageReceived: {
    alignSelf: "flex-start",
    backgroundColor: "#EAEAEA",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: "75%",
  },
  messageSent: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: "75%",
  },
  inputRow: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#EEE",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  sendBtn: {
    marginLeft: 10,
    backgroundColor: "#000",
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: "center",
  },
  sendText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
