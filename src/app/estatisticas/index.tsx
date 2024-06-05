import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Modal, Text, TouchableHighlight, StatusBar, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts, LilitaOne_400Regular } from '@expo-google-fonts/lilita-one';
import CustomText from '../components/CustomText';
import Body from '../components/Body';
import { styles } from './styles';

export default function Index() {
  const router = useRouter();

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCPF] = useState('');
  const [idade, setIdade] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [genero, setGenero] = useState('');

  const handleSubmit = () => {
    console.log('ID:', id);
    console.log('Nome:', nome);
    console.log('CPF:', cpf);
    console.log('Idade:', idade);
    console.log('Gênero:', genero);
  };

  let [fontsLoaded] = useFonts({
    LilitaOne_400Regular,
  });

  if (!fontsLoaded) {
    return <View><CustomText>Carregando...</CustomText></View>;
  }

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
              onChangeText={setId}
              value={id}
            />
          </View><View style={styles.inputContainer}>
            <CustomText style={styles.text}>CÓDIGO:</CustomText>
            <TextInput
              style={styles.input}
              onChangeText={setId}
              value={id}
            />
          </View>
          <CustomText style={styles.title}>DENTE</CustomText>

          <View style={styles.denteContainer}>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.selectButtonContainer}>
              <CustomText style={styles.text}>V11 {genero}</CustomText>
              <Image
                source={require("../../../assets/images/Group.png")}
                style={styles.image}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.selectButtonContainer}>
              <CustomText style={styles.text}>V16 {genero}</CustomText>
              <Image
                source={require("../../../assets/images/Group.png")}
                style={styles.image}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.selectButtonContainer}>
              <CustomText style={styles.text}>V26 {genero}</CustomText>
              <Image
                source={require("../../../assets/images/Group.png")}
                style={styles.image}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.selectButtonContainer}>
              <CustomText style={styles.text}>V31 {genero}</CustomText>
              <Image
                source={require("../../../assets/images/Group.png")}
                style={styles.image}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.selectButtonContainer}>
              <CustomText style={styles.text}>L36 {genero}</CustomText>
              <Image
                source={require("../../../assets/images/Group.png")}
                style={styles.image}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.selectButtonContainer}>
              <CustomText style={styles.text}>L46 {genero}</CustomText>
              <Image
                source={require("../../../assets/images/Group.png")}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableHighlight
                  onPress={() => {
                    setGenero('Masculino');
                    setModalVisible(false);
                  }}
                >
                  <Text>Masculino</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => {
                    setGenero('Feminino');
                    setModalVisible(false);
                  }}
                >
                  <Text>Feminino</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => setModalVisible(false)}
                >
                  <Text>Cancelar</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </View>
        <TouchableOpacity style={styles.inputSubmit} onPress={handleSubmit}>
            <CustomText style={styles.buttonText}>Enviar</CustomText>
          </TouchableOpacity>
      </View>
    </View>
  );
}
