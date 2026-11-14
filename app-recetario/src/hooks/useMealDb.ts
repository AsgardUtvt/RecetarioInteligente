import { useState } from 'react';
import { getRecipesByName } from '../api/mealDbApi';
import { Meal } from '../interfaces/mealDbResponse';

export const useMealDb = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [meals, setMeals] = useState<Meal[]>([]);

  const searchMeals = async (query: string) => {
    setIsLoading(true);
    const data = await getRecipesByName(query);
    setMeals(data);
    setIsLoading(false);
  };

  return { meals, isLoading, searchMeals };
};
