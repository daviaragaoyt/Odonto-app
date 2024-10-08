import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Modal, StatusBar, Alert, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts, LilitaOne_400Regular } from '@expo-google-fonts/lilita-one';
import CustomText from '../components/CustomText';
import Background from '../components/Background';
import { styles } from './styles';

export default function Index() {
  const router = useRouter();

  // Hooks UseState
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
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

  // Função para aplicar a máscara de CPF
  const aplicarMascaraCpf = (value: string) => {
    value = value.replace(/\D/g, '');
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return value;
  };

  // Função para validar CPF
  const validarCpf = (cpf: string) => {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) {
      return false;
    }
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) {
      return false;
    }
    return true;
  };

  // Função para filtrar apenas letras para o nome
  const handleNomeChange = (value: string) => {
    const apenasLetras = value.replace(/[^A-Za-zÀ-ÿ\s]/g, ''); // Remove tudo que não é letra ou espaço
    setNome(apenasLetras);
  };

  // Função para quando o botão cadastrar for acionado
  const handleSubmit = async () => {
    if (!nome || !cpf || !matricula || !idade || !genero) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    if (!validarCpf(cpf)) {
      Alert.alert("Erro", "CPF inválido. Por favor, verifique e tente novamente.");
      return;
    }

    const idadeNum = parseInt(idade);
    if (isNaN(idadeNum) || idadeNum < 2 || idadeNum > 99) {
      Alert.alert("Erro", "A idade deve estar entre 2 e 99 anos.");
      return;
    }

    try {
      const response = await fetch('https://bakcend-deploy.vercel.app/addpaciente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          cpf,
          matricula,
          idade,
          sexo: genero,
        }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Paciente cadastrado com sucesso!');
        setNome('');
        setCpf('');
        setMatricula('');
        setIdade('');
        setGenero('');
        router.push({
          pathname: '/dentes',
          params: {
            nome: nome,
            matricula: matricula,
          },
        });
      } else {
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

  const openModal = () => {
    Keyboard.dismiss();
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <Background />
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
              onChangeText={handleNomeChange} // Chama a função que filtra apenas letras
              value={nome}
            />
          </View>

          <View style={styles.inputContainer}>
            <CustomText style={styles.text}>CPF:</CustomText>
            <TextInput
              keyboardType='numeric'
              style={styles.input}
              onChangeText={(value) => setCpf(aplicarMascaraCpf(value))}
              value={cpf}
              maxLength={14}
            />
          </View>

          <View style={styles.inputContainer}>
            <CustomText style={styles.text}>MATRÍCULA:</CustomText>
            <TextInput
              keyboardType='numeric'
              style={styles.input}
              onChangeText={(value) => {
                const formattedValue = value.replace(/\D/g, '').slice(0, 7);
                setMatricula(formattedValue);
              }}
              value={matricula}
              maxLength={7}
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
        </View>

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

        <TouchableOpacity style={styles.inputSubmit} onPress={handleSubmit}>
          <CustomText style={styles.buttonText}>CADASTRAR</CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
}
