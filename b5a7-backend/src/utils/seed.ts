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
            
            const admin = await prisma.user.create({
                data: {
                    email: env.ADMIN_EMAIL,
                    name: env.ADMIN_NAME,
                    password: hashedPassword,
                }
            });
            
            logger.info(`✅ Admin user created successfully!`);
            logger.info(`📧 Email: ${env.ADMIN_EMAIL}`);
            logger.info(`👤 Name: ${env.ADMIN_NAME}`);
            logger.info(`⚠️  Please change the password after first login!`);

            // Create sample projects
            await seedSampleProjects(admin.id);
        } else {
            logger.info(`ℹ️  Admin user already exists, skipping seed...`);
        }
    } catch (error) {
        logger.error("❌ Failed to seed admin user");
        logger.error(error);
    }
}

async function seedSampleProjects(adminId: string) {
    try {
        const projectCount = await prisma.project.count();
        
        if (projectCount === 0) {
            const sampleProjects = [
                {
                    title: "Portfolio Website",
                    description: "A modern, responsive portfolio website built with Next.js and TypeScript. Features dark mode, smooth animations, and optimized performance.",
                    thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
                    repoUrl: "https://github.com/example/portfolio",
                    liveUrl: "https://portfolio.example.com",
                    features: [
                        "Responsive design",
                        "Dark/Light mode toggle",
                        "Smooth animations",
                        "SEO optimized",
                        "Performance optimized"
                    ],
                    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
                    published: true,
                    featured: true,
                    order: 1,
                    authorId: adminId
                },
                {
                    title: "E-commerce API",
                    description: "A robust REST API for e-commerce applications with authentication, product management, and order processing.",
                    thumbnailUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600",
                    repoUrl: "https://github.com/example/ecommerce-api",
                    features: [
                        "JWT Authentication",
                        "Product CRUD operations",
                        "Order management",
                        "Payment integration",
                        "Admin dashboard"
                    ],
                    technologies: ["Node.js", "Express", "PostgreSQL", "Prisma"],
                    published: true,
                    featured: false,
                    order: 2,
                    authorId: adminId
                },
                {
                    title: "Task Management App",
                    description: "A collaborative task management application with real-time updates and team collaboration features.",
                    thumbnailUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600",
                    repoUrl: "https://github.com/example/task-manager",
                    liveUrl: "https://tasks.example.com",
                    features: [
                        "Real-time collaboration",
                        "Drag & drop interface",
                        "Team management",
                        "Progress tracking",
                        "Mobile responsive"
                    ],
                    technologies: ["React", "Socket.io", "Node.js", "MongoDB"],
                    published: true,
                    featured: false,
                    order: 3,
                    authorId: adminId
                }
            ];

            await prisma.project.createMany({
                data: sampleProjects
            });

            logger.info(`✅ Sample projects created successfully!`);
        } else {
            logger.info(`ℹ️  Projects already exist, skipping project seed...`);
        }
    } catch (error) {
        logger.error("❌ Failed to seed sample projects");
        logger.error(error);
    }
}