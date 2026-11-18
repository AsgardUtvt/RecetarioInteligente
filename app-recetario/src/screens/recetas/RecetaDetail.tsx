import { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { mealDbApi } from '../../api/mealDbApi';
import { Meal, MealDbDataResponse } from '../../interfaces/mealDbResponse';
import { COLORS } from '../../theme/appTheme';

export const DetailReceta = ({ route }: any) => {
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

        <View style={styles.ingredientsBox}>
          <Text style={styles.subTitle}>Ingredientes</Text>
          {ingredientes.map((item, index) => (
            <Text key={index} style={styles.ingredientText}>• {item}</Text>
          ))}
        </View>

        <View style={styles.instructionsBox}>
          <Text style={styles.subTitle}>Instrucciones</Text>
          <Text style={styles.text}>{receta.strInstructions}</Text>
        </View>

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
  container: { 
      flex: 1, 
      backgroundColor: '#F4F7FC',
  },
  image: { 
      width: '100%', 
      height: 250,
      borderBottomLeftRadius: 30, 
      borderBottomRightRadius: 30 
  },
  content: { 
      padding: 20,
      marginTop: -20,
      backgroundColor: '#fff', 
      borderTopLeftRadius: 30, 
      borderTopRightRadius: 30 
  },
  title: { 
      fontSize: 26, 
      fontWeight: 'bold', 
      color: '#2C1810', 
      marginBottom: 5 
  },
  category: { 
      fontSize: 16, 
      color: COLORS.mediumBlue, 
      marginBottom: 15, 
      fontStyle: 'italic' 
  },
  subTitle: { 
      fontSize: 20, 
      fontWeight: 'bold', 
      color: '#2C1810', 
      marginTop: 15, 
      marginBottom: 10 
  },
  text: { 
      fontSize: 16, 
      color: COLORS.textSecondary, 
      lineHeight: 24 
  },
  button: { 
      backgroundColor: COLORS.orange, 
      padding: 15, 
      borderRadius: 10, 
      marginTop: 20, 
      alignItems: 'center' 
  },
  buttonText: { 
      color: COLORS.white, 
      fontWeight: 'bold', 
      fontSize: 16,
      letterSpacing: 1
  },
  ingredientsBox: {
    backgroundColor: '#FFF3E0',
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: COLORS.orange,
  },
  instructionsBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  ingredientText: {
    fontSize: 16,
    color: '#5D4037',
    marginBottom: 5,
  },
});

