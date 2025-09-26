import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native'
import { useState } from 'react'
import { styles } from "@/assets/styles/auth.styles.js";
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/assets/styles/colors.js'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [error, setError] = useState(null)

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return
    setButtonLoading(true);
    

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error("A",JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      if(err.errors?.[0]?.code === 'form_password_incorrect' || err.errors?.[0]?.code === "form_identifier_not_found"){
        setError("Senha ou email incorretos")
      }else if (err.errors?.[0]?.code === 'form_param_nil' || err.errors?.[0]?.code === 'form_conditional_param_missing') {
        setError("Por favor, preencha todos os campos")
      }
      else{
        console.log(err.errors?.[0]?.code);
        
        setError("Algum erro aconteceu, tente novamente")
      }
    }finally {
      setButtonLoading(false);
    }
  }

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={60}>
      <View style={styles.container}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {loading && (
            <ActivityIndicator
              size="large"
              color="#7e2902ff"
              style={styles.loadingIndicator}
            />
          )}
          <Image source={require("../../assets/images/padeiro.png")} style={[styles.illustration2,{ opacity: loading ? 0 : 1 }]}
            contentFit="contain"
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
          />
        </View>
        <Text style={styles.title}>Bem-vindo de volta </Text>

        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense}/>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError(null)}>
              <Ionicons name="close" size={20} color={COLORS.textLight}/>
            </TouchableOpacity>
          </View>
        ) : null}  

        <TextInput
        style={[styles.input, error && styles.errorInput]}
          autoCapitalize="none"
          value={emailAddress}
          placeholderTextColor="#9AB478"
          placeholder="Inserir email"
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
        <TextInput
        style={[styles.input, error && styles.errorInput]}
          value={password}
          placeholderTextColor="#9AB478"
          placeholder="Inserir senha"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity style={styles.button} onPress={onSignInPress}  disabled={buttonLoading}>
          {buttonLoading ? (
            <ActivityIndicator size="small" color="#552701ff" />
          ) : (
             <Text style={styles.buttonText}>Entrar</Text>
          )}   
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}> Não tem uma conta ?</Text>
          <Link href="/sign-up" asChild>
          <TouchableOpacity>
            <Text style={styles.linkText}>Cadastre-se aqui !</Text>
          </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}