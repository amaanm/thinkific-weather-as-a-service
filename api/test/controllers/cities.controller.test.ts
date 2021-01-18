import 'mocha';
import { expect } from 'chai';
import { agent as request } from 'supertest';

import app from '../../src/app';

describe('cities controller', () => {
  describe('find', () => {
    it('should return a list of city objects', async () => {
      const res = await request(app).get('/v1/cities');

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body[0]).to.be.an('object');
      expect(res.body[0]._id).to.exist;
      expect(res.body[0].name).to.exist;
    });
  });
});