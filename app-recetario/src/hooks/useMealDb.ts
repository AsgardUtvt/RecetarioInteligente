import { useState } from 'react';
import { mealDbApi } from '../api/mealDbApi';
import { Meal, MealDbDataResponse } from '../interfaces/mealDbResponse';

export const useMealDb = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recetas, setRecetas] = useState<Meal[]>([]);
//  const [meals, setMeals] = useState<Meal[]>([]);
//  const [error, setError] = useState<string | null>(null);
//  const [offset, setOffset] = useState<number>(10);
//  const [allMeals, setAllMeals] = useState<Meal[]>([]);

  const loadRecetas =async () => {
    setIsLoading(true);

    const response = await mealDbApi.get<MealDbDataResponse>('/search.php?s=');

    setRecetas(response.data.meals || []);
    setIsLoading(false);
  };
 /*   const searchMeals = async (query: string) => {
    setIsLoading(true);
    const data = await getRecipesByName(query);
    setMeals(data);
    setIsLoading(false);
  };*/

  return { recetas, isLoading, loadRecetas };
};
