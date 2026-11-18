import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackLoginParams } from '../../navigator/StackLoginNavigator';
import { useAuth } from '../../context/AuthContext';
import { useImagePicker } from '../../hooks/useImagePicker';

interface Props extends NativeStackScreenProps<StackLoginParams, 'CrearCuentaScreen'> {}

export const CrearCuentaScreen = ({ navigation }: Props) => {
  const { register, authState } = useAuth();
  const { image64, pickImage } = useImagePicker();

  const [form, setForm] = useState({
    nombre: '',
    paterno: '',
    materno: '',
    email: '',
    password: '',
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    if (!form.email || !form.password || !form.nombre) {
      Alert.alert('Error', 'Nombre, correo y contraseña son obligatorios.');
      return;
    }

    try {
      const rawBase64 = image64 ? image64.replace(/^data:image\/\w+;base64,/, '') : null;

      await register({
        email: form.email,
        nombre: form.nombre,
        paterno: form.paterno,
        materno: form.materno,
        password: form.password,
        foto: rawBase64,
      });
    } catch (error: any) {
      console.log('STATUS:', error.response?.status);
      console.log('RESPUESTA:', JSON.stringify(error.response?.data, null, 2));
      Alert.alert('Error', JSON.stringify(error.response?.data || error.message));
    }
  };

  if (authState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF8F0' }}>
        <ActivityIndicator size="large" color="#D2691E" />
        <Text style={{ marginTop: 10, color: '#8B4513' }}>Creando cuenta...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#FFF8F0' }}
    >
      <ScrollView
        contentContainerStyle={{ padding: 25, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Título */}
        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: '#D2691E',
            textAlign: 'center',
            marginBottom: 25,
          }}
        >
          Crear Cuenta
        </Text>

        {/* ===== IMAGEN DE PERFIL ARRIBA ===== */}
        <View style={{ alignItems: 'center', marginBottom: 25 }}>
          <View
            style={{
              width: 130,
              height: 130,
              borderRadius: 65,
              backgroundColor: '#FAEBD7',
              borderWidth: 3,
              borderColor: '#D2691E',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
              marginBottom: 12,
            }}
          >
            {image64 ? (
              <Image source={{ uri: image64 }} style={{ width: '100%', height: '100%' }} />
            ) : (
              <Text style={{ fontSize: 50 }}>👤</Text>
            )}
          </View>

          <TouchableOpacity
            onPress={pickImage}
            style={{
              backgroundColor: '#8B4513',
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Text style={{ fontSize: 16 }}></Text>
            <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 13 }}>
              {image64 ? 'Cambiar foto' : 'Seleccionar foto'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ===== CAMPOS ===== */}
        <View style={{ marginBottom: 14 }}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            value={form.nombre}
            onChangeText={(t) => handleChange('nombre', t)}
            autoCapitalize="words"
            placeholder="Tu nombre"
            placeholderTextColor="#B8A89A"
          />
        </View>

        <View style={{ marginBottom: 14 }}>
          <Text style={styles.label}>Apellido Paterno</Text>
          <TextInput
            style={styles.input}
            value={form.paterno}
            onChangeText={(t) => handleChange('paterno', t)}
            autoCapitalize="words"
            placeholder="Apellido paterno"
            placeholderTextColor="#B8A89A"
          />
        </View>

        <View style={{ marginBottom: 14 }}>
          <Text style={styles.label}>Apellido Materno</Text>
          <TextInput
            style={styles.input}
            value={form.materno}
            onChangeText={(t) => handleChange('materno', t)}
            autoCapitalize="words"
            placeholder="Apellido materno"
            placeholderTextColor="#B8A89A"
          />
        </View>

        <View style={{ marginBottom: 14 }}>
          <Text style={styles.label}>Correo Electrónico</Text>
          <TextInput
            style={styles.input}
            value={form.email}
            onChangeText={(t) => handleChange('email', t)}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="tu@correo.com"
            placeholderTextColor="#B8A89A"
          />
        </View>

        <View style={{ marginBottom: 25 }}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            value={form.password}
            onChangeText={(t) => handleChange('password', t)}
            secureTextEntry
            placeholder="Mínimo 6 caracteres"
            placeholderTextColor="#B8A89A"
          />
        </View>

        {/* Botón crear */}
        <TouchableOpacity
          onPress={handleRegister}
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
            marginBottom: 15,
          }}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 }}>
            Crear Cuenta
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ alignItems: 'center' }}
        >
          <Text style={{ color: '#8B4513', fontSize: 14 }}>
            ¿Ya tienes cuenta?{' '}
            <Text style={{ color: '#D2691E', fontWeight: 'bold' }}>Inicia sesión</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = {
  label: {
    color: '#8B4513',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0C9B3',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#2C1810',
  },
};
