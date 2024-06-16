//Parte do cadastro da arcada dentária de um paciente, de acordo com as notas de cada dente
import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  Alert,
  Text,
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
  const { nome, codPaciente } = useLocalSearchParams(); //Recebe os parâmetros inseridos no consultar da home

  const [opcoesDentes, setOpcoesDentes] = useState([ //Definindo os ids dos dentes e inicializando a nota com 0
    { id: 1, dente: "V11", nota: 0 },
    { id: 2, dente: "V16", nota: 0 },
    { id: 3, dente: "V26", nota: 0 },
    { id: 4, dente: "V31", nota: 0 },
    { id: 5, dente: "L36", nota: 0 },
    { id: 6, dente: "L46", nota: 0 },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDenteIndex, setSelectedDenteIndex] = useState(-1);
  const [mediaNotas, setMediaNotas] = useState(0);

  useEffect(() => {
    calcularMedia(); // Calcular a média sempre que as notas mudarem
  }, [opcoesDentes]);

  const handleSubmit = async () => {
    try {
      await salvarDentes();
      await salvarMedia(); // Salvar a média após calcular
    } catch (error) {
      console.error('Erro ao processar:', error);
      Alert.alert('Erro', 'Erro ao processar os dados');
    }
  };

  const salvarDentes = async () => {
    if (!codPaciente || opcoesDentes.some(dente => dente.nota === null)) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch('http://192.168.1.5:3535/adddentes', { //Conexão com o BackEnd, adicionando a arcada dentária. *Altere o id de acordo com o da sua máquina
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ //Passando os dados
          Avaliacao_arcada: opcoesDentes.map(dente => dente.nota).join(','),
          fk_Paciente_Cod_Paciente: codPaciente,
          fk_Dente_Cod_dente: opcoesDentes.map(dente => dente.id).join(','),
        }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Dados dos dentes salvos com sucesso!');
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
    try {
      const response = await fetch('http://192.168.1.5:3535/addmedia', { //Conexão com o BackEnd, adicionando a média. *Altere o id de acordo com o da sua máquina
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          //Passando os dados
          media: mediaNotas.toFixed(2), //toFixed(2) = seleciona apenas 2 números após a vírgula
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
    const totalNotas = opcoesDentes.reduce((sum, dente) => sum + dente.nota, 0); //Soma as notas
    const media = totalNotas / opcoesDentes.length; //Divide para chegar na média
    setMediaNotas(media);
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
      <TouchableOpacity
        style={styles.smallSquareButton}
        onPress={() => router.back()}
      >
        <CustomText style={styles.smallSquareButtonText}>←</CustomText>
      </TouchableOpacity>
      <View style={styles.overlayContent}>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}> 
            <CustomText style={styles.text}>NOME:</CustomText>
            <View style={styles.input}>{nome}</View>
          </View>
          <View style={styles.inputContainer}>
            <CustomText style={styles.text}>CÓDIGO: {codPaciente}</CustomText>
            <View style={styles.input}>{codPaciente}</View>
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
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {[0, 1, 2, 3].map((nota) => (
                  <TouchableOpacity
                    key={nota}
                    onPress={() => handleSelecionarNotaDente(nota)}
                  >
                    <Text style={styles.modalText}>{`Nota ${nota}`}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Modal>

          {opcoesDentes.every(dente => dente.nota !== null) && (
            <TouchableOpacity style={styles.inputSubmit} onPress={handleSubmit}>
              <CustomText style={styles.buttonText}>RESULTADO</CustomText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}