import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Modal, StatusBar, Alert, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts, LilitaOne_400Regular } from '@expo-google-fonts/lilita-one';

import CustomText from '../components/CustomText';
import Body from '../components/Body';
import { styles } from './styles';

export default function Index() {
  const router = useRouter();

  // Hooks UseState
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [idade, setIdade] = useState('');
  const [genero, setGenero] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // Definindo os gêneros
  const sexo = [
    { id: 1, texto: 'Feminino' },
    { id: 2, texto: 'Masculino' },
    { id: 3, texto: 'Outros' },
    { id: 4, texto: 'Voltar' },
  ];

  // Função para quando o botão cadastrar for acionado
  const handleSubmit = async () => {
    if (!nome || !matricula || !idade || !genero) { // Caso os campos estejam vazios
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch('https://bakcend-deploy.vercel.app/addpaciente', { // Fazendo a conexão com o BackEnd. *Alterar o IP de acordo com o da sua máquina
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Passando os dados
        body: JSON.stringify({
          nome: nome,
          cpf: matricula,
          idade: idade,
          sexo: genero,
        }),
      });

      if (response.ok) {
        // Se a resposta estiver OK, podemos prosseguir com a navegação ou outra ação necessária
        Alert.alert('Sucesso', 'Paciente cadastrado com sucesso!');
        setNome('');
        setMatricula('');
        setIdade('');
        setGenero('');
        router.replace('/'); // Volta para a página Home no index
      } else {
        // Se houve um erro na requisição, vamos verificar se a resposta não está vazia antes de tentar analisar como JSON
        const responseData = await response.text();
        const errorMessage = responseData || 'Erro ao cadastrar paciente. Por favor, tente novamente.';
        Alert.alert('Erro', 'Esse nome já existe em nosso sistema.');
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
      <View style={styles.overlayContent}>
        <TouchableOpacity style={styles.smallSquareButton} onPress={() => router.back()}>
          <CustomText style={styles.smallSquareButtonText}>←</CustomText>
        </TouchableOpacity>
        <CustomText style={styles.title}>CADASTRO</CustomText>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <CustomText style={styles.text}>NOME:</CustomText>
            <TextInput
              style={styles.input}
              onChangeText={setNome}
              value={nome}
            />
          </View>

          <View style={styles.inputContainer}>
            <CustomText style={styles.textMatricula}>MATRÍCULA:</CustomText>

            <TextInput
              keyboardType='numeric'
              style={styles.input}
              value={matricula}
              onChangeText={setMatricula}
              
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
            <TouchableOpacity style={styles.input} onPress={openModal}>
              <CustomText style={styles.textSelected}>{genero || 'Selecionar'}</CustomText>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.inputSubmit} onPress={handleSubmit}>
            <CustomText style={styles.buttonText}>CADASTRAR </CustomText>
          </TouchableOpacity>
        </View>

        {/* Modal para seleção de gênero */}
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
                  style={styles.modalOption}
                  onPress={() => {
                    if (item.texto !== 'Voltar') {
                      setGenero(item.texto);
                    }
                    closeModal();
                  }}
                >
                  <CustomText style={styles.modalText}>{item.texto}</CustomText>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>

  );
}
