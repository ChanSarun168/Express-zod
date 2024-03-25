import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { validateMongooseId } from '../validationId';
import { BaseCustomError } from '../../utils/customError';
import { StatusCode } from '../../utils/consts';

describe('validateMongooseId middleware', () => {
  let app: express.Application;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri);

    app = express();
    app.use(express.json());
    app.use('/:userId', validateMongooseId);

    // Define a test route that uses the middleware
    app.get('/:userId', (req, res) => {
      res.send('OK');
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('should call next function if ID is valid', async () => {
    const validObjectId = new mongoose.Types.ObjectId().toString();

    const response = await request(app).get(`/${validObjectId}`);

    expect(response.status).toBe(200);
  });

  it('should return error response if ID is invalid', async () => {
    const invalidObjectId = 'invalidObjectId';

    const response = await request(app).get(`/${invalidObjectId}`);

    expect(response.status).toBe(StatusCode.NotFound);
    expect(response.body).toEqual({
      message: 'id Invalide',
      statusCode: StatusCode.NotFound,
    });
  });
});
