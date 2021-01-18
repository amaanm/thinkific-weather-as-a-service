import 'mocha';
import { expect } from 'chai';
import { agent as request } from 'supertest';

import app from '../../src/app';

describe('weather controller', () => {
  describe('find', () => {
    it('should throw an error if no city query provided', (done) => {
      request(app)
        .get('/v1/weather')
        .expect(400, done);
    });
    it('should return a weather object', async () => {
      const res = await request(app).get('/v1/weather?city=Vancouver');

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.city).to.equal('Vancouver');
    });
  });
});