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
import Body from "../components/Body";
import { styles } from "./styles";

export default function Index() {
  const router = useRouter();
  const { nome, codPaciente } = useLocalSearchParams();

  const [opcoesDentes, setOpcoesDentes] = useState([
    { id: 1, dente: "V11", nota: null },
    { id: 2, dente: "V16", nota: null },
    { id: 3, dente: "V26", nota: null },
    { id: 4, dente: "V31", nota: null },
    { id: 5, dente: "L36", nota: null },
    { id: 6, dente: "L46", nota: null },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDenteIndex, setSelectedDenteIndex] = useState(-1);
  const [mediaNotas, setMediaNotas] = useState(0);

  useEffect(() => {
    calcularMedia();
  }, [opcoesDentes]);

  const handleSubmit = async () => {
    try {
      //console.log(codPaciente);
      await salvarDentes();
      //await salvarMedia();
      navegarParaResultado();
    } catch (error) {
      console.error('Erro ao processar: ', error);
      Alert.alert('Erro', 'Erro ao processar os dados');
    }
  };

  const salvarDentes = async () => {
    if (!codPaciente || opcoesDentes.some(dente => dente.nota === null)) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch('http:192.168.0.12:3535/adddentes', { // Conexão com o BackEnd, adicionando a arcada dentária. *Altere o id de acordo com o da sua máquina
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Avaliacao_arcada: opcoesDentes.map(dente => dente.nota).join(','),
          fk_Paciente_Cod_Paciente: codPaciente,
          fk_Dente_Cod_dente: opcoesDentes.map(dente => dente.id).join(','),
        }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Dados dos dentes salvos com sucesso!');
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
      const response = await fetch('http://192.168.0.12:3535/addmedia', { // Conexão com o BackEnd, adicionando a média. *Altere o id de acordo com o da sua máquina
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          media: mediaNotas.toFixed(2),
          cod_paciente: codPaciente,
        }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Média das notas salva com sucesso!');
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
    const totalNotas = opcoesDentes.reduce((sum, dente) => sum + (dente.nota !== null ? dente.nota : 0), 0);
    const media = totalNotas / opcoesDentes.filter(dente => dente.nota !== null).length;
    setMediaNotas(media);
    return media;
  };

  const navegarParaResultado = () => {
    if (mediaNotas >= 0 && mediaNotas <= 1) {
      router.push('resultados/resultado2');
    } else if (mediaNotas > 1 && mediaNotas <= 2) {
      router.push('resultados/resultado1');
    } else if (mediaNotas > 2 && mediaNotas <= 3) {
      router.push('resultados/resultado');
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

  const handleOpenModal = (index:any) => {
    setSelectedDenteIndex(index);
    setModalVisible(true);
  };

  const handleSelecionarNotaDente = (nota:any) => {
    if (selectedDenteIndex !== -1) {
      const novasOpcoesDentes = [...opcoesDentes];
      novasOpcoesDentes[selectedDenteIndex] = {
        ...novasOpcoesDentes[selectedDenteIndex],
        nota,
      };
      setOpcoesDentes(novasOpcoesDentes);
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <Body />
      <View style={styles.overlayContent}>
        <TouchableOpacity style={styles.smallSquareButton} onPress={() => router.back()} >
          <CustomText style={styles.smallSquareButtonText}>←</CustomText>
        </TouchableOpacity>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <CustomText style={styles.text}>NOME:</CustomText>
            <CustomText style={styles.input}>{nome}</CustomText>
          </View>
          <View style={styles.inputContainer}>
            <CustomText style={styles.text}>CÓDIGO:</CustomText>
            <CustomText style={styles.input}>{codPaciente}</CustomText>
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
                  <CustomText>{dente.nota !== null ? ` ${dente.nota}` : ""}</CustomText>
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
                {[0, 1, 2, 3].map((nota) => (
                  <TouchableOpacity
                    key={nota}
                    onPress={() => handleSelecionarNotaDente(nota)}
                    style={styles.modalOption}
                  >
                    <CustomText style={styles.modalText}>{`Nota ${nota}`}</CustomText>
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
