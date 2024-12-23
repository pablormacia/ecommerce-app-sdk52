import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import RootStack from './src/navigation/RootStack';

export default function App() {
  return (
    <Provider store={store}>
        <RootStack />
        <StatusBar style="auto" />
    </Provider>
  );
}

