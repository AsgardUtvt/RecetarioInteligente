import { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { mealDbApi } from '../../api/mealDbApi';
import { Meal, MealDbDataResponse } from '../../interfaces/mealDbResponse';

export const DetailReceta = ({ route, navigation }: any) => {
  const { idMeal } = route.params;
  const [receta, setReceta] = useState<Meal | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadDetalle = async () => {
    setIsLoading(true);
    const response = await mealDbApi.get<MealDbDataResponse>(`/lookup.php?i=${idMeal}`);
    if (response.data.meals) {
      setReceta(response.data.meals[0]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadDetalle();
  }, []);

  if (isLoading || !receta) {
    return <ActivityIndicator size="large" color="purple" style={{ flex: 1 }} />;
  }
  const ingredientes = [];
  for (let i = 1; i <= 20; i++) {
    const ingrediente = receta[`strIngredient${i}`];
    const medida = receta[`strMeasure${i}`];
    if (ingrediente && ingrediente.trim() !== '') {
      ingredientes.push(`${medida} ${ingrediente}`);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: receta.strMealThumb }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.title}>{receta.strMeal}</Text>
        <Text style={styles.category}>{receta.strCategory} | {receta.strArea}</Text>

        <Text style={styles.subTitle}>Ingredientes:</Text>
        {ingredientes.map((item, index) => (
          <Text key={index} style={styles.text}>• {item}</Text>
        ))}

        <Text style={styles.subTitle}>Instrucciones:</Text>
        <Text style={styles.text}>{receta.strInstructions}</Text>

        {receta.strYoutube && (
          <TouchableOpacity 
            style={styles.button}
            onPress={() => Linking.openURL(receta.strYoutube)}
          >
            <Text style={styles.buttonText}>Ver Video en YouTube</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 250 },
  content: { padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: 'purple', marginBottom: 5 },
  category: { fontSize: 16, color: '#666', marginBottom: 15, fontStyle: 'italic' },
  subTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginTop: 15, marginBottom: 10 },
  text: { fontSize: 16, color: '#444', lineHeight: 24 },
  button: { backgroundColor: 'purple', padding: 15, borderRadius: 10, marginTop: 20, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
