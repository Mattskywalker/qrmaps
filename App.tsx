
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, View } from 'native-base';

import { BarCodeScanner } from 'expo-barcode-scanner'

import Routes from './src/routes';
import MapDataProvider from './src/context/MapDataProvider';

export default function App() {

  return (
    <MapDataProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </NativeBaseProvider>
    </MapDataProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
