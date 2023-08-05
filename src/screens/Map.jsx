import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps"
import { IconButton } from "../components/UI/IconButton";

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
})

export function Map({ navigation, route }) {
  const initialLocation = route.params && {
    latitude: route.params.latitude,
    longitude: route.params.longitude,
  };

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  function handleSelectLocationOnMap(event) {
    if (initialLocation) {
      return;
    }

    const latitude = event.nativeEvent.coordinate.latitude;
    const longitude = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({
      latitude,
      longitude
    })
  }

  const onSavePickedLocation = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No Location picked!",
        "You have to pick a location (by tapping on the map) first!"
      );

      return;
    }

    navigation.navigate("AddPlace", {
      pickedLatitude: selectedLocation.latitude,
      pickedLongitude: selectedLocation.longitude,
    })
  }, [navigation, selectedLocation])

  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }

    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPressHandler={onSavePickedLocation}
        />
      )
    })
  }, [navigation, onSavePickedLocation, initialLocation])

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: initialLocation ? initialLocation.latitude : -32.0377009,
        longitude: initialLocation ? initialLocation.longitude : -52.1304394,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      onPress={handleSelectLocationOnMap}
    >
      {
        selectedLocation &&
          <Marker
            title="Location"
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            }}
          /> 
      }
    </MapView>
  )
}
