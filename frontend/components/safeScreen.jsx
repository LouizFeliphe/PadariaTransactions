import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../assets/styles/colors.js";

export default function SafeScreen({children}
) {
    
  const insets = useSafeAreaInsets();  
  return (
    <View
      style={{paddingTop:insets.top, paddingBottom: insets.bottom,flex: 1, backgroundColor: COLORS.background}}
    >
        {children}
    </View>
  );
}

