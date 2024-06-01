import { StyleSheet } from "react-native";

export const styles=StyleSheet.create({
    body: {
        width: '100%',
        height: 1000,
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
        height:'  100%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        padding: 20,
    
      },
      image: {
        marginTop:100,
        width: 450,
        height: 150,
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
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        width: '80%',
        borderWidth: 1,
        borderColor: '#1CAAFA',
        borderRadius: 10,
        backgroundColor: '#fff',
      },
      input: {
        flex: 1,
        height: 40,
        fontSize: 20,
        borderWidth: 1,
        borderColor: "transparent",
        color: "black",
        padding: 5,
        borderRadius: 6,
        backgroundColor: '#f9fdfe',
      },
      searchButton: {
        borderWidth: 1,
        borderColor: '#334EA0',
        height: 40,
        paddingHorizontal: 10,
        backgroundColor: '#6DB1D7',
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
      },
      container2: {
        marginTop: 100,
        width: '80%', 
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000', // Cor da sombra
        shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
        shadowOpacity: 0.2, // Opacidade da sombra
        shadowRadius: 2, // Raio da sombra
        elevation: 2, // Elevação para sombra no Android
      },
      inputSubmit: {
        textAlign: "center",
        justifyContent: "center",
        alignContent: "center",
        height: 100,
        width: '100%', 
        borderRadius: 10,
        borderColor: '#334EA0',
        borderWidth: 1,
        marginBottom: 50,
        color: "#fff",
        backgroundColor: "#6DB1D7",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
      },
      buttonText: {
        color: "#fff",
        fontSize: 25,
        textAlign: "center",
        shadowColor: '#000', // Cor da sombra
        shadowOffset: { width: 0, height: 5 }, // Deslocamento da sombra
        shadowOpacity: 0.1, // Opacidade da sombra
        shadowRadius: 10, // Raio da sombra
        elevation: 2, // Elevação para sombra no Android
      },
      
      logo: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
      },
      logoImage: {
        width: 100,
        height: 100,
        marginBottom:50,
      },
    
})