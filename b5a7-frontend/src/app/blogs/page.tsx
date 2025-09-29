/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogCard from '@/components/BlogCard';

export const revalidate = 60; // ISR

async function getPosts() {
    const base = process.env.NEXT_PUBLIC_API_BASE!;
    const res = await fetch(`${base}/posts`, { next: { revalidate } });
    if (!res.ok) return [] as any[];
    return res.json();
}

export default async function BlogsPage() {
    const posts = await getPosts();
    return (
        <section className="space-y-4">
            <h1 className="text-2xl font-bold">Blogs</h1>
            {posts.length === 0 ? (
                <p className="text-sm text-gray-600">No posts yet.</p>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                    {posts.map((p: any) => <BlogCard key={p.id} post={p} />)}
                </div>
            )}
        </section>
    );
}
