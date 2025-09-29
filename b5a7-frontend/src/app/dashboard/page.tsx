/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Protected from '@/components/Projected';
import { api } from '@/lib/api';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function DashboardPage() {
    return (
        <Protected>
            <DashboardInner />
        </Protected>
    );
}

function DashboardInner() {
    const [posts, setPosts] = useState<any[]>([]);
    const [saving, setSaving] = useState(false);

    async function load() {
        try {
            const data = await api.listPosts();
            setPosts(data);
        } catch (e: any) {
            toast.error(e.message || 'Failed to load posts');
        }
    }

    useEffect(() => { load(); }, []);

    async function createPost(form: FormData) {
        setSaving(true);
        try {
            await api.createPost({
                title: form.get('title') as string,
                content: form.get('content') as string,
                published: true,
            });
            toast.success('Post created');
            (document.getElementById('post-form') as HTMLFormElement).reset();
            await load();
        } catch (e: any) {
            toast.error(e.message || 'Create failed');
        } finally {
            setSaving(false);
        }
    }

    async function remove(id: string) {
        try {
            await api.deletePost(id);
            toast.success('Deleted');
            await load();
        } catch (e: any) {
            toast.error(e.message || 'Delete failed');
        }
    }

    return (
        <section className="space-y-6">
            <h1 className="text-2xl font-bold">Owner Dashboard</h1>

            <form id="post-form" action={createPost} className="rounded-2xl border bg-white p-4 shadow-sm">
                <h2 className="mb-2 text-lg font-semibold">New Post</h2>
                <div className="grid gap-3">
                    <input name="title" className="w-full rounded-md border p-2" placeholder="Title" required />
                    <textarea name="content" className="min-h-[120px] w-full rounded-md border p-2" placeholder="Content" />
                    <button disabled={saving} className="w-fit rounded-md bg-gray-900 px-4 py-2 text-white disabled:opacity-60">
                        {saving ? 'Saving...' : 'Create'}
                    </button>
                </div>
                <p className="mt-2 text-xs text-gray-500">* Published immediately for demo.</p>
            </form>

            <div className="space-y-2">
                <h2 className="text-lg font-semibold">Your Published Posts</h2>
                {posts.length === 0 ? (
                    <p className="text-sm text-gray-600">No posts yet.</p>
                ) : (
                    <ul className="space-y-2">
                        {posts.map((p) => (
                            <li key={p.id} className="flex items-center justify-between rounded-md border bg-white p-3">
                                <div>
                                    <p className="font-medium">{p.title}</p>
                                    <p className="text-xs text-gray-500">{new Date(p.createdAt).toLocaleString()}</p>
                                </div>
                                <button onClick={() => remove(p.id)} className="rounded-md border px-3 py-1.5 text-sm">
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}
