import { Request, Response } from 'express';
import { validateUserData } from '../../userValidation';
import { BaseCustomError } from '../../../utils/customError';
import z from 'zod';

describe('validateUserData middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = {
      body: {} // Initialize an empty body for each test case
    };
    res = {};
    next = jest.fn();
  });

  it('should call next function if user data is valid', () => {
    const userSchema = z.object({
      username: z.string().min(3,"Username must Input At least 3 Character"),
      email: z.string().email("Please Input In email Form"),
      password: z.string().min(6,"Password must Input At least 6 Characters").max(12,'Password contain only 12 characters'),
    });

    req.body = { username: 'john_doe', email: 'john@example.com', password: 'password123' }; // Valid user data

    const middleware = validateUserData(userSchema);

    middleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
  });

  it('should call next function with validation error if user data is invalid', () => {
    const userSchema = z.object({
      username: z.string().min(3,"Username must Input At least 3 Character"),
      email: z.string().email("Please Input In email Form"),
      password: z.string().min(6,"Password must Input At least 6 Characters").max(12,'Password contain only 12 characters'),
    });

    req.body = { username: 'jd', email: 'johnexample.com', password: 'pass' }; // Invalid user data

    const middleware = validateUserData(userSchema);

    middleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(new BaseCustomError([
      'Username must Input At least 3 Character',
      'Please Input In email Form',
      'Password must Input At least 6 Characters'
    ], 400));
  });

  it('should call next function with unknown error if ZodError is not caught', () => {
    const invalidSchema = z.object({
      name: z.string()
    });

    const userSchema = z.object({
      username: z.string().min(3,"Username must Input At least 3 Character"),
      email: z.string().email("Please Input In email Form"),
      password: z.string().min(6,"Password must Input At least 6 Characters").max(12,'Password contain only 12 characters'),
    });

    req.body = { username: 'john_doe', email: 'john@example.com', password: 'password123' }; // Valid user data

    const middleware = validateUserData(invalidSchema); // Passing invalid schema

    middleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0]).toBeInstanceOf(Error);
  });
});
