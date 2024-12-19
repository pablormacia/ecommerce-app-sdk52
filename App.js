import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import ShopStack from './src/navigation/ShopStack';

export default function App() {
  return (
    <NavigationContainer>
      <ShopStack />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

