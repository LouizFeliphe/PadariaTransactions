import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  ActivityIndicator, Image
} from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { useState } from "react";
import  API_URL  from "../../lib/api.js";
import { styles } from "../../assets/styles/create.styles.js";
import { COLORS } from "../../assets/styles/colors.js";
import { Ionicons } from "@expo/vector-icons";


const CATEGORIES = [
  { id: "laticinio", name: "laticinio", icon: require("../../assets/images/leite.png") },
  { id: "frios", name: "frios", icon: require("../../assets/images/salame.png") },
  { id: "paes", name: "paes", icon: require("../../assets/images/trigo.png") },
  { id: "doce", name: "doce", icon: require("../../assets/images/doce.png")},
  { id: "refrigerante", name: "refrigerante", icon: require("../../assets/images/refrigerante.png") },
  { id: "chips", name: "chips", icon: require("../../assets/images/chips.png")},
  { id: "dinheiro", name: "dinheiro", icon: require("../../assets/images/dinheiro.png") },
   { id: "enlatado", name: "enlatado", icon: require("../../assets/images/enlatado.png") },
{ id: "ingrediente", name: "ingrediente", icon: require("../../assets/images/ingredientes.png") },
 { id: "other", name: "outros", icon:  require("../../assets/images/pendente.png")},
];

const CreateScreen = () => {
  const router = useRouter();
  const { user } = useUser();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isExpense, setIsExpense] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    // validações
    if (!title.trim()) return Alert.alert("Error", "Por favor insira um título válido");
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      Alert.alert("Error", "Por favor insira um valor válido");
      return;
    }

    if (!selectedCategory) return Alert.alert("Error", "Por favor selecione uma categoria");

    setIsLoading(true);
    try {
      // Formata a quantia (negativo para gastos, positvo para renda)
      const formattedAmount = isExpense
        ? -Math.abs(parseFloat(amount.replace(",", ".")))
        : Math.abs(parseFloat(amount.replace(",", ".")));

      const response = await fetch(`${API_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          title,
          amount: formattedAmount,
          category: selectedCategory,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(errorData.error || "Falha ao criar transação");
      }

      Alert.alert("Sucesso", "Transação criada com sucesso");
      setAmount("");
      setTitle("");
      setSelectedCategory("");
      setIsExpense(true);
    } catch (error) {
      Alert.alert("Error", error.message || "Falha ao criar transação");
      console.error("Erro ao criar transação:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push("/")}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nova transação</Text>
        <TouchableOpacity
          style={[styles.saveButtonContainer, isLoading && styles.saveButtonDisabled]}
          onPress={handleCreate}
          disabled={isLoading}
        >
          <Text style={styles.saveButton}>{isLoading ? "Salvando..." : "Salvar"}</Text>
          {!isLoading && <Ionicons name="checkmark" size={18} color={COLORS.primary} />}
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.typeSelector}>
          {/* Selecionador de Gasto */}
          <TouchableOpacity
            style={[styles.typeButton, isExpense && styles.typeButtonActive]}
            onPress={() => setIsExpense(true)}
          >
            <Ionicons
              name="arrow-down-circle"
              size={22}
              color={isExpense ? COLORS.white : COLORS.expense}
              style={styles.typeIcon}
            />
            <Text style={[styles.typeButtonText, isExpense && styles.typeButtonTextActive]}>
              Gasto
            </Text>
          </TouchableOpacity>

          {/* Selecionador da Renda */}
          <TouchableOpacity
            style={[styles.typeButton, !isExpense && styles.typeButtonActive]}
            onPress={() => setIsExpense(false)}
          >
            <Ionicons
              name="arrow-up-circle"
              size={22}
              color={!isExpense ? COLORS.white : COLORS.income}
              style={styles.typeIcon}
            />
            <Text style={[styles.typeButtonText, !isExpense && styles.typeButtonTextActive]}>
              Renda
            </Text>
          </TouchableOpacity>
        </View>

        {/* Container de Quantidade */}
        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>R$</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="0.00"
            placeholderTextColor={COLORS.textLight}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </View>

        {/* Container de Entrada */}
        <View style={styles.inputContainer}>
          <Ionicons
            name="create-outline"
            size={22}
            color={COLORS.textLight}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Título da transação"
            placeholderTextColor={COLORS.textLight}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Título */}
        <Text style={styles.sectionTitle}>
          <Ionicons name="pricetag-outline" size={16} color={COLORS.text} /> Categoria
        </Text>

        <View style={styles.categoryGrid}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.name && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category.name)}
            >
                <Image source={category.icon} style={[styles.iconPersonalized,{color: selectedCategory === category.name ? COLORS.white : COLORS.text}]}/>
              {/* <Ionicons
                name={category.icon}
                size={20}
                color={selectedCategory === category.name ? COLORS.white : COLORS.text}
                style={styles.categoryIcon}
              /> */}
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category.name && styles.categoryButtonTextActive,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
    </View>
  );
};
export default CreateScreen;