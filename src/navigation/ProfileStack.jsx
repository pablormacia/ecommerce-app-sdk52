import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/profile/ProfileScreen";

const Stack = createNativeStackNavigator()

const ProfileStack = ()=>(
    <Stack.Navigator>
        <Stack.Screen name="Perfil" component={ProfileScreen} />
    </Stack.Navigator>
)

export default ProfileStack