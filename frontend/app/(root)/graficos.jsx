import { Ionicons } from "@expo/vector-icons"
import { Text } from "@react-navigation/elements"
import { Alert, TouchableOpacity, View } from "react-native"
import { styles } from "../../assets/styles/home.styles.js"
import { useRouter } from "expo-router"
import DropDownPicker from "react-native-dropdown-picker";
import { useCallback, useEffect, useState } from "react";
import useTransactions from "../../hooks/useTransactions.js";
import { useUser } from "@clerk/clerk-expo";
import GraficoVazio from "../../components/vazioGrafico.jsx";
import MeuGraficoPizza from "../../components/pizzaGrafico.jsx";
import MeuGraficoBarra from "../../components/barraGrafico.jsx"

const GraficosDados = () => {
    const { user } = useUser()
    const { transacoes, carregarDado, sumario } = useTransactions(user?.id);
    const [transacoesFiltradas, setTransacoesFiltradas] = useState([])


    const [categoriaOpen, setCategoriaOpen] = useState(false);
    const [categoriaValue, setCategoriaValue] = useState(null);
    const [categoriaAplicada, setCategoriaAplicada] = useState("");
    const listaCategoria = [
        { label: "Todos", value: "todos" },
        { label: "Laticinios", value: "laticinio" },
        { label: "Frios", value: "frios" },
        { label: "Paes", value: "paes" },
        { label: "Doce", value: "doce" },
        { label: "Refrigerante", value: "refrigerante" },
        { label: "Chips", value: "chips" },
        { label: "Dinheiro", value: "dinheiro" },
        { label: "Enlatado", value: "enlatado" },
        { label: "Ingrediente", value: "ingrediente" },
        { label: "Other", value: "other" },
    ];

    const [periodoOpen, setPeriodoOpen] = useState(false);
    const [periodoValue, setPeriodoValue] = useState(null);
    const [periodoAplicado, setPeriodoAplicado] = useState("");
    const listaPeriodo = [
        { label: "Todos os períodos", value: "total" },
        { label: "Semanal", value: "weekly" },
        { label: "Mensal", value: "monthly" },
    ];


    const prepararDadosGraficoPizza = useCallback((categoriaSelecionada, periodoSelecionado) => {

        if (!categoriaSelecionada || !periodoSelecionado) {
            Alert.alert("Erro", "Selecione uma categoria e periodo");
            return
        }

        if (categoriaSelecionada === "todos") {
            let array = [];
            array.push({ value: parseFloat(Math.abs(sumario.expense)), color: '#ff0000ff' });
            array.push({ value: parseFloat(sumario.income), color: '#3cff00ff' })


            setPeriodoAplicado(periodoSelecionado)
            setCategoriaAplicada(categoriaSelecionada)
            setTransacoesFiltradas([...array])
            return
        }

        const filtroAplicado = transacoes.filter(
            (t) => t.category.toLowerCase() === categoriaSelecionada.toLowerCase()
        )

        let array = [];
        let renda = 0;
        let custo = 0;

        filtroAplicado.forEach((t) => {
            const valor = parseFloat(t.amount);

            if (valor >= 0) {
                renda += valor;
            } else {
                custo += Math.abs(valor); 
            }
        });

        array.push({ value: custo, color: '#ff0000ff' });
        array.push({ value: renda, color: '#3cff00ff' })

        setPeriodoAplicado(periodoSelecionado)
        setCategoriaAplicada(categoriaSelecionada)
        setTransacoesFiltradas([...array])

    }, [transacoes, sumario])

    const prepararDadosGraficoBarra = useCallback((categoriaSelecionada, periodoSelecionado) => {

        if (!categoriaSelecionada || !periodoSelecionado) {
            Alert.alert("Erro", "Selecione uma categoria e periodo");
            return
        }

        let arrayFormatado;

        if (categoriaSelecionada === "todos") {

            arrayFormatado = transacoes.map(item => {
                const date = new Date(item.created_at);
    

                if (parseFloat(item.amount) > 0) return {
                    ganho: Math.abs(parseFloat(item.amount)),
                    ano: date.getFullYear(),
                    mes: date.getMonth(),
                    semana: Math.ceil(date.getDate() / 7),
                    created_at: item.created_at

                }
                else return {
                    gasto: Math.abs(parseFloat(item.amount)),
                    ano: date.getFullYear(),
                    mes: date.getMonth(),
                    semana: Math.ceil(date.getDate() / 7),
                    created_at: item.created_at
                }

            });
        } else {

            const filtroAplicado = transacoes.filter(
                (t) => t.category.toLowerCase() === categoriaSelecionada.toLowerCase())

            arrayFormatado = filtroAplicado.map(item => {
                const date = new Date(item.created_at);

                if (parseFloat(item.amount) > 0) return {
                    ganho: Math.abs(parseFloat(item.amount)),
                    ano: date.getFullYear(),
                    mes: date.getMonth(),
                    semana: Math.ceil(date.getDate() / 7),
                    created_at: item.created_at
                }
                else return {
                    gasto: Math.abs(parseFloat(item.amount)),
                    ano: date.getFullYear(),
                    mes: date.getMonth(),
                    semana: Math.ceil(date.getDate() / 7),
                    created_at: item.created_at
                }

            });
        }

        setPeriodoAplicado(periodoSelecionado)
        setCategoriaAplicada(categoriaSelecionada)
        setTransacoesFiltradas([...arrayFormatado])

    }, [transacoes])

    useEffect(() => {
        carregarDado();
    }, [carregarDado]);



    const router = useRouter()
    return (

        <View style={[styles.balanceCard, { paddingTop: 12, marginTop: 15}]}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: 70 }}>
                <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: 70 }} 
                onPress={() => router.back()}>
                    <Ionicons name='arrow-undo-circle-outline' size={40} color="#000000ff" />  
                </TouchableOpacity>
            </View>
            <View style={[transacoesFiltradas.length > 0 && {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FFF",
                paddingRight: 25
            }]}>
                {transacoesFiltradas.length > 0 && categoriaAplicada && periodoAplicado ? periodoAplicado === "total" ? (<MeuGraficoPizza transacoes={transacoesFiltradas} categoria={categoriaAplicada} />) : (<MeuGraficoBarra transacoes={transacoesFiltradas} periodo={periodoAplicado} categoria={categoriaAplicada}/>)
                    : (<GraficoVazio categoria={categoriaAplicada} transacoes={transacoesFiltradas}/>)}


            </View>
            <View style={[styles.balanceCard, { paddingTop: 20, marginTop: 100 }]}>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <DropDownPicker
                        style={{ marginBottom: 13 }}
                        open={categoriaOpen}
                        value={categoriaValue}
                        items={listaCategoria}
                        setOpen={setCategoriaOpen}
                        setValue={setCategoriaValue}
                        setItems={() => { }}
                        placeholder="Selecione a categoria"
                        zIndex={2000}
                        zIndexInverse={2000}
                    />
                    <DropDownPicker
                        style={{ marginBottom: 13 }}
                        open={periodoOpen}
                        value={periodoValue}
                        items={listaPeriodo}
                        setOpen={setPeriodoOpen}
                        setValue={setPeriodoValue}
                        setItems={() => { }}
                        placeholder="Selecione o período"
                        zIndex={1000}
                        zIndexInverse={1000}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }} >
                        <TouchableOpacity style={[styles.addButton, { alignSelf: 'center', marginTop: 5 }]} onPress={() => {
                            if (periodoValue === "total") prepararDadosGraficoPizza(categoriaValue, periodoValue)
                            else prepararDadosGraficoBarra(categoriaValue, periodoValue);
                        }}>
                            <Text style={styles.addButtonText}>Aplicar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default GraficosDados