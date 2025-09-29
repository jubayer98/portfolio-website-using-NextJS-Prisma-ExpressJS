import Link from 'next/link';
import { Post } from '@/lib/types';

export default function BlogCard({ post }: { post: Post }) {
    return (
        <article className="rounded-2xl border bg-white p-4 shadow-sm">
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-gray-600">{post.content || ''}</p>
            <div className="mt-3 text-xs text-gray-500">
                <time dateTime={post.createdAt}>Created: {new Date(post.createdAt).toLocaleString()}</time>
            </div>
            <div className="mt-3">
                <Link href={`/blogs/${post.id}`} className="text-sm text-blue-600 hover:underline">Read</Link>
            </div>
        </article>
    );
}
