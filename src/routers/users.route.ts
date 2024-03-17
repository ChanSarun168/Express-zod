import express from "express";
import { userController } from "../controllers/userController";
import { validateUserData } from "../middlewares/userValidation"


export const userRouter = express.Router();

userRouter.post('/',validateUserData,userController.createUser);