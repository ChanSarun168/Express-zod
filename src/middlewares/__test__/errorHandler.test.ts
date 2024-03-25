import { Request, Response, NextFunction } from "express";
import errorHandler from "../errorHandler";
import { BaseCustomError } from "../../utils/customError";

describe("errorHandler middleware", () => {
  it("should send error response with status code and message", () => {
    // Mock error object
    const err = new BaseCustomError("Test error message", 404);

    // Mock Request, Response, and NextFunction
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(), // Mock status method
      json: jest.fn(), // Mock json method
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    // Call errorHandler middleware
    errorHandler(err, req, res, next);

    // Check if status and json methods were called with correct arguments
     expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      statusCode: 404,
      message: "Test error message",
    });

    // Ensure next() is not called
    expect(next).toHaveBeenCalled();
  });

  it("should call next function if error is not an instance of BaseCustomError", () => {
    // Mock error object
    const err = new Error("Test error message");

    // Mock Request, Response, and NextFunction
    const req = {} as Request;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;  

    // Call errorHandler middleware
    errorHandler(err, req, res, next);

    // Ensure next() is called
    expect(next).toHaveBeenCalled();
  });
});
