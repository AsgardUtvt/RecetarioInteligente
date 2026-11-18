import { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Meal } from '../interfaces/mealDbResponse';

interface Props {
  meal: Meal;
  onPress: () => void;
}

export const RecipeCard = ({ meal, onPress }: Props) => {
  const [isFav, setIsFav] = useState(false);

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
      
      <TouchableOpacity 
        style={styles.favButton} 
        onPress={() => setIsFav(!isFav)}
      >
        <Text style={{ fontSize: 24 }}>
          {isFav ? '❤️' : '🤍'}
        </Text>
      </TouchableOpacity>

      <View style={styles.info}>
        <Text style={styles.title}>{meal.strMeal}</Text>
        <Text style={styles.category}>{meal.strCategory}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { 
      backgroundColor: '#fff', 
      borderRadius: 15, 
      marginBottom: 15, 
      overflow: 'hidden', 
      elevation: 3 
  },
  image: { 
      width: '100%', 
      height: 150 
  },
  favButton: { 
      position: 'absolute', 
      top: 10, 
      right: 10, 
      backgroundColor: 'rgba(255,255,255,0.8)', 
      borderRadius: 20, 
      padding: 5 
  },
  info: { 
      padding: 15 
  },
  title: { 
      fontSize: 18, 
      fontWeight: 'bold', 
      color: '#333' 
  },
  category: { 
      fontSize: 14, 
      color: 'purple', 
      fontWeight: 'bold', 
      marginTop: 5 
  },
});
