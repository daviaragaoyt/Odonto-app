import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Modal, Text, TouchableHighlight } from 'react-native';
import { useFonts, LilitaOne_400Regular } from '@expo-google-fonts/lilita-one';
import CustomText from '../components/CustomText';
import Body from '../components/Body';
import { styles } from './styles';

export default function Index() {
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
     
       <Body />
      <View style={styles.overlayContent}>
      <CustomText style={styles.title}>CADASTRO</CustomText>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <CustomText style={styles.text}>CÓDIGO:</CustomText>
            <TextInput
              style={styles.input}
              onChangeText={setId}
              value={id}
            />
          </View>

          <View style={styles.inputContainer}>
            <CustomText style={styles.text}>NOME:</CustomText>
            <TextInput
              style={styles.input}
              onChangeText={setNome}
              value={nome}
            />
          </View>

          <View style={styles.inputContainer}>
            <CustomText style={styles.text}>CPF:</CustomText>
            <TextInput
              style={styles.input}
              onChangeText={setCPF}
              value={cpf}
            />
          </View>

          <View style={styles.inputContainer}>
            <CustomText style={styles.text}>IDADE:</CustomText>
            <TextInput
              style={styles.input}
              onChangeText={setIdade}
              value={idade}
            />
          </View>

          <CustomText style={styles.text} onPress={() => setModalVisible(true)}>Selecione o gênero: {genero || 'Selecione'}</CustomText>

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

          <TouchableOpacity style={styles.inputSubmit} onPress={handleSubmit}>
            <CustomText style={styles.buttonText}>Enviar</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
