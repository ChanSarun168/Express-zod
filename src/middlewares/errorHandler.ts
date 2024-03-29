import { Request, Response, NextFunction } from "express";
import { BaseCustomError } from "../utils/customError";

// Global error handler middleware
function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Default to 500 if no status code is set
  //res to client
  if (err instanceof BaseCustomError) {
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
    });
  }
  next();
}

export default errorHandler;
