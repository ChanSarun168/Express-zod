import express, { Request, Response, NextFunction } from "express";
import { userController } from "../controllers/userController";
import { validateUserData } from "../middlewares/userValidation";
import userSchema from "../schemas/userSchema";
import { validateMongooseId } from "../middlewares/validationId";

export const userRouter = express.Router();

// getAll
userRouter.get("/", userController.getAll);

// CrateUser
userRouter.post(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    validateUserData(req, res, next, userSchema);
  },
  userController.createUser
);

// getUserById
userRouter.get("/:userId", validateMongooseId, userController.getById);

// updateUser
userRouter.put(
  "/:userId",
  validateMongooseId,
  (req: Request, res: Response, next: NextFunction) => {
    validateUserData(req, res, next, userSchema);
  },
  userController.updateUser
);
