export default function HomePage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to My Portfolio</h1>
      <p className="text-gray-600">Blogs, Projects, and an owner Dashboard. Built with Next.js, Tailwind, Express, Prisma, and Neon.</p>
      <ul className="list-inside list-disc text-sm text-gray-700">
        <li>Blogs list uses ISR (revalidate)</li>
        <li>About page is SSG</li>
        <li>Dashboard is owner-only (JWT)</li>
      </ul>
    </section>
  );
}
