/* eslint-disable @typescript-eslint/no-explicit-any */
export const revalidate = 60;

async function getPost(id: string) {
    const base = process.env.NEXT_PUBLIC_API_BASE!;
    // For demo, backend only exposes list; ideally add GET /posts/:id
    const res = await fetch(`${base}/posts`, { next: { revalidate } });
    if (!res.ok) return null;
    const posts = await res.json();
    return posts.find((p: any) => p.id === id) ?? null;
}

export default async function BlogDetail({ params }: { params: { id: string } }) {
    const post = await getPost(params.id);
    if (!post) return <div className="text-sm text-gray-600">Post not found.</div>;
    return (
        <article className="prose max-w-none">
            <h1>{post.title}</h1>
            <p>{post.content || ''}</p>
            <p className="text-xs text-gray-500">Updated: {new Date(post.updatedAt).toLocaleString()}</p>
        </article>
    );
}
