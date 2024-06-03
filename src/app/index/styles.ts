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
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    backgroundColor: 'transparent', // Garantir que o fundo seja transparente
  },
  image: {
    width: 450,
    height: 200,
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
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 5,
    fontSize: 20,
    color: "black",
    padding: 5,
    backgroundColor: '#f9fdfe',
  },
  searchButton: {
    borderWidth: 1,
    borderColor: '#334EA0',
    height: 40,
    padding: 10,
    backgroundColor: '#6DB1D7',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  container2: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputSubmit: {
    textAlign:'center',
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    width: '80%',
    padding:15,
    borderRadius: 10,
    borderColor: '#334EA0',
    borderWidth: 1,
    marginBottom: 20,
    marginTop: 50,
    paddingHorizontal: 5,
    backgroundColor: "#6DB1D7",
  },
  buttonText: {
    color: "#fff",
    fontSize: 25,
   
  },
  logo: {
    alignItems: "center",
    width: 200,
    marginTop: 50,
    resizeMode: 'contain',
  },
});
