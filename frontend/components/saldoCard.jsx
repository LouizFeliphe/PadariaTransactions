import { View, Text } from "react-native";
import { styles } from "@/assets/styles/home.styles.js";
import { COLORS } from "@/assets/styles/colors.js";

const SaldoCard = ({ sumario }) => {
  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceTitle}>Saldo Total</Text>
      <Text style={styles.balanceAmount}>
        { isNaN(parseFloat(sumario.balance).toFixed(2)) ? "R$ 0": `R$${parseFloat(sumario.balance).toFixed(2)}`}
        </Text>
      <View style={styles.balanceStats}>
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Renda</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.income }]}>
            { isNaN(parseFloat(sumario.income).toFixed(2)) ? "R$ 0": `+R$${parseFloat(sumario.income).toFixed(2)}`}   
          </Text>
        </View>
        <View style={[styles.balanceStatItem, styles.statDivider]} />
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Gastos</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.expense }]}>
            { isNaN(Math.abs(parseFloat(sumario.expense)).toFixed(2)) ? "R$ 0": `-R$${Math.abs(parseFloat(sumario.expense)).toFixed(2)}`}         
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SaldoCard;