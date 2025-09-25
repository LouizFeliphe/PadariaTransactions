import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View } from 'react-native'
import { SignOutButton } from '../../components/signOutButton.jsx'
import useTransactions from '../../hooks/useTransactions.js'
import { useEffect } from 'react'

export default function Page() {
  const { user } = useUser()
  const {transacoes, carregarDado, isloading, sumario, deletarTransacao} = useTransactions(user?.id);

  useEffect(() => {
    carregarDado();
  }, [carregarDado]);

  console.log("usuarioID: ", user.id);
  
  console.log("Transações:", transacoes);
  console.log("Sumário:", sumario);


  return (
    <View>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  )
}