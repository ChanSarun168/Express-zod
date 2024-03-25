import supertest from 'supertest';
import  app  from '../../app';

describe('userRouter', () => {
  const request = supertest(app); // Attach Supertest to your Express app

  // Test for GET /users
  test('should return all users', async () => {
    const response = await request.get('/user');
    expect(response.status).toBe(200);
    // Add assertions for response body structure if needed
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
    const userId = '4edd40c86762e0fb12000003';
    const response = await request.get(`/user/${userId}`);
    expect(response.status).toBe(200);
    // Add assertions for response body with user data
  });

  // Test for GET /users/:userId with invalid ID
  test('should return 404 for invalid user ID', async () => {
    const invalidUserId = 'invalid-id';
    try {
      await request.get(`/user/${invalidUserId}`);
    } catch (error:unknown | any) {
      expect(error.response.status).toBe(404);
    }
  });

  // ... Add more tests for PUT and DELETE routes, ensuring middleware behavior
});
