import 'mocha';
import { expect } from 'chai';
import { agent as request } from 'supertest';

import app from '../../src/app';
import { sign } from 'jsonwebtoken';

describe('users controller', () => {
  it('should not create invalid user', (done) => {
    request(app)
      .post('/v1/users')
      .send({ username: 'test' })
      .expect(400, done);
  });

  it('should create user', (done) => {
    request(app)
      .post('/v1/users')
      .send({ username: 'test', password: 'test' })
      .expect(201, done);
  });

  it('should not create duplicate username', (done) => {
    request(app)
      .post('/v1/users')
      .send({ username: 'test', password: 'test' })
      .expect(500, done);
  });

  it('should throw an error if auth does not match username', (done) => {
    const token = sign({ username: 'test' }, process.env.JWT_SECRET);
    request(app)
      .set('Authorization', 'Bearer ' + token)
      .get('/v1/users/test1')
      .expect(403, done);
  });

  it('should throw an error if auth does not match username (patch)', (done) => {
    const token = sign({ username: 'test' }, process.env.JWT_SECRET);
    request(app)
      .set('Authorization', 'Bearer ' + token)
      .patch('/v1/users/test1')
      .expect(403, done);
  });

  it('should return user', (done) => {
    const token = sign({ username: 'test' }, process.env.JWT_SECRET);
    request(app)
      .set('Authorization', 'Bearer ' + token)
      .get('/v1/users/test')
      .expect(200, done);
  });

  describe('authentication', () => {
    it('should fail if no password', (done) => {
      const token = sign({ username: 'test' }, process.env.JWT_SECRET);
      request(app)
        .set('Authorization', 'Bearer ' + token)
        .post('/v1/users/auth')
        .send({ username: 'test', password: '' })
        .expect(400, done);
    });

    it('should fail if bad password', (done) => {
      const token = sign({ username: 'test' }, process.env.JWT_SECRET);
      request(app)
        .set('Authorization', 'Bearer ' + token)
        .post('/v1/users/auth')
        .send({ username: 'test', password: '123' })
        .expect(401, done);
    });

    it('should fail if bad user', (done) => {
      const token = sign({ username: 'test' }, process.env.JWT_SECRET);
      request(app)
        .set('Authorization', 'Bearer ' + token)
        .post('/v1/users/auth')
        .send({ username: 'test123', password: '123' })
        .expect(401, done);
    });

    it('should succeed on good auth', (done) => {
      const token = sign({ username: 'test' }, process.env.JWT_SECRET);
      request(app)
        .set('Authorization', 'Bearer ' + token)
        .post('/v1/users/auth')
        .send({ username: 'test', password: 'test' })
        .expect(200, done);
    });
  });

  it('should modify user', (done) => {
    const token = sign({ username: 'test' }, process.env.JWT_SECRET);
    request(app)
      .set('Authorization', 'Bearer ' + token)
      .patch('/v1/users/test')
      .send({ favouriteCity: 'Vancouver' })
      .expect(200)
      .then((res) => {
        expect(res.body.favouriteCity).to.equal('Vancouver');
        done();
      });
  });
});