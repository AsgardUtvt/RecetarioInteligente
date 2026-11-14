import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import axios from 'axios';
import {LoginScreen} from './src/screens/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import {StackLoginNavigator} from './src/navigator/StackLoginNavigator';

export default function App() {
  const [meals, setMeals] = useState<any[]>([]);

  useEffect(() => {
    axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then(res => setMeals(res.data.meals))
      .catch(err => console.log(err));
  }, []);

  return (
    <NavigationContainer>
        <StackLoginNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 15, 
        paddingTop: 50 , 
        backgroundColor: '#fff' 
    },
  header: { 
      fontSize: 24, 
      fontWeight: 'bold', 
      marginBottom: 15 
  },
  card: { 
      marginBottom: 20 
  },
  img: { 
      width: '100%', 
      height: 150, 
      borderRadius: 10 
  },
  title: { 
      fontSize: 18, 
      fontWeight: 'bold', 
      marginTop: 5 
  },
});
/*
 *
      
    <View 
        style={styles.container}
    >
      <Text 
        style={styles.header}
      >
        Recetas
      </Text>

      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <View 
              style={styles.card}
          >
            <Image 
                source={{ uri: item.strMealThumb }} style={styles.img} 
            />
            <Text 
                style={styles.title}
            >
                {item.strMeal}
            </Text>
          </View>
        )}
      />

    </View>
 * */
