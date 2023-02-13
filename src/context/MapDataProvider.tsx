import { createContext, ReactNode, useState, useEffect } from "react";
import * as Location from 'expo-location';
import { LocationObject } from "expo-location";

interface MapDataProps {
  children: ReactNode
}

interface MapContextProps {
  latitude: number;
  longitude: number;
  loadingMap: boolean;
  putLocation({latitude, longitude}: SimpleLocation): void;
}

export interface SimpleLocation {latitude: number, longitude: number}

export const MapContext = createContext({} as MapContextProps);

const BrazilLocation = {
  latitude: -13.7059625,
  longitude: -69.6559297 
}

export default function MapDataProvider({children}: MapDataProps) {

  const [loadingMap, setLoadingMap] = useState(false);

  const [location, setLocation] = useState<SimpleLocation>({...BrazilLocation});
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {latitude, longitude} = location;

  async function fetchLocation() {

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
  }

  useEffect(() => {
    fetchLocation();
  }, []);

  function putLocation(location: SimpleLocation) {
    setLocation(location)
  }

  return (
    <MapContext.Provider value={{latitude, longitude, loadingMap, putLocation}} >
      {children}
    </MapContext.Provider>
  )
}