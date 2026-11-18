import { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMealDb } from '../../hooks/useMealDb';
import { RecipeCard } from '../../components/RecipeCard';
import { useAuth } from '../../context/AuthContext';
import { apiAsgardJessica } from '../../api/apiAsgardJessica';

// Helper para convertir strIngredient1..20 a un array
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

export const HomeRecetas = () => {
  const navigation = useNavigation<any>();
  const { recetas, categorias, isLoading, loadRecetas, loadCategorias } = useMealDb();
  const { authState } = useAuth();
  const idUser = authState.user?.id_user;
  
  const [favoritasIds, setFavoritasIds] = useState<string[]>([]);

  // Botón hamburguesa para abrir el Drawer
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.getParent()?.openDrawer()}
          style={{ marginLeft: 15, padding: 5 }}
        >
          <Text style={{ fontSize: 24, color: '#fff' }}>☰</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const loadFavoritas = async () => {
    if (!idUser) return;
    try {
      const res = await apiAsgardJessica.get(`/recetas/favoritas/${idUser}`);
      setFavoritasIds(res.data.map((r: any) => r.idMeal));
    } catch (e) {
      console.log('Error cargando favoritas:', e);
    }
  };

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
    loadRecetas();
    loadCategorias();
    loadFavoritas();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#D2691E" style={{ flex: 1 }} />;
  }

  const favoritos = recetas.filter(r => favoritasIds.includes(r.idMeal));

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.subHeader}>Tus Favoritos ❤️</Text>
      <View style={{ height: 90, marginBottom: 20 }}>
        <FlatList
          horizontal
          data={favoritos}
          keyExtractor={(item) => `fav-${item.idMeal}`}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.favItem}
              onPress={() => navigation.navigate('DetailReceta', { idMeal: item.idMeal })}
            >
              <Image source={{ uri: item.strMealThumb }} style={styles.favImage} />
            </TouchableOpacity>
          )}
        />
      </View>

      <Text style={styles.subHeader}>Categorías</Text>
      <View style={{ height: 110, marginBottom: 20 }}>
        <FlatList
          horizontal
          data={categorias}
          keyExtractor={(item) => item.idCategory}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.categoryItem} 
              onPress={() => navigation.navigate('CategoriaScreen', { categoria: item.strCategory })}
            >
              <View style={styles.circle}>
                <Image source={{ uri: item.strCategoryThumb }} style={styles.categoryImage} />
              </View>
              <Text style={styles.categoryText}>{item.strCategory}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <Text style={styles.header}>Recetas Destacadas</Text>
      <View style={{ paddingBottom: 20 }}>
        {recetas.map((item) => (
          <RecipeCard 
            key={item.idMeal} 
            meal={item}
            isFavorita={favoritasIds.includes(item.idMeal)}
            onToggleFavorito={() => toggleFavorito(item)}
            onPress={() => navigation.navigate('DetailReceta', { idMeal: item.idMeal })} 
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 15, 
    backgroundColor: '#FFF8F0' 
  },
  header: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#D2691E',  // <-- Cambiado de 'purple' a naranja cálido
    marginBottom: 15 
  },
  subHeader: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#8B4513',  // <-- Cambiado de '#ff8c00' a marrón cálido
    marginBottom: 10 
  },
  favItem: { 
    marginRight: 15, 
    alignItems: 'center' 
  },
  favImage: { 
    width: 80, 
    height: 80, 
    borderRadius: 40 
  },
  categoryItem: { 
    alignItems: 'center', 
    marginRight: 15 
  },
  circle: { 
    width: 80, 
    height: 80, 
    borderRadius: 40, 
    backgroundColor: '#FFFFFF', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 5, 
    borderWidth: 2, 
    borderColor: '#E0C9B3',  // <-- Cambiado a beige cálido
    elevation: 3 
  },
  categoryImage: { 
    width: 50, 
    height: 50, 
    borderRadius: 25 
  },
  categoryText: { 
    fontSize: 12, 
    color: '#8B4513',  // <-- Cambiado de '#666' a marrón cálido
    fontWeight: 'bold' 
  },
});
