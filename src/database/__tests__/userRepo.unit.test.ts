// unit test
import { UserRepo } from "../repository/userRepo";
import { UserModel } from "../models/userModel";

jest.mock("../models/userModel"); //clone mongo to use


describe("User Repo with Unit test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("getAllUsers should return all users", async () => {
    const users = [
      { _id: "user_id_1", username: "User1", email: "user1@example.com", password: "password1" },
      { _id: "user_id_2", username: "User2", email: "user2@example.com", password: "password2" }
    ];
    (UserModel.find as jest.Mock).mockResolvedValue(users); // convert 
    const userRepo = new UserRepo();
    const result = await userRepo.getall();
    expect(result).toEqual(users);
    expect(UserModel.find).toHaveBeenCalledTimes(1);
  });

  it("getUserById should return user by ID", async () => {
    const userId = "5fc305b4805c7462c89f9db1";
    const user = { _id: userId, username: "User1", email: "user1@example.com", password: "password1" };
    (UserModel.findById as jest.Mock).mockResolvedValue(user);
    const userRepo = new UserRepo();
    const result = await userRepo.getById(userId);
    expect(result).toEqual(user);
    expect(UserModel.findById).toHaveBeenCalledWith(userId);
  });

  it("createUser should create a new user", async () => {
    const userData = { username: "User1", email: "user1@example.com", password: "password1" };
    const newUser = { _id: "new_user_id", ...userData };
    (UserModel.prototype.save as jest.Mock).mockResolvedValue(newUser);
    const userRepo = new UserRepo();
    const result = await userRepo.createUser(userData);
    expect(result).toEqual(newUser);
    expect(UserModel.prototype.save).toHaveBeenCalledTimes(1);
  });

  it("should update user by ID", async () => {
    const userId = "5fc305b4805c7462c89f9db1";
    const updatedUserData = { username: "Updated User", email: "updated@example.com", password: "updatedpassword" };
    const updatedUser = { _id: userId, ...updatedUserData };
    (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedUser);  
    const userRepo = new UserRepo();
    const result = await userRepo.updateById(userId, updatedUserData);
    // Assert that the updated user is returned
    expect(result).toEqual(updatedUser);
    // Assert that the update operation was called with the correct arguments
    expect(UserModel.findByIdAndUpdate).toHaveBeenCalledWith(
      userId,
      updatedUserData,
      { new: true }
    );
  });

  it("should return null for invalid user ID", async () => {
    const invalidUserId = "invalid_id";
    const updatedUserData = { username: "Updated User", email: "updated@example.com", password: "updatedpassword" };
    (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);
    const userRepo = new UserRepo();
    const result = await userRepo.updateById(invalidUserId, updatedUserData);
    // Assert that null is returned for invalid user ID
    expect(result).toBeNull();
    // Assert that UserModel.findByIdAndUpdate is not called
    expect(UserModel.findByIdAndUpdate).not.toHaveBeenCalled();
  });
  

  it("deleteUser should delete user by ID", async () => {
    
    const userId = "5fc305b4805c7462c89f9db1";
    const deletedUser = { _id: userId, username: "Deleted User", email: "deleted@example.com", password: "deletedpassword" };
    (UserModel.findByIdAndDelete as jest.Mock).mockResolvedValue(deletedUser);
    const userRepo = new UserRepo();
    const result = await userRepo.deleteById(userId);
    expect(result).toEqual(deletedUser);
    expect(UserModel.findByIdAndDelete).toHaveBeenCalledWith(userId);
  });
});