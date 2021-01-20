import { BaseModel } from './base.model';
import { User } from '../types';
import { Application } from 'express';
import bcrypt from 'bcrypt';

// if connecting this API to a datastore, this model would be the place to handle queries, inserts, etc.
export default class UserModel extends BaseModel {
  private users: User[] = [];

  async get(username: string) {
    return this.users.find(user => user.username == username);
  }

  async create(user: User) {
    if (await this.get(user.username)) {
      throw new Error('username already taken');
    }

    this.users.push(await this.hashPassword(user));

    return await this.get(user.username);
  }

  async update(username: string, user: User, changePw: boolean = true) {
    const i = this.users.findIndex(u => u.username == username);
    if (i > -1) {
      this.users[i] = changePw ? await this.hashPassword(user) : user;
    }
    return this.users[i];
  }

  async hashPassword(user: User) {
    user.password = await bcrypt.hash(user.password, 10);
    return user;
  }
}
