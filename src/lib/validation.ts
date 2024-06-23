import { z } from "zod";

export const loginSchema = z.object({
  login: z.string().min(4),
  password: z.string().min(4),
});

export const registerSchema = z
  .object({
    login: z.string(),
    name: z.string().min(4),
    password: z.string().min(5),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export const taskSchema = z.object({
  title: z.string().min(5),
});
