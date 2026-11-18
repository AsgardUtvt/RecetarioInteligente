import { useState } from "react";
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    ActivityIndicator, 
    Image, 
    Alert,
    ScrollView 
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackLoginParams } from "../../navigator/StackLoginNavigator";
import { useAuth } from "../../context/AuthContext";
import { useImagePicker } from "../../hooks/useImagePicker";
import { appTheme } from "../../theme/appTheme";

interface Props extends NativeStackScreenProps<StackLoginParams, 'CrearCuentaScreen'> {}

export const CrearCuentaScreen = ({ navigation }: Props) => {
    const { register, authState } = useAuth();
    const { image64, pickImage } = useImagePicker();

    const [form, setForm] = useState({
        nombre: "",
        paterno: "",
        materno: "",
        email: "",
        password: "",
    });

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleRegister = async () => {
        // 1. Validación básica
        if (!form.email || !form.password || !form.nombre) {
            Alert.alert("Error", "Nombre, correo y contraseña son obligatorios.");
            return;
        }

        try {
            // 2. Limpiar el prefijo base64 antes de enviar al backend
            const rawBase64 = image64 ? image64.replace(/^data:image\/\w+;base64,/, "") : null;

            // 3. Llamar al contexto (SIN id_user: 0, el backend lo genera auto-incremental)
            await register({
                email: form.email,
                nombre: form.nombre,
                paterno: form.paterno,
                materno: form.materno,
                password: form.password,
                foto: rawBase64,
            });

            // 4. Si tiene éxito, el AuthContext ya cambió isLoggedIn a true.
            // App.tsx renderizará automáticamente el Drawer.

        } catch (error: any) {
            // Mantenemos los logs detallados para depuración de red
            console.log('STATUS:', error.response?.status);
            console.log('RESPUESTA:', JSON.stringify(error.response?.data, null, 2));
            Alert.alert('Error', JSON.stringify(error.response?.data || error.message));
        }
    };

    // Mostrar loader mientras el contexto procesa la petición
    if (authState.isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="violet" />
                <Text style={{ marginTop: 10 }}>Creando cuenta...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20, justifyContent: "center" }}>
            <Text style={[appTheme.text, { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" }]}>
                Crear Cuenta
            </Text>

            <Text style={appTheme.text}>Nombre</Text>
            <TextInput
                style={appTheme.textInput}
                value={form.nombre}
                onChangeText={(t) => handleChange("nombre", t)}
                autoCapitalize="words"
            />

            <Text style={[appTheme.text, { marginTop: 10 }]}>Apellido Paterno</Text>
            <TextInput
                style={appTheme.textInput}
                value={form.paterno}
                onChangeText={(t) => handleChange("paterno", t)}
                autoCapitalize="words"
            />

            <Text style={[appTheme.text, { marginTop: 10 }]}>Apellido Materno</Text>
            <TextInput
                style={appTheme.textInput}
                value={form.materno}
                onChangeText={(t) => handleChange("materno", t)}
                autoCapitalize="words"
            />

            <Text style={[appTheme.text, { marginTop: 10 }]}>Correo Electrónico</Text>
            <TextInput
                style={appTheme.textInput}
                value={form.email}
                onChangeText={(t) => handleChange("email", t)}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Text style={[appTheme.text, { marginTop: 10 }]}>Contraseña</Text>
            <TextInput
                style={appTheme.textInput}
                value={form.password}
                onChangeText={(t) => handleChange("password", t)}
                secureTextEntry
            />

            <TouchableOpacity 
                style={[appTheme.btn, { marginTop: 20, backgroundColor: "gray" }]} 
                onPress={pickImage}
            >
                <Text style={{ color: "white", fontWeight: "bold" }}>Seleccionar Imagen de Perfil</Text>
            </TouchableOpacity>

            {image64 && (
                <Image 
                    source={{ uri: image64 }} 
                    style={{ 
                        width: 100, 
                        height: 100, 
                        borderRadius: 50, 
                        alignSelf: "center", 
                        marginTop: 15,
                        borderWidth: 2,
                        borderColor: "violet"
                    }} 
                />
            )}

            <TouchableOpacity 
                style={[appTheme.btn, { marginTop: 25, backgroundColor: "violet" }]} 
                onPress={handleRegister}
            >
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Crear Cuenta</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={{ marginTop: 15, alignSelf: "center" }} 
                onPress={() => navigation.goBack()}
            >
                <Text style={{ color: "blue", fontSize: 14 }}>¿Ya tienes cuenta? Inicia sesión</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};
