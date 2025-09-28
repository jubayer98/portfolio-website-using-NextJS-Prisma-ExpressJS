import { z } from "zod";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const EnvSchema = z.object({
    DATABASE_URL: z.url(),
    JWT_ACCESS_SECRET: z.string().min(20),
    JWT_REFRESH_SECRET: z.string().min(20),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    CORS_ORIGIN: z.url(),
    PORT: z.coerce.number().default(4000),
    ADMIN_EMAIL: z.string().email(),
    ADMIN_PASSWORD: z.string().min(6),
    ADMIN_NAME: z.string().min(1),
});

export const env = EnvSchema.parse(process.env);
