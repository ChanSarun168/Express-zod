import { NextFunction, Request, Response } from 'express';
import { BaseCustomError } from './validationId';


// Middleware function for validating user data using Zod schema
export const validateUserData = (req: Request, res: Response, next: NextFunction , ValidatinSchema:any) => {
  try {
    ValidatinSchema.parse(req.body);
    next();
  } catch {
    const customError = new BaseCustomError('Wrong Schema', 404);
    console.log(customError.statusCode)
    next(customError);
  }
};
