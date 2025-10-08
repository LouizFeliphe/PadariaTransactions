import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center', flex: 1,
        flexDirection: "row", gap: 30
    },
    containerGrafico: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 110,
        borderWidth: 3,
        borderColor: 'black',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    containerLegendaTodos:{
        flexDirection: "column", 
        gap: 15
    },
    containerLegendaEspecifico:{
        flexDirection: "column",justifyContent: "center", 
        alignItems: "center",fontSize: 15, fontWeight: 'bold'
    },
    textContainerLegendaEspecifico:{
        fontSize: 15, fontWeight: 'bold'
    },
    containerLabelComponent:{
        justifyContent: 'center', 
        alignItems: 'center'
    },
    textLabelComponent: {
        fontSize: 30, fontWeight: 'bold'
    },
    textLabelComponent2: {
        fontSize: 20, fontWeight: 'bold'
    },
})