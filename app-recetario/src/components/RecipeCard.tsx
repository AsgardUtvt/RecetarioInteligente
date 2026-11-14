import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Meal } from '../interfaces/mealDbResponse';

interface Props {
  meal: Meal;
  onPress: () => void;
}

export const RecipeCard = ({ meal, onPress }: Props) => (
  <TouchableOpacity 
      onPress={onPress} 
      style={styles.card}
  >
    <Image 
        source={{ uri: meal.strMealThumb }} style={styles.image} 
    />
    <View 
        style={styles.info}
    >
      <Text 
        style={styles.title}
      >
          {meal.strMeal}
      </Text>
      <Text 
        style={styles.category}
      >
          {meal.strCategory}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: { 
      backgroundColor: '#fff', 
      borderRadius: 10, 
      marginBottom: 15, 
      overflow: 'hidden', 
      elevation: 3 
  },
  image: { 
      width: '100%', 
      height: 150 
  },
  info: { 
      padding: 10 
  },
  title: { 
      fontSize: 18, 
      fontWeight: 'bold' 
  },
  category: { 
      fontSize: 14, 
      color: '#666' 
  },
});
