import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { LoginScreen } from "../screens/LoginScreen";
import { HomeRecetas } from "../screens/recetas/HomeRecetas";
import { CategoriaScreen } from "../screens/recetas/CategoriaScreen";
import { DetailReceta } from "../screens/recetas/RecetaDetail";

export type StackLoginParams = {
    LoginScreen: undefined;
    HomeRecetas: undefined;
    DetailReceta: undefined;
    CategoriaScreen: undefined;
}

const Stack = createNativeStackNavigator<StackLoginParams>();

export const StackLoginNavigator = () => {
    
    return(
        <Stack.Navigator
            initialRouteName="LoginScreen"
        >
            <Stack.Screen 
                name="LoginScreen"
                component={LoginScreen}
                options={{title: "Recetario Inteligente"}}
            />
            <Stack.Screen 
                name="HomeRecetas"
                component={HomeRecetas}
                options={{title: "Recetas"}}
            />
            <Stack.Screen
                name="CategoriaScreen"
                component={CategoriaScreen}
            />
            <Stack.Screen
                name="DetailReceta"
                component={DetailReceta}
                options={{ title: 'Detalle'}}
            />
        </Stack.Navigator>
    );
}
