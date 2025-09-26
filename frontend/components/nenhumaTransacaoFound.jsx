import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "@/assets/styles/home.styles.js";
import { COLORS } from "../assets/styles/colors.js";
import { useRouter } from "expo-router";

const TransacaoVazia = () => {
  const router = useRouter();

  return (
    <View style={styles.emptyState}>
      <Ionicons
        name="receipt-outline"
        size={60}
        color={COLORS.textLight}
        style={styles.emptyStateIcon}
      />
      <Text style={styles.emptyStateTitle}>Nenhuma transacão ainda</Text>
      <Text style={styles.emptyStateText}>
        Começe adicionando suas transações para ver um resumo aqui.
      </Text>
      <TouchableOpacity style={styles.emptyStateButton} onPress={() => router.push("/create")}>
        <Ionicons name="add-circle" size={18} color={COLORS.white} />
        <Text style={styles.emptyStateButtonText}>Adicionar transação</Text>
      </TouchableOpacity>
    </View>
  );
};
export default TransacaoVazia;