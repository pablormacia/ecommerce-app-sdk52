import { StyleSheet, Text, View, TextInput, Pressable, Dimensions } from 'react-native'
import { colors } from '../../theme/colors';
import { useEffect, useState } from 'react';
import { useSignupMutation } from '../../services/authService';

const textInputWidth = Dimensions.get('window').width * 0.7

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [triggerSignUp, result] = useSignupMutation()

    console.log(result)

    const onSubmit = () => {
        triggerSignUp({ email, password })
    }

    useEffect(()=>{
        if(result.status=="fulfilled"){
            navigation.navigate("Login")
        }else if(result.status=="rejected"){
            console.log("Se produjo un error al crear el usuario")
        }

    },[result])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tienda Expo SDK52</Text>
            <Text style={styles.subTitle}>Registrate</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor="#EBEBEB"
                    placeholder="Email"
                    style={styles.textInput}
                />
                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    placeholderTextColor="#EBEBEB"
                    placeholder='Password'
                    style={styles.textInput}
                    secureTextEntry
                />
                <TextInput
                    onChangeText={(text) => setConfirmPassword(text)}
                    placeholderTextColor="#EBEBEB"
                    placeholder='Repetir password'
                    style={styles.textInput}
                    secureTextEntry
                />
            </View>
            <View style={styles.footTextContainer}>
                <Text style={styles.whiteText}>¿Ya tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text style={
                        {
                            ...styles.whiteText,
                            ...styles.underLineText
                        }
                    }>
                        Iniciar sesión
                    </Text>
                </Pressable>
            </View>

            <Pressable style={styles.btn} onPress={onSubmit}><Text style={styles.btnText}>Crear cuenta</Text></Pressable>

        </View>
    )
}

export default SignupScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.morado
    },
    title: {
        color: colors.verdeNeon,
        fontFamily: "PressStart2P",
        fontSize: 24
    },
    subTitle: {
        fontFamily: "Montserrat",
        fontSize: 18,
        color: colors.amarillo,
        fontWeight: '700',
        letterSpacing: 3
    },
    inputContainer: {
        gap: 16,
        margin: 16,
        marginTop: 48,
        alignItems: 'center',

    },
    textInput: {
        padding: 8,
        paddingLeft: 16,
        borderRadius: 16,
        backgroundColor: "#4e2f60",
        width: textInputWidth,
        color: colors.blanco,
    },
    footTextContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    whiteText: {
        color: colors.blanco
    },
    underLineText: {
        textDecorationLine: 'underline',
    },
    strongText: {
        fontWeight: '900',
        fontSize: 16
    },
    btn: {
        padding: 16,
        paddingHorizontal: 32,
        backgroundColor: colors.morado,
        borderRadius: 16,
        marginTop: 32
    },
    btnText: {
        color: colors.blanco,
        fontSize: 16,
        fontWeight: '700'
    },
    guestOptionContainer: {
        alignItems: 'center',
        marginTop: 64
    }
})