import 'mocha';
import { expect } from 'chai';

import CityModel from '../../src/models/city.model';
import express from 'express';

describe('City model', () => {
  let app;
  let City: CityModel;
  before(() => {
    app = express();
    City = new CityModel(app);
  });

  it('should return a list of cities', async () => {
    const cities = await City.find();
    
    expect(cities).to.be.an('array');
  });

  it('should return null if city not found', async () => {
    const cities = await City.find('badcityname');

    expect(cities).to.be.null;
  });

  it('should return a city', async () => {
    const cities = await City.find('Vancouver');

    expect(cities).to.be.an('object');
    expect(cities.name).to.equal('Vancouver');
  });
});