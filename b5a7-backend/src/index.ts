// Load environment variables first
import { env } from "./env";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { logger } from "./logger";
import { seedAdmin } from "./utils/seed";

import authRoutes from "./routes/auth.routes";
import postRoutes from "./routes/post.routes";
import healthRoutes from "./routes/health.routes";

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: [env.CORS_ORIGIN, "http://localhost:3000", "http://localhost:5173", "http://localhost:8080"],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    })
);
app.use(
    rateLimit({
        windowMs: 60 * 1000,
        max: 120,
        standardHeaders: true,
        legacyHeaders: false,
    })
);

// Routes
app.get("/", (_req, res) => {
    res.json({ 
        message: "Backend API Server", 
        version: "1.0.0", 
        timestamp: new Date().toISOString() 
    });
});
app.use("/api", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// Error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    logger.error(err);
    res.status(500).json({ message: "Internal Server Error" });
});

app.listen(env.PORT, async () => {
    logger.info(`Server running on http://localhost:${env.PORT}`);
    
    // Seed admin user on first startup
    await seedAdmin();
});