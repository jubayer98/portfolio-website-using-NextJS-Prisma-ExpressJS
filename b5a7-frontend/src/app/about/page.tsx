export const dynamic = 'force-static';

export default function AboutPage() {
    return (
        <section className="prose max-w-none">
            <h1>About Me</h1>
            <p>Short bio, contact info, and skills.</p>
            <ul>
                <li><strong>Name:</strong> Your Name</li>
                <li><strong>Email:</strong> you@example.com</li>
                <li><strong>Skills:</strong> Next.js, TypeScript, Prisma, Tailwind</li>
            </ul>
        </section>
    );
}
