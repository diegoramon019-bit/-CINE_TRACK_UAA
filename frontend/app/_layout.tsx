import { Stack } from "expo-router";
import { ActivityIndicator, View, Animated, Easing } from "react-native";
import { useEffect, useRef, useState } from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";

// 🔹 Layout raíz que envuelve toda la app
export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthHandler />
    </AuthProvider>
  );
}

// 🔹 Controla si renderizar layout público o privado
function AuthHandler() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Espera a que AuthContext cargue el usuario persistente
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800); // simula carga de sesión
  }, []);

  // 🔹 Animación al cambiar de estado (login/logout)
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      setCurrentUser(user);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    });
  }, [user]);

  // 🔄 Pantalla de carga mientras se verifica sesión
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0D0D0D" }}>
        <ActivityIndicator size="large" color="#3FB7FF" />
      </View>
    );
  }

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* 🔒 Usuario no logueado → layout público */}
        {!currentUser ? (
          <Stack.Screen name="(public)" />
        ) : (
          // 🔓 Usuario logueado → layout privado
          <Stack.Screen name="(private)" />
        )}
      </Stack>
    </Animated.View>
  );
}
