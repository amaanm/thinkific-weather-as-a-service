import 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { sign } from 'jsonwebtoken';

import { authOptional, authRequired } from '../../src/middleware/authenticate';
import { NextFunction, Request, Response } from 'express';

describe('Auth middlewares', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  const setup = () => {
    mockRequest = {
      headers: {},
    };
    mockResponse = {
      code: null,
      status(status) {
        this.code = status;
        return this;
      },
      json: sinon.fake(),
    };
    nextFunction = sinon.fake();
  };

  describe('authOptional', () => {
    beforeEach(setup);

    it('should allow unauthenticated access', () => {
      authOptional()(mockRequest, mockResponse, nextFunction);
      expect(nextFunction.calledWith()).to.be.true;
      expect(mockRequest.user).to.be.undefined;
    });

    it('should set user on successful JWT', () => {
      const token = sign({ username: 'test' }, process.env.JWT_SECRET);
      mockRequest.headers = {
        authorization: `Bearer ${token}`
      };

      authOptional()(mockRequest, mockResponse, nextFunction);
      expect(nextFunction.calledWith()).to.be.true;
      expect(mockRequest.user).to.be.an('object');
      expect(mockRequest.user.username).to.equal('test');
    });

    it('should not set user on invalid JWT', () => {
      const token = sign({ username: 'test' }, 'not the right secret');
      mockRequest.headers = {
        authorization: `Bearer ${token}`
      };

      authOptional()(mockRequest, mockResponse, nextFunction);
      expect(nextFunction.calledWith()).to.be.true;
      expect(mockRequest.user).to.be.undefined;
    });
  });

  describe('authRequired', () => {
    beforeEach(setup);

    it('should not allow access without header', () => {
      authRequired()(mockRequest, mockResponse, nextFunction);
      expect(mockResponse.code).to.equal(401);
    });

    it('should set user on successful JWT', () => {
      const token = sign({ username: 'test' }, process.env.JWT_SECRET);
      mockRequest.headers = {
        authorization: `Bearer ${token}`
      };

      authRequired()(mockRequest, mockResponse, nextFunction);
      expect(nextFunction.calledWith()).to.be.true;
      expect(mockRequest.user).to.be.an('object');
      expect(mockRequest.user.username).to.equal('test');
    });

    it('should not auth on invalid JWT', () => {
      const token = sign({ username: 'test' }, 'not the right secret');
      mockRequest.headers = {
        authorization: `Bearer ${token}`
      };

      authRequired()(mockRequest, mockResponse, nextFunction);
      expect(mockRequest.user).to.be.undefined;
      expect(mockResponse.code).to.equal(401);
    });
  });
});