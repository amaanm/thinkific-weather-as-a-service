/* eslint no-shadow: 0 */
import Vue from 'vue';
import Vuex, { ActionContext } from 'vuex';

import API from '../api';
import { City, User, Weather } from '../../../api/src/types';

Vue.use(Vuex);

// root state interface
export interface State {
  cities: City[];
  weather: Weather | null;
  user: User | null;
  token: string;
}

const storedUser = (window && window.localStorage) ? window.localStorage.getItem('tt-user') : null;

// root state
export const state: State = {
  cities: [],
  weather: null,
  user: storedUser ? JSON.parse(storedUser) : null,
  token: ((window && window.localStorage) ? window.localStorage.getItem('tt-token') : null) || '',
};
export const mutations = {
  setCities: (state: State, cities: City[]) => {
    state.cities = cities;
  },
  setWeather: (state: State, weather: Weather) => {
    state.weather = weather;
  },
  setUserAndToken: (state: State, payload: { user: User; token: string }) => {
    state.user = payload.user;
    state.token = payload.token;
  },
};
export const actions = {
  async getAllCities(context: ActionContext<State, State>) {
    try {
      const cities: City[] = (await API.cities.list()).data;
      context.commit('setCities', cities);
    } catch (e) {
      alert(e.response.data.error || e.response.data.message);
    }
  },
  async getCityWeather(context: ActionContext<State, State>, city: string) {
    try {
      const weather: Weather = (await API.weather.get(city)).data;
      context.commit('setWeather', weather);
    } catch (e) {
      alert(e.response.data.error || e.response.data.message);
    }
  },
  async authenticate(context: ActionContext<State, State>, payload: {
    username: string;
    password: string;
  }) {
    const { username, password } = payload;
    try {
      const { user, accessToken } = (await API.users.auth(username, password)).data;
      const token = accessToken;
      context.commit('setUserAndToken', {
        user,
        token,
      });

      if (window && window.localStorage) {
        window.localStorage.setItem('tt-user', JSON.stringify(user));
        window.localStorage.setItem('tt-token', token);
      }
    } catch (e) {
      alert(e.response.data.error || e.response.data.message);
    }
  },
  async setFavourite(context: ActionContext<State, State>, city: string) {
    if (context.state.user && context.state.token) {
      const { token } = context.state;
      const user = (await API.users.update(context.state.user.username, {
        favouriteCity: city,
      }, token)).data;

      context.commit('setUserAndToken', {
        user,
        token: context.state.token,
      });
      if (window && window.localStorage) {
        window.localStorage.setItem('tt-user', JSON.stringify(user));
      }
    }
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
  },
});
