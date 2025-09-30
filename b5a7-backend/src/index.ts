// Load environment variables first
import { env } from "./env";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { logger } from "./logger";

import authRoutes from "./routes/auth.routes";
import postRoutes from "./routes/post.routes";
import projectRoutes from "./routes/project.routes";
import healthRoutes from "./routes/health.routes";
import { seedAdmin } from "./utils/seed";

const app = express();

// Handle favicon.ico requests FIRST, before any other middleware
// app.get("/favicon.ico", (_req, res) => {
//     res.status(204).end();
// });

// Handle other common browser requests
app.get("/robots.txt", (_req, res) => {
    res.type("text/plain");
    res.send("User-agent: *\nDisallow: /");
});

app.get("/sitemap.xml", (_req, res) => {
    res.status(404).send("Not found");
});

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
app.use("/api/projects", projectRoutes);

// Handle 404 for unmatched routes (use middleware instead of app.use("*"))
app.use((_req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    logger.error(err);
    
    // Don't expose internal errors in production
    const message = process.env.NODE_ENV === 'production' 
        ? 'Internal Server Error' 
        : err.message || 'Internal Server Error';
    
    res.status(err.status || 500).json({ message });
});

// For Vercel serverless functions, we need to export the app
export default app;

// Only start server if not in serverless environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(env.PORT, async () => {
        logger.info(`Server running on http://localhost:${env.PORT}`);
        
        // Only seed in development or when explicitly requested
        if (process.env.NODE_ENV === 'development') {
            await seedAdmin();
        }
    });
}

module.exports = app;