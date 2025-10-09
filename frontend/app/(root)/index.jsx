import { useUser } from '@clerk/clerk-expo'
import { router} from 'expo-router'
import { Text, View, Image, TouchableOpacity, FlatList, Alert, RefreshControl } from 'react-native'
import useTransactions from '../../hooks/useTransactions.js'
import { useEffect,useState } from 'react'
import { styles } from '@/assets/styles/home.styles.js'
import { Ionicons } from '@expo/vector-icons'
import TransacaoVazia from '../../components/transacaoZero.jsx'
import  SaldoCard from '../../components/saldoCard.jsx'
import CirculoCarregamentoPagina from '../../components/circuloCarregamentoPagina.jsx'
import {ItemFuncao} from '../../components/TransacaoItem.jsx'
import { SignOutButton } from '../../components/signOutButton.jsx'

export default function Page() {
  const { user} = useUser()
  const { transacoes, carregarDado, isloading, sumario, deletarTransacao } = useTransactions(user?.id);
  const [refreshing, setRefreshing] = useState(false);

  //Atualiza a lista
  const onRefresh = async () => {
    setRefreshing(true);
    await carregarDado();
    setRefreshing(false);
  }

  useEffect(() => {
    carregarDado();
  }, [carregarDado]);

  if (isloading && !refreshing) return <CirculoCarregamentoPagina />

  const Deletar_Transacao = (id) => {
    Alert.alert("Deletar Transação", "Você tem certeza de que deseja deletar esta transação ?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Deletar", style: "destructive", onPress: () => deletarTransacao(id) },
    ]);
  };


  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          {/* LADO ESQUERDO */}
          <View style={styles.headerLeft}>
            <Image source={require("../../assets/images/venda.png")}
              style={styles.headerLogo}
              resizeMode='contain'
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Bem-vindo,</Text>
              <Text style={styles.usernameText}>{user?.emailAddresses[0]?.emailAddress.split("@")[0]}</Text>
            </View>
          </View>
          {/* LADO DIREITO */}
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.addButton} onPress={() => router.push("/criar")}>
              <Ionicons name='add' size={20} color="#FFF"/>
              <Text style={styles.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
            <SignOutButton/>
          </View>
        </View>
        <SaldoCard sumario={sumario}/>

        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Transações recentes</Text>
        </View>
      </View>

      {/* Flatlist usado para renderizar a lista */ }
      <FlatList
      style={styles.transactionList}
      contentContainerStyle={styles.transactionListContent}
      data={transacoes}
      renderItem={({item}) => (
        <ItemFuncao item={item} onDelete={Deletar_Transacao} />
      )}
      ListEmptyComponent={<TransacaoVazia/>}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      colors={["#7e2902"]}
      />
    </View>
  )
}