// src/logger.ts

import pino from "pino";

// Vercel sets NODE_ENV to 'production'.
// 'pino-pretty' is ONLY used when NODE_ENV is 'development'.
const isDev = process.env.NODE_ENV === "development";

export const logger = pino({
    // Only use pino-pretty transport in development
    transport: isDev ? { target: "pino-pretty" } : undefined,

    // Set log level based on environment
    level: isDev ? "debug" : "info",
});