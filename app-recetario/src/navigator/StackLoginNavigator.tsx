import { createStaticNavigation } from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { LoginScreen } from "../screens/LoginScreen";
import { HomeRecetas } from "../screens/recetas/HomeRecetas";
export type StackLoginParams = {
    LoginScreen: undefined;
    HomeRecetas: undefined;
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
        </Stack.Navigator>
    );
}
