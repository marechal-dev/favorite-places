import { useCallback, useState } from "react";
import { StyleSheet, View, ScrollView, Text, TextInput } from "react-native";

import { colors } from "../../theme/colors";

import { ImagePicker } from "./ImagePicker";
import { LocationPicker } from "./LocationPicker";
import { Button } from "../UI/Button";

import { Place } from "../../models/place"

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    color: colors.primary500,
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary700,
    backgroundColor: colors.primary100,
  },
})

export function PlaceForm({ onCreatePlace }) {
  const [enteredTitle, setEnteredTitle] = useState("")
  const [pickedPhoto, setPickedPhoto] = useState()
  const [pickedLocation, setPickedLocation] = useState()

  function onChangeTitle(text) {
    setEnteredTitle(text)
  }

  function onImagePicked(imageUri) {
    setPickedPhoto(imageUri)
  }
  
  const onLocationPicked = useCallback((location) => {
    setPickedLocation(location)
  }, [])

  function handleSavePlace() {
    const place = new Place(
      enteredTitle,
      pickedPhoto,
      pickedLocation.address,
      {
        latitude: pickedLocation.latitude,
        longitude: pickedLocation.longitude,
      },
    );

    onCreatePlace(place);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>LABEL</Text>
        <TextInput
          style={styles.input}
          value={enteredTitle}
          onChangeText={onChangeTitle}
        />
        <ImagePicker onImagePicked={onImagePicked} />
        <LocationPicker onLocationPicked={onLocationPicked} />
        <Button onPressHandler={handleSavePlace}>Add Place</Button>
      </View>
    </ScrollView>
  )
}