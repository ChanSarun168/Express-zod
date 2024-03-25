import express, { Request, Response, NextFunction } from "express";
import { userController } from "../controllers/userController";
import { validateUserData } from "../middlewares/userValidation";
import userSchema from "../schemas/userSchema";
import { validateMongooseId } from "../middlewares/validationId";

export const userRouter = express.Router();

// getAll
userRouter.get("/", userController.getAll);

// CrateUser
userRouter.post("/", validateUserData(userSchema), userController.createUser);

// getUserById
userRouter.get("/:userId", validateMongooseId, userController.getById);

// updateUser
userRouter.put("/:userId",validateMongooseId,validateUserData(userSchema),userController.updateUser);

// deleteUser
userRouter.delete("/:userId", validateMongooseId, userController.deleteById);
