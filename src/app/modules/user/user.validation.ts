import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    email: z.string().optional(),
    name: z.string().optional(),
  }),
});


export const UserValidation = {
  createUserZodSchema
};
