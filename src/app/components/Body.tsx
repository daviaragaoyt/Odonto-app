import React from 'react';
import { View, ImageBackground, StyleSheet,StatusBar } from 'react-native';

const Body: React.FC = () => {
  return (
    <ImageBackground source={require('../../../assets/images/body.png')} style={styles.backgroundImage}>
       <StatusBar barStyle={'dark-content'}/>
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
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    backgroundColor: 'transparent',
  },
});

export default Body;