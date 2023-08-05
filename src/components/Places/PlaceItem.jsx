import { StyleSheet, Image, View, Pressable, Text } from "react-native";
import { colors } from "../../theme/colors";

const styles = StyleSheet.create({
  pressableContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: colors.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 2,
    borderRadius: 4,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
  },
  informationContainer: {
    flex: 2,
    padding: 12,
  },
  text: {
    color: colors.gray700,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  address: {
    fontSize: 12,
  },
})

export function PlaceItem({ place, onSelect }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.pressableContainer,
        pressed && styles.pressed,
      ]}
      onPress={onSelect}
    >
      <Image
        style={styles.image}
        source={{
          uri: place.imageUri,
        }}
      />
      <View style={styles.informationContainer}>
        <Text style={[styles.text, styles.title]}>{place.title}</Text>
        <Text style={[styles.text, styles.address]}>{place.address}</Text>
      </View>
    </Pressable>
  )
}