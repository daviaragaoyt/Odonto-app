import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

const CustomText: React.FC<TextProps> = (props) => {
  return <Text {...props} style={[props.style, styles.text]} />;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'LilitaOne_400Regular',
    textShadowColor: '#334EA0',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
});

export default CustomText;
