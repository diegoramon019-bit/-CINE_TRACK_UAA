import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Dashboard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎬 CineTrack</Text>
      <Text style={styles.subtitle}>Sesión iniciada correctamente muy pronto podras saber mas acerca de la APP CINETRACK</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/")}
      >
        <Text style={styles.buttonText}>Cerrar sesión</Text>
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
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#E50914",
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    marginTop: 20,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#E50914",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
