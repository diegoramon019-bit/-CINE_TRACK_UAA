import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import { AuthProvider, useAuth } from "../../context/AuthContext";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [pass, setPass] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://192.168.100.150:3000/api/usuarios/login", {
        correo,
        pass,
      });
      Alert.alert("🎬 Éxito", "Login exitoso. Bienvenido a CineTrack.");
      login(correo);
      router.push("/Dashboard");
    } catch (error) {
      Alert.alert("Error", "Correo o contraseña incorrectos");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🎬 CineTrack</Text>
      <Text style={styles.subtitle}>Tu universo cinematográfico, siempre contigo.</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#aaa"
        onChangeText={setCorreo}
        value={correo}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        onChangeText={setPass}
        value={pass}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/registrer")}>
        <Text style={styles.link}>¿No tenés cuenta? Registrate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  logo: {
    color: "#3FB7FF",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    color: "#ccc",
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    backgroundColor: "#1A1A1A",
    width: "100%",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    color: "#fff",
  },
  button: {
    backgroundColor: "#3FB7FF",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  link: {
    color: "#3FB7FF",
    marginTop: 20,
    fontSize: 14,
  },
});
