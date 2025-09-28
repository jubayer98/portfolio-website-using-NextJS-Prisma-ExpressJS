import { Router } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../prisma";
import { registerSchema, loginSchema } from "../schemas/auth.schema";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt";

const router = Router();

router.post("/register", async (req, res) => {
    // Registration is disabled - this is an admin-only system
    return res.status(403).json({ 
        message: "Registration is disabled. This is an admin-only system." 
    });
});

router.post("/login", async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error.flatten());

    const { email, password } = parsed.data;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const access = signAccessToken({ sub: user.id, email: user.email });
    const refresh = signRefreshToken({ sub: user.id, email: user.email });

    return res.json({ user: { id: user.id, email: user.email, name: user.name }, access, refresh });
});

router.post("/refresh", async (req, res) => {
    const { refresh } = req.body ?? {};
    if (!refresh) return res.status(400).json({ message: "Missing refresh token" });
    try {
        const payload = verifyRefreshToken(refresh);
        const access = signAccessToken({ sub: payload.sub, email: payload.email });
        return res.json({ access });
    } catch {
        return res.status(401).json({ message: "Invalid refresh token" });
    }
});

export default router;