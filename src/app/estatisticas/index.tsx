import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Text,
  TouchableHighlight,
  StatusBar,
  Image,
  Alert,
} from "react-native";
import { useRouter } from "expo-router"; // Alterei para useRouter
import { useFonts, LilitaOne_400Regular } from "@expo-google-fonts/lilita-one";
import CustomText from "../components/CustomText";
import Body from "../components/Body";
import { styles } from "./styles";

export default function Index() {
  const router = useRouter(); // Alterei para useRouter

  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [opcoesDentes, setOpcoesDentes] = useState([1, 1, 1, 1, 1, 1]); // Inicializando com todas as opções como 1
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal dos dentes

  const handleSubmit = () => {
    console.log("asdasdasdasda");
    router.push("resultados/resultado3");
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

  // Função para atualizar as opções de um dente específico
  const handleSelecionarOpcaoDente = (index: any, opcao: any) => {
    const novasOpcoesDentes = [...opcoesDentes];
    novasOpcoesDentes[index] = opcao;
    setOpcoesDentes(novasOpcoesDentes);
  };

  return (
    <View style={styles.container}>
    <StatusBar barStyle={'dark-content'} />
    <Body />
    <TouchableOpacity style={styles.smallSquareButton} onPress={() => router.back()}>
      <CustomText style={styles.smallSquareButtonText}>←</CustomText>
    </TouchableOpacity>
    <View style={styles.overlayContent}>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <CustomText style={styles.text}>NOME:    </CustomText>
          <TextInput
            style={styles.input}
            onChangeText={setNome}
            value={nome}
          />
        </View><View style={styles.inputContainer}>
          <CustomText style={styles.text}>CÓDIGO:</CustomText>
          <TextInput
          keyboardType="numeric"
            style={styles.input}
            onChangeText={setId}
            value={id}
          />
        </View>
        <CustomText style={styles.title}>DENTES</CustomText>

        <View style={styles.denteContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.selectButtonContainer}>
            <CustomText style={styles.text}>V11 </CustomText>
            <Image
              source={require("../../../assets/images/Group.png")}
              style={styles.image}
            />
            <View style={styles.inputDente}>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.selectButtonContainer}>
            <CustomText style={styles.text}>V16</CustomText>
            <Image
              source={require("../../../assets/images/Group.png")}
              style={styles.image}
            />
            <View style={styles.inputDente}>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.selectButtonContainer}>
            <CustomText style={styles.text}>V26</CustomText>
            <Image
              source={require("../../../assets/images/Group.png")}
              style={styles.image}
            />
            <View style={styles.inputDente}>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.selectButtonContainer}>
            <CustomText style={styles.text}>V31</CustomText>
            <Image
              source={require("../../../assets/images/Group.png")}
              style={styles.image}
            />
            <View style={styles.inputDente}>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.selectButtonContainer}>
            <CustomText style={styles.text}>L36</CustomText>
            <Image
              source={require("../../../assets/images/Group.png")}
              style={styles.image}
            />
            <View style={styles.inputDente}>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.selectButtonContainer}>
          <CustomText style={styles.text}>L46</CustomText>
          <Image
              source={require("../../../assets/images/Group.png")}
              style={styles.image}
            />
            
          <View style={styles.inputDente}>
            </View>
          </TouchableOpacity>
        </View>

      {/* Modal para seleção de opções dos dentes */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => {
                handleSelecionarOpcaoDente(0, 1);
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalView}>Opção 1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleSelecionarOpcaoDente(0, 2);
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalView}>Opção 2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleSelecionarOpcaoDente(0, 3);
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalView}>Opção 3</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
    <TouchableOpacity style={styles.inputSubmit} onPress={handleSubmit}>
            <CustomText style={styles.buttonText}>RESULTADO</CustomText>
          </TouchableOpacity>
    </View>
    </View>
  );
}
