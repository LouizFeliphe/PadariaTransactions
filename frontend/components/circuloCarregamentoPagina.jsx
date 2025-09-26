import { ActivityIndicator, View } from "react-native"
import { COLORS } from "@/assets/styles/colors.js"

const CirculoCarregamentoPagina = () => {

    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
        }}>
            <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
    )
}

export default CirculoCarregamentoPagina;