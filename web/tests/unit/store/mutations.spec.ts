/* eslint @typescript-eslint/camelcase: 0 */
import { expect } from 'chai';
import { mutations, State } from '@/store';

describe('Mutations', () => {
  let state: State;

  beforeEach(() => {
    state = {
      cities: [],
      weather: null,
      user: null,
    };
  });

  describe('setCities', () => {
    it('should set cities', () => {
      mutations.setCities(state, [{ name: 'Vancouver', _id: '3' }]);

      expect(state.cities.length).to.equal(1);
    });
  });
  describe('weather', () => {
    it('should set weather', () => {
      const weather = { city: 'Vancouver', current: { temp: 10, desc_long: 'Light clouds', desc_short: 'Cloudy' } };
      mutations.setWeather(state, weather);

      expect(state.weather).to.deep.equal(weather);
    });
  });
});
