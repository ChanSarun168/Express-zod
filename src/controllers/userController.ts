import { Response, Request, NextFunction } from "express";
import { UserModel } from "../models/userModel";
import { BaseCustomError } from "../utils/customError";

export const userController = {
  getAll: async function (req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserModel.find({});
      if (users) {
        res.status(200).json({
          status: "success",
          message: "users list found!!!",
          data: users,
        });
      } else {
        next(Error("users list not found!!!"));
      }
    } catch {
      const customError = new BaseCustomError("Failed to open user list", 500);
      console.log(customError.statusCode);
      next(customError);
    }
  },

  getById: async function (req: Request, res: Response, next: NextFunction) {
    const RouteId = req.params.userId; // Assuming the route parameter is userId
    try {
      const User = await UserModel.findById(RouteId);
      if (User) {
        res.json({ status: "success", message: "User found!!!", data: User });
      } else {
        const customError = new BaseCustomError("id Not found", 404);
        next(customError);
      }
    } catch {
      const customError = new BaseCustomError("Server Error", 500);
      next(customError);
    }
  },
  createUser: async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password } = req.body;
      const newUser = new UserModel({ username, email, password });
      await newUser.save();
      res.status(201).json(newUser);
    } catch {
      const customError = new BaseCustomError("Failed to create user.", 500);
      console.log(customError.statusCode);
      next(customError);
    }
  },
  updateUser: async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password } = req.body;
      const user = await UserModel.findByIdAndUpdate(
        req.params.userId,
        {
          username,
          email,
          password,
        },
        { new: true } // To return the updated document
      );
      if (user) {
        res.json({ status: "success", message: "User updated!!!", data: user });
      } else {
        const customError = new BaseCustomError("id Not found", 404);
        next(customError);
      }
    } catch {
      const customError = new BaseCustomError("Server Error", 500);
      next(customError);
    }
  },
};
