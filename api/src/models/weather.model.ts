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
        desc_short: 'Cloudy',
        desc_long: 'Cloudy with a chance of meatballs',
        owm_icon: 'http://openweathermap.org/img/wn/10d@2x.png',
      },
    };

    if (process.env.test) {
      return defaultData;
    }

    const owm = (await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.OWM_API_KEY}`)).data;
    const weather: Weather = {
      city: `${owm.name}, ${owm.sys.country}`,
      current: {
        desc_short: owm.weather[0].main,
        desc_long: owm.weather[0].description,
        owm_icon: `http://openweathermap.org/img/wn/${owm.weather[0].icon}@2x.png`,
        temp: owm.main.temp - 273.15, // kelvin to degrees celcius
      },
    };

    return weather;
  }
}
