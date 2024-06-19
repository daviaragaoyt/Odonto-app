import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#62e2e9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#62e2e9',
  },
  containerTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  title: {
    color: "#fff",
    fontSize: 50,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  text: {
    color: "#fff",
    fontSize: 35,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    textAlign: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
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
    backgroundColor: "#6DB1D7",
  },
  buttonText: {
    color: "#fff",
    fontSize: 25,
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