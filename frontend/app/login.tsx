import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = async () => {
    if (!correo || !pass) {
      Alert.alert("Atención", "Por favor completa todos los campos.");
      return;
    }

    try {
      const response = await axios.post("http://192.168.100.150:3000/api/usuarios/login", {
        correo,
        pass,
      });

      Alert.alert("Éxito", "Login exitoso, bienvenido a CineTrack 🎬");
      console.log("Respuesta del servidor:", response.data);
      router.push("/Dashboard");
    } catch (error: any) {
      console.error("Error en login:", error);
      Alert.alert("Error", error.response?.data?.error || "Error de conexión con el servidor.");
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔹 Logo */}
      <Image source={require("../assets/images/cinetrack-logo.png")} style={styles.logo} />

      {/* 🔹 Eslogan en dos líneas */}
      <View style={styles.sloganContainer}>
        <Text style={styles.sloganLine1}>El mundo del septimo arte,</Text>
        <Text style={styles.sloganLine2}>en digital.</Text>
      </View>

      {/* 🔹 Inputs */}
      <TextInput
        placeholder="Correo electrónico"
        placeholderTextColor="#999"
        style={styles.input}
        value={correo}
        onChangeText={setCorreo}
      />
      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#999"
        style={styles.input}
        secureTextEntry
        value={pass}
        onChangeText={setPass}
      />

      {/* 🔹 Botón de ingresar */}
      <TouchableOpacity style={styles.buttonBlue} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      {/* 🔹 Enlaces inferiores */}
      <View style={styles.linksContainer}>
        <Text style={styles.text}>
          ¿No tenés cuenta?{" "}
          <Text style={styles.linkBlue} onPress={() => router.push("/registrer")}>
            Registrate
          </Text>
        </Text>

        <TouchableOpacity>
          <Text style={styles.linkBlue}>¿Olvidaste la contraseña?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0D0D0D",
    padding: 20,
  },
  logo: {
    width: 250,
    height: 150,
    resizeMode: "contain",
    marginBottom: 10,
  },
  sloganContainer: {
    marginBottom: 40,
  },
  sloganLine1: {
    color: "#E6DED2",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Montserrat_400Regular",
  },
  sloganLine2: {
    color: "#E6DED2",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Montserrat_400Regular",
  },
  input: {
    width: "90%",
    backgroundColor: "#1A1A1A",
    color: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#333",
    fontFamily: "Montserrat_400Regular",
  },
  buttonBlue: {
    backgroundColor: "#3FB7FF",
    width: "90%",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#0D0D0D",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Montserrat_700Bold",
  },
  linksContainer: {
    marginTop: 25,
    alignItems: "center",
  },
  text: {
    color: "#E6DED2",
    fontSize: 15,
    marginBottom: 8,
    fontFamily: "Montserrat_400Regular",
  },
  linkBlue: {
    color: "#3FB7FF",
    fontSize: 15,
    fontFamily: "Montserrat_700Bold",
  },
});
