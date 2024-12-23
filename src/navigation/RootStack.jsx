import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

import TabNavigator from "./TabNavigator";
import AuthNavigator from "./AuthNavigator";

import { useGetProfilePictureQuery } from "../services/userService";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { setProfilePicture } from "../features/user/userSlice";

const RootStack = () => {
    const user = useSelector(state=>state.authReducer.value.email)
    const localId = useSelector(state=>state.authReducer.value.localId)

    const {data: profilePicture, isLoading, error} = useGetProfilePictureQuery(localId)

    const dispatch = useDispatch()

    useEffect(()=>{
        if(profilePicture){
            dispatch(setProfilePicture(profilePicture.image))
        }
    },[profilePicture])

    return (
        <NavigationContainer>
            {
                user ? <TabNavigator /> : <AuthNavigator />
            }
        </NavigationContainer>
    )
}

export default RootStack