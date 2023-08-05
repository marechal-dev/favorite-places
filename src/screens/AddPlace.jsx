import { PlaceForm } from "../components/Places/PlaceForm";

import { insertPlace } from "../utils/database"

export function AddPlace({ navigation }) {
  async function handleCreatePlace(place) {
    await insertPlace(place);
    navigation.navigate("AllPlaces");
  }

  return (
    <PlaceForm onCreatePlace={handleCreatePlace} />
  )
}