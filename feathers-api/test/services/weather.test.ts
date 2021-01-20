import assert from 'assert';
import { resolve } from 'path';
import app from '../../src/app';

describe('\'weather\' service', () => {
  it('registered the service', () => {
    const service = app.service('weather');

    assert.ok(service, 'Registered the service');
  });

  it('returns notimplemented', (done) => {
    const service = app.service('weather');

    Promise.all([
      new Promise((resolve) => service.get(123).then().catch((e) => { assert.strictEqual(e.code, 501); resolve() })),
      new Promise((resolve) => service.create({}).then().catch((e) => { assert.strictEqual(e.code, 501); resolve() })),
      new Promise((resolve) => service.update(123, {}).then().catch((e) => { assert.strictEqual(e.code, 501); resolve() })),
      new Promise((resolve) => service.patch(123, {}).then().catch((e) => { assert.strictEqual(e.code, 501); resolve() })),
      new Promise((resolve) => service.remove(123).then().catch((e) => { assert.strictEqual(e.code, 501); resolve() })),
    ]).then(() => { done(); });
  });

  it('throws if no city query', (done) => {
    app.service('weather').find({
      query: {},
    }).then().catch((e) => { assert.strictEqual(e.code, 400); done() });
  });

  it('finds weather for city', async () => {
    const weather = await app.service('weather').find({
      query: { city: 'Vancouver' },
    });
    assert.ok(weather);
  });
});
