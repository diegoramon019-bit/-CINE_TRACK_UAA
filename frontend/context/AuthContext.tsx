import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

/* interface user 
 */
interface Usuario {
  idUsuario: number;
  nombre: string;
  correo: string;
}

interface AuthContextType {
  user: Usuario | null;
  login: (usuario: Usuario) => Promise<void>;
  logout: () => Promise<void>;
}

/* ================================
   ⚙️ Creación del Contexto
================================ */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ================================
   🌐 Proveedor Global
================================ */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Usuario | null>(null);

  // 🔹 Cargar usuario guardado desde AsyncStorage al iniciar
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("cine_user");
        if (storedUser) {
          setUser(JSON.parse(storedUser)); // ✅ convertimos de JSON a objeto
        }
      } catch (error) {
        console.error("❌ Error cargando usuario:", error);
      }
    };
    loadUser();
  }, []);

  // 🔹 Login — guarda el objeto completo del usuario
  const login = async (usuario: Usuario): Promise<void> => {
    try {
      setUser(usuario);
      await AsyncStorage.setItem("cine_user", JSON.stringify(usuario)); // esto es para que podamos dejar la reseña almacenamos como string
      console.log("Usuario guardado correctamente en la db:", usuario.nombre);
    } catch (error) {
      console.error(" Error al guardar usuario:", error);
    }
  };

  // 🔹 Logout — limpia sesión y redirige al login
  const logout = async (): Promise<void> => {
    try {
      console.log("🔸 Cerrando sesión...");
      await AsyncStorage.removeItem("cine_user");
      setUser(null);
      router.replace("/login"); // ✅ redirección limpia
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/* ================================
   🔹 Hook Personalizado
================================ */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro de un AuthProvider");
  }
  return context;
};