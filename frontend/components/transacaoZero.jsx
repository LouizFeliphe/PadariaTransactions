import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "@/assets/styles/home.styles.js";
import { COLORS } from "../assets/styles/colors.js";
import { useRouter } from "expo-router";

const NoTransactionsFound = () => {
  const router = useRouter();

  return (
    <View style={styles.emptyState}>
      <Ionicons
        name="receipt-outline"
        size={60}
        color={COLORS.textLight}
        style={styles.emptyStateIcon}
      />
      <Text style={styles.emptyStateTitle}>Nenhuma transação ainda</Text>
      <Text style={styles.emptyStateText}>
        Comece a vigiar suas economias por adicionar sua primeira transação
      </Text>
      <TouchableOpacity style={styles.emptyStateButton} onPress={() => router.push("/criar")}>
        <Ionicons name="add-circle" size={18} color={COLORS.white} />
        <Text style={styles.emptyStateButtonText}>Adicionar Transação</Text>
      </TouchableOpacity>
    </View>
  );
};
export default NoTransactionsFound;