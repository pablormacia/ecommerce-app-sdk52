import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from '../screens/cart/CartScreen';

const Stack = createNativeStackNavigator();

function CartStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Carrito" component={CartScreen} />
      </Stack.Navigator>
    );
  }

  export default CartStack