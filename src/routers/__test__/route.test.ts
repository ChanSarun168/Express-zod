import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import app from "../../app"; // Assuming your Express app is exported as 'app'
import { UserModel } from "../../database/models/userModel"; // Assuming you have a UserModel

let mongoServer: MongoMemoryServer | undefined;

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

describe("User Routes", () => {
  afterEach(async () => {
    try {
      await UserModel.deleteMany({});
    } catch (error) {
      console.error("Error during cleanup:", error);
      throw error;
    }
  });

  it("should create a new user", async () => {
    const userData = {
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    };

    const response = await request(app)
      .post("/users")
      .send(userData)
      .expect(201);

    expect(response.body.status).toEqual("success");
    expect(response.body.message).toEqual("User created!!!");
  });

  // Get By Id

  describe("GET /users/:userId", () => {
    it('should get a user by ID', async () => {
      
      // Create a user in the in-memory MongoDB
      const user = await UserModel.create({ username: 'testuser', email: 'test@example.com', password: 'password123' });
  
      // Perform a GET request to fetch the user by ID
      const response = await request(app).get(`/users/${user._id}`).expect(200);
  
      // Assert the response body
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('User found!!!');
      expect(response.body.data).toEqual({
        __v:0,
        _id: user._id.toString(),
        username: user.username,
        password:user.password,
        email: user.email,
      });
    });
  
    it('should return 404 if user is not found', async () => {

      // Perform a GET request with a non-existing user ID
      const nonExistingUserId = '609d24e59d31e6ae5c212343'; // A non-existing ID
      const response = await request(app).get(`/users/${nonExistingUserId}`).expect(404);
  
      expect(response.body.message).toBe('User not found. Please check the provided ID.');
    });
  });
});
