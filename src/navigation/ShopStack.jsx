import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CategoriesScreen, ProductsScreen, ProductScreen } from '../screens/shop';

const Stack = createNativeStackNavigator();

function ShopStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Categorías" component={CategoriesScreen} />
        <Stack.Screen name="Productos" component={ProductsScreen} />
        <Stack.Screen name="Detalle" component={ProductScreen} />
      </Stack.Navigator>
    );
  }

  export default ShopStack