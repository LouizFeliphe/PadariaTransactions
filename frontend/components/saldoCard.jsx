import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "@/assets/styles/home.styles.js";
import { COLORS } from "@/assets/styles/colors.js";
import { useRouter } from "expo-router";

const SaldoCard = ({ sumario }) => {

  const router = useRouter();

  return (
    <View style={styles.balanceCard}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <View>  
          <Text style={styles.balanceTitle}>Saldo Total</Text>
          <Text style={styles.balanceAmount}>
            {isNaN(parseFloat(sumario.balance).toFixed(2)) ? "R$ 0" : `R$${parseFloat(sumario.balance).toFixed(2)}`}
          </Text>
        </View>
        {sumario.balance === "0" && sumario.income === "0" && sumario.expense === "0" ? null : (<TouchableOpacity style={styles.addButton} onPress={()=>router.push("/graficos")}>
          <Text style={styles.addButtonText}>Gráficos</Text>
        </TouchableOpacity>)} 
      </View>
      <View style={styles.balanceStats}>
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Renda</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.income }]}>
            {isNaN(parseFloat(sumario.income).toFixed(2)) ? "R$ 0" : `+R$${parseFloat(sumario.income).toFixed(2)}`}
          </Text>
        </View>
        <View style={[styles.balanceStatItem, styles.statDivider]} />
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Gastos</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.expense }]}>
            {isNaN(Math.abs(parseFloat(sumario.expense)).toFixed(2)) ? "R$ 0" : `-R$${Math.abs(parseFloat(sumario.expense)).toFixed(2)}`}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SaldoCard;