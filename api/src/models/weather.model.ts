import { BaseModel } from "./base.model";
import { Weather } from "../types";
import axios from 'axios';

// if connecting this API to a datastore, this model would be the place to handle queries, inserts, etc.
export default class WeatherModel extends BaseModel {
  // get weather for city: name
  async get(name: string): Promise<Weather> {
    const defaultData = {
      city: name,
      current: {
        temp: 9.5,
        descShort: 'Cloudy',
        descLong: 'Cloudy with a chance of meatballs',
        owmIcon: 'http://openweathermap.org/img/wn/10d@2x.png',
      },
    };

    if (process.env.test) {
      return defaultData;
    }

    try {
      const req = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.OWM_API_KEY}`);
      const owm = req.data;
      const weather: Weather = {
        city: `${owm.name}, ${owm.sys.country}`,
        current: {
          descShort: owm.weather[0].main,
          descLong: owm.weather[0].description,
          owmIcon: `http://openweathermap.org/img/wn/${owm.weather[0].icon}@2x.png`,
          temp: owm.main.temp - 273.15, // kelvin to degrees celcius
        },
      };

      return weather;
    } catch (e) {
      throw new Error('Cannot find that city');
    }
  }
}
