import { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Meal } from '../interfaces/mealDbResponse';
import { Colors } from '../theme/appTheme';

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
      backgroundColor: Colors.white, 
      borderRadius: 20, 
      marginBottom: 20, 
      overflow: 'hidden', 
      elevation: 3, 
      shadowColor: Colors.darkBlue,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      borderWidth: 2,
      borderColor: Colors.darkBlue,
  },
  image: { 
      width: '100%', 
      height: 180 
  },
  favButton: { 
      position: 'absolute', 
      top: 10, 
      right: 10, 
      backgroundColor: Colors.white, 
      borderRadius: 20, 
      padding: 5 
  },
  info: { 
      padding: 15 
  },
  title: { 
      fontSize: 18, 
      fontWeight: 'bold', 
      color: Colors.textPrimary, 
  },
  category: { 
      fontSize: 14, 
      color: Colors.orange, 
      fontWeight: 'bold', 
      marginTop: 5 
  },
});
