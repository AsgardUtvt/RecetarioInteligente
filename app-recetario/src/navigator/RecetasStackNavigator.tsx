import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeRecetas } from "../screens/recetas/HomeRecetas";
import { DetailReceta } from "../screens/recetas/RecetaDetail";
import { CategoriaScreen } from "../screens/recetas/CategoriaScreen";

export type RecetasStackParams = {
    HomeRecetas: undefined;
    DetailReceta: { idMeal: string };
    CategoriaScreen: { categoria: string };
};

const Stack = createNativeStackNavigator<RecetasStackParams>();

export const RecetasStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="HomeRecetas"
            screenOptions={{
                headerStyle: { backgroundColor: '#D2691E' },
                headerTintColor: '#FFFFFF',
                headerTitleStyle: { fontWeight: 'bold' },
            }}
        >
            <Stack.Screen name="HomeRecetas" component={HomeRecetas} options={{ title: 'Recetas' }} />
            <Stack.Screen name="DetailReceta" component={DetailReceta} options={{ title: 'Detalle' }} />
            <Stack.Screen name="CategoriaScreen" component={CategoriaScreen} options={{ title: 'Categoría' }} />
        </Stack.Navigator>
    );
};
