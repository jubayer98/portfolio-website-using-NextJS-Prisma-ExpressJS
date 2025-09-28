import { Router } from "express";
import { prisma } from "../prisma";
import { requireAuth, AuthRequest } from "../middleware/auth";
import { createPostSchema, updatePostSchema } from "../schemas/post.schema";

const router = Router();

router.get("/", async (_req, res) => {
    const posts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" }
    });
    res.json(posts);
});

router.post("/", requireAuth, async (req: AuthRequest, res) => {
    const parsed = createPostSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error.flatten());

    const post = await prisma.post.create({
        data: { ...parsed.data, authorId: req.user!.sub }
    });
    res.status(201).json(post);
});

router.patch("/:id", requireAuth, async (req, res) => {
    const parsed = updatePostSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error.flatten());

    const { id } = req.params;
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post || post.authorId !== (req as any).user.sub) return res.status(404).json({ message: "Not found" });

    const updated = await prisma.post.update({ where: { id }, data: parsed.data });
    res.json(updated);
});

router.delete("/:id", requireAuth, async (req, res) => {
    const { id } = req.params;
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post || post.authorId !== (req as any).user.sub) return res.status(404).json({ message: "Not found" });

    await prisma.post.delete({ where: { id } });
    res.status(204).send();
});

export default router;