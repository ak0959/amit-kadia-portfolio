import { type InsertMessage, type Message } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createMessage(message: InsertMessage): Promise<Message>;
}

export class MemStorage implements IStorage {
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const message: Message = {
      ...insertMessage,
      id: randomUUID(),
      createdAt: new Date().toISOString(),
    };
    return message;
  }
}

export const storage = new MemStorage();
