import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RecetasStackParams } from '../../navigator/RecetasStackNavigator';
import { mealDbApi } from '../../api/mealDbApi';
import { Meal, MealDbDataResponse } from '../../interfaces/mealDbResponse';
import { RecipeCard } from '../../components/RecipeCard';
import { useAuth } from '../../context/AuthContext';
import { apiAsgardJessica } from '../../api/apiAsgardJessica';

interface Props extends NativeStackScreenProps<RecetasStackParams, 'CategoriaScreen'> {}

// Helper para convertir strIngredient1..20 a un array (igual que en HomeRecetas)
const transformIngredientes = (meal: any) => {
  const ingredientes = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredientes.push({
        ingredient: ingredient.trim(),
        measure: measure ? measure.trim() : '',
      });
    }
  }
  return ingredientes;
};

export const CategoriaScreen = ({ route, navigation }: Props) => {
  const { categoria } = route.params;
  const [recetas, setRecetas] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { authState } = useAuth();
  const idUser = authState.user?.id_user;
  const [favoritasIds, setFavoritasIds] = useState<string[]>([]);

  // Cargar recetas de la categoría
  useEffect(() => {
    const loadByCategory = async () => {
      setIsLoading(true);
      try {
        const response = await mealDbApi.get<MealDbDataResponse>(`/filter.php?c=${categoria}`);
        setRecetas(response.data.meals || []);
      } catch (e) {
        console.log('Error cargando categoría:', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadByCategory();
  }, [categoria]);

  // Cargar IDs de favoritas al montar
  const loadFavoritas = async () => {
    if (!idUser) return;
    try {
      const res = await apiAsgardJessica.get(`/recetas/favoritas/${idUser}`);
      setFavoritasIds(res.data.map((r: any) => r.idMeal));
    } catch (e) {
      console.log('Error cargando favoritas:', e);
    }
  };

  // Función para agregar/quitar de favoritos
  const toggleFavorito = async (meal: any) => {
    if (!idUser) return;
    try {
      const recetaData = {
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strCategory: meal.strCategory || '',
        strArea: meal.strArea || '',
        strInstructions: meal.strInstructions || '',
        strMealThumb: meal.strMealThumb || '',
        strTags: meal.strTags || '',
        strYoutube: meal.strYoutube || '',
        ingredientes: transformIngredientes(meal),
        id_user: idUser,
      };

      const res = await apiAsgardJessica.post(`/recetas/${idUser}/favorita`, recetaData);
      
      setFavoritasIds(prev =>
        res.data.isFavorita
          ? [...prev, meal.idMeal]
          : prev.filter(id => id !== meal.idMeal)
      );
    } catch (e) {
      console.log('Error toggle favorito:', e);
    }
  };

  useEffect(() => {
    loadFavoritas();
  }, [idUser]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#D2691E" style={{ flex: 1 }} />;
  }

  return (
    <FlatList
      data={recetas}
      keyExtractor={(item) => item.idMeal}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <Text style={styles.headerTitle}>{categoria}</Text>
      }
      renderItem={({ item }) => (
        <RecipeCard
          meal={item}
          isFavorita={favoritasIds.includes(item.idMeal)}
          onToggleFavorito={() => toggleFavorito(item)}
          onPress={() => navigation.navigate('DetailReceta', { idMeal: item.idMeal })}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#FFF8F0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D2691E',  // Naranja cálido
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
});
