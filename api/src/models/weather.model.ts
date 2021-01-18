import { BaseModel } from "./base.model";

export interface Weather {
  city: string,
  current: {
    temp: number,
    desc_short: string,
    desc_long: string,
    owm_icon?: string,
  },
};

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
      },
    };
  }
}
