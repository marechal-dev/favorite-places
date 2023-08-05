import { Image, ScrollView, StyleSheet, View, Text } from "react-native";
import { OutlinedButton } from "../components/UI/OutlinedButton";
import { colors } from "../theme/colors";
import { useEffect, useState } from "react";
import { fetchPlaceById } from "../utils/database";

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    color: colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export function PlaceDetails({ navigation, route }) {
  const [placeDetails, setPlaceDetails] = useState();
  const selectedPlaceId = route.params.placeId;
  
  useEffect(() => {
    const getPlaceData = async () => {
      const result = await fetchPlaceById(selectedPlaceId);

      setPlaceDetails(result);

      navigation.setOptions({
        title: result.title,
      });
    }

    getPlaceData()
  }, [selectedPlaceId])

  if (!placeDetails) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>Fetching place details...</Text>
      </View>
    )
  }

  function onOpenPlaceOnMap() {
    navigation.navigate("Map", {
      latitude: placeDetails.location.latitude,
      longitude: placeDetails.location.longitude,
    });
  }

  return (
    <ScrollView>
      <Image source={{ uri: placeDetails.imageUri }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{placeDetails.address}</Text>
        </View>
        <OutlinedButton
          icon="map"
          onPressHandler={onOpenPlaceOnMap}
        >
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  )
}