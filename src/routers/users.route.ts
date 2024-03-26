import express from 'express';
import { UserController } from '../controllers/userController';
import { BaseCustomError } from '../utils/customError';
import { StatusCode } from '../utils/consts';
import { UserModel } from '../database/models/userModel';
import { validateUserData } from '../middlewares/userValidation';
import { validateMongooseId } from '../middlewares/validationId';
import userSchema from '../schemas/userSchema';

export const userRouter = express.Router();
const userController = new UserController();

// getAll
userRouter.get('/', async (_req, res, next) => {
  try {
    const users: typeof UserModel[] = await userController.getAll();
    if (users.length > 0) {
      res.status(200).json({ status: 'success', message: 'Users list found!!!', data: users });
    } else {
      throw new BaseCustomError('Users list not found!!!', StatusCode.NotFound);
    }
  } catch (error) {
    next(error);
  }
});

// CreateUser
userRouter.post('/', validateUserData(userSchema), async (req, res, next) => {
  try {
    const newUser: typeof UserModel = await userController.createUser(req); // Correctly use typeof UserModel
    res.status(201).json({ status: 'success', message: 'User created!!!', data: newUser });
  } catch (error) {
    next(error);
  }
});

// getUserById
userRouter.get('/:userId', validateMongooseId, async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user: typeof UserModel | null = await userController.getById(userId); // Correctly use typeof UserModel
    if (user) {
      res.status(200).json({ status: 'success', message: 'User found!!!', data: user });
    } else {
      throw new BaseCustomError('User not found!!!', StatusCode.NotFound);
    }
  } catch (error) {
    next(error);
  }
});

// updateUser
userRouter.put('/:userId', validateMongooseId, validateUserData(userSchema), async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const updatedUser: typeof UserModel | null = await userController.updateUser(userId, req); // Correctly use typeof UserModel
    if (updatedUser) {
      res.status(200).json({ status: 'success', message: 'User updated!!!', data: updatedUser });
    } else {
      throw new BaseCustomError('User not found!!!', StatusCode.NotFound);
    }
  } catch (error) {
    next(error);
  }
});

// deleteUser
userRouter.delete('/:userId', validateMongooseId, async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await userController.deleteById(userId);
    res.status(200).json({ status: 'success', message: 'User deleted successfully!' });
  } catch (error) {
    next(error);
  }
});
