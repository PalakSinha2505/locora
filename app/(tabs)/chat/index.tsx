import { API_BASE_URL } from "@/config/api";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const recommendedGroups = [
  {
    id: "r1",
    name: "Jaipur Explorers",
    members: "156",
    img: "https://picsum.photos/seed/jaipur/100",
  },
  {
    id: "r2",
    name: "Thar Desert Adventurers",
    members: "89",
    img: "https://picsum.photos/seed/thar/100",
  },
];

export default function ChatList() {
  const router = useRouter();
  const [chats, setChats] = useState<any[]>([]);

  const loadChats = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/chat`);
      setChats(res.data);
    } catch (err) {
      console.log("Load chats error", err);
    }
  };

  useEffect(() => {
    loadChats();
  }, []);

  const openChat = (chat: any) => {
    router.push({
      pathname: "/chat/room",
      params: {
        chatId: chat.ChatId,
        title: chat.GroupName,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>MESSAGES</Text>
        <Pressable style={styles.plusBtn}>
          <Ionicons name="add-outline" size={20} color="#fff" />
        </Pressable>
      </View>

      {/* SEARCH */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={16} color="#888" />
        <TextInput placeholder="Search chats or groups..." style={styles.searchInput} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* RECOMMENDED GROUPS */}
        <View style={styles.recommendationSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Join Travel Groups</Text>
            <Text style={styles.seeAll}>See all</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {recommendedGroups.map((group) => (
              <View key={group.id} style={styles.groupCard}>
                <Image source={{ uri: group.img }} style={styles.groupImage} />
                <Text style={styles.groupName}>{group.name}</Text>
                <Text style={styles.groupMembers}>
                  {group.members} active travelers
                </Text>
                <Pressable style={styles.joinBtn}>
                  <Ionicons name="person-add-outline" size={12} color="#fff" />
                  <Text style={styles.joinBtnText}>JOIN NOW</Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* CREATE GROUP */}
        <Pressable style={styles.createGroup}>
          <View style={styles.createIcon}>
            <Ionicons name="people-outline" size={20} color="#999" />
          </View>
          <View>
            <Text style={styles.createTitle}>Create New Group</Text>
            <Text style={styles.createSubtitle}>
              Coordinate with fellow explorers
            </Text>
          </View>
        </Pressable>

        {/* CHAT LIST */}
        <View style={styles.chatList}>
          {chats.map((item) => (
            <Pressable
              key={item._id}
              style={styles.chatCard}
              onPress={() => openChat(item)}
            >
              <Image
                source={{
                  uri: `https://api.dicebear.com/7.x/initials/png?seed=${item.GroupName}`,
                }}
                style={styles.avatar}
              />
              <View style={{ flex: 1 }}>
                <View style={styles.chatTopRow}>
                  <Text style={styles.chatName}>{item.GroupName}</Text>
                  <Text style={styles.chatTime}>Now</Text>
                </View>
                <Text style={styles.chatMsg}>Tap to open chat</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  title: { fontSize: 20, fontWeight: "900", fontStyle: "italic" },
  plusBtn: {
    backgroundColor: "#fbbf24",
    padding: 10,
    borderRadius: 14,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 25,
    height: 40,
    gap: 8,
  },
  searchInput: { flex: 1 },

  recommendationSection: { marginBottom: 10 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionLabel: { fontSize: 10, fontWeight: "900", color: "#888" },
  seeAll: { fontSize: 10, fontWeight: "700", color: "#fbbf24" },

  groupCard: {
    width: 170,
    backgroundColor: "#fef3c7",
    borderRadius: 20,
    marginLeft: 16,
    padding: 12,
    alignItems: "center",
  },
  groupImage: { width: 50, height: 50, borderRadius: 12, marginBottom: 6 },
  groupName: { fontSize: 12, fontWeight: "700", textAlign: "center" },
  groupMembers: { fontSize: 10, color: "#555", marginBottom: 6 },
  joinBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fbbf24",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  joinBtnText: { fontSize: 10, color: "#fff", fontWeight: "700" },

  createGroup: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    margin: 16,
    padding: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#ccc",
  },
  createIcon: {
    width: 48,
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  createTitle: { fontSize: 14, fontWeight: "700" },
  createSubtitle: { fontSize: 10, color: "#666" },

  chatList: { paddingHorizontal: 16, paddingBottom: 30 },
  chatCard: {
    flexDirection: "row",
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  avatar: { width: 50, height: 50, borderRadius: 14 },
  chatTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  chatName: { fontSize: 14, fontWeight: "700" },
  chatTime: { fontSize: 10, color: "#888" },
  chatMsg: { fontSize: 12, color: "#555" },
});
