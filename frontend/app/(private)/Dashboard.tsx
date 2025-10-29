import { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { AuthProvider, useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const router = useRouter();
  const { user } = useAuth();

  const [peliculas, setPeliculas] = useState<
    { id: number; titulo: string; portada: string; anio: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  // 🚫 Si no hay usuario, redirige al login
  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }

    const fakeMovies = [
      { id: 1, titulo: "Inception", portada: "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg", anio: 2010 },
      { id: 2, titulo: "Interstellar", portada: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg", anio: 2014 },
      { id: 3, titulo: "The Batman", portada: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg", anio: 2022 },
      { id: 4, titulo: "Oppenheimer", portada: "https://image.tmdb.org/t/p/w500/bafmK9cFMyD9XQYB5QdMZ9vUdyP.jpg", anio: 2023 },
    ];

    setPeliculas(fakeMovies);
    setLoading(false);
  }, [user]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#3FB7FF" />
      </View>
    );
  }

  const renderItem = ({ item }: { item: { id: number; titulo: string; portada: string; anio: number } }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/pelicula/${String(item.id)}` as any)}
    >
      <Image source={{ uri: item.portada }} style={styles.image} />
      <Text style={styles.title}>{item.titulo}</Text>
      <Text style={styles.year}>{item.anio}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎬 CineTrack</Text>
      <FlatList
        data={peliculas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    paddingTop: 60,
  },
  header: {
    color: "#3FB7FF",
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  grid: {
    alignItems: "center",
    paddingBottom: 80,
  },
  card: {
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    margin: 8,
    width: 160,
    paddingBottom: 10,
    alignItems: "center",
    shadowColor: "#3FB7FF",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 230,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  title: {
    color: "#E6DED2",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 6,
    textAlign: "center",
  },
  year: {
    color: "#999",
    fontSize: 12,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0D0D0D",
  },
});
