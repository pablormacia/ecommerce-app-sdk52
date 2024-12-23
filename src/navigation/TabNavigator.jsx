import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShopStack from './ShopStack';
import CartStack from './CartStack'
import ProfileStack from './ProfileStack';
import { colors } from '../theme/colors';
import Icon from 'react-native-vector-icons/MaterialIcons'

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false
      }}
    >
      <Tab.Screen
        name="Shop"
        component={ShopStack}
        options={{
          tabBarIcon: ({ focused }) => (<Icon name="storefront" size={32} color={focused ? colors.grisOscuro : colors.grisMedio} />)
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={{
          tabBarIcon: ({ focused }) => (<Icon name="shopping-cart" size={32} color={focused ? colors.grisOscuro : colors.grisMedio} />)
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ focused }) => (<Icon name="account-circle" size={32} color={focused ? colors.grisOscuro : colors.grisMedio} />)
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({
  tabBar: {
    height: 64,
    backgroundColor: colors.grisClaro
  }
})