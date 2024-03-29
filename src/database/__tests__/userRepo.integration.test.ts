import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { UserRepo } from "../repository/userRepo";
import { UserModel } from "../models/userModel";

let MongoServer: MongoMemoryServer | undefined;

// Before run testing
beforeAll(async () => {
  MongoServer = await MongoMemoryServer.create();
  const mongoUri = MongoServer.getUri();
  await mongoose.connect(mongoUri);
});

// after run testing
afterAll(async () => {
  await mongoose.disconnect();
  await MongoServer?.stop();
});

describe("User repo with Integration test", () => {
  // clear Mongo for each test
  afterEach(async () => {
    try {
      await UserModel.deleteMany({});
    } catch (error) {
      console.error("Error during cleanup:", error);
      throw error;
    }
  });

  describe("Create User", () => {
    test("Add New User to store In database", async () => {
      const users = {
        username: "User1",
        email: "user1@example.com",
        password: "password1",
      };
      const userRepo = new UserRepo();
      const newUser = await userRepo.createUser(users);
      expect(newUser).toBeDefined();
      expect(newUser.username).toEqual(users.username);
    });

    test("Attempt to Create User with Invalid Data", async () => {
      const user = {
        email: "user1@example.com",
        password: "password1",
      };
      const userRepo = new UserRepo();
      await expect(userRepo.createUser(user)).rejects.toThrow();
    });
  });

  describe("Get User", () => {
    it('should return all users', async () => {
      // Insert some dummy users into the database
      const users = [
        { username: 'user1', email: 'user1@example.com', password: 'password1' },
        { username: 'user2', email: 'user2@example.com', password: 'password2' },
        { username: 'user3', email: 'user3@example.com', password: 'password3' },
      ];
      await UserModel.insertMany(users);
  
      const userRepo = new UserRepo();
      // Call the getAll method without pagination parameters
      const result = await userRepo.getAll();
  
      // Assert returned users
      expect(result).toHaveLength(3); // Assuming 3 users were inserted
    });
  
    it('should return paginated users', async () => {

      const users = [
        { username: 'user1', email: 'user1@example.com', password: 'password1' },
        { username: 'user2', email: 'user2@example.com', password: 'password2' },
        { username: 'user3', email: 'user3@example.com', password: 'password3' },
      ];
      await UserModel.insertMany(users);
      const userRepo = new UserRepo();

      const option = {
        // Pagination parameters
         page : 1,
         perPage : 2
       }
      // Call the getAll method with pagination parameters
      const result = await userRepo.getAll(option); // Fetch first page with 2 users per page
  
      // Assert returned users
      expect(result).toHaveLength(2); // Expecting 2 users per page
    });

    test("Get User By Id",async()=>{

      const user1 = {
        _id: new mongoose.Types.ObjectId("4edd40c86762e0fb12000003"),
        username: "User1",
        email: "user1@example.com",
        password: "password1",
      };

      const userRepo = new UserRepo();

      await userRepo.createUser(user1);
      const result = await userRepo.getById("4edd40c86762e0fb12000003");

      expect(result).toBeDefined();  // if we input wrong format
      // expect(result).toEqual(user1);

    })
  });

  test("Update User",async ()=>{
    const userRepo = new UserRepo();
    const user = await userRepo.createUser({
      username: "TestUser",
      email: "test@example.com",
      password: "password123",
    });

    // New data to update the user
    const updatedUserData = {
      username: "UpdatedUser",
      email: "updated@example.com",
    };

    // Call the updateUser method on the userRepo
    await userRepo.updateById(user._id, updatedUserData);

    // Fetch the updated user from the database
    const updatedUser = await userRepo.getById(user._id);

    // Assertions
    expect(updatedUser).toMatchObject(updatedUserData); // Ensure that user data is updated correctly
  })

  test("Update Non-existing User should return null", async () => {
    const userRepo = new UserRepo();
    // Attempt to update a non-existing user
    const result = await userRepo.updateById("12345678ueggfjwegfwjh6", { username: "NewName" });

    // Assertions
    expect(result).toBeNull(); // Ensure that updating a non-existing user returns null
  });

});
