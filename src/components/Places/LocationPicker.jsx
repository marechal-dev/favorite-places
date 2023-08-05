import { useCallback, useEffect, useState } from "react";
import { Alert, StyleSheet, View, Image, Text } from "react-native";
import { getCurrentPositionAsync, Accuracy, PermissionStatus, useForegroundPermissions } from "expo-location"

import { colors } from "../../theme/colors";

import { OutlinedButton } from "../UI/OutlinedButton";
import { getAddress, getMapPreviewUrl } from "../../utils/location";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {},
  previewContainer: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary100,
    borderRadius: 4,
  },
  map: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
})

export function LocationPicker({ onLocationPicked }) {
  const [locationPermissionInformation, requestPermission] = useForegroundPermissions()
  const navigation = useNavigation()
  const route = useRoute()
  const isFocused = useIsFocused()

  const [pickedLocation, setPickedLocation] = useState()

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = route.params ? {
        latitude: route.params.pickedLatitude,
        longitude: route.params.pickedLongitude,
      } : null

      setPickedLocation(mapPickedLocation)
    }
  }, [route, isFocused])

  useEffect(() => {
    const getHumanReadableAddress = async () => {
      if (pickedLocation) {
        const address = await getAddress(pickedLocation.latitude, pickedLocation.longitude)
        onLocationPicked({
          ...pickedLocation,
          address,
        })
      }
    }

    getHumanReadableAddress()
  }, [pickedLocation, onLocationPicked])

  async function verifyLocationPermission() {
    if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant location permissions to use this app."
      );

      return false;
    }

    return true;
  }

  async function handleLocateUser() {
    const isPermissionGranted = await verifyLocationPermission();

    if (!isPermissionGranted) {
      return;
    }

    const locationResponse = await getCurrentPositionAsync({
      accuracy: Accuracy.Highest
    });

    setPickedLocation({
      latitude: locationResponse.coords.latitude,
      longitude: locationResponse.coords.longitude,
    })
  }

  function handlePickOnMap() {
    navigation.navigate("Map")
  }

  return (
    <View style={styles.container}>
      <View style={styles.previewContainer}>
        {
          !pickedLocation ?
            <Text>No preview yet...</Text> :
            <Image
              style={styles.map}
              source={{
                uri: getMapPreviewUrl(pickedLocation.latitude, pickedLocation.longitude),
              }}
            />
        }
      </View>
      <View style={styles.buttonsContainer}>
        <OutlinedButton
          icon="location"
          onPressHandler={handleLocateUser}
        >
          Locate Me
        </OutlinedButton>
        <OutlinedButton
          icon="map"
          onPressHandler={handlePickOnMap}
        >
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  )
}
