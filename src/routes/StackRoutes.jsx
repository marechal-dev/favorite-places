import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { colors } from "../theme/colors"

import { AllPLaces } from "../screens/AllPlaces";
import { AddPlace } from "../screens/AddPlace";
import { Map } from "../screens/Map";
import { PlaceDetails } from "../screens/PlaceDetails";

import { IconButton } from "../components/UI/IconButton";

const Stack = createNativeStackNavigator()

export function StackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary500
        },
        headerTintColor: colors.gray700,
        contentStyle: {
          backgroundColor: colors.gray700,
        },
      }}
    >
      <Stack.Screen
        name="AllPlaces"
        options={({ navigation }) => ({
          title: "Your Favorite Places",
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="add"
              size={28}
              color={tintColor}
              onPressHandler={() => navigation.navigate("AddPlace")}
            />
          ),
        })}
        component={AllPLaces}
      />

      <Stack.Screen
        name="AddPlace"
        options={{
          title: "Add a new Place"
        }}
        component={AddPlace}
      />

      <Stack.Screen
        name="Map"
        component={Map}
      />

      <Stack.Screen
        name="PlaceDetails"
        options={{
          title: "Loading Place Details...",
        }}
        component={PlaceDetails}
      />
    </Stack.Navigator>
  )
}