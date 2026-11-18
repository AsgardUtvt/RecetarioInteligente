import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { StackLoginNavigator } from './src/navigator/StackLoginNavigator';
import { DrawerNavigatorMenu } from './src/navigator/DrawerNavigatorMenu';

const RootNavigator = () => {
  const { authState } = useAuth();

  return (
    <NavigationContainer>   {/* ÚNICO NavigationContainer del proyecto */}
      {authState.isLoggedIn ? <DrawerNavigatorMenu /> : <StackLoginNavigator />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <RootNavigator />   {/* SIN NavigationContainer aquí */}
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
