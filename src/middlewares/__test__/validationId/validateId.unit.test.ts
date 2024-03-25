import { Request, Response } from "express";
import mongoose from "mongoose";
import { validateMongooseId } from "../../validationId";
import { BaseCustomError } from "../../../utils/customError";
import { StatusCode } from "../../../utils/consts";

describe("validateMongooseId middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = {
      params: {
        userId: "validObjectId", // Valid ObjectId for testing
      },
    };
    res = {};
    next = jest.fn();
  });

  it("should call next function if ID is valid", () => {
    const isValidObjectIdMock = jest.spyOn(mongoose, "isValidObjectId");
    isValidObjectIdMock.mockReturnValueOnce(true);

    validateMongooseId(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledTimes(1);

    isValidObjectIdMock.mockRestore();
  });

  it("should call next function with custom error if ID is invalid", () => {
    const isValidObjectIdMock = jest.spyOn(mongoose, "isValidObjectId");
    isValidObjectIdMock.mockReturnValueOnce(false);

    validateMongooseId(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(
      new BaseCustomError("id Invalide", StatusCode.NotFound)
    );

    isValidObjectIdMock.mockRestore();
  });
});
