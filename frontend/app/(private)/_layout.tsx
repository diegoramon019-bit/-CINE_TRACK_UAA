import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function PrivateLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#0D0D0D", borderTopColor: "#1A1A1A" },
        tabBarActiveTintColor: "#3FB7FF",
        tabBarInactiveTintColor: "#999",
      }}
    >
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
    </Tabs>
  );
}
