import { BaseModel } from "./base.model";
import { Weather } from "../types";

// if connecting this API to a datastore, this model would be the place to handle queries, inserts, etc.
export default class WeatherModel extends BaseModel {
  // get weather for city: name
  async get(name: string): Promise<Weather> {
    return {
      city: name,
      current: {
        temp: 9.5,
        desc_short: 'Cloudy',
        desc_long: 'Cloudy with a chance of meatballs',
        owm_icon: 'http://openweathermap.org/img/wn/10d@2x.png',
      },
    };
  }
}
