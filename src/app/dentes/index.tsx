import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  Alert,
  StatusBar,
  Image,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useFonts, LilitaOne_400Regular } from "@expo-google-fonts/lilita-one";
import CustomText from "../components/CustomText";
import Background from "../components/Background";
import { styles } from "./styles";

interface Paciente {
  cod_paciente: number;
  nome: string;
  idade: number;
  sexo: string;
  cpf: string;
  matricula: number;
}

export default function Index() {
  const router = useRouter();
  const { matricula } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const [opcoesDentes, setOpcoesDentes] = useState([
    { id: 1, dente: "V11", score: null },
    { id: 2, dente: "V16", score: null },
    { id: 3, dente: "V26", score: null },
    { id: 4, dente: "V31", score: null },
    { id: 5, dente: "L36", score: null },
    { id: 6, dente: "L46", score: null },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDenteIndex, setSelectedDenteIndex] = useState(-1);
  const [mediaNotas, setMediaNotas] = useState(0);
  const [paciente, setPaciente] = useState<Paciente | null>()

  useEffect(() => {
    calcularMedia();
  }, [opcoesDentes]);

  useEffect(() => {
    const fetchPaciente = async () => {
      if (!matricula) return;
      try {
        setIsLoading(true)
        const response = await fetch(`https://bakcend-deploy.vercel.app/paciente/${matricula}`);

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Erro ao buscar os dados do paciente: ${errorData}`);
        }

        const data = await response.json()
        setIsLoading(false)
        setPaciente(data)
      } catch {
        setIsLoading(false)
        console.log('Deu ruim!')
      }
    };

    fetchPaciente();
  }, []);

  const handleSubmit = async () => {
    try {
      await salvarDentes();
      navegarParaResultado();
      //await salvarMedia();
    } catch (error) {
      console.error('Erro ao processar: ', error);
      Alert.alert('Erro', 'Erro ao processar os dados');
    }
  };

  const salvarDentes = async () => {
    if (!matricula || opcoesDentes.some(dente => dente.score === null)) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch('https://bakcend-deploy.vercel.app/adddentes', { // Conexão com o BackEnd, adicionando a arcada dentária. *Altere o id de acordo com o da sua máquina
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          avaliacao_arcada: opcoesDentes.map(dente => dente.score).join(','),
          fk_paciente_cod_paciente: paciente?.cod_paciente,
          fk_dente_cod_dente: opcoesDentes.map(dente => dente.id).join(','),
        }),
      });

      if (response.ok) {
        // Alert.alert('Sucesso', 'Dados dos dentes salvos com sucesso!');
        salvarMedia(); //Se salvar os dentes, é possível salvar a média também, evitando repetição de código
      } else {
        Alert.alert('Erro', 'Erro ao salvar os dados dos dentes.');
        throw new Error('Erro ao salvar os dados dos dentes');
      }
    } catch (error) {
      console.error('Erro ao salvar os dados dos dentes:', error);
      Alert.alert('Erro', 'Erro ao salvar os dados dos dentes');
      throw error;
    }
  };

  const salvarMedia = async () => {
    //Verificação de campos nulos, deletada, já que há a verificação na função de salvarDentes
    try {
      const response = await fetch('https://bakcend-deploy.vercel.app/addmedia', { // Conexão com o BackEnd, adicionando a média. *Altere o id de acordo com o da sua máquina
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          media: mediaNotas.toFixed(2),
          cod_paciente: paciente?.cod_paciente,
        }),
      });

      if (response.ok) {
        //  Alert.alert('Sucesso', 'Média das notas salva com sucesso!');
      } else {
        Alert.alert('Erro', 'Erro ao salvar a média das notas.');
        throw new Error('Erro ao salvar a média das notas');
      }
    } catch (error) {
      console.error('Erro ao salvar a média das notas:', error);
      Alert.alert('Erro', 'Erro ao salvar a média das notas');
      throw error;
    }
  };

  const calcularMedia = () => {
    const totalNotas = opcoesDentes.reduce((sum, dente) => sum + (dente.score !== null ? dente.score : 0), 0);
    const media = totalNotas / opcoesDentes.filter(dente => dente.score !== null).length;
    setMediaNotas(media);
    return media;
  };

  const navegarParaResultado = () => {
    if (mediaNotas >= 0 && mediaNotas <= 1) {
      router.push('/resultados/resultado');
    } else if (mediaNotas > 1 && mediaNotas <= 2) {
      router.push('/resultados/resultado1');
    } else if (mediaNotas > 2 && mediaNotas <= 3) {
      router.push('/resultados/resultado2');
    }
  };

  let [fontsLoaded] = useFonts({
    LilitaOne_400Regular,
  });

  if (!fontsLoaded) {

    return (
      <View>
        <CustomText>Carregando...</CustomText>
      </View>
    );
  }

  const handleOpenModal = (index: number) => {
    setSelectedDenteIndex(index);
    setModalVisible(true);
  };

  const handleSelecionarNotaDente = (score: any) => {
    if (selectedDenteIndex !== -1) {
      const novasOpcoesDentes = [...opcoesDentes];
      novasOpcoesDentes[selectedDenteIndex] = {
        ...novasOpcoesDentes[selectedDenteIndex],
        score,
      };
      setOpcoesDentes(novasOpcoesDentes);
      setModalVisible(false);
    }
  };

  if (!paciente) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={"dark-content"} />
        <Background />
        <View style={styles.overlayContent}>
          <CustomText style={styles.text}>{isLoading ? "Carregando..." : "Paciente não encontrado!"}</CustomText>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <Background />
      <View style={styles.overlayContent}>
        <TouchableOpacity style={styles.smallSquareButton} onPress={() => router.back()} >
          <CustomText style={styles.smallSquareButtonText}>←</CustomText>
        </TouchableOpacity>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <CustomText style={styles.text}>NOME:</CustomText>
            <CustomText style={styles.input}>{paciente?.nome}</CustomText>
          </View>
          <View style={styles.inputContainer}>
            <CustomText style={styles.text}>MATRICULA:</CustomText>
            <CustomText style={styles.input}>{paciente?.matricula}</CustomText>
          </View>
          <CustomText style={styles.title}>DENTES</CustomText>

          <View style={styles.denteContainer}>
            {opcoesDentes.map((dente, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleOpenModal(index)}
                style={styles.selectButtonContainer}
              >
                <CustomText style={styles.text}>{dente.dente}</CustomText>
                <Image
                  source={require("../../../assets/images/Group.png")}
                  style={styles.image}
                />
                <View style={styles.inputDente}>
                  <CustomText>{dente.score !== null ? ` ${dente.score}` : ""}</CustomText>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <TouchableOpacity
              style={styles.centeredView}
              activeOpacity={1}
              onPressOut={() => setModalVisible(false)}
            >
              <View style={styles.modalView}>
                {[0, 1, 2, 3].map((score) => (
                  <TouchableOpacity
                    key={score}
                    onPress={() => handleSelecionarNotaDente(score)}
                    style={styles.modalOption}
                  >
                    <CustomText style={styles.modalText}>{`Score ${score}`}</CustomText>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </Modal>

          <TouchableOpacity style={styles.inputSubmit} onPress={handleSubmit}>
            <CustomText style={styles.buttonText}>RESULTADO</CustomText>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}
