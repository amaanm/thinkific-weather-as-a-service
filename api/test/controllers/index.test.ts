import 'mocha';

import assert from 'assert';
import express from 'express';
import controllers from '../../src/controllers';

describe('controller setup function', () => {
  it('should register controllers on given app object', () => {
    const app = express();

    assert.strictEqual(app._router, undefined);

    // register routers
    controllers(app);

    assert.ok(app._router.stack);
  });
});