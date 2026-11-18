import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserScreen } from '../screens/User/UserScreen';
import { FormUserScreen } from '../screens/User/FormUserScreen';

export type UserStackParams = {
  UserScreen: undefined;
  FormUser: undefined;
};

const Stack = createNativeStackNavigator<UserStackParams>();

export const UserStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="UserScreen"
    screenOptions={{
      headerStyle: { backgroundColor: '#D2691E' },
      headerTintColor: '#FFFFFF',
      headerTitleStyle: { fontWeight: 'bold' },
    }}
  >
    <Stack.Screen name="UserScreen" component={UserScreen} options={{ title: 'Perfil' }} />
    <Stack.Screen name="FormUser" component={FormUserScreen} options={{ title: 'Editar Perfil' }} />
  </Stack.Navigator>
);
