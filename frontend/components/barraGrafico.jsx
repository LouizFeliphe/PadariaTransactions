import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { BarChart } from "react-native-gifted-charts";
import { useCallback, useEffect, useMemo, useState } from "react";
import GraficoVazio from "./vazioGrafico.jsx";
import { styles } from "../assets/styles/graficoBarra.styles.js";

const hoje = new Date();

const MeuGraficoBarra = ({ transacoes, periodo, categoria }) => {
  const [atualMes, setAtualMes] = useState(hoje.getMonth())
  const [atualAno, setAtualAno] = useState(hoje.getFullYear())
  const [atualSemana, setAtualSemana] = useState(1);
  const [indexBarraSelecionada, setIndexBarraSelecionada] = useState(2)
  const [dadosGraficosGanho, setDadosGraficosGanho] = useState([])
  const [dadosGraficosGasto, setDadosGraficosGasto] = useState([])
  const [total, setTotal] = useState(0);
  const [isGanhoOuGasto, setIsGanhoOuGasto] = useState(1);


  // Retorna o nome abreviado de um mês (0 = Jan, 1 = Feb, ...)
  const pegarMesNome = (mes) => {
    const meses = [
      "Jan",
      "Feb",
      'Mar',
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    return meses[mes]
  }

  // Calcula os limites mínimo e máximo (primeiro e último mês/ano) que existem nos dados de transações
  const limites = useMemo(() => {
    if (!transacoes || transacoes.length === 0) return null;

    const ordenados = [...transacoes].sort((a, b) => {
      if (a.ano !== b.ano) return a.ano - b.ano;
      return a.mes - b.mes;
    });

    const primeiro = ordenados[0];
    const ultimo = ordenados[ordenados.length - 1];

    return {
      minAno: primeiro.ano,
      minMes: primeiro.mes,
      maxAno: ultimo.ano,
      maxMes: ultimo.mes,
    };
  }, [transacoes]);


  // O código abaixo é a primeira versão feita por mim para filtrar os dados de forma correta para o gráfico. Sim, ele é redundante. Sim, ele é feio.

  // const pegarGraficoDado = useCallback(() => {
  //   const ganhos = [];
  //   const gastos = [];
  //   const dias = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

  //   transacoes.forEach(item => {
  //     if ("ganho" in item) {
  //       ganhos.push(item);
  //     } else if ("gasto" in item) {
  //       gastos.push(item);
  //     }
  //   });

  //   //Aqui entra os ganhos
  //   if (isGanhoOuGasto) {

  //     let dadosFormatados;

  //     const dadosFiltrados = ganhos.filter(
  //       (item) => item.mes === atualMes && item.ano === atualAno
  //     );


  //     if (periodo === "weekly") {

  //       const ganhosDaSemana = dadosFiltrados.filter(item => item.semana === atualSemana);

  //       console.log("DADOS FILTRADOS:", dadosFiltrados);
  //       console.log("GANHOS DA SEMANA:", ganhosDaSemana, "atualSemana:", atualSemana);

  //         dadosFormatados = dias.map((dia, i) => {
  //   
  //       const itensDoDia = ganhosDaSemana.filter(item => {
  //         const data = new Date(item.created_at);
  //         const diaSemana = data.getDay(); // 0 = Domingo, 1 = Segunda...
  //         return diaSemana === 0 ? 6 : diaSemana - 1 === i;
  //       });

  //             const total = itensDoDia.reduce((soma, it) => {
  //         
  //         return soma + (parseFloat(it.ganho || it.gasto) || 0);
  //       }, 0);

  //       return {
  //         value: total,
  //         frontColor: isGanhoOuGasto ? "#d4ff00" : "#ff8000ff",
  //         label: dia,
  //       };
  //     });

  //     


  //     } else {

  //       
  //       dadosFormatados = dadosFiltrados.map(item => ({
  //         ...item,
  //         value: item.ganho,
  //         frontColor: "#d4ff00",
  //       }))

  //     }

  //     setTotal(dadosFormatados.reduce((acc, item) => acc + item.value, 0))

  //     setDadosGraficosGanho(dadosFormatados.map((item, index) => ({
  //       ...item,
  //       // mostra o valor em cima da barra só se ela estiver selecionada
  //       topLabelComponent: () => indexBarraSelecionada === index ? (
  //         <Text style={{
  //           color: "#000000ff",
  //           fontSize: 10,
  //           fontWeight: "600",
  //         }}>
  //           {`$ ${item.value}`}
  //         </Text>
  //       ) : null
  //     })))
  //     setDadosGraficosGasto([]);
  //   }
  //   //Aqui entra os gastos
  //   else {

  //     let dadosFormatados;

  //     const dadosFiltrados = gastos.filter(
  //       (item) => item.mes === atualMes && item.ano === atualAno
  //     );


  //     if (periodo === "weekly") {

  //       const gastosDaSemana = dadosFiltrados.filter(item => item.semana === atualSemana);


  //         dadosFormatados = dias.map((dia, i) => {
  //   
  //       const itensDoDia = gastosDaSemana.filter(item => {
  //         const data = new Date(item.created_at);
  //         const diaSemana = data.getDay(); // 0 = Domingo, 1 = Segunda...
  //         return diaSemana === 0 ? 6 : diaSemana - 1 === i;
  //       });

  //             const total = itensDoDia.reduce((soma, it) => {
  //         
  //         return soma + (parseFloat(it.ganho || it.gasto) || 0);
  //       }, 0);

  //       return {
  //         value: total,
  //         frontColor: isGanhoOuGasto ? "#d4ff00" : "#ff8000ff",
  //         label: dia,
  //       };
  //     });

  //     console.log("GANHOS DA SEMANA (por dia):", dadosFormatados)





  //     } else {

  //       
  //       dadosFormatados = dadosFiltrados.map(item => ({
  //         ...item,
  //         value: item.gasto,
  //         frontColor: "#e27107ff",
  //       }))

  //     }

  //     setTotal(dadosFormatados.reduce((acc, item) => acc + item.value, 0))

  //     setDadosGraficosGasto(dadosFormatados.map((item, index) => ({
  //       ...item,
  //       
  //       topLabelComponent: () => indexBarraSelecionada === index ? (
  //         <Text style={{
  //           color: "#000000ff",
  //           fontSize: 10,
  //           fontWeight: "600",
  //         }}>
  //           {`$ ${item.value}`}
  //         </Text>
  //       ) : null
  //     })))
  //     setDadosGraficosGanho([]);
  //   }


  // }, [atualAno, atualMes, indexBarraSelecionada, isGanhoOuGasto, transacoes, periodo, atualSemana])

  //O codigo todo comentado acima foi o código que eu fiz sozinho, aprendendo com os tutoriais do youtube. O Código abaixo é a versão otimizada, muito mais estilosa e bonita. Apenas quis deixar de recordação o quanto o código acima é redundante e "tenebroso".
  const pegarGraficoDado = useCallback(() => {
    const dias = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

    // escolhe se vai usar ganhos ou gastos
    const tipo = isGanhoOuGasto ? "ganho" : "gasto";
    const cor = isGanhoOuGasto ? "#d4ff00" : "#e27107ff";

    // separa apenas transações do tipo certo
    const dadosBase = transacoes.filter(item => tipo in item);

    // filtra por mês e ano atual
    const dadosFiltrados = dadosBase.filter(
      (item) => item.mes === atualMes && item.ano === atualAno
    );

    let dadosFormatados = [];

    if (periodo === "weekly") {
      // filtra semana atual
      const dadosSemana = dadosFiltrados.filter(item => item.semana === atualSemana);

      dadosFormatados = dias.map((dia, i) => {
        // pega todos os itens que caíram nesse dia da semana
        const itensDoDia = dadosSemana.filter(item => {
          const data = new Date(item.created_at);
          const diaSemana = data.getDay(); // 0 = Domingo, 1 = Segunda...
          const diaIndex = diaSemana === 0 ? 6 : diaSemana - 1;
          return diaIndex === i;
        });

        // soma os valores desse dia
        const total = itensDoDia.reduce(
          (soma, it) => soma + (parseFloat(it[tipo]) || 0),
          0
        );

        return {
          value: total,
          frontColor: cor,
          label: dia,
        };
      });

     
    } else {
      // mensal
      dadosFormatados = dadosFiltrados.map(item => ({
        ...item,
        value: item[tipo],
        frontColor: cor,
      }));
    }

    
    setTotal(dadosFormatados.reduce((acc, item) => acc + item.value, 0));

   
    const dadosFinal = dadosFormatados.map((item, index) => ({
      ...item,
      topLabelComponent: () =>
        indexBarraSelecionada === index ? (
          <Text
            style={{
              color: "#000000ff",
              fontSize: 10,
              fontWeight: "600",
            }}
          >
            {`$ ${item.value}`}
          </Text>
        ) : null,
    }));

    if (isGanhoOuGasto) {
      setDadosGraficosGanho(dadosFinal);
      setDadosGraficosGasto([]);
    } else {
      setDadosGraficosGasto(dadosFinal);
      setDadosGraficosGanho([]);
    }

  }, [atualAno, atualMes, indexBarraSelecionada, isGanhoOuGasto, transacoes, periodo, atualSemana]);



  // Navega entre os meses (avança ou volta) respeitando os limites calculados
  const navegarMes = (direcao) => {
    let novoMes = atualMes + direcao
    let novoAno = atualAno;

    if (novoMes > 11) {
      novoMes = 0
      novoAno++;
    } else if (novoMes < 0) {
      novoMes = 11
      novoAno--;
    }

    if (limites) {
      const { minAno, minMes, maxAno, maxMes } = limites;

      const dentroLimite =
        (novoAno > minAno || (novoAno === minAno && novoMes >= minMes)) &&
        (novoAno < maxAno || (novoAno === maxAno && novoMes <= maxMes));

      if (!dentroLimite) return; // simplesmente ignora se for fora do range
    }

    setAtualMes(novoMes)
    setAtualAno(novoAno)
    setIndexBarraSelecionada(null)
  }

  // Navega entre semanas (1 a 5) dentro do mês atual.
  // Se passar dos limites de semana, troca de mês (se possível dentro dos limites).
  const navegarSemana = (direcao) => {
    let novaSemana = atualSemana + direcao;

    // indo para semana anterior
    if (novaSemana < 1) {
      // só troca de mês se estiver dentro do limite mínimo
      if (
        limites &&
        (atualAno > limites.minAno ||
          (atualAno === limites.minAno && atualMes > limites.minMes))
      ) {
        navegarMes(-1);
        novaSemana = 5; // volta pra última semana do mês anterior
      } else {
        novaSemana = 1; // trava no limite
      }
    }

    // indo para semana seguinte
    if (novaSemana > 5) {
      // só troca de mês se estiver dentro do limite máximo
      if (
        limites &&
        (atualAno < limites.maxAno ||
          (atualAno === limites.maxAno && atualMes < limites.maxMes))
      ) {
        navegarMes(1);
        novaSemana = 1; // começa na primeira semana do próximo mês
      } else {
        novaSemana = 5; // trava no limite
      }
    }

    setAtualSemana(novaSemana);
    setIndexBarraSelecionada(null);
  };

  // Executa a função pegarGraficoDado sempre que suas dependências mudam
  useEffect(() => {
    pegarGraficoDado()
  }, [pegarGraficoDado])

  if (dadosGraficosGanho.length === 0 && dadosGraficosGasto === 0) {
    return (
      <GraficoVazio categoria={categoria} transacoes={[]} />
    )
  }


  return (
    <View style={styles.container}>
      <View style={styles.graficoTitulo}>

        {dadosGraficosGanho.length === 0 && dadosGraficosGasto.length === 0 ? (<Text style={styles.graficoTituloTexto}>{pegarMesNome(atualMes)} {atualAno}{periodo === "weekly" ? " Não dados dessa semana" : " Não há dados desse mês"}</Text>) : (

          <Text
            style={styles.graficoTituloTexto}
          >{periodo === "weekly"
            ? `S${atualSemana}-${pegarMesNome(atualMes)} ${atualAno}`
            : `${pegarMesNome(atualMes)} ${atualAno}`}</Text>
        )}


        <Text style={styles.graficoTituloTexto2}>{isGanhoOuGasto ? "Ganho Total: " : "Gasto Total: "}</Text>
        <Text style={styles.graficoTituloTexto3}>{`R$ ${total.toFixed(2)}`}</Text>

      </View>
      <BarChart
        noOfSections={4}
        barBorderRadius={4}
        yAxisThickness={0}
        xAxisThickness={0}
        minHeight={10}
        width={350}
        dashGap={15}
        dashWidth={dadosGraficosGanho.length === 0 && dadosGraficosGasto.length === 0 ? 0 : 8}
        xAxisLabelTextStyle={styles.xAxisTextStyle}
        yAxisTextStyle={styles.yAxisStyle}
        data={isGanhoOuGasto ? dadosGraficosGanho : dadosGraficosGasto}
        onPress={(_item, index) => {
          setIndexBarraSelecionada(indexBarraSelecionada === index ? null : index);
        }}
      />


      <View style={styles.containerNavegacao} >
        <View style={styles.containerBotoes}>
          <Pressable
            onPress={() => {
              if (periodo === "weekly") {
                navegarSemana(-1)
              }
              else {
                navegarMes(-1)
              }
            }}
            style={{
              borderRadius: 8,
            }}
            hitSlop={20}
          >
            <Ionicons
              name='arrow-back' size={30} color="#000000ff"
            />
          </Pressable>
          <Text>{periodo === "weekly" ? "Semana" : "Mês"}</Text>
          <Text>anterior</Text>
        </View>
        <SegmentedControlTab
          values={["Gastos", "Ganhos"]}
          selectedIndex={isGanhoOuGasto}
          onTabPress={setIsGanhoOuGasto}
          tabsContainerStyle={styles.tabsContainerStyles}
          tabStyle={styles.tabStyles}
          activeTabStyle={{
            backgroundColor: isGanhoOuGasto ? "#77ed62ff" : "#fa4c1bff", 
          }}
          tabTextStyle={styles.tabTextStyles}
          activeTabTextStyle={styles.activeTabtextStyles}
        />
        <View style={styles.containerBotoes}>
          <Pressable
            onPress={() => {
              if (periodo === "weekly") {
                navegarSemana(1)
              }
              else {
                navegarMes(1)
              }
            }}
            style={{
              borderRadius: 8,
            }}
            hitSlop={20}
          >
            <Ionicons
              name='arrow-forward' size={30} color="#000000ff"
            />
          </Pressable>
          <Text>{periodo === "weekly" ? "Próxima" : "Próximo"}</Text>
          <Text>{periodo === "weekly" ? "semana" : "mês"}</Text>
        </View>

      </View>

    </View>
  );
};
export default MeuGraficoBarra;