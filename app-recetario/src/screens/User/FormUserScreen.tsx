import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../../context/AuthContext';
import { useImagePicker } from '../../hooks/useImagePicker';
import { UserStackParams } from '../../navigator/UserStackNavigator';

interface Props extends NativeStackScreenProps<UserStackParams, 'FormUser'> {}

export const FormUserScreen = ({ navigation }: Props) => {
  const { authState, updateUser } = useAuth();
  const { image64, pickImage } = useImagePicker();
  const user = authState.user;

  const [form, setForm] = useState({
    nombre: user?.nombre ?? '',
    paterno: user?.paterno ?? '',
    materno: user?.materno ?? '',
    email: user?.email ?? '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (f: string, v: string) => setForm(p => ({ ...p, [f]: v }));

  const handleSave = async () => {
    if (!form.nombre || !form.email) {
      Alert.alert('Error', 'Nombre y correo son obligatorios.');
      return;
    }
    setLoading(true);
    try {
      const payload: any = {
        nombre: form.nombre,
        paterno: form.paterno,
        materno: form.materno,
        email: form.email,
      };
      if (form.password) payload.password = form.password;
      if (image64) payload.foto = image64.replace(/^data:image\/\w+;base64,/, '');

      await updateUser(payload);
      Alert.alert('Éxito', 'Perfil actualizado');
      navigation.goBack();
    } catch (e: any) {
      Alert.alert('Error', JSON.stringify(e.response?.data || e.message));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#D2691E" style={{ flex: 1 }} />;

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
        {/* ===== IMAGEN ARRIBA (igual que Crear Cuenta) ===== */}
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
              <Image
                source={{
                  uri: user?.foto
                    ? (user.foto.startsWith('data:') ? user.foto : `data:image/jpeg;base64,${user.foto}`)
                    : 'https://via.placeholder.com/150',
                }}
                style={{ width: '100%', height: '100%' }}
              />
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
            onChangeText={t => handleChange('nombre', t)}
            placeholder="Tu nombre"
            placeholderTextColor="#B8A89A"
          />
        </View>

        <View style={{ marginBottom: 14 }}>
          <Text style={styles.label}>Apellido Paterno</Text>
          <TextInput
            style={styles.input}
            value={form.paterno}
            onChangeText={t => handleChange('paterno', t)}
            placeholder="Apellido paterno"
            placeholderTextColor="#B8A89A"
          />
        </View>

        <View style={{ marginBottom: 14 }}>
          <Text style={styles.label}>Apellido Materno</Text>
          <TextInput
            style={styles.input}
            value={form.materno}
            onChangeText={t => handleChange('materno', t)}
            placeholder="Apellido materno"
            placeholderTextColor="#B8A89A"
          />
        </View>

        <View style={{ marginBottom: 14 }}>
          <Text style={styles.label}>Correo</Text>
          <TextInput
            style={styles.input}
            value={form.email}
            onChangeText={t => handleChange('email', t)}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="tu@correo.com"
            placeholderTextColor="#B8A89A"
          />
        </View>

        <View style={{ marginBottom: 25 }}>
          <Text style={styles.label}>Nueva contraseña (opcional)</Text>
          <TextInput
            style={styles.input}
            value={form.password}
            onChangeText={t => handleChange('password', t)}
            secureTextEntry
            placeholder="Dejar vacío para no cambiar"
            placeholderTextColor="#B8A89A"
          />
        </View>

        {/* Botón guardar */}
        <TouchableOpacity
          onPress={handleSave}
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
            Guardar Cambios
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
