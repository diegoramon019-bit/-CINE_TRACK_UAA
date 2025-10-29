import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";

export default function ResetPassword() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");

  const handleReset = async () => {
    if (!correo) {
      Alert.alert("Presta atencion a los campos", "Por favor ingresá tu correo electronico.");
      return;
    }

    try {
      // 🔹 En el futuro podrías conectar esto con tu backend (envío de correo)
      console.log("Solicitud de restablecer contraseña para:", correo);
      Alert.alert(
        "Correo enviado al correo,",
        "Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.",
        [{ text: "Volver", onPress: () => router.push("/login") }]
      );
    } catch (error) {
      console.error("Error al solicitar restablecimiento:", error);
      Alert.alert("Error", "No se pudo procesar la solicitud.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/cinetrack-logo.png")} style={styles.logo} />

      <View style={styles.sloganContainer}>
        <Text style={styles.sloganLine1}>Restablecer contraseña</Text>
        <Text style={styles.sloganLine2}>Ingresá tu correo para continuar</Text>
      </View>

      <TextInput
        placeholder="Correo electrónico"
        placeholderTextColor="#999"
        style={styles.input}
        value={correo}
        onChangeText={setCorreo}
      />

      <TouchableOpacity style={styles.buttonBlue} onPress={handleReset}>
        <Text style={styles.buttonText}>Enviar enlace</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/login")} style={styles.linkContainer}>
        <Text style={styles.linkBlue}>Volver al inicio de sesión</Text>
      </TouchableOpacity>
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
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Montserrat_700Bold",
  },
  sloganLine2: {
    color: "#E6DED2",
    fontSize: 15,
    textAlign: "center",
    fontFamily: "Montserrat_400Regular",
  },
  input: {
    width: "90%",
    backgroundColor: "#1A1A1A",
    color: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
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
  linkContainer: {
    marginTop: 25,
    alignItems: "center",
  },
  linkBlue: {
    color: "#3FB7FF",
    fontSize: 15,
    fontFamily: "Montserrat_700Bold",
  },
});
