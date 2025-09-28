import bcrypt from "bcrypt";
import { prisma } from "../prisma";
import { logger } from "../logger";
import { env } from "../env";

export async function seedAdmin() {
    try {
        // Check if any user exists
        const userCount = await prisma.user.count();
        
        if (userCount === 0) {
            // Get admin credentials from environment variables
            const hashedPassword = await bcrypt.hash(env.ADMIN_PASSWORD, 10);
            
            await prisma.user.create({
                data: {
                    email: env.ADMIN_EMAIL,
                    name: env.ADMIN_NAME,
                    password: hashedPassword,
                }
            });
            
            logger.info(`✅ Admin user created successfully!`);
            logger.info(`📧 Email: ${env.ADMIN_EMAIL}`);
            logger.info(`� Name: ${env.ADMIN_NAME}`);
            logger.info(`⚠️  Please change the password after first login!`);
        } else {
            logger.info(`ℹ️  Admin user already exists, skipping seed...`);
        }
    } catch (error) {
        logger.error("❌ Failed to seed admin user");
        logger.error(error);
    }
}