import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { BaseCustomError } from "../utils/customError";
import { StatusCode } from "../utils/consts";


const validateMongooseId = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { userId } = req.params;

  if (!mongoose.isValidObjectId(userId)) {
    const customError = new BaseCustomError('id Invalide', StatusCode.NotFound);
    return _next(customError);
  }
  _next();
};

export { validateMongooseId };
