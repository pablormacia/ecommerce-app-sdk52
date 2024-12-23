import { StyleSheet, Text, View, Pressable,Image } from 'react-native'
import { colors } from '../../theme/colors';
import CameraIcon from '../../components/CameraIcon';
import { useSelector, useDispatch } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import { setProfilePicture } from '../../features/user/userSlice';
import { usePutProfilePictureMutation } from '../../services/userService';
import Icon from "react-native-vector-icons/MaterialIcons"
import { useSQLiteContext } from 'expo-sqlite';
import { clearUser } from '../../features/auth/authSlice';

const ProfileScreen = () => {   
    const db = useSQLiteContext();
    const user = useSelector(state=>state.authReducer.value.email)
    const localId = useSelector(state=>state.authReducer.value.localId)
    const image = useSelector(state=>state.userReducer.value.profilePicture)

    //console.log("user:", user,"image:", image,"localId:", localId)

    const dispatch = useDispatch()

    const [triggerPutProfilePicture, result] = usePutProfilePictureMutation()

    const verifyCameraPermissions = async ()=>{
        const {granted} = await ImagePicker.requestCameraPermissionsAsync()
        if(!granted) return false
        return true
    }

    const pickImage = async ()=>{
        const isPersmissionOk = await verifyCameraPermissions()
        if(isPersmissionOk){
            let result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1,1],
                base64:true,
                quality: 0.6
            })
            if(!result.canceled){
                dispatch(setProfilePicture(`data:image/jpeg;base64,${result.assets[0].base64}`))
                triggerPutProfilePicture({image:`data:image/jpeg;base64,${result.assets[0].base64}`,localId })
            }
        }
    }

    const logout = async () => {
        try{
            const result =await db.runAsync('DELETE FROM sessions'); 
            dispatch(clearUser())
        }catch(error){
            console.log("Error al eliminar al usuario de la db", error)
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
            <Pressable onPress={logout}><Icon name="logout" size={32} color={colors.grisMedio}/></Pressable>
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
    }
})