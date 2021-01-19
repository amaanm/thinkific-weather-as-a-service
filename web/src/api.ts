/* eslint prefer-template: 0 */
import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:3000/v1/';

export default {
  cities: {
    list() {
      return axios.get(API_URL + 'cities');
    },
  },
  weather: {
    get(name: string) {
      return axios.get(API_URL + 'weather?city=' + name);
    },
  },
};
