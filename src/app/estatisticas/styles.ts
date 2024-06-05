import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1CAAFA',
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
  overlayContent: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  title: {
    marginLeft: 90,
    color: '#fff',
    fontSize: 40,
  },

  denteContainer: {
    flex:1,
   alignItems:'center',
    flexDirection: 'row',
    flexWrap: 'wrap', // Permite que os itens quebrem para a próxima linha
    justifyContent: 'space-around',
  },
  selectButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    marginHorizontal: 5, // Espaçamento horizontal entre os itens
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginLeft: 5,
  },
  formContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginTop: 100,
    width: '80%',
  },
  inputContainer: {
    textAlign: 'right',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
    height: 40,
    borderRadius: 5,
    marginLeft: 20,
    fontSize: 20,
    color: "black",
    padding: 5,
    backgroundColor: '#f9fdfe',
  },
  select: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
  },
  inputSubmit: {
    justifyContent: "center",
    alignItems: "center",
    width: '80%',
    height: 70,
    marginBottom: 100,
    borderRadius: 50, // O valor deve ser a metade da altura para formar um oval deitado
    paddingHorizontal: 30, // Ajustar o preenchimento horizontal para centralizar o texto
     borderWidth: 3,
    borderColor: "#6DB1D796",
    backgroundColor: "#6DB1D7",
  },
  buttonText: {
    color: "#fff",
    fontSize: 25,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    margin: 20,
    backgroundColor: "white",
    padding: 35,
    alignItems: "center",
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  backButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25, // Forma oval
    backgroundColor: '#334EA0',
    marginTop: 10,
    width: '80%',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
  },
 
});
