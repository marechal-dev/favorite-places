import { useState, useCallback, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from "expo-splash-screen"
import { NavigationContainer } from '@react-navigation/native';

import { StackRoutes } from './src/routes/StackRoutes';
import { initDatabase } from './src/utils/database';

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [databaseInitialized, setDatabaseInitialized] = useState(false)

  useEffect(() => {
    const startDatabase = async () => {
      try {
        await initDatabase();
      } catch (error) {
        console.warn(error);        
      } finally {
        setDatabaseInitialized(true);
      }
    }

    startDatabase();
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (databaseInitialized) {
      await SplashScreen.hideAsync();
    }
  }, [databaseInitialized])

  if (!databaseInitialized) {
    return null;
  }

  return (
    <>
      <StatusBar translucent style="dark" />
      <NavigationContainer
        onReady={onLayoutRootView}
      >
        <StackRoutes />
      </NavigationContainer>
    </>
  );
}
