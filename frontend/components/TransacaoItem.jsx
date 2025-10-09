import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/assets/styles/home.styles.js";
import { COLORS } from "../assets/styles/colors.js";
import { formatDate } from "../lib/utils.js";

// Mapa das Categorias para seus respectivos icones 
const CATEGORY_ICONS = {
  laticinio: require("../assets/images/leite.png"),
  frios: require("../assets/images/salame.png"),
  paes: require("../assets/images/trigo.png"),
  doce: require("../assets/images/doce.png"),
  refrigerante: require("../assets/images/refrigerante.png"),
  chips: require("../assets/images/chips.png"),
  dinheiro: require("../assets/images/dinheiro.png"),
  enlatado: require("../assets/images/enlatado.png"),
  ingrediente: require("../assets/images/ingredientes.png"),
  other: require("../assets/images/pendente.png"),
};

export const ItemFuncao = ({ item, onDelete }) => {
  
  const isIncome = parseFloat(item.amount) > 0;
  const iconName = CATEGORY_ICONS[item.category] || require("../assets/images/preco.png");

  return (
    <View style={styles.transactionCard} key={item.id}>
      <TouchableOpacity style={styles.transactionContent}>
        <View style={styles.categoryIconContainer}>
          <Image source={iconName} style={styles.iconPersonalized}/>
        </View>
        <View style={styles.transactionLeft}>
          <Text style={styles.transactionTitle}>{item.title}</Text>
          <Text style={styles.transactionCategory}>{item.category}</Text>
        </View>
        <View style={styles.transactionRight}>
          <Text
            style={[styles.transactionAmount, { color: isIncome ? COLORS.income : COLORS.expense }]}
          >
            {isIncome ? "+" : "-"}${Math.abs(parseFloat(item.amount)).toFixed(2)}
          </Text>
          <Text style={styles.transactionDate}>{formatDate(item.created_at)}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.id)}>
        <Ionicons name="trash-outline" size={20} color={COLORS.expense} />
      </TouchableOpacity>
    </View>
  );
};