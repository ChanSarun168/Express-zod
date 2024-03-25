import { UserModel } from "../models/userModel";
import { BaseCustomError } from "../../utils/customError";
import mongoose from "mongoose";

export class UserRepo {

  async createUser(user: any): Promise<any> {
    const userModelInstance = new UserModel( user);
    return await userModelInstance.save();
  }
 
  async getById(id: string): Promise<any> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
      const user = await UserModel.findById(id);
      if(!user){
        const customError = new BaseCustomError('User not found. Please check the provided ID.', 404); // Create custom error
        throw customError;
      }
      return user;
  }

  async getall():Promise<any>{
    return await UserModel.find({});
  }

  
  async updateById(id:string,users:object):Promise<any>{
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    const user = await UserModel.findByIdAndUpdate(id, users, { new: true });
    if (!user) {
      const customError = new BaseCustomError('User not found. Please check the provided ID.', 404); // Create custom error
      throw customError; // Throw the custom error if user is not found
    }
    return user;
  }

  async deleteById(userId: string): Promise<any> {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return null;
    }
    const deletedUser = await UserModel.findByIdAndDelete(userId);
    if(!deletedUser){
      const customError = new BaseCustomError('User not found. Please check the provided ID.', 404); // Create custom error
      throw customError;
    }
    return deletedUser;
  }
}
 