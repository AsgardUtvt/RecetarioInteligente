import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackLoginParams } from "../navigator/StackLoginNavigator";
import { useAuth } from "../context/AuthContext";
import { appTheme } from "../theme/appTheme"; // Ajusta ruta

interface Props extends NativeStackScreenProps<StackLoginParams, 'LoginScreen'> {}

export const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, authState } = useAuth();

  const handleLogin = async () => {
    try {
      await login(email, password);
      // El AuthContext cambiará isLoggedIn a true, y tu App.tsx renderizará el Drawer automáticamente.
      // Si necesitas navegar forzado: navigation.replace('DrawerNavigatorMenu');
    } catch (error) {
      alert("Error al iniciar sesión");
    }
  };

  if (authState.isLoading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={[appTheme.container, { justifyContent: 'center', padding: 20 }]}>
      <Text style={appTheme.text}>Usuario (Email)</Text>
      <TextInput style={appTheme.textInput} value={email} onChangeText={setEmail} autoCapitalize="none" />
      
      <Text style={[appTheme.text, { marginTop: 15 }]}>Contraseña</Text>
      <TextInput style={appTheme.textInput} value={password} onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity style={[appTheme.btn, { marginTop: 20 }]} onPress={handleLogin}>
        <Text style={{ color: 'white' }}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ marginTop: 15 }} onPress={() => navigation.navigate('CrearCuentaScreen')}>
        <Text style={{ color: 'blue', textAlign: 'center' }}>Crear cuenta</Text>
      </TouchableOpacity>
    </View>
  );
}
