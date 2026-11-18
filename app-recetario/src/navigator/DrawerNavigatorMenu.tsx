import { createDrawerNavigator } from "@react-navigation/drawer";
import { useWindowDimensions } from "react-native";
import { DrawerMenu } from "../components/DrawerMenu";
import { UserScreen } from "../screens/User/UserScreen";
import { RecetasStackNavigator } from "./RecetasStackNavigator"; // <-- NUEVO

export type RootDrawerMenuParams = {
    RecetasStack: undefined;
    UserScreen: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerMenuParams>();

export const DrawerNavigatorMenu = () => {
    const { width } = useWindowDimensions();
    const isTablet = width > 720;

    return (
        <Drawer.Navigator
            drawerContent={(props) => <DrawerMenu {...props} />}
            initialRouteName="RecetasStack"
            screenOptions={{
                headerShown: false, // El header lo maneja el Stack anidado
                drawerType: isTablet ? 'permanent' : 'front',
                drawerPosition: 'left',
                drawerStyle: {
                    width: isTablet ? 300 : width * 0.75,
                    backgroundColor: '#F5F5F5',
                },
            }}
        >
            <Drawer.Screen 
                name="RecetasStack"
                component={RecetasStackNavigator}
                options={{ title: "Recetas" }}
            />
            <Drawer.Screen 
                name="UserScreen"
                component={UserScreen}
                options={{ title: "Perfil", headerShown: true }}
            />
        </Drawer.Navigator>
    );
};
