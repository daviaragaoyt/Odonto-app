import { StyleSheet } from "react-native";

export const styles=StyleSheet.create({
    body: {
     
      width: '100%',
      height: '100%',
      flex: 1,
     
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
      backgroundColor: 'rgba(255, 255, 255, 0.2)', // Exemplo de sobreposição semi-transparente
      padding: 20,
    },
    image: {
      marginTop:100,
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
      borderWidth: 1,
      borderColor: '#1CAAFA',
      borderRadius: 5,
      backgroundColor: '#fff',
      borderTopRightRadius:6,
      borderBottomRightRadius:6,
    },
    input: {
      flex: 1,
      height: 40,
      borderRadius: 5,
      borderTopRightRadius:6,
      borderBottomRightRadius:6,
      fontSize: 20,
     
      color: "black",
      padding: 5,
      backgroundColor: '#f9fdfe'
    },
    searchButton: {
      borderWidth: 1,
      borderColor: '#334EA0',
      height: 40,
      padding: 10,
      backgroundColor: '#6DB1D7',
      borderRadius: 1,
      borderTopRightRadius:6,
      borderBottomRightRadius:6,
      
    },
    container2: {
      marginTop: 20,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputSubmit: {
      textAlign: "center",
      justifyContent: "center",
      alignContent: "center",
      height: 70,
      width: '80%',
      borderRadius: 10,
      borderColor: '#334EA0',
      borderWidth: 1,
      marginBottom: 20,
      marginTop:50,
      paddingHorizontal: 5,
      color: "#fff",
      backgroundColor: "#6DB1D7",
    },
    buttonText: {
      color: "#fff",
      fontSize: 20,
      textAlign: "center",
    },
    logo: {
      alignItems:"center",
      width: 200,
      marginTop:50,
      
      resizeMode: 'contain',
    },

  });