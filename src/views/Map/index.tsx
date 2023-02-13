import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Page from '../../layouts/Page'
import MapView, { Marker } from 'react-native-maps';

import * as Location from 'expo-location'
import { LocationObject } from 'expo-location';
import { Button, Spinner } from 'native-base';
import { MapContext, SimpleLocation } from '../../context/MapDataProvider';
import { RouteProp, useRoute } from '@react-navigation/native';
import { DefaulParams } from '../../types';

export default function Map() {

  const { params } = useRoute<RouteProp<DefaulParams>>();

  const title = 'Mapa';
  const { latitude, loadingMap, longitude } = useContext(MapContext)

  if (loadingMap) {
    return <Page title={title} >
      <Spinner />
    </Page>
  }

  return (
    <Page title={title} >
      <MapView

        loadingEnabled={true}
        showsUserLocation={true}
        zoomEnabled={true}
        region={{
          latitude: (params?.location.latitude || latitude),
          longitude: (params?.location.longitude || longitude),
          latitudeDelta: params?.location.latitude ? 0.1 : 0.01,
          longitudeDelta: params?.location.longitude ? 0.1 : 0.01,

        }}
        style={styles.map}>
        {!!params?.location.latitude && !!params?.location.longitude && <Marker coordinate={params.location}/>}
      </MapView>
    </Page>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});