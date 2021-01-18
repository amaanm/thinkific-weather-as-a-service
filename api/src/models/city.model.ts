import { BaseModel } from "./base.model";

export interface City {
  _id: string,
  name: string,
};

// if connecting this API to a datastore, this model would be the place to handle queries, inserts, etc.
export default class CityModel extends BaseModel {
  // list all of the records
  async find(name?: string) {
    const cities: City[] = [
      { _id: '1', name: 'Vancouver' },
      { _id: '2', name: 'Surrey' },
      { _id: '3', name: 'Richmond' },
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