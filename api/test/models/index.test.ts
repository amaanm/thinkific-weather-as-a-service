import 'mocha';

import assert from 'assert';
import express from 'express';
import models from '../../src/models';

describe('model setup function', () => {
  it('should register models on given app object', () => {
    const app = express();

    assert.strictEqual(app.get('models'), undefined);

    // register routers
    models(app);

    assert.ok(app.get('models'));
  });
});