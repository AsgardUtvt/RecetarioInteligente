import {NativeStackScreenProps} from "@react-navigation/native-stack";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import {StackLoginParams} from "../navigator/StackLoginNavigator";


interface Props extends NativeStackScreenProps<StackLoginParams,'LoginScreen'>{};

export const LoginScreen = ({navigation}: Props) => {

    return(
        <View>
            <View>
            <Text>Usuario</Text>
            <TextInput></TextInput>
            </View>
            <View>
            <Text>contraseña</Text>
            <TextInput></TextInput>
            </View>
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('HomeRecetas')}
                >
                    <Text>Iniciar sesion</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
