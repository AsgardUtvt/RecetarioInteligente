import { createDrawerNavigator } from "@react-navigation/drawer";
import { useWindowDimensions, View, Text } from "react-native";
import { DrawerMenu as DrawerMenuCustom } from "../components/DrawerMenu"; // Ajusta la ruta
import { HomeRecetas } from "../screens/recetas/HomeRecetas";
import { UserScreen } from "../screens/User/UserScreen";

// Definición de tipos para el Drawer
export type RootDrawerMenuParams = {
  HomeRecetas: undefined;
  UserScreen: undefined;
  // Agrega aquí las demás pantallas (ej. Favoritos, Categorias, etc.)
};

const Drawer = createDrawerNavigator<RootDrawerMenuParams>();

export const DrawerNavigatorMenu = () => {
  const { width } = useWindowDimensions();
  const isTablet = width > 720;

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerMenuCustom {...props} />}
      initialRouteName="HomeRecetas"
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#8A2BE2' }, // Ajusta a tu color primario
        headerTintColor: '#fff',
        drawerType: isTablet ? 'permanent' : 'front',
        drawerPosition: 'left', // Cambiado a left (estándar), usa 'right' si lo prefieres
        drawerStyle: {
          width: isTablet ? 300 : width * 0.75,
          backgroundColor: '#F5F5F5',
        },
      }}
    >
      <Drawer.Screen 
        name="HomeRecetas"
        component={HomeRecetas}
        options={{ title: "Inicio / Recetas" }}
      />
      
      <Drawer.Screen 
        name="UserScreen"
        component={UserScreen}
        options={{ title: "Perfil de Usuario" }}
      />

      {/* Agrega más pantallas aquí según necesites */}
      {/* 
      <Drawer.Screen name="Favoritos" component={FavoritosScreen} />
      <Drawer.Screen name="Categorias" component={MaterialTabsCategorias} /> 
      */}
    </Drawer.Navigator>
  );
};
