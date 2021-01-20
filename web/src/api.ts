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
  users: {
    create(username: string, password: string) {
      return axios.post(API_URL + 'users', {
        username,
        password,
      });
    },
    auth(username: string, password: string) {
      return axios.post(API_URL + 'users/auth', {
        username,
        password,
        strategy: 'local',
      });
    },
    update(username: string, payload: any, token: string) {
      return axios.patch(API_URL + 'users/' + username, payload, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    },
  },
};
