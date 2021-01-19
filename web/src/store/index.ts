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
}

// root state
export const state: State = {
  cities: [],
  weather: null,
  user: null,
};
export const mutations = {
  setCities: (state: State, cities: City[]) => {
    state.cities = cities;
  },
  setWeather: (state: State, weather: Weather) => {
    state.weather = weather;
  },
};
export const actions = {
  async getAllCities(context: ActionContext<State, State>) {
    const cities: City[] = (await API.cities.list()).data;
    context.commit('setCities', cities);
  },
  async getCityWeather(context: ActionContext<State, State>, city: string) {
    const weather: Weather = (await API.weather.get(city)).data;
    context.commit('setWeather', weather);
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
  },
});
