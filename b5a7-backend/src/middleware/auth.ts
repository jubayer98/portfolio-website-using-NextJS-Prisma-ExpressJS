import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../env";

export interface AuthRequest extends Request {
    user?: { sub: string; email: string };
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;

    if (!token) return res.status(401).json({ message: "Missing token" });

    try {
        const payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as any;
        req.user = { sub: payload.sub, email: payload.email };
        next();
    } catch {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}