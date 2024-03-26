import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import  app  from '../../app'; // Assuming your Express app is exported as 'app'
import { UserModel } from '../../database/models/userModel'; // Assuming you have a UserModel

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

describe('User Routes', () => {

  afterEach(async () => {
    try {
      await UserModel.deleteMany({});
    } catch (error) {
      console.error("Error during cleanup:", error);
      throw error;
    }
  });

  it('should create a new user', async () => {
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    };

    const response = await request(app)
      .post('/users')
      .send(userData)
      .expect(201);
 
    expect(response.body.status).toEqual('success');
    expect(response.body.message).toEqual('User created!!!');
    expect(response.body.data).toMatchObject(userData);
  });

  // Write similar test cases for other routes (getAll, getById, updateUser, deleteUser)
});
