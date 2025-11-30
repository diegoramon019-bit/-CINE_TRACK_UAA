import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/*  Logo CineTrack */}
      <Image source={require("../../assets/images/cinetrack-logo.png")} style={styles.logo} />

      {/* Eslogan en dos líneas */}
      <View style={styles.sloganContainer}>
        <Text style={styles.sloganLine1}>Tu universo cinematográfico,</Text>
        <Text style={styles.sloganLine2}>siempre contigo 🎬</Text>
      </View>

      {/*  Botón Iniciar Sesión */}
      <TouchableOpacity style={styles.buttonBlue} onPress={() => router.push("/login")}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      {/*  Botón Crear Cuenta */}
      <TouchableOpacity style={styles.buttonOutline} onPress={() => router.push("/register")}>
        <Text style={styles.buttonOutlineText}>Crear Cuenta</Text>
      </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 250,
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
  },
  sloganContainer: {
    marginBottom: 60, // Bajamos el eslogan
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
  buttonBlue: {
    backgroundColor: "#3FB7FF",
    width: "90%",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#0D0D0D",
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
  },
  buttonOutline: {
    borderWidth: 2,
    borderColor: "#3FB7FF",
    width: "90%",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutlineText: {
    color: "#3FB7FF",
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
  },
});
