import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

export default function Register() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleRegister = async () => {
    if (!nombre || !correo || !pass || !confirmPass) {
      Alert.alert("Atención", "Por favor completá todos los campos.");
      return;
    }

    if (pass !== confirmPass) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await axios.post("http://192.168.100.150:3000/api/usuarios/register", {
        nombre,
        correo,
        pass,
      });

      Alert.alert("Registro exitoso", "Tu cuenta fue creada correctamente 🎬", [
        { text: "Iniciar sesión", onPress: () => router.push("/login") },
      ]);
      console.log("Usuario registrado:", response.data);
    } catch (error: any) {
      console.error("Error en registro:", error);
      Alert.alert("Error", error.response?.data?.error || "No se pudo completar el registro.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/*  Logo CineTrack */}
      <Image source={require("../assets/images/cinetrack-logo.png")} style={styles.logo} />

      {/* Eslogan */}
      <View style={styles.sloganContainer}>
        <Text style={styles.sloganLine1}>Tu universo cinematográfico,</Text>
        <Text style={styles.sloganLine2}>siempre contigo 🎬</Text>
      </View>

      {/*  Campos */}
      <TextInput
        placeholder="Nombre completo"
        placeholderTextColor="#999"
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        placeholder="Correo electrónico"
        placeholderTextColor="#999"
        style={styles.input}
        keyboardType="email-address"
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
      <TextInput
        placeholder="Confirmar contraseña"
        placeholderTextColor="#999"
        style={styles.input}
        secureTextEntry
        value={confirmPass}
        onChangeText={setConfirmPass}
      />

      {/*  Botón principal */}
      <TouchableOpacity style={styles.buttonBlue} onPress={handleRegister}>
        <Text style={styles.buttonText}>Crear Cuenta</Text>
      </TouchableOpacity>

      {/*  Enlace a login */}
      <TouchableOpacity onPress={() => router.push("/login")} style={styles.linkContainer}>
        <Text style={styles.text}>
          ¿Ya tenés cuenta? <Text style={styles.linkBlue}>Iniciá sesión</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  linkContainer: {
    marginTop: 25,
    alignItems: "center",
  },
  text: {
    color: "#E6DED2",
    fontSize: 15,
    fontFamily: "Montserrat_400Regular",
  },
  linkBlue: {
    color: "#3FB7FF",
    fontSize: 15,
    fontFamily: "Montserrat_700Bold",
  },
});
