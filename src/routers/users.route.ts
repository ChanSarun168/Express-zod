import express, { Request, Response, NextFunction } from "express";
import { userController } from "../controllers/userController";
import { validateUserData } from "../middlewares/userValidation";
import userSchema from "../schemas/userSchema";

export const userRouter = express.Router();

userRouter.post(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    validateUserData(req, res, next, userSchema);
  },
  userController.createUser
);
