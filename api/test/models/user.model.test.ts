import 'mocha';
import { expect } from 'chai';

import UserModel from '../../src/models/user.model';
import express from 'express';
import { User } from '../../src/types';

describe('User model', () => {
  let app;
  let User: UserModel;
  before(() => {
    app = express();
    User = new UserModel(app);
  });
  beforeEach(() => {
    User = new UserModel(app);
  });

  it('return null if no user found', async () => {
    const user = await User.get('');
    
    expect(user).to.be.undefined;
  });

  it('should create user with hashed password', async () => {
    const user = { username: 'test', password: 'test' };

    const newUser = await User.create(user);

    expect(user.username).to.equal(newUser.username);
    expect(user.password).not.to.equal('test');
  });

  it('should not allow duplicate user', (done) => {
    const user = { username: 'test', password: 'test' };

    User.create(user).then(() => {
      User.create(user).then(() => {
        // shouldn't get here
        done('Duplicate user creation succeeded');
      }).catch((e) => {
        done();
      });
    }).catch(() => {
      done('First create should succeed');
    });
  });

  it('should update user', async () => {
    const user: User = { username: 'test', password: 'test' };

    await User.create(user);

    user.favouriteCity = 'Vancouver';
    await User.update(user.username, user);

    const updated = await User.get(user.username);

    expect(updated.favouriteCity).to.equal('Vancouver');
  });
});