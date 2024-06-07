import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Modal, Text, TouchableHighlight, StatusBar, Alert } from 'react-native';
import { useRouter } from 'expo-router'; // Importar o hook useRouter
import { useFonts, LilitaOne_400Regular } from '@expo-google-fonts/lilita-one';
import MaskInput from 'react-native-mask-input';
import CustomText from '../components/CustomText';
import Body from '../components/Body';
import { styles } from './styles';

export default function Index() {
  const router = useRouter(); // Inicializar o hook useRouter

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCPF] = useState('');
  const [idade, setIdade] = useState('');
  const [genero, setGenero] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const sexo = [
    { id: 1, texto: 'Feminino' },
    { id: 2, texto: 'Masculino' },
    { id: 3, texto: 'Voltar' },
  ];

  const handleSubmit = () => {
    if (!id || !nome || !cpf || !idade || !genero) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    console.log('ID:', id);
    console.log('Nome:', nome);
    console.log('CPF:', cpf);
    console.log('Idade:', idade);
    console.log('Gênero:', genero);

    // Navegar de volta para a página inicial após o envio bem-sucedido
    router.replace('/');
  };

  let [fontsLoaded] = useFonts({
    LilitaOne_400Regular,
  });

  if (!fontsLoaded) {
    return <View><CustomText>Carregando...</CustomText></View>;
  }

  const CPF_MASK = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <Body />
      <TouchableOpacity style={styles.smallSquareButton} onPress={() => router.back()}>
        <CustomText style={styles.smallSquareButtonText}>←</CustomText>
      </TouchableOpacity>
      <View style={styles.overlayContent}>
        <CustomText style={styles.title}>CADASTRO</CustomText>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <CustomText style={styles.text}>CÓDIGO:</CustomText>
            <TextInput
              keyboardType='numeric'
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
            <MaskInput
              keyboardType='numeric'
              placeholder='000.000.000-00'
              style={styles.input}
              value={cpf}
              onChangeText={(masked, unmasked) => {
                setCPF(masked); // store masked value in state
              }}
              mask={CPF_MASK}
            />
          </View>

          <View style={styles.inputContainer}>
            <CustomText style={styles.text}>IDADE:</CustomText>
            <TextInput
              keyboardType='numeric'  
              style={styles.input}
              onChangeText={setIdade}
              value={idade}
            />
          </View>

          <View style={styles.inputContainer}>
            <CustomText style={styles.text}>SEXO:</CustomText>
            <TouchableOpacity style={styles.input} onPress={() => setModalVisible(true)}>
              <CustomText style={styles.textSelected}>{genero || 'Selecionar'}</CustomText>
            </TouchableOpacity>
          </View>

        </View>

        <TouchableOpacity style={styles.inputSubmit} onPress={handleSubmit}>
          <CustomText style={styles.buttonText}>CADASTRAR </CustomText>
        </TouchableOpacity>

        {/* Modal para seleção de gênero */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {sexo.map(item => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    if(item.texto !== 'Voltar') {
                      setGenero(item.texto);
                    }
                    setModalVisible(!modalVisible);
                  }}
                 
                >
                  <Text >{item.texto}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
