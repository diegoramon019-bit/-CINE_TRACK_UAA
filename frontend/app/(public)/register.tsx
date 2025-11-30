import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [pass, setPass] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    if (!nombre || !correo || !pass) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await axios.post("http://192.168.100.169:3000/api/usuarios/register", {
        nombre,
        correo,
        pass,
      });

      // Manejo correcto del mensaje según la respuesta del backend
      if (response.status === 201 || response.data.message) {
        Alert.alert(" Registro exitoso", "Ya puedes iniciar sesión en CineTrack.");
        router.push("/login");
      } else {
        Alert.alert("Error", "Ocurrió un problema al registrar el usuario.");
      }
    } catch (error: any) {
      console.error(" Error en el registro:", error.message);
      Alert.alert("Error", "No se pudo completar el registro. Verifica tus datos.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎬 Únete al séptimo arte digital</Text>
      <Text style={styles.subtitle}>Crea tu cuenta para comenzar</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        placeholderTextColor="#aaa"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        value={correo}
        onChangeText={setCorreo}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={pass}
        onChangeText={setPass}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.link}>¿Ya tienes cuenta? Iniciá sesión</Text>
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
  title: {
    color: "#3FB7FF",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 25,
    textAlign: "center",
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
    padding: 14,
    borderRadius: 8,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  link: {
    color: "#3FB7FF",
    marginTop: 20,
  },
});