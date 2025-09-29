import { z } from "zod";

export const createProjectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    thumbnailUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    features: z.array(z.string()).default([]),
    technologies: z.array(z.string()).default([]),
    published: z.boolean().default(false),
    featured: z.boolean().default(false),
    order: z.number().int().default(0),
});

export const updateProjectSchema = createProjectSchema.partial();