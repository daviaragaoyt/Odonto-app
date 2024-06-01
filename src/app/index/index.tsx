
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";
import { styles } from "./styles";
import { Feather } from "react-native-vector-icons";

export default function Index() {

  return (
    <View style={styles.body}>
      <ImageBackground
        source={require('../../../assets/images/body.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <View style={styles.image}>
            <Image
              source={require("../../../assets/images/nome.png")}
              style={styles.nome}
            />
          </View>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              placeholder="Codigo do Paciente"

            />
            <TouchableOpacity style={styles.searchButton}>
              <Feather
                name="search"
                size={20}
                color="white"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.container2}>
            <TouchableOpacity
              style={styles.inputSubmit}

            >
              <Text style={styles.buttonText}>Cadastro</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.inputSubmit}

            >
              <Text style={styles.buttonText}>Estátisticas</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.logo}>
            <Image
              source={require("../../../assets/images/logo.png")}
              style={styles.logoImage}
            />
          </View>
        </View>

      </ImageBackground>
    </View>
  );
};


