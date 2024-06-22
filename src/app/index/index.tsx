import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, TouchableOpacityProps, StatusBar, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Feather from 'react-native-vector-icons/Feather';
import { styles } from './styles';
import { useFonts, LilitaOne_400Regular } from '@expo-google-fonts/lilita-one';
import CustomText from '../components/CustomText';
import Body from '../components/Body';

interface CustomButtonProps extends TouchableOpacityProps {
  text: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, ...props }) => (
  <TouchableOpacity {...props} style={styles.inputSubmit}>
    <CustomText style={styles.buttonText}>{text}</CustomText>
  </TouchableOpacity>
);

export default function Index() {
  const router = useRouter();
  //State para cod_paciente
  const [codigoPaciente, setCodigoPaciente] = useState('');

  let [fontsLoaded] = useFonts({
    LilitaOne_400Regular,
  });

  if (!fontsLoaded) {
    return <View><CustomText>Carregando...</CustomText></View>;
  }

  //Função de buscar o código do paciente
  const handleSearch = async () => {
    try {
      const response = await fetch(`http://192.168.0.12:3535/pacientes?nome=${codigoPaciente}`); //Conexão com o BackEnd para fazer uma busca se existe o código do paciente inserido na home
      if (response.ok) {
        const paciente = await response.json();
        console.log(paciente);

        router.push({
          pathname: 'dentes', //Caso exista, vai para a tela de dentes
          params: { //Passa os parâmetros que serão recebidos pela tela de dentes
            codPaciente: paciente["cod_paciente"],
            nome: paciente["nome"]
          },
        });
        
      } else {
        Alert.alert('Aviso', 'Paciente não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar paciente:', error);
      Alert.alert('Erro', 'Erro ao buscar paciente');
    }
  };
  //Mudando o Search para modificar o state do codigo paciente
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <Body />
      <View style={styles.overlayContent}>
        <View style={styles.image}>
          <Image
            source={require("../../../assets/images/nome.png")}
            style={styles.nome}
          />
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome do Paciente"
            value={codigoPaciente}
            onChangeText={setCodigoPaciente}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Feather
              name="search"
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.container2}>
          <TouchableOpacity style={styles.inputSubmit} onPress={() => router.push('cadastro')}>
            <CustomText style={styles.buttonText}>
              CADASTRO
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inputSubmit} onPress={() => router.push('dentes')}>
            <CustomText style={styles.buttonText}>
              ESTATÍSTICAS
            </CustomText>
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/images/logo.png")}
            style={styles.logo}
          />
        </View>
      </View>
    </View>
  );
  }
