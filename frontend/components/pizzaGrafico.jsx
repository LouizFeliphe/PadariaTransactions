import { View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import GraficoVazio from "./vazioGrafico.jsx";
import { styles } from "../assets/styles/graficoPizza.styles.js";

const MeuDonut = ({ transacoes, categoria }) => {

    const ganho = transacoes[1].value
    const gasto = transacoes[0].value
    const total = ganho + gasto
    const porcentagem = ((ganho / total) * 100).toFixed(2)

    if (ganho === 0 && gasto === 0 && total === 0) {
        return (
            <GraficoVazio categoria={categoria} transacoes={[]} />
        )
    }

    return (
        <View style={styles.container}>
            <View
                style={styles.containerGrafico}
            >
                <PieChart
                    data={transacoes}
                    donut
                    radius={100}
                    innerRadius={85}
                    spacing={5}
                    animate
                    centerLabelComponent={() => (
                        <View style={styles.containerLabelComponent}>
                            <Text style={styles.textLabelComponent}>{porcentagem >= 50 ? `% ${parseFloat(porcentagem).toFixed(2)}` : `% ${(100 - porcentagem).toFixed(2)}`}</Text>
                            <Text style={styles.textLabelComponent2}>{porcentagem >= 50 ? "Ganho" : "Gasto"}</Text>
                        </View>
                    )}
                />
            </View>
            <View style={styles.containerLegendaTodos}>
                <View style={styles.containerLegendaEspecifico}>
                    <Text style={styles.textContainerLegendaEspecifico}>Categoria</Text>
                    <Text style={{ color: "#020000ff" }}>{categoria.toUpperCase()}</Text>
                </View>
                <View style={styles.containerLegendaEspecifico}>
                    <Text style={styles.textContainerLegendaEspecifico}>Total</Text>
                    <Text style={{ color: "#142dbaff" }}>{`R$ ${total.toFixed(2)}`}</Text>
                </View>
                <View style={styles.containerLegendaEspecifico}>
                    <Text style={styles.textContainerLegendaEspecifico}>Gasto</Text>
                    <Text style={{ color: "#a20a0aff" }}>{`R$ ${gasto.toFixed(2)}`}</Text>
                </View>
                <View style={styles.containerLegendaEspecifico}>
                    <Text style={styles.textContainerLegendaEspecifico}>Ganho</Text>
                    <Text style={{ color: "#0f8e2bff" }}>{`R$ ${ganho.toFixed(2)}`}</Text>
                </View>
            </View>
        </View>
    );
};

export default MeuDonut;
