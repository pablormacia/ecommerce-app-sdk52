import { StyleSheet, Text, View, TextInput, Pressable, Dimensions } from 'react-native'
import { colors } from '../../theme/colors';
import { useEffect, useState } from 'react';
import { useLoginMutation } from '../../services/authService';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/auth/authSlice';
import { useSQLiteContext } from 'expo-sqlite';

const textInputWidth = Dimensions.get('window').width * 0.7

const LoginScreen = ({navigation}) => {
    const db = useSQLiteContext();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()

    const [triggerLogin, result] = useLoginMutation()

    useEffect(() => {
        async function setup() {
          const result = await db.getFirstAsync('SELECT * FROM sessions');
          console.log("Usuarios en db:", result)
          if(result.email){
            console.log(result)
            dispatch(setUser({email: result.email,localId: result.localId}))
          }
        }
        setup();
      }, []);

      const saveUserInDb =async (email, localId) =>{
        try{
            const result = await db.runAsync('INSERT INTO sessions (email,localId) VALUES (?,?)', email, localId);
            console.log("Usuario guardado con éxito en la db:", result)
        }catch(error){
            console.log("Error al guardar el usuario en la db: ", error)
        }
    }

    
      useEffect(()=>{
        async function saveUser() {
            if(result.status=="fulfilled"){
                dispatch(setUser(result.data))
                await saveUserInDb(result.data.email, result.data.localId)
            }else if(result.status=="rejected"){
                console.log("Se produjo un error al iniciar sesión")
            }
        }
        saveUser()
    },[result])
    

    

    const onSubmit = async ()=>{
        triggerLogin({email,password})
    }



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

            </View>
            <View style={styles.footTextContainer}>
                <Text style={styles.whiteText}>¿No tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Signup')}>
                    <Text style={
                        {
                            ...styles.whiteText,
                            ...styles.underLineText
                        }
                    }>
                        Crea una
                    </Text>
                </Pressable>
            </View>

            <Pressable style={styles.btn} onPress={onSubmit}><Text style={styles.btnText}>Iniciar sesión</Text></Pressable>
        </View>
    )
}

export default LoginScreen

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