import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import { colors } from '../../theme/colors';
import CameraIcon from '../../components/CameraIcon';
import { useSelector, useDispatch } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import { setProfilePicture } from '../../features/user/userSlice';
import { usePutProfilePictureMutation } from '../../services/userService';
import Icon from "react-native-vector-icons/MaterialIcons"
import { useSQLiteContext } from 'expo-sqlite';
import { clearUser } from '../../features/auth/authSlice';
import MapPreview from '../../components/MapPreview';
import * as Location from 'expo-location'
import { useState } from 'react';


const ProfileScreen = () => {
    const db = useSQLiteContext()
    const user = useSelector(state => state.authReducer.value.email)
    const localId = useSelector(state => state.authReducer.value.localId)
    const image = useSelector(state => state.userReducer.value.profilePicture)
    const [location,setLocation] = useState("")


    const dispatch = useDispatch()

    const [triggerPutProfilePicture, result] = usePutProfilePictureMutation()

    const verifyCameraPermissions = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync()
        if (!granted) return false
        return true
    }

    const pickImage = async () => {
        const isPersmissionOk = await verifyCameraPermissions()
        if (isPersmissionOk) {
            let result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1],
                base64: true,
                quality: 0.6
            })
            if (!result.canceled) {
                dispatch(setProfilePicture(`data:image/jpeg;base64,${result.assets[0].base64}`))
                triggerPutProfilePicture({ image: `data:image/jpeg;base64,${result.assets[0].base64}`, localId })
            }
        }
    }

    const logout = async ()=>{
        try{
            const result = await db.runAsync('DELETE FROM sessions WHERE localId=$localId',{$localId: localId})
            dispatch(clearUser())
        }catch(error){
            console.log("Error al cerrar sesion", error)
        }
    }

    const verifyLocationPermissions = async ()=>{
        const {status} = await Location.requestForegroundPermissionsAsync()
        if(status !== 'granted') return false
        return true
    }

    const getLocation = async () =>{
        const isPermissionsOk = await verifyLocationPermissions()
        if(!isPermissionsOk){
            console.log("Error al obtener los permisos necesarios")
        }else{
            let location = await Location.getCurrentPositionAsync()
            if(location){
                console.log(location)
                setLocation(location.coords)
            }else{
                console.log("Error al obtener la ubicación")
            }
        }
    }

    return (
        <View style={styles.profileContainer}>
            <View style={styles.imageProfileContainer}>
                {
                    image
                        ?
                        <Image source={{ uri: image }} resizeMode='cover' style={styles.profileImage} />
                        :
                        <Text style={styles.textProfilePlaceHolder}>{user.charAt(0).toUpperCase()}</Text>
                }
                <Pressable onPress={pickImage} style={({ pressed }) => [{ opacity: pressed ? 0.90 : 1 }, styles.cameraIcon]} >
                    <CameraIcon />
                </Pressable>
            </View>
            <Text style={styles.profileData}>Email: {user}</Text>
            <Text style={styles.profileData}>Ubicación: </Text>
            <MapPreview location={location} />
            <Pressable style={styles.getLocation} onPress={getLocation}><Text style={styles.getLocationText}>Obtener ubicación: </Text><Text><Icon name="my-location" size={24} color={colors.blanco} /></Text></Pressable>
            <Pressable style={styles.logout} onPress={logout}><Text><Icon name="logout" size={32} color={colors.grisOscuro} /></Text></Pressable>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    profileContainer: {
        padding: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageProfileContainer: {
        width: 128,
        height: 128,
        borderRadius: 128,
        backgroundColor: colors.morado,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textProfilePlaceHolder: {
        color: colors.blanco,
        fontSize: 48,
    },
    profileData: {
        paddingVertical: 16,
        fontSize: 16
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    profileImage: {
        width: 128,
        height: 128,
        borderRadius: 128
    },
    logout:{
        position:'absolute',
        top:10,
        right:10
    },
    getLocation:{
        flexDirection:'row',
        alignItems:'center',
        padding:8,
        paddingHorizontal:24,
        backgroundColor: colors.naranjaBrillante,
        borderRadius:16,
        margin: 16
    },
    getLocationText:{
        color:colors.blanco,
        fontSize:16,
        
    }
})