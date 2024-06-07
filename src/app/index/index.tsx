import React from 'react';
import { View, TextInput, TouchableOpacity, Image, TouchableOpacityProps, StatusBar } from 'react-native';
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
            placeholder="Codigo do Paciente"
          />
          <TouchableOpacity style={styles.searchButton}>
            <Feather
              name="search"
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.container2}>
          <TouchableOpacity style={styles.inputSubmit}  onPress={() => router.push('cadastro')} >
          <CustomText style={styles.buttonText}>
          CADASTRO
          </CustomText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inputSubmit}  onPress={() => router.push('estatisticas')} >
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
