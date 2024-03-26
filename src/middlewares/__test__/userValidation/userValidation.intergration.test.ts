import express, { Request, Response, NextFunction } from "express";
import supertest from "supertest";
import z from "zod";
import { MongoMemoryServer } from "mongodb-memory-server";
import { validateUserData } from "../../userValidation";
import app from "../../../app";

// Create an Express application
const request = supertest(app)

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  // Start MongoDB memory server before running tests
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  // Configure your app to use the MongoDB URI
  process.env.MONGODB_URI = mongoUri;
});

afterAll(async () => {
  // Stop MongoDB memory server after running tests
  await mongoServer.stop();
});

// Define a Zod schema for user data validation
const userSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Please input a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

// Define a route handler using the validateUserData middleware
app.post(
  "/user",
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
  it("should return 400 if user data is invalid", async () => {
    const invalidUserData = {
      username: "ab",
      email: "invalidemail",
      password: "short",
    };

    const response = await request.post("/user").send(invalidUserData);

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

    const response = await request.post("/user").send(validUserData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: "User data validated successfully",
      data: validUserData,
    });
  });
});
