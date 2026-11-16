import { useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useMealDb } from '../../hooks/useMealDb';
import { RecipeCard } from '../../components/RecipeCard';
import { useNavigation } from '@react-navigation/native';
//import { MaterialTabsCategorais } from '../../navigator/MaterialTabsCategorias';

export const HomeRecetas = () => {
  const navigation = useNavigation<any>();
  const { recetas, categorias, isLoading, loadRecetas, loadCategorias, filterByCategory } = useMealDb();
  useEffect(() => {
    loadRecetas();
    loadCategorias();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#purple" style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.subHeader}>Categorias</Text>

      <View style={{ height: 130, marginBottom: 10 }}>
        <FlatList
          horizontal
          data={categorias}
          keyExtractor={(item) => item.idCategory}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.categoryItem} 
                onPress={() => filterByCategory(item.strCategory)}
              >
              <View style={styles.circle}>
                <Image 
                  source={{ uri: item.strCategoryThumb }} 
                  style={styles.categoryImage} 
                />
              </View>
              <Text style={styles.categoryText}>{item.strCategory}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={recetas}
        keyExtractor={(item) => item.idMeal}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <RecipeCard meal={item} onPress={() => {}} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f5f5f5' },
  header: { fontSize: 40, fontWeight: 'bold', marginBottom: 15 },
  subHeader: { fontSize: 40, fontWeight: 'bold', color: '#orange' , marginBottom: 10 },
  categoryItem: { alignItems: 'center', marginRight: 15, marginEnd: 10},
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryImage: { width: 50, height: 50, borderRadius: 25 },
  categoryText: { fontSize: 12, color: '#666', fontWeight: 'bold' },
});
