import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { StackLoginNavigator } from './StackLoginNavigator';
import { DrawerNavigatorMenu } from './DrawerNavigatorMenu';

export const RootNavigator = () => {
  const { authState } = useAuth();

  // Pantalla de carga mientras se verifica la sesión
  if (authState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#8A2BE2" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {authState.isLoggedIn ? (
        <DrawerNavigatorMenu />
      ) : (
        <StackLoginNavigator />
      )}
    </NavigationContainer>
  );
};
