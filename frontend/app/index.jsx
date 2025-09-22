import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { Image } from "expo-image";

export default function Index() {
  return (
    <View
      style={
        styles.container
      }
    >
      <Text style={{color:"blue"}}>Edit app/index.tsx to edit this screen.</Text>
      <Link href={"/about"}>About</Link>

      {/* <Image source={{uri: "https://rocco.com.br/wp-content/uploads/2023/08/9786555323658-scaled.jpg"}}
      style={{width: 100, height: 150}}
      /> */}

      {/* <Image source={require("@/assets/images/react-logo.png")}  style={{width: 100, height: 100}}/> */}
      <View>
        <Text>HEllo</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});