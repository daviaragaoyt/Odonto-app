import React from 'react';
import { View, ImageBackground, StyleSheet, StatusBar } from 'react-native';

// Define o componente Body
const Body: React.FC = () => {
  return (
    // Imagem de fundo que cobre toda a tela
    <ImageBackground source={require('../../../assets/images/body.png')} style={styles.backgroundImage}>
      {/* Barra de status com estilo de conteúdo escuro */}
      <StatusBar barStyle={'dark-content'}/>
      {/* Overlay transparente sobre a imagem de fundo */}
      <View style={styles.overlay} />
    </ImageBackground>
  );
};

// Estilos para os componentes
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1, // Ocupar toda a tela
    resizeMode: 'cover', // Redimensionar a imagem para cobrir a tela
    justifyContent: 'center', // Centralizar conteúdo horizontalmente
    alignItems: 'center', // Centralizar conteúdo verticalmente
  },
  overlay: {
    flex: 1, // Ocupar toda a tela
    justifyContent: 'center', // Centralizar conteúdo horizontalmente
    alignItems: 'center', // Centralizar conteúdo verticalmente
    width: '100%', // Largura total da tela
    padding: 20, // Espaçamento interno
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

export default Body;

//Foram 3 pages com fundos iguais entt fiz o Body virar um componente e dps so o chamei.