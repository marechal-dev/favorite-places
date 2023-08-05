import { useState } from "react";
import { StyleSheet, View, Text, Button, Alert, Image } from "react-native";
import { useCameraPermissions, launchCameraAsync, PermissionStatus } from "expo-image-picker"
import { colors } from "../../theme/colors";
import { OutlinedButton } from "../UI/OutlinedButton";

const styles = StyleSheet.create({
  container: {},
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
})

export function ImagePicker({ onImagePicked }) {
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions()
  const [pickedPhoto, setPickedPhoto] = useState("")

  async function verifyCameraPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant camera permissions to use this app."
      );

      return false;
    }

    return true;
  }

  async function onTakePicture() {
    const permissionIsGranted = await verifyCameraPermissions();

    if (!permissionIsGranted) {
      return;
    }

    const photo = await launchCameraAsync({
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [16, 9],
      quality: 0.5,
    });

    const asset = photo.assets[0];

    setPickedPhoto(asset.uri);
    onImagePicked(asset.uri);
  }

  return (
    <View>
      <View style={styles.imagePreview}>
        {
          !pickedPhoto ?
            <Text>No picture taken yet...</Text> :
            <Image
              style={styles.image}
              source={{
                uri: pickedPhoto
              }}
            />
        }
      </View>
      <OutlinedButton
        icon="camera"
        onPressHandler={onTakePicture}
      >
        Take Picture
      </OutlinedButton>
    </View>
  )
}
