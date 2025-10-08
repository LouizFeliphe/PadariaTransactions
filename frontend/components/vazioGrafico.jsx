import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { styles } from "@/assets/styles/home.styles.js";
import { COLORS } from "../assets/styles/colors.js";


const GraficoVazio = ({categoria, transacoes}) => {

  console.log(categoria);
  console.log(transacoes);
  
  
  return (
    <View style={styles.emptyState}>
      <Ionicons
        name={categoria && transacoes.length === 0 ? "close" : "analytics" }
        size={60}
        color={COLORS.textLight}
        style={styles.emptyStateIcon}
      />
      <Text style={styles.emptyStateTitle}>{categoria && transacoes.length === 0 ? "Nenhum dado" : "Nenhuma categoria selecionada"}</Text>
      <Text style={styles.emptyStateText}>
        {categoria && transacoes.length === 0 ? `Não há dados dessa categoria ${categoria.toUpperCase()}` : "Aplique uma categoria para visualizar os dados"}
      </Text>
    </View>
  );
};
export default GraficoVazio;