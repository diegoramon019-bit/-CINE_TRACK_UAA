import { Stack } from "expo-router";
import { useFonts, Montserrat_700Bold, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { View, ActivityIndicator } from "react-native";

export default function Layout() {
  // Cargar fuentes personalizadas
  const [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_400Regular,
  });

  // Mostrar pantalla de carga hasta que las fuentes estén listas
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0D0D0D" }}>
        <ActivityIndicator size="large" color="#E50914" />
      </View>
    );
  }

  // 🔹 Cuando las fuentes están listas, renderizamos el Stack de pantallas
  return <Stack screenOptions={{ headerShown: false }} />;
}
