import { View, Text, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useAuth } from '../../context/AuthContext';
import { appTheme } from '../../theme/appTheme';
import { UserStackParams } from '../../navigator/UserStackNavigator';
import { RootDrawerMenuParams } from '../../navigator/DrawerNavigatorMenu';
import { useLayoutEffect } from 'react';

interface Props extends NativeStackScreenProps<UserStackParams, 'UserScreen'> {}

export const UserScreen = ({ navigation }: Props) => {
  const { authState, logout } = useAuth();
  const user = authState.user;

  // Hook del Drawer padre para poder llamar openDrawer()
  const drawerNavigation = useNavigation<DrawerNavigationProp<RootDrawerMenuParams>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => drawerNavigation.openDrawer()}
          style={{ marginLeft: 15, padding: 5 }}
        >
          <Text style={{ fontSize: 24, color: '#fff' }}>☰</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, drawerNavigation]);

  if (!user) {
    return (
      <View style={[appTheme.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#8A2BE2" />
      </View>
    );
  }

  const imageUri = user.foto
    ? (user.foto.startsWith('data:') ? user.foto : `data:image/jpeg;base64,${user.foto}`)
    : 'https://via.placeholder.com/150';

  return (
    <View style={[appTheme.container, { alignItems: 'center', paddingTop: 40 }]}>
      <Image
        source={{ uri: imageUri }}
        style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          borderWidth: 3,
          borderColor: '#8A2BE2',
          marginBottom: 20,
        }}
      />

      <Text style={[appTheme.text, { fontSize: 24, fontWeight: 'bold', marginBottom: 5 }]}>
        {user.nombre} {user.paterno} {user.materno}
      </Text>

      <Text style={[appTheme.text, { fontSize: 16, color: '#666', marginBottom: 30 }]}>
        {user.email}
      </Text>

      <TouchableOpacity
        style={[appTheme.btn, { width: '80%', marginBottom: 15 }]}
        onPress={() => navigation.navigate('FormUser')}
      >
        <Text style={appTheme.btnText}>Editar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[appTheme.btn, { width: '80%', backgroundColor: '#FF4444' }]}
        onPress={() => {
          Alert.alert(
            'Cerrar Sesión',
            '¿Estás seguro de que deseas salir?',
            [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Salir', onPress: logout, style: 'destructive' },
            ],
          );
        }}
      >
        <Text style={appTheme.btnText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};
