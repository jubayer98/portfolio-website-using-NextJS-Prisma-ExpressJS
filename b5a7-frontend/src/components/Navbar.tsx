'use client';
import Link from 'next/link';
import { isAuthed, clearTokens } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();
    const authed = isAuthed();

    return (
        <header className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <nav className="container mx-auto flex max-w-5xl items-center justify-between p-4">
                <div className="flex items-center gap-4">
                    <Link href="/" className="font-semibold">B5A7 Portfolio</Link>
                    <Link href="/blogs" className="text-sm text-gray-600 hover:text-gray-900">Blogs</Link>
                    <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">About</Link>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/projects" className="text-sm text-gray-600 hover:text-gray-900">Projects</Link>
                    {authed ? (
                        <>
                            <Link href="/dashboard" className="rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white">Dashboard</Link>
                            <button
                                onClick={() => { clearTokens(); router.push('/'); router.refresh(); }}
                                className="rounded-md border px-3 py-1.5 text-sm"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link href="/login" className="rounded-md border px-3 py-1.5 text-sm">Login</Link>
                    )}
                </div>
            </nav>
        </header>
    );
}
