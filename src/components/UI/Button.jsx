import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../../theme/colors";

const styles = StyleSheet.create({
  pressableContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    backgroundColor: colors.primary800,
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
    opacity: 0.7,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: colors.primary50,
  },
})

export function Button({ onPressHandler, children }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.pressableContainer,
        pressed && styles.pressed
      ]}
      onPress={onPressHandler}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  )
}