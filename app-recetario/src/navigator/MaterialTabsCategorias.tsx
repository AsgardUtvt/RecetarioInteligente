import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { CategoriaScreen } from "../screens/recetas/CategoriaScreen";
import { HomeRecetas } from "../screens/recetas/HomeRecetas";
import { DetailReceta } from "../screens/recetas/RecetaDetail";

const Tab = createMaterialTopTabNavigator();

export type MaterialTabsCategoriasParams ={
    Categoria: undefined;
    HomeRecetas: undefined;
    DetailReceta: undefined;
}

export const MaterialTabsCategorais = () => {

    return(
        <Tab.Navigator>
            <Tab.Screen name='HomeRecetas' component={HomeRecetas}/>
            <Tab.Screen name="Categoria" component={CategoriaScreen} />
            <Tab.Screen name="DetailReceta" component={DetailReceta} />
        </Tab.Navigator>
    );
};
