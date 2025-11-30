import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

export default function Perfil() {
  const { user, logout } = useAuth();
  const [bio, setBio] = useState<string>("");
  const [reseñas, setReseñas] = useState<
    { idResena: number; titulo: string; calificacion: number; contenido: string }[]
  >([]);
  const [foto, setFoto] = useState<string>(""); // antes era string|null
  const [loading, setLoading] = useState<boolean>(true);

  const IP = "192.168.100.169"; // 💻 tu IP local

  // 🧭 Cargar datos del perfil
  useEffect(() => {
    if (!user?.idUsuario) return;

    const fetchPerfil = async () => {
      try {
        const res = await axios.get(`http://${IP}:3000/api/usuarios/${user.idUsuario}`);
        setBio(res.data.bio || "");
        setFoto(
          res.data.foto_perfil
            ? `http://${IP}:3000/uploads/fotos/${res.data.foto_perfil}`
            : ""
        );

        const resReseñas = await axios.get(
          `http://${IP}:3000/api/usuarios/resenas/${user.idUsuario}`
        );
        setReseñas(resReseñas.data || []);
      } catch (error) {
        console.error("⚠️ Error al cargar perfil:", error);
        Alert.alert("Error", "No se pudo cargar la información del perfil.");
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, [user]);

  // 📝 Actualizar biografía
  const handleActualizarBio = async () => {
    if (!user?.idUsuario) {
      Alert.alert("Error", "No se encontró información del usuario.");
      return;
    }

    try {
      await axios.put(`http://${IP}:3000/api/usuarios/bio/${user.idUsuario}`, { bio });
      Alert.alert("✅ Éxito", "Tu biografía fue actualizada.");
    } catch (error) {
      console.error("Error al actualizar bio:", error);
      Alert.alert("Error", "No se pudo actualizar la biografía.");
    }
  };

  // 📷 Cambiar foto
  const handleCambiarFoto = async () => {
    if (!user?.idUsuario) {
      Alert.alert("Error", "No se encontró información del usuario.");
      return;
    }

    // 🚨 Nueva API de Expo SDK 54+
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"], // reemplaza MediaTypeOptions por string[]
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const formData = new FormData();
      formData.append("foto", {
        uri: result.assets[0].uri,
        type: "image/jpeg",
        name: `perfil_${user.idUsuario}.jpg`,
      } as any);

      try {
        const res = await axios.post(
          `http://${IP}:3000/api/usuarios/foto/${user.idUsuario}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setFoto(`http://${IP}:3000/uploads/fotos/${res.data.archivo}`);
        Alert.alert("✅ Foto actualizada correctamente.");
      } catch (error) {
        console.error("Error al subir foto:", error);
        Alert.alert("Error", "No se pudo subir la foto de perfil.");
      }
    }
  };

  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "¿Seguro que deseas salir?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sí, salir", onPress: () => logout() },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#3FB7FF" />
        <Text style={{ color: "#ccc", marginTop: 10 }}>Cargando perfil...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCambiarFoto}>
          <Image
            source={
              foto
                ? { uri: foto }
                : require("../../../assets/images/default_user.png")
            }
            style={styles.avatar}
          />
        </TouchableOpacity>

        <Text style={styles.name}>{user?.nombre}</Text>
        <Text style={styles.email}>{user?.correo}</Text>
      </View>

      {/* 📝 Biografía */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sobre mí</Text>
        <TextInput
          style={styles.bioInput}
          placeholder="Escribe algo sobre ti..."
          placeholderTextColor="#888"
          value={bio}
          multiline
          onChangeText={setBio}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleActualizarBio}>
          <Text style={styles.saveButtonText}>Guardar Cambios</Text>
        </TouchableOpacity>
      </View>

      {/* 💬 Reseñas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mis reseñas</Text>
        {reseñas.length === 0 ? (
          <Text style={styles.emptyText}>No has dejado reseñas todavía.</Text>
        ) : (
          reseñas.map((r) => (
            <View key={r.idResena} style={styles.review}>
              <Text style={styles.movieTitle}>{r.titulo}</Text>
              <Text style={styles.rating}>⭐ {r.calificacion}</Text>
              <Text style={styles.comment}>{r.contenido}</Text>
            </View>
          ))
        )}
      </View>

      {/* 🚪 Cerrar sesión */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0D0D" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0D0D0D" },
  header: { alignItems: "center", paddingVertical: 20 },
  avatar: { width: 120, height: 120, borderRadius: 60, borderWidth: 2, borderColor: "#3FB7FF" },
  name: { color: "#E6DED2", fontSize: 22, fontWeight: "bold", marginTop: 10 },
  email: { color: "#aaa", fontSize: 14 },
  section: { paddingHorizontal: 20, marginTop: 20 },
  sectionTitle: { color: "#3FB7FF", fontWeight: "bold", fontSize: 18, marginBottom: 10 },
  bioInput: {
    backgroundColor: "#1A1A1A",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    height: 100,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#3FB7FF",
    marginTop: 10,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: { color: "#fff", fontWeight: "bold" },
  emptyText: { color: "#aaa", textAlign: "center", marginTop: 10 },
  review: { backgroundColor: "#1A1A1A", padding: 10, borderRadius: 8, marginVertical: 6 },
  movieTitle: { color: "#3FB7FF", fontWeight: "bold" },
  rating: { color: "#FFD700" },
  comment: { color: "#ccc", marginTop: 4 },
  logoutButton: {
    backgroundColor: "#FF4444",
    padding: 14,
    borderRadius: 8,
    marginVertical: 30,
    marginHorizontal: 20,
  },
  logoutText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
});