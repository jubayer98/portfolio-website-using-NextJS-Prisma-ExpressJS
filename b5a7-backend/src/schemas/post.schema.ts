import { z } from "zod";

export const createPostSchema = z.object({
    title: z.string().min(1),
    content: z.string().optional(),
    published: z.boolean().optional(),
});

export const updatePostSchema = createPostSchema.partial();