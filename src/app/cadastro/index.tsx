import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Modal, Text, TouchableHighlight, StatusBar, Alert, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts, LilitaOne_400Regular } from '@expo-google-fonts/lilita-one';
import MaskInput from 'react-native-mask-input';
import CustomText from '../components/CustomText';
import Body from '../components/Body';
import { styles } from './styles';

export default function Index() {
  const router = useRouter();

  //Hooks UseState
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCPF] = useState('');
  const [idade, setIdade] = useState('');
  const [genero, setGenero] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  //Definindo os gêneros
  const sexo = [
    { id: 1, texto: 'Feminino' },
    { id: 2, texto: 'Masculino' },
    { id: 3, texto: 'Voltar' },
  ];

  //Função para quando o botão cadastrar for acionado
  const handleSubmit = async () => {
    if (!nome || !cpf || !idade || !genero) { //Caso os campos estejam vazios
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return("index");
    }
    
    try {
      const response = await fetch('http://192.168.1.5:3535/addpaciente', { //Fazendo a conexão com o BackEnd. *Alterar o IP de acordo com o da sua máquina
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //Passando os dados
        body: JSON.stringify({
          nome: nome,
          cpf: cpf,
          idade: idade,
          sexo: genero,
          cod_paciente: id,
        }),
      });
  
      if (response.ok) {
        // Se a resposta estiver OK, podemos prosseguir com a navegação ou outra ação necessária
        Alert.alert('Sucesso', 'Paciente cadastrado com sucesso!');
        setId('');
        setNome('');
        setCPF('');
        setIdade('');
        setGenero('');
        router.replace('/'); //Volta para a página Home no index
      } else {
        // Se houve um erro na requisição, vamos verificar se a resposta não está vazia antes de tentar analisar como JSON
        const responseData = await response.text();
        const errorMessage = responseData || 'Erro ao cadastrar paciente. Por favor, tente novamente.';
        Alert.alert('Erro', errorMessage);
      }
    } catch (error) {
      console.error('Erro ao cadastrar paciente:', error);
      Alert.alert('Erro', 'Erro ao cadastrar paciente. Por favor, tente novamente.');
    }
  };

  let [fontsLoaded] = useFonts({
    LilitaOne_400Regular,
  });

  if (!fontsLoaded) {
    return <View><CustomText>Carregando...</CustomText></View>;
  }

  const CPF_MASK = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]; //Modelo para o CPF

  // Verifica se todos os campos obrigatórios foram preenchidos
  const isFormValid = !!id && !!nome && !!cpf && !!idade && !!genero;

  const openModal = () => {
    Keyboard.dismiss(); // Fechar o teclado antes de abrir o modal
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <Body />
      <TouchableHighlight style={styles.smallSquareButton} onPress={() => router.back()}>
        
        <CustomText style={styles.smallSquareButtonText}>←</CustomText>
      </TouchableHighlight>
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

        {/* Botão de cadastro condicionalmente visível */}
        {isFormValid && (
          <TouchableOpacity style={styles.inputSubmit} onPress={handleSubmit}>
            <CustomText style={styles.buttonText}>CADASTRAR </CustomText>
          </TouchableOpacity>
        )}

<Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <TouchableOpacity 
            style={styles.centeredView} 
            activeOpacity={1} 
            onPressOut={closeModal}
          >
            <View style={styles.modalView}>
              {sexo.map(item => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    if(item.texto !== 'Voltar') {
                      setGenero(item.texto);
                    }
                    closeModal();
                    Keyboard.dismiss(); // Fecha o teclado quando o modal é fechado
                  }}
                >
                  <Text>{item.texto}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  );
}
