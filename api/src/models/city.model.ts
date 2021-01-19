import { BaseModel } from "./base.model";
import { City } from "../types";

// if connecting this API to a datastore, this model would be the place to handle queries, inserts, etc.
export default class CityModel extends BaseModel {
  // list all of the records
  async find(name?: string) {
    const cities: City[] = [
      { _id: '1', name: 'Vancouver' },
      { _id: '2', name: 'Paris' },
      { _id: '3', name: 'Sydney' },
    ];

    if (name) {
      const city = cities.find(city => city.name == name);
      if (city) {
        return city;
      } else {
        return null;
      }
    } else {
      return cities;
    }
  }
}
