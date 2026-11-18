import { View, Text, Image, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { useAuth } from '../context/AuthContext';

export const DrawerMenu = (props: any) => {
  const { authState, logout } = useAuth();
  const user = authState.user;

  const imageUri = user?.foto
    ? (user.foto.startsWith('data:') ? user.foto : `data:image/jpeg;base64,${user.foto}`)
    : 'https://via.placeholder.com/100';

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: imageUri }} style={styles.avatar} />
        <Text style={styles.userName} numberOfLines={1}>
          {user?.nombre} {user?.paterno}
        </Text>
        <Text style={styles.userEmail} numberOfLines={1}>
          {user?.email}
        </Text>
      </View>

      <View style={styles.menuItems}>
        <DrawerItemList {...props} />
      </View>

      <View style={styles.footer}>
        <DrawerItem
          label="Cerrar Sesión"
          icon={({ size }) => (
            <Text style={{ fontSize: size, color: 'red' }}></Text>
          )}
          onPress={logout}
          labelStyle={{ color: 'red', fontWeight: 'bold' }}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: 50 },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#8A2BE2',
  },
  userName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  userEmail: { fontSize: 14, color: '#666', marginTop: 4 },
  menuItems: { flex: 1 },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    marginTop: 'auto',
  },
});
