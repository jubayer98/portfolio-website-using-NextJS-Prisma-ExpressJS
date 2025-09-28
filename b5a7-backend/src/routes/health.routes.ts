import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

router.get("/health", async (_req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.json({ ok: true });
    } catch (e) {
        res.status(500).json({ ok: false, error: (e as Error).message });
    }
});

export default router;