import 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';

import { errorHandler } from '../../src/middleware/error-handler';
import { NextFunction, Request, Response } from 'express';

describe('Application error handler', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;
  let handler = errorHandler();
  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      code: null,
      status (status) {
        this.code = status
        return this
      },
      json: sinon.fake(),
    };
    nextFunction = sinon.fake();
  });

  it('should send string errors as 500', () => {
    handler('test', mockRequest, mockResponse, nextFunction);
    expect(mockResponse.code).to.equal(500);
    expect(mockResponse.json.calledWith({error: 'test'})).to.be.true;
  });

  it('should handle object errors', () => {
    handler({message: 'test'}, mockRequest, mockResponse, nextFunction);
    expect(mockResponse.code).to.equal(500);
    expect(mockResponse.json.calledWith({error: 'test'})).to.be.true;
  });

  it('should handle object errors with code', () => {
    handler({message: 'test', code: 404}, mockRequest, mockResponse, nextFunction);
    expect(mockResponse.code).to.equal(404);
    expect(mockResponse.json.calledWith({error: 'test'})).to.be.true;
  });

  it('should handle object errors without message', () => {
    const err = {test: 'test', code: 404};
    handler(err, mockRequest, mockResponse, nextFunction);
    expect(mockResponse.code).to.equal(404);
    expect(mockResponse.json.calledWith({error: err.toString()})).to.be.true;
  });

  it('should handle other types', () => {
    const err = 123;
    handler(err, mockRequest, mockResponse, nextFunction);
    expect(mockResponse.code).to.equal(500);
    expect(mockResponse.json.calledWith({error: err.toString()})).to.be.true;
  });
});