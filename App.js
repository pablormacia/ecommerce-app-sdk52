import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import RootStack from './src/navigation/RootStack';
import { SQLiteProvider } from 'expo-sqlite';

export const initializeDB = async (db) => {
  try {
    await db.execAsync('CREATE TABLE IF NOT EXISTS sessions (id INTEGER PRIMARY KEY NOT NULL, email TEXT NOT NULL, localId TEXT NOT NULL);')
    console.log("Base de datos inicializada")
  } catch (error) {
    console.log("Error al inicializar la base de datos")
  }
}

export default function App() {
  return (
    <SQLiteProvider databaseName='ecommerce-app-sdk52' onInit={initializeDB}>
      <Provider store={store}>
        <RootStack />
        <StatusBar style="auto" />
      </Provider>
    </SQLiteProvider>
  );
}

