import { NextFunction, Request, Response } from 'express';
import { BaseCustomError } from '../utils/customError';
import z, { ZodError } from 'zod'


// Middleware function for validating user data using Zod schema
export const validateUserData = (req: Request, res: Response, next: NextFunction , ValidatinSchema:z.ZodObject<any, any>) => {
  try {
    ValidatinSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      // If it's a ZodError, handle it properly
      const errorMessages = error.errors.map(err => err.message); // Extract error messages
      const customError = new BaseCustomError( errorMessages, 400);
      console.error('Validation Error:', error.errors); // Log the validation error
      next(customError);
    } else {
      // If it's another type of error, handle it accordingly
      console.error('Unknown Error:', error); // Log the unknown error
      next(error);
    }
  }
};
