import { StyleSheet, View, Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons"
import { colors } from "../../theme/colors";

const styles = StyleSheet.create({
  pressableContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primary500,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: colors.primary500,
  },
})

export function OutlinedButton({ icon, onPressHandler, children }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.pressableContainer,
        pressed && styles.pressed,
      ]}
      onPress={onPressHandler}
    >
      <Ionicons
        style={styles.icon}
        name={icon}
        size={18}
        color={colors.primary500}
      />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  )
}