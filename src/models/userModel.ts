import mongoose, { Schema, Document } from 'mongoose';
import { number } from 'zod';

// Define the interface for the user document
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  // Add more fields as needed
}

// Creating the Mongoose schema for the user document
const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  // Define more fields here
});

// Creating and exporting the User model
export const UserModel = mongoose.model<IUser>('User', UserSchema);
