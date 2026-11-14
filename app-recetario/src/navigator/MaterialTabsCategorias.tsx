import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { CategoriaScreen } from "../screens/recetas/CategoraScreen";
import { HomeRecetas } from "../screens/recetas/HomeRecetas";

const Tab = createMaterialTopTabNavigator();

export type MaterialTabsCategoriasParams ={
    Categoria: undefined;
    HomeRecetas: undefined;

}

export const MaterialTabsCategorais = () => {

    return(
        <Tab.Navigator>
            <Tab.Screen name="Categoria" component={CategoriaScreen} />
        </Tab.Navigator>
    );
};
