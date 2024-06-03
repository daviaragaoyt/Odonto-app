// src/app/index.tsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Link } from 'expo-router';
import { Feather } from 'react-native-vector-icons';
import { styles } from './styles';

export default function Index() {
  return (
    <View style={styles.body}>
      <ImageBackground source={require('../../../assets/images/body.png')} style={styles.backgroundImage}>
        <View style={styles.overlay}>

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
            <Link href="../cadastro/index.tsx" style={styles.inputSubmit}>
              <Text style={styles.buttonText}>Cadastro</Text>
            </Link>
            <Link href="../estatisticas/index.tsx" style={styles.inputSubmit}>
              <Text style={styles.buttonText}>Estatísticas</Text>
            </Link>
          </View>

          <View style={styles.logo}>
            <Image
              source={require("../../../assets/images/logo.png")}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
