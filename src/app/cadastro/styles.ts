import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  body: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1CAAFA', // Cor de fundo para garantir que não haja espaço branco
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
})