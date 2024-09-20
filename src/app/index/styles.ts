//CSS DA TELA INICIAL

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1CAAFA', // Cor de fundo para garantir que não haja espaço branco
    top:0,
    left: 0,
    right: 0,
    bottom: 0,
    position:'absolute',
  },
  overlayContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop:100,
    width: 420,
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nome: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '80%', // Altere aqui para garantir a largura desejada
    borderWidth: 1,
    borderColor: '#1CAAFA',
    borderRadius: 6,
    backgroundColor: '#fff'
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 5,
    fontSize: 20,
    color: 'black',
    padding: 5,
    backgroundColor: '#f9fdfe',
  },
  searchButton: {
    borderWidth: 1,
    borderColor: '#334EA0',
    height: 40,
    padding: 10,
    backgroundColor: '#334EA0',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderRadius: 3
  },
  container2: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 50,
    
  },
  inputSubmit: {
    textAlign: 'center',
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    width: '80%',
    padding: 15,
    borderRadius: 10,
    borderColor: '#334EA0',
    borderWidth: 1,
    marginBottom: 20,
    marginTop: 50,
    paddingHorizontal: 5,
    backgroundColor: "#334EA0",
  },
  buttonText: {
    color: "#fff8fa",
    fontSize: 25,
    textShadowColor: '#334EA0',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  logo: {
    width: 200,
    resizeMode: 'contain',
  },

});