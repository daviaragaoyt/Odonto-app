import React, { useEffect } from 'react';
import { View, TouchableOpacity, Image, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from './styles';
import { useFonts, LilitaOne_400Regular } from '@expo-google-fonts/lilita-one';
import CustomText from '../../components/CustomText';

export default function Index() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    LilitaOne_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      const timer = setTimeout(() => {
        router.back(); // Voltar para a tela principal após 10 segundos
      }, 10000); // 10000 ms = 10 segundos

      return () => clearTimeout(timer); // Limpar o timeout se o componente desmontar
    }
  }, [fontsLoaded, router]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <CustomText>Carregando...</CustomText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.containerTitle}>
        <CustomText style={styles.title}>OK!</CustomText>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../../assets/images/ok.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.containerTitle}>
        <CustomText style={styles.text}>
          Sua saúde bucal está boa, mas pode melhorar.
        </CustomText>
      </View>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../../assets/images/logo.png")}
          style={styles.logo}
        />
      </View>
    </View>
  );
}
