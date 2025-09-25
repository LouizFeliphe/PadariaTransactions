//arquivo customizado react hook para pegar as transações do usuário logado

import {useCallback, useState} from "react";
import { Alert } from "react-native";

const API_URL = "http://localhost:5001/api"; // Substitua pela URL da sua API




export default function useTransactions (userId) {
    const [transacoes, setTransacoes] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [sumario, setSumario] = useState({ 
        income: 0, 
        expense: 0,
        balance: 0,
    });
  
    //useCallback para memorizar a função e evitar recriações desnecessárias
    //e também para evitar loops infinitos no useEffect
    const fetchTransacoes = useCallback(async () => {
        try{
            console.log(`fetchTransacoes userId: ${API_URL}/transactions/${userId}`);
            
            const resposta = await fetch(`${API_URL}/transactions/${userId}`)
            const data = await resposta.json();
            setTransacoes(data); 
        }catch(error){
            console.error("Erro ao buscar transações:", error);
        }
    }, [userId]);

    const fetchSumario = useCallback(async () => {
        try{
            const resposta = await fetch(`${API_URL}/transactions/summary/${userId}`)
            const data = await resposta.json();
            setSumario(data); 
        }catch(error){
            console.error("Erro ao buscar sumario:", error);
        }
    }, [userId])

    const carregarDado = useCallback(async () => {
        if (!userId) return;

        setIsLoading(true);
        try{
            //esperar as duas promessas serem resolvidas
            await Promise.all([fetchTransacoes(), fetchSumario()]);
        }catch(error){
            console.error("Erro ao carregar dados:", error);
        } finally{
            setIsLoading(false);
        }
    }, [userId, fetchTransacoes, fetchSumario]);

    const deletarTransacao = useCallback(async (id) => {
        try{
            const resposta = await fetch(`${API_URL}/transactions/${id}`, {
                method: "DELETE",
            });
            if (!resposta.ok) throw new Error("Erro ao deletar transação");

            //atualizar a lista de transações e o sumário após a exclusão
            carregarDado();
            Alert.alert("Sucesso", "Transação deletada com sucesso");
        }catch(error){
            console.error("Erro ao carregar dados:", error);
            Alert.alert("Erro", "Não foi possível deletar a transação");
        } 
    }, [carregarDado]);

    return { transacoes, isloading, sumario, carregarDado, deletarTransacao };
}