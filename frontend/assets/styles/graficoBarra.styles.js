import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "column", alignItems: "stretch", justifyContent: "center"
    },
    containerNavegacao:{
        flexDirection: 'row', justifyContent: 'center', alignItems: "center", gap: 25, marginTop: 15, marginBottom: 40
    },
    containerBotoes: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    graficoTitulo: {
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    graficoTituloTexto: {
        fontSize: 18,
        fontWeight: "700",
        color: "#000000ff"
    },
    graficoTituloTexto2: {
        fontWeight: '300', fontSize: 17, color: "black"
    },
    graficoTituloTexto3: {
        fontWeight: '700',
        fontSize: 32
    },
    xAxisTextStyle: {
        color: "#000000ff",
        fontSize: 15,
        fontWeight: "500"
    },
    yAxisStyle: {
        color: "#000000ff",
        fontSize: 11,
        fontWeight: "500"
    },
    tabsContainerStyles: {
        width: 220, 
    },
    tabStyles: {
        borderColor: "#000000ff", 
        backgroundColor: "#e0dedeff", 
    },
    tabTextStyles: {
        color: "#333",
    },
    activeTabtextStyles:{
        color: "#fff5f5ff", 
        fontWeight: "bold",
    }


})