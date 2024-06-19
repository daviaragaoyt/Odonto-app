
import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

const CustomText: React.FC<TextProps> = (props) => {
  return <Text {...props} style={[props.style, styles.text]} />;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'LilitaOne_400Regular',
  },
  textSelected:{
    fontFamily: 'LilitaOne_400Regular',
  },
});

export default CustomText;

//Transformei a lilitaone em um component e coloquei 2 styles que a usariam.
