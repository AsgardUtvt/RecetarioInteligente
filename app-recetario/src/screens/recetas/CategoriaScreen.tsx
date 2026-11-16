import { useEffect, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { mealDbApi } from '../../api/mealDbApi';
import { RecipeCard } from '../../components/RecipeCard';

export const CategoriaScreen = ({ route }: any) => {
  const categoria = route.params?.categoria || 'Beef'; 
  
  const [recetas, setRecetas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadRecetasPorCategoria = async () => {
    setIsLoading(true);
    const response = await mealDbApi.get(`/filter.php?c=${categoria}`);
    setRecetas(response.data.meals || []);
    setIsLoading(false);
  };

  useEffect(() => {
    loadRecetasPorCategoria();
  }, [categoria]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="purple" style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{categoria}</Text>
      <FlatList
        data={recetas}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <RecipeCard meal={item} onPress={() => {}} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f5f5f5' },
  header: { fontSize: 28, fontWeight: 'bold', color: 'purple', marginBottom: 15, textAlign: 'center' },
});
