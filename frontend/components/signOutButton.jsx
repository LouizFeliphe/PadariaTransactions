import { useClerk } from '@clerk/clerk-expo'
import { TouchableOpacity,Alert } from 'react-native'
import { styles } from '@/assets/styles/home.styles.js'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/assets/styles/colors.js'

export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk()
  const handleSignOut = async () => {
    Alert.alert("Confirmação", "Tem certeza que deseja sair?", [
      {
        text: "Cancelar", style: "cancel"},
      { text: "Sair", style: "destructive",onPress: async () => {
        try {
          await signOut()
        } catch (error) {
          console.log("Erro ao sair: ", error)
        } 
      }},])
  }
  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
      <Ionicons name='log-out-outline' size={22} color={COLORS.text}/>
    </TouchableOpacity>
  )
}