import { createDrawerNavigator } from "@react-navigation/drawer";
import { useWindowDimensions } from "react-native";
import { DrawerMenu } from "../components/DrawerMenu";
import { RecetasStackNavigator } from "./RecetasStackNavigator";
import { FavoritosScreen } from "../screens/recetas/FavoritosScreen";
import { EstadisticasScreen } from "../screens/recetas/EstadisticasScreen";
import { UserStackNavigator } from "./UserStackNavigator";

export type RootDrawerMenuParams = {
  RecetasStack: undefined;
  Favoritos: undefined;
  Estadisticas: undefined;
  UserStack: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerMenuParams>();

const warmHeader = {
  headerShown: true,
  headerStyle: { backgroundColor: '#D2691E' },
  headerTintColor: '#FFFFFF',
  headerTitleStyle: { fontWeight: 'bold' },
};

export const DrawerNavigatorMenu = () => {
  const { width } = useWindowDimensions();
  const isTablet = width > 720;

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerMenu {...props} />}
      initialRouteName="RecetasStack"
      screenOptions={{
        headerShown: false,
        drawerType: isTablet ? 'permanent' : 'front',
        drawerPosition: 'left',
        drawerStyle: {
          width: isTablet ? 300 : width * 0.75,
          backgroundColor: '#FFF8F0',
        },
      }}
    >
      <Drawer.Screen name="RecetasStack" component={RecetasStackNavigator} options={{ title: "Recetas" }} />
      <Drawer.Screen name="Favoritos" component={FavoritosScreen} options={{ title: "Mis Favoritos", ...warmHeader }} />
      <Drawer.Screen name="Estadisticas" component={EstadisticasScreen} options={{ title: "Estadísticas", ...warmHeader }} />
      <Drawer.Screen name="UserStack" component={UserStackNavigator} options={{ title: "Perfil", headerShown: false }} />
    </Drawer.Navigator>
  );
};
