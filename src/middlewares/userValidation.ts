import { NextFunction, Request, Response } from 'express';
import z from 'zod';
import { BaseCustomError } from './validationId';

// Define the Zod schema for user data validation
const userValidationSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

// Middleware function for validating user data using Zod schema
export const validateUserData = (req: Request, res: Response, next: NextFunction) => {
  try {
    userValidationSchema.parse(req.body);
    next();
  } catch {
    const customError = new BaseCustomError('Wrong Schema', 404);
    console.log(customError.statusCode)
    next(customError);
  }
};
