import { Response, Request, NextFunction } from "express";
import { UserModel } from "../database/models/userModel";
import { BaseCustomError } from "../utils/customError";
import { StatusCode } from "../utils/consts";
import { UserService } from "../services/userService";

export const userController = {
  getAll: async function (req: Request, res: Response, next: NextFunction) {

    const userService = new UserService();

    try {
      const users = await userService.getAllUser();
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

    const userService = new UserService();

    try {
      const User = await userService.getById(req.params.userId);
      res.json({ status: "success", message: "User found!!!", data: User });
    } catch {
      const customError = new BaseCustomError(
        "Server Error",
        StatusCode.InternalServerError
      );
      next(customError);
    }
  },

  createUser: async function (req: Request, res: Response, next: NextFunction) {

    const userService = new UserService();

    try {
      const { username, email, password } = req.body;
      const newUser = await userService.addUser({ username, email, password });
      res.status(201).json(newUser);
    } catch {
      const customError = new BaseCustomError("Failed to create user.", 500);
      next(customError);
    }
  },

  updateUser: async function (req: Request, res: Response, next: NextFunction) {

    const userService = new UserService();
    
    try {
      const { username, email, password } = req.body;
      const id = req.params.userId;

      const user = await userService.updateUser(id, {
        username,
        email,
        password,
      });
        res.json({ status: "success", message: "User updated!!!", data: user });
    } catch (error:unknown | any) {
      next(new BaseCustomError(error.message, error.statusCode));
    }
  },

  deleteById: async function (req: Request, res: Response, next: NextFunction) {

    const userService = new UserService();

    try {
      await userService.deleteUser(req.params.userId);
      res.json({ status: "success", message: "User deleted successfully!" });
    } catch (error:unknown | any) {
      next(new BaseCustomError(error.message, error.statusCode));
    }
  },

};
