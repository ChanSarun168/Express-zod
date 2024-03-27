import express, { Request, Response, NextFunction } from "express";
import supertest from "supertest";
import z from "zod";
import { MongoMemoryServer } from "mongodb-memory-server";
import { validateUserData } from "../../userValidation";
import app from "../../../app";
import mongoose from "mongoose";
import { UserModel } from "../../../database/models/userModel";

// Create an Express application
const request = supertest(app)

let mongoServer: MongoMemoryServer | undefined ;
// Before run testing
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

// after run testing
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer?.stop();
});

// Define a Zod schema for user data validation
const userSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Please input a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

// Define a route handler using the validateUserData middleware
app.post(
  "/users",
  validateUserData(userSchema),
  (req: Request, res: Response, next: NextFunction) => {
    // If the middleware passes without errors, respond with success
    res
      .status(200)
      .json({ message: "User data validated successfully", data: req.body });
  }
);

// Integration test for the validateUserData middleware
describe("validateUserData middleware integration test", () => {

  afterEach(async () => {
    try {
      await UserModel.deleteMany({});
    } catch (error) {
      console.error("Error during cleanup:", error);
      throw error;
    }
  });

  it("should return 400 if user data is invalid", async () => {
    const invalidUserData = {
      username: "ab",
      email: "invalidemail",
      password: "short",
    };

    const response = await request.post("/users").send(invalidUserData);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      statusCode: 400,
      message:
        "Username must Input At least 3 Character,Please Input In email Form,Password must Input At least 6 Characters",
    });
  });

  it("should return 201 if user data is valid", async () => {
    const validUserData = {
      username: "john_doe",
      email: "john@example.com",
      password: "password123",
    };

    const response = await request.post("/users").send(validUserData);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      message: "User created!!!",
      status: "success",

    });
  });
});
