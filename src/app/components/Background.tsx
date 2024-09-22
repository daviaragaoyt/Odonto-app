import React, { useState, useEffect } from 'react';
import { View, ImageBackground, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import { Asset } from 'expo-asset';
const Background: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    async function loadAssets() {
      await Asset.loadAsync(require('../../../assets/images/Background.png'));
      setIsLoaded(true);
    }
    loadAssets();
  }, []);
  if (!isLoaded) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0668a1" />
      </View>
    );
  }
  return (
    <ImageBackground source={require('../../../assets/images/Background.png')} style={styles.backgroundImage}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.overlay} />
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    backgroundColor: 'transparent',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0668a1', // Cor de fundo enquanto carrega
  },
});
export default Background;