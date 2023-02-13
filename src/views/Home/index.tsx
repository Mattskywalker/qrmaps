import { View } from 'react-native'
import React, { useEffect, useState, useContext, useCallback } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'
import Page from '../../layouts/Page';
import { Stack, Text, Toast, useToast } from 'native-base';
import { Audio } from 'expo-av';

import music from '../../assets/beep.mp3'
import LoadingScreen from '../../components/LoadingScreen';
import MapDataProvider, { MapContext, SimpleLocation } from '../../context/MapDataProvider';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { navigate } from '../../types';

interface ReadQrCode {
  type: string;
  data: string;
}

export default function Home() {

  const toast = useToast()
  const navigate = useNavigation().navigate as navigate
  const { putLocation } = useContext(MapContext)

  const [loading, setLoading] = useState(false);

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const [code, setCode] = useState<string | null>('');

  const getBarCodeScannerPermissions = async () => {
    setLoading(true);
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
    setLoading(false);
  };

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(music);

    await sound.playAsync();
  }

  function parseObject(data: string) {
    try {
      const object = JSON.parse(data);

      if (!('latitude' in object && 'longitude' in object)) {
        throw new Error
      }
      return object as SimpleLocation
    } catch (e) {
      return undefined
    }
  }

  function handleReadCode({ data, type }: ReadQrCode) {
    if (data === code) { return }

    const object = parseObject(data);
    if (!object) {
      setCode(null);
      return
    }

    setCode(data);

    navigate('Mapa', {location: object});
    playSound()
  }

  useFocusEffect(
    React.useCallback(() => {
      getBarCodeScannerPermissions()
      setCode('');
    }, [])
  )

  if (loading) {
    return (
      <LoadingScreen />
    )
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Page title='Escanear QR code' >
      <Stack pt={8} width={'100%'} height={'100%'} zIndex={1} position={'absolute'} alignItems={'center'} justifyContent={'center'} flex={1} >
        <View>
          {code != '' && !code && <Text color={'error.500'} >Este QR code não contém coordenadas</Text>}
        </View>
        <Stack borderColor={code === '' ? '#00FF00' : '#FF0000'} style={{ borderWidth: 1, borderRadius: 8, }} width={252} height={252} >

        </Stack>
      </Stack>
      <BarCodeScanner

        style={{ flex: 1, width: '100%' }}
        onBarCodeScanned={handleReadCode}
      />
    </Page>
  )
}