import { z } from 'zod';

const updateUserZodSchema = z.object({
  body: z.object({
    email: z.string().optional(),
    name: z.string().optional(),
    budget: z.number().optional(),
    income: z.number().optional(),
  }),
});


export const UserValidation = {
  updateUserZodSchema
};
