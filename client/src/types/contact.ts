import { z } from "zod";

export const insertMessageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(254, "Email must be less than 254 characters"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(3000, "Message must be less than 3,000 characters"),
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = InsertMessage & { id: string; createdAt: string };
