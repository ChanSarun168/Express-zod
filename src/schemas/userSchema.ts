import z from 'zod'

const userSchema = z.object({
  username: z.string().min(3,"Username must Input At least 3 Character"),
  email: z.string().email("Please Input In email Form"),
  password: z.string().min(6,"Password must Input At least 6 Characters").max(12,'Password contain only 12 characters'),
});

export default userSchema;
