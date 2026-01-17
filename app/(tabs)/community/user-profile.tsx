import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const profileImages: Record<string, any> = {
  "1": require("@/assets/images/user1.jpg"),
  "2": require("@/assets/images/user2.jpg"),
};

export default function UserProfile() {
  const router = useRouter();

  const {
    id,
    username,
    location,
    likes,
    comments,
    liked,
  } = useLocalSearchParams<{
    id: string;
    username: string;
    location: string;
    likes: string;
    comments: string;
    liked: string;
  }>();

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      {/* Profile Section */}
      <View style={styles.profileCard}>
        <Image
          source={profileImages[id]}
          style={styles.profilePic}
        />

        <Text style={styles.username}>{username}</Text>
        <Text style={styles.location}>{location}</Text>

        <Text style={styles.bio}>
          ❤️ {likes} likes • 💬 {comments} comments
        </Text>

        <TouchableOpacity style={styles.chatBtn}>
          <Text style={styles.chatText}>💬 Start Chat</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>
        Posts by {username}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 14, backgroundColor: "#fff" },
  back: { fontSize: 16, fontWeight: "700", marginBottom: 6 },
  profileCard: { alignItems: "center", marginTop: 6 },
  profilePic: { width: 90, height: 90, borderRadius: 45, marginBottom: 8 },
  username: { fontSize: 18, fontWeight: "700" },
  location: { fontSize: 13, color: "#777", marginTop: 2 },
  bio: { marginTop: 6, textAlign: "center" },
  chatBtn: {
    marginTop: 12,
    backgroundColor: "#FF5A5F",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 22,
  },
  chatText: { color: "#fff", fontWeight: "700" },
  sectionTitle: { marginTop: 18, fontSize: 16, fontWeight: "700" },
});
