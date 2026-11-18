import { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMealDb } from '../../hooks/useMealDb';
import { RecipeCard } from '../../components/RecipeCard';

export const HomeRecetas = () => {
  const navigation = useNavigation<any>();
  const { recetas, categorias, isLoading, loadRecetas, loadCategorias } = useMealDb();

  useEffect(() => {
    loadRecetas();
    loadCategorias();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" color="purple" style={{ flex: 1 }} />;
  }

  // Simulacion de favoritos (primeros 3)
  const favoritos = recetas.slice(0, 3);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
        <Text style={styles.subHeader}>Tus Favoritos :v</Text>
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
      backgroundColor: '#f5f5f5' 
  },
  header: { 
      fontSize: 24, 
      fontWeight: 'bold', 
      color: 'purple', 
      marginBottom: 15 
  },
  subHeader: { 
      fontSize: 18, 
      fontWeight: 'bold', 
      color: '#ff8c00', 
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
      backgroundColor: '#fff', 
      justifyContent: 'center', 
      alignItems: 'center', 
      marginBottom: 5, 
      borderWidth: 2, 
      borderColor: '#ffebd6', 
      elevation: 3 
  },
  categoryImage: { 
      width: 50, 
      height: 50, 
      borderRadius: 25 
  },
  categoryText: { 
      fontSize: 12, 
      color: '#666', 
      fontWeight: 'bold' 
  },
});

