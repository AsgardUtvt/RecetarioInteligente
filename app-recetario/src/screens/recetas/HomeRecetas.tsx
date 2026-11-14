import { useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useMealDb } from '../../hooks/useMealDb';
import { RecipeCard } from '../../components/RecipeCard';
import {StackLoginParams} from '../../navigator/StackLoginNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

interface Props extends NativeStackScreenProps<StackLoginParams,'HomeRecetas'>{};

export const HomeRecetas = ({navigation}: Props) => {

  const { meals, isLoading, searchMeals } = useMealDb();

  useEffect(() => {
    searchMeals('');
  }, []);

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recetas Destacadas</Text>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => <RecipeCard meal={item} onPress={() => {}} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
});
