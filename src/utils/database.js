import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

const database = SQLite.openDatabase("places.db");

export function initDatabase() {
  const transactionPromise = new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          latitude REAL NOT NULL,
          longitude REAL NOT NULL
        )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return transactionPromise;
}

export function insertPlace(place) {
  const insertTransaction = new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `INSERT INTO places (
          title,
          imageUri,
          address,
          latitude,
          longitude
        ) VALUES (
          ?,
          ?,
          ?,
          ?,
          ?
        )`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.latitude,
          place.location.longitude,
        ],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });

  return insertTransaction;
}

export function fetchPlaces() {
  const fetchPlacesPromise = new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => {
          const mappedPlaces = result.rows._array.map(
            (item) =>
              new Place(
                item.title,
                item.imageUri,
                item.address,
                {
                  latitude: item.latitude,
                  longitude: item.longitude,
                },
                item.id
              )
          );

          resolve(mappedPlaces);
        },
        (_, error) => reject(error)
      );
    });
  });

  return fetchPlacesPromise;
}

export function fetchPlaceById(id) {
  return new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `SELECT * FROM places WHERE id = ?`,
        [id],
        (_, result) => {
          const sqlResult = result.rows._array[0];
          const place = new Place(
            sqlResult.title,
            sqlResult.imageUri,
            sqlResult.address,
            {
              latitude: sqlResult.latitude,
              longitude: sqlResult.longitude,
            },
            sqlResult.id
          );

          resolve(place);
        },
        (_, error) => reject(error)
      );
    });
  });
}
