import { useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { useMealDb } from '../../hooks/useMealDb';
//import { RecipeCard } from '../../components/RecipeCard';
//import {StackLoginParams} from '../../navigator/StackLoginNavigator';
//import { NativeStackScreenProps } from '@react-navigation/native-stack';

//interface Props extends NativeStackScreenProps<StackLoginParams,'HomeRecetas'>{};

export const HomeRecetas = () => {

  const { recetas, isLoading, loadRecetas } = useMealDb();

  useEffect(() => {
    loadRecetas();
  }, []);

  if (isLoading){
     return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1 }} />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recetas Destacadas ----</Text>
      <FlatList
        data={recetas}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            <Text style={styles.title}>{item.strMeal}</Text>
            <Text style={styles.category}>{item.strCategory}</Text>
          </View>
        )}  
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
      flex: 1, 
      padding: 15, 
      backgroundColor: 'green' 
  },
  header: { 
      fontSize: 24, 
      fontWeight: 'bold', 
      marginBottom: 15 
  },
  card: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'purple',
    marginTop: 10,
  },
  category: {
    color: '#666',
  },
});
