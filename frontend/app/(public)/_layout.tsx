import { Tabs } from "expo-router";
import { useFonts, Montserrat_700Bold, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { ActivityIndicator, View, Animated, Easing } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthProvider, useAuth } from "../../context/AuthContext"; 
import { useEffect, useRef, useState } from "react";

// 🔹 Layout raíz que envuelve toda la app
export default function RootLayout() {
  return (
    <AuthProvider>
      <AppTabs />
    </AuthProvider>
  );
}

// 🔹 Tabs dinámicos con animación de transición
function AppTabs() {
  const { user } = useAuth();

  const [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_400Regular,
  });

  // Estado para controlar la animación
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [currentUser, setCurrentUser] = useState(user);

  // 🔹 Cuando cambia el usuario (login/logout), animamos la transición
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 250,
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

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0D0D0D" }}>
        <ActivityIndicator size="large" color="#3FB7FF" />
      </View>
    );
  }

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: "#0D0D0D", borderTopColor: "#1A1A1A" },
          tabBarActiveTintColor: "#3FB7FF",
          tabBarInactiveTintColor: "#999",
        }}
      >
        {/* 🔒 Sin sesión */}
        {!currentUser && (
          <>
            <Tabs.Screen
              name="index"
              options={{
                title: "Inicio",
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="home-outline" color={color} size={size} />
                ),
              }}
            />
            <Tabs.Screen
              name="login"
              options={{
                title: "Login",
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="login" color={color} size={size} />
                ),
              }}
            />
            <Tabs.Screen
              name="register"
              options={{
                title: "Registrarse",
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="account-plus-outline" color={color} size={size} />
                ),
              }}
            />
          </>
        )}

        {/* 🔓 Con sesión */}
        {currentUser && (
          <>
            <Tabs.Screen
              name="dashboard"
              options={{
                title: "Películas",
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="filmstrip" color={color} size={size} />
                ),
              }}
            />
            <Tabs.Screen
              name="perfil"
              options={{
                title: "Perfil",
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="account-circle-outline" color={color} size={size} />
                ),
              }}
            />
          </>
        )}
      </Tabs>
    </Animated.View>
  );
}
