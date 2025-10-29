import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { AuthProvider, useAuth } from "../../context/AuthContext";
import { useRouter } from "expo-router";

export default function Perfil() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "¿Seguro que deseas salir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sí, salir",
        onPress: () => {
          logout();
          router.replace("/login");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎬 Perfil</Text>
      <Text style={styles.user}>Usuario: {user}</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
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
  },
  title: {
    color: "#3FB7FF",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  user: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#3FB7FF",
    padding: 14,
    borderRadius: 8,
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
