import { Stack } from "expo-router";

export default function PrivateLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Pestañas principales */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      
      {/* Pantalla de detalle fuera de las pestañas */}
      <Stack.Screen name="pelicula/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
