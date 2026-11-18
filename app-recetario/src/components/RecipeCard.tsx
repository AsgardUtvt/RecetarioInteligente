import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Meal } from '../interfaces/mealDbResponse';

interface Props {
  meal: Meal;
  onPress: () => void;
  isFavorita?: boolean;
  onToggleFavorito?: () => void;
}

export const RecipeCard = ({ meal, onPress, isFavorita = false, onToggleFavorito }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />

      {onToggleFavorito && (
        <TouchableOpacity
          style={styles.favButton}
          onPress={onToggleFavorito}
        >
          <Text style={{ fontSize: 24 }}>
            {isFavorita ? '❤️' : '🤍'}
          </Text>
        </TouchableOpacity>
      )}

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{meal.strMeal}</Text>
        <Text style={styles.category}>{meal.strCategory}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 180,
  },
  favButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 22,
    padding: 6,
    elevation: 2,
  },
  info: {
    padding: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C1810',
  },
  category: {
    fontSize: 13,
    color: '#D2691E', // <-- Cambiado de morado a naranja cálido
    fontWeight: '600',
    marginTop: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
