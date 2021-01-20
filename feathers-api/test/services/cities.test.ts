import assert from 'assert';
import app from '../../src/app';

describe('\'cities\' service', () => {
  it('registered the service', () => {
    const service = app.service('cities');

    assert.ok(service, 'Registered the service');
  });

  it('returns notimplemented', (done) => {
    const service = app.service('cities');

    Promise.all([
      new Promise((resolve) => service.get(123).then().catch((e) => { assert.strictEqual(e.code, 501); resolve() })),
      new Promise((resolve) => service.create({}).then().catch((e) => { assert.strictEqual(e.code, 501); resolve() })),
      new Promise((resolve) => service.update(123, {}).then().catch((e) => { assert.strictEqual(e.code, 501); resolve() })),
      new Promise((resolve) => service.patch(123, {}).then().catch((e) => { assert.strictEqual(e.code, 501); resolve() })),
      new Promise((resolve) => service.remove(123).then().catch((e) => { assert.strictEqual(e.code, 501); resolve() })),
    ]).then(() => { done(); });
  });

  it('returns cities', async () => {
    const cities = await app.service('cities').find({});
    assert.ok(cities);
    assert.ok(cities.length > 0);
  });
});
