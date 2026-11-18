import { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, Text, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { apiAsgardJessica } from '../../api/apiAsgardJessica';
import { RecipeCard } from '../../components/RecipeCard';

export const FavoritosScreen = () => {
  const { authState } = useAuth();
  const navigation = useNavigation<any>();
  const [favoritas, setFavoritas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const idUser = authState.user?.id_user;

  const loadFavoritas = async () => {
    if (!idUser) return;
    setLoading(true);
    try {
      const res = await apiAsgardJessica.get(`/recetas/favoritas/${idUser}`);
      setFavoritas(res.data);
    } catch (e) {
      console.log('Error cargando favoritas:', e);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorito = async (meal: any) => {
    await apiAsgardJessica.post(`/recetas/${idUser}/favorita`, meal);
    loadFavoritas(); // Recargar la lista después de borrar/agregar
  };

  useEffect(() => {
    loadFavoritas();
  }, [idUser]);

  if (loading) {
    return <ActivityIndicator size="large" color="#8A2BE2" style={{ flex: 1 }} />;
  }

  return (
    <FlatList
      data={favoritas}
      keyExtractor={(item) => item.idMeal}
      contentContainerStyle={styles.container}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tienes favoritos aún 🤍</Text>
        </View>
      }
      renderItem={({ item }) => (
        <RecipeCard
          meal={item}
          isFavorita={true}
          onToggleFavorito={() => toggleFavorito(item)}
          onPress={() => navigation.navigate('RecetasStack', { 
            screen: 'DetailReceta', 
            params: { idMeal: item.idMeal } 
          })}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: { padding: 15 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 },
  emptyText: { fontSize: 16, color: '#666', textAlign: 'center' },
});
