import {NativeStackScreenProps} from "@react-navigation/native-stack";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import {StackLoginParams} from "../../navigator/StackLoginNavigator";


interface Props extends NativeStackScreenProps<StackLoginParams, 'CrearCuentaScreen'>{};

export const CrearCuentaScreen = ({navigation}: Props) => {
   
    return (
        <View>
            <View>
                <TextInput
                    placeholder="Usuario"
                />
            </View>
            <View>
                <TextInput
                    placeholder="Apellido paterno"
                />
            </View>
            <View>
                <TextInput
                    placeholder="Apellido materno"
                />
            </View>
            <View>
                <TextInput
                    placeholder="Correo"
                />
            </View>
            <View>
                <TextInput
                    placeholder="Password"
                />
            </View>

            <TouchableOpacity>
                <Text>Seleccionar imagen</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Craer cuenta</Text>
            </TouchableOpacity>
        </View>
    );
}
