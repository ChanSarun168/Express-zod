import supertest from 'supertest';
import app from '../../app';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('userRouter', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    // Start MongoDB memory server before running tests
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    // Set up your app with the MongoDB URI
    process.env.MONGODB_URI = mongoUri;
  });

  afterAll(async () => {
    // Stop MongoDB memory server after running tests
    await mongoServer.stop();
  });

  const request = supertest(app); // Attach Supertest to your Express app

  // Test for GET /users
  test('should return all users', async () => {
    const response = await request.get('/user');
    expect(response.status).toBe(200);
    
  });

  // Test for POST /users
  test('should create a new user with valid data', async () => {
    const newUser = {
      username: "User1",
      email: "user1@example.com",
      password: "password1",
    };
  
    const response = await request.post('/user').send(newUser);
  
    expect(response.status).toBe(201);
    expect(response.body).toEqual({

      _id: expect.any(String), // Assuming Mongoose generates a unique ID
      username: "User1",
      email: "user1@example.com",
      password: "password1",
      __v: 0
      
    });
  });
  

  // Test for GET /users/:userId
  test('should get a user by ID', async () => {
    const userId = '65fd09fdfe46d779bda6505e';
    const response = await request.get(`/user/${userId}`);

    // Ensure the server responded with a success status code
    expect(response.status).toBe(200);

  });

  // Test for GET /users/:userId with invalid ID
  test('should return 404 for invalid user ID', async () => {
    const invalidUserId = 'invalid-id';
    try {
      await request.get(`/user/${invalidUserId}`);
    } catch (error: unknown | any) {
      expect(error.response.status).toBe(404);
    }
  });

});
