import assert from 'assert';
import app from '../src/app';

describe('top level app', () => {
  it('should set a port', () => {
    assert.ok(app.get('PORT'));
  });
});