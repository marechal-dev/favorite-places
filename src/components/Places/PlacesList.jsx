import { StyleSheet, View, Text, FlatList } from "react-native";
import { PlaceItem } from "./PlaceItem";
import { colors } from "../../theme/colors";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: colors.primary200,
  },
  list: {
    margin: 24,
  }
})

export function PlacesList({ places }) {
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>You have no favorite places... (yet)</Text>
      </View>
    )
  }

  const navigation = useNavigation();

  const navigateToPlaceDetails = (id) => {
    navigation.navigate("PlaceDetails", {
      placeId: id,
    })
  }
  const placeKeyExtractor = (place) => place.id
  const renderPlaceItem = ({ item }) => (
    <PlaceItem
      place={item}
      onSelect={() => navigateToPlaceDetails(item.id)}
    />
  );

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={placeKeyExtractor}
      renderItem={renderPlaceItem}
    />
  )
}
