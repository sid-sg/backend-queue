import { Request, Response, NextFunction } from 'express';
import { signupMiddleware, loginMiddleware } from '../../src/middlewares/userSchemaValidation';

describe('User Schema Validation Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {
      body: {}
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    nextFunction = jest.fn();
  });

  describe('Signup Validation', () => {
    it('should pass valid signup data', () => {
      mockRequest.body = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        plainPassword: 'ValidPass123!'
      };

      signupMiddleware(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(nextFunction).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should reject invalid email', () => {
      mockRequest.body = {
        email: 'invalid-email',
        firstName: 'John',
        lastName: 'Doe',
        plainPassword: 'ValidPass123!'
      };

      signupMiddleware(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalled();
    });
  });

  describe('Login Validation', () => {
    it('should pass valid login data', () => {
      mockRequest.body = {
        email: 'test@example.com',
        plainPassword: 'ValidPass123!'
      };

      loginMiddleware(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(nextFunction).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should reject missing password', () => {
      mockRequest.body = {
        email: 'test@example.com'
      };

      loginMiddleware(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalled();
    });
  });
});
