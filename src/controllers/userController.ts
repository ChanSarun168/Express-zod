import { Response,Request, NextFunction } from "express";
import { UserModel } from "../models/userModel";
import { BaseCustomError } from "../middlewares/validationId";

export const userController = {
    getAll:function (req:Request , res:Response , next:NextFunction){

    },
    createUser:async function (req:Request , res:Response , next:NextFunction){
        try {
            const { username, email, password } = req.body;
            const newUser = new UserModel({ username, email, password });
            await newUser.save();
            res.status(201).json(newUser);
          } catch {
            const customError = new BaseCustomError('Failed to create user.', 500);
            console.log(customError.statusCode)
            next(customError);
          }
    }
} 