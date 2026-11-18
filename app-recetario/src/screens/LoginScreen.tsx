import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackLoginParams } from '../navigator/StackLoginNavigator';
import { useAuth } from '../context/AuthContext';

interface Props extends NativeStackScreenProps<StackLoginParams, 'LoginScreen'> {}

export const LoginScreen = ({ navigation }: Props) => {
  const { login, authState } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) return;
    try {
      await login(email, password);
    } catch (e) {
      // El AuthContext ya maneja el error
    }
  };

  if (authState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF8F0' }}>
        <ActivityIndicator size="large" color="#D2691E" />
        <Text style={{ marginTop: 10, color: '#8B4513' }}>Iniciando sesión...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#FFF8F0' }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 30 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo / Título */}
        <View style={{ alignItems: 'center', marginBottom: 40 }}>
          <Text style={{ fontSize: 50, marginBottom: 10 }}>🍳</Text>
          <Text
            style={{
              fontSize: 32,
              fontWeight: 'bold',
              color: '#D2691E',
              textAlign: 'center',
            }}
          >
            Recetario
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: '#8B4513',
              marginTop: 5,
              textAlign: 'center',
            }}
          >
            Inteligente
          </Text>
        </View>

        {/* Campos */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: '#8B4513', fontWeight: '600', marginBottom: 6, fontSize: 14 }}>
            Correo electrónico
          </Text>
          <TextInput
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0C9B3',
              borderRadius: 12,
              padding: 14,
              fontSize: 16,
              color: '#2C1810',
            }}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="tu@correo.com"
            placeholderTextColor="#B8A89A"
          />
        </View>

        <View style={{ marginBottom: 30 }}>
          <Text style={{ color: '#8B4513', fontWeight: '600', marginBottom: 6, fontSize: 14 }}>
            Contraseña
          </Text>
          <TextInput
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0C9B3',
              borderRadius: 12,
              padding: 14,
              fontSize: 16,
              color: '#2C1810',
            }}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="••••••••"
            placeholderTextColor="#B8A89A"
          />
        </View>

        {/* Botón principal */}
        <TouchableOpacity
          onPress={handleLogin}
          style={{
            backgroundColor: '#D2691E',
            padding: 16,
            borderRadius: 14,
            alignItems: 'center',
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 4,
          }}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 }}>
            Iniciar Sesión
          </Text>
        </TouchableOpacity>

        {/* Link a registro */}
        <TouchableOpacity
          onPress={() => navigation.navigate('CrearCuentaScreen')}
          style={{ marginTop: 20, alignItems: 'center' }}
        >
          <Text style={{ color: '#8B4513', fontSize: 14 }}>
            ¿No tienes cuenta?{' '}
            <Text style={{ color: '#D2691E', fontWeight: 'bold' }}>Crear cuenta</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
