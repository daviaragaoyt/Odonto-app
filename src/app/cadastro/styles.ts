//CSS DA TELA DE CADASTRO

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1CAAFA',
  },
  overlayContent: {

    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop:50,
    color: '#fff',
    fontSize: 40,
    textShadowColor: '#000000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    marginRight: 50,
    textShadowColor: '#000000BF',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  textSelected:{
    color:'#000',
    textShadowColor: '#fff',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    fontSize:20,
  },
  
  formContainer: {
    flex: 1,

    alignItems: 'flex-start',
    marginTop: 100,
    width: '80%',
  },
  inputContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',

    marginBottom: 20,

  },
  input: {
    borderWidth: 1,
    borderColor: '#1CAAFA',
    borderRadius: 5,
    backgroundColor: '#fff',
    flex: 1,
    width:200,
    height: 40,
  
    fontSize: 20,
    color: "black",
    padding: 5,
  },
  inputSubmit: {
    position:"relative",
    textAlign: 'center',
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    width: 300,
    padding: 15,
    borderRadius: 10,
    borderColor: '#334EA0',
    borderWidth: 1,
    marginBottom: 100,
    paddingHorizontal: 5,
    backgroundColor: "#6DB1D7",
  },
  buttonText: {
    position:"relative",
    color: "#fff",
    fontSize: 25,
    textShadowColor: '#334EA0',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    color:'#000',
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  backButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25, // Forma oval
    backgroundColor: '#334EA0',
    marginTop: 20,
    width: '80%',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  smallSquareButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6DB1D7',
    borderRadius: 5, // Pequeno botão quadrado
  },
  smallSquareButtonText: {
    color: '#fff',
    fontSize: 18,
  },
   modalOption: {
    width: '100%',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
