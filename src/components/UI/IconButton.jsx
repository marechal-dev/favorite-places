import { StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons"

const styles = StyleSheet.create({
  button: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  pressed: {
    opacity: 0.7,
  },
})

export function IconButton({ icon, size, color, onPressHandler }) {
  return (
    <Pressable
      style={
        ({ pressed }) => [
          styles.button,
          pressed && styles.pressed,
        ]
      }
      onPress={onPressHandler}>
      <Ionicons
        name={icon}
        size={size}
        color={color}
      />
    </Pressable>
  )
}