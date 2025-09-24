import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { styles } from "@/assets/styles/auth.styles.js";
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/assets/styles/colors.js'
import { Image } from 'expo-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return
    setButtonLoading(true);

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err) {
      if (err.errors?.[0]?.code === 'form_identifier_exists') {
        setError("Email já cadastrado, tente outro !")
      }
      else if (err.errors?.[0]?.code === 'form_param_nil' || err.errors?.[0]?.code === 'form_conditional_param_missing') {
        setError("Por favor, preencha todos os campos")
      }
      else if (err.errors?.[0]?.code === 'form_password_length_too_short') {
        setError("A senha deve ter no mínimo 8 caracteres")
      }
      else if (err.errors?.[0]?.code === 'form_password_pwned') {
        setError("A senha é muito comum, escolha outra")
      }
      else {
        console.log(err.errors?.[0]?.code);
        setError("Algum erro aconteceu, tente novamente")
      }
    } finally {
      setButtonLoading(false);
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return
    setButtonLoading(true)

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      if (err.errors?.[0]?.code === 'form_code_incorrect') {
        setError("Código incorreto, tente novamente")
      }
      else if (err.errors?.[0]?.code === 'verification_failed') {
        setError("A verificação falhou ou expirou, tente reiniciar o cadastro.")
      }
      else{
      console.log(err.errors?.[0]?.code);
      setError("Algum erro aconteceu, tente novamente")
    }
    }finally {
      setButtonLoading(false);
    }
  }

  if (pendingVerification) {
    return (
      <View style={styles.verificationContainer}>
        <Text style={styles.verificationTitle}>Verifique o seu email</Text>

        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError(null)}>
              <Ionicons name="close" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        ) : null}



        <TextInput
          style={[styles.verificationInput, error && styles.errorInput]}
          value={code}
          placeholder="Insire o seu código aqui"
          placeholderTextColor="#9AB478"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress} style={styles.button} disabled={buttonLoading}>
          {buttonLoading ? (
            <ActivityIndicator size="small" color="#552701ff" />
          ) : (
             <Text style={styles.buttonText}>Verificar</Text>
          )}            
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={30}
    >
      <View style={styles.container}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {loading && (
            <ActivityIndicator
              size="large"
              color="#7e2902ff"
              style={styles.loadingIndicator}
            />
          )}
          <Image source={require("../../assets/images/cesta_animada.png")} style={styles.illustration}
            contentFit="contain"
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
          />
        </View>
        <Text style={styles.title}>Criar Conta</Text>

        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError(null)}>
              <Ionicons name="close" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        ) : null}

        <TextInput
          style={[styles.input, error && styles.errorInput]}
          autoCapitalize="none"
          value={emailAddress}
          placeholderTextColor="#9AB478"
          placeholder="Inserir o email"
          onChangeText={(email) => setEmailAddress(email)}
        />
        <TextInput
          style={[styles.input, error && styles.errorInput]}
          value={password}
          placeholderTextColor="#9AB478"
          placeholder="Inserir a senha"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity style={styles.button} onPress={onSignUpPress}
          disabled={buttonLoading}
        >
          {buttonLoading ? (
            <ActivityIndicator size="small" color="#552701ff" />
          ) : (
            <Text style={styles.buttonText}>Continuar</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Já possue uma conta ?</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.linkText}>Entre aqui !</Text>
          </TouchableOpacity>
        </View>

      </View>
    </KeyboardAwareScrollView>
  )
}