export class Place {
  id = 1;
  title = "";
  imageUri = "";
  address = "";
  location = {
    latitude: 0.0,
    longitude: 0.0,
  };

  /**
   * @constructor
   *
   * @param {string} title
   * @param {string} imageUri
   * @param {string} address
   * @param {{ latitude: number, longitude: number }}
   * @param {number} id
   */
  constructor(title, imageUri, address, location, id) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location;
    this.id = id;
  }
}
