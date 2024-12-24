import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

import TabNavigator from "./TabNavigator";
import AuthNavigator from "./AuthNavigator";

import { useGetProfilePictureQuery } from "../services/userService";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { setProfilePicture } from "../features/user/userSlice";

import { SQLiteProvider,useSQLiteContext } from 'expo-sqlite';

export const initializeDB = async (db) => {
  try{
      await db.execAsync('CREATE TABLE IF NOT EXISTS sessions (id INTEGER PRIMARY KEY NOT NULL, email TEXT NOT NULL, localId TEXT NOT NULL);');
      //await db.execAsync('DROP TABLE sessions;');
      console.log("Base de datos inicializada")
  }catch(error){
      console.log("Error al inizializar la base de datos", error)
  }
}


const RootStack = () => {
    const user = useSelector(state => state.authReducer.value.email)
    const localId = useSelector(state => state.authReducer.value.localId)

    const { data: profilePicture, isLoading, error } = useGetProfilePictureQuery(localId)

    const dispatch = useDispatch()

    useEffect(() => {
        if (profilePicture) {
            dispatch(setProfilePicture(profilePicture.image))
        }
    }, [profilePicture])

    return (
        <SQLiteProvider databaseName="ecommerce-app-sdk52.db" onInit={initializeDB} >
            <NavigationContainer>
                {
                    user ? <TabNavigator /> : <AuthNavigator />
                }
            </NavigationContainer>
        </SQLiteProvider >
    )
}

export default RootStack