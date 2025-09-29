import { Router } from "express";
import { prisma } from "../prisma";
import { requireAuth, AuthRequest } from "../middleware/auth";
import { createProjectSchema, updateProjectSchema } from "../schemas/project.schema";

const router = Router();

// Public route: Get all published projects
router.get("/", async (req, res) => {
    try {
        const projects = await prisma.project.findMany({
            where: { published: true },
            orderBy: [
                { featured: 'desc' },
                { order: 'asc' },
                { createdAt: 'desc' }
            ],
            select: {
                id: true,
                title: true,
                description: true,
                thumbnailUrl: true,
                repoUrl: true,
                liveUrl: true,
                features: true,
                technologies: true,
                featured: true,
                order: true,
                createdAt: true,
                updatedAt: true
            }
        });

        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch projects" });
    }
});

// Admin route: Create a new project
router.post("/", requireAuth, async (req: AuthRequest, res) => {
    try {
        const parsed = createProjectSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ 
                message: "Validation failed", 
                errors: parsed.error.flatten() 
            });
        }

        const project = await prisma.project.create({
            data: { 
                ...parsed.data, 
                authorId: req.user!.sub 
            }
        });

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: "Failed to create project" });
    }
});

// Admin route: Update a project
router.patch("/:id", requireAuth, async (req: AuthRequest, res) => {
    try {
        const parsed = updateProjectSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ 
                message: "Validation failed", 
                errors: parsed.error.flatten() 
            });
        }

        const { id } = req.params;
        
        // Check if project exists and belongs to the user
        const existingProject = await prisma.project.findUnique({ 
            where: { id } 
        });
        
        if (!existingProject || existingProject.authorId !== req.user!.sub) {
            return res.status(404).json({ message: "Project not found" });
        }

        const project = await prisma.project.update({ 
            where: { id }, 
            data: parsed.data 
        });

        res.json(project);
    } catch (error) {
        res.status(500).json({ message: "Failed to update project" });
    }
});

// Admin route: Delete a project
router.delete("/:id", requireAuth, async (req: AuthRequest, res) => {
    try {
        const { id } = req.params;
        
        // Check if project exists and belongs to the user
        const existingProject = await prisma.project.findUnique({ 
            where: { id } 
        });
        
        if (!existingProject || existingProject.authorId !== req.user!.sub) {
            return res.status(404).json({ message: "Project not found" });
        }

        await prisma.project.delete({ where: { id } });
        
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Failed to delete project" });
    }
});

export default router;