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
    color: '#fff',
    fontSize: 40,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    marginRight: 50
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
    flex: 1,
    height: 40,
    borderRadius: 5,
    fontSize: 20,
    color: "black",
    padding: 5,
    backgroundColor: '#f9fdfe',
  },
  inputSubmit: {
    justifyContent: "center",
    alignItems: "center",
    width: '80%',
    height: 70,
    borderRadius: 35,
    padding: 15,
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
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});
