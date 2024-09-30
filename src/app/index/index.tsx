import React, { useState, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, Image, TouchableOpacityProps, StatusBar, Alert, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import Feather from 'react-native-vector-icons/Feather';
import { styles } from './styles';
import { useFonts, LilitaOne_400Regular } from '@expo-google-fonts/lilita-one';
import CustomText from '../components/CustomText';
import Background from '../components/Background';

interface CustomButtonProps extends TouchableOpacityProps {
  text: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, ...props }) => (
  <TouchableOpacity {...props} style={styles.inputSubmit}>
    <CustomText style={styles.buttonText}>{text}</CustomText>
  </TouchableOpacity>
);

export default function Index() {

  //const linkExt = useCallback(() => { Linking.openURL(url) },[]) /
  const linkExt = useCallback(() => {
    Linking.openURL("https://1drv.ms/x/c/48b64a126a64263a/EWkzPGxg4olCsy9ZlcAq5xABb_KK_yp0kJsobCJ7AO-_VA?e=fHMTOp"); //Link para a planilha Excel
  }, []);
  const pesquisa=useCallback(()=>{
    Linking.openURL("https://docs.google.com/forms/d/e/1FAIpQLSckPn6DoZ-c5gjOIUo64suleflwuR7AA80eS-DzVLMLTAzHNw/viewform?usp=sf_link");//Link da Pesquisa de aprovação
},[]);

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
      const response = await fetch(`https://bakcend-deploy.vercel.app/paciente/${codigoPaciente}`); //Conexão com o BackEnd para fazer uma busca se existe o código do paciente inserido na home
      if (response.ok) {
        const paciente = await response.json();
        console.log(paciente);

        router.push({
          pathname: '/dentes', //Caso exista, vai para a tela de dentes
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
      <Background />
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
            placeholder="Matricula do Paciente"
            keyboardType='numeric'
            maxLength={7}
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
          <TouchableOpacity style={styles.inputSubmit} onPress={() => router.push('/cadastro')}>
            <CustomText style={styles.buttonText}>
              CADASTRO
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inputSubmit} onPress={linkExt}>
            <CustomText style={styles.buttonText}>
              ESTATÍSTICAS
            </CustomText>
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
        <TouchableOpacity onPress={pesquisa}>
          <Image
            source={require("../../../assets/images/logo.png")}
            style={styles.logo}
          />
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
