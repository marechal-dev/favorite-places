import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import { PlacesList } from "../components/Places/PlacesList";

import { fetchPlaces } from "../utils/database"

export function AllPLaces() {
  const [places, setPlace] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadPlaces = async () => {
      const result = await fetchPlaces();

      setPlace(result)
    }

    if (isFocused) {
      loadPlaces()
    }
  }, [isFocused]);

  return <PlacesList places={places} />
}
