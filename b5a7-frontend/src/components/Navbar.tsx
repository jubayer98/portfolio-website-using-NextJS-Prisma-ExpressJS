'use client';
import Link from 'next/link';
import { isAuthed, clearTokens } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();
    const authed = isAuthed();

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200/60 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/75">
            <nav className="container mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                {/* Logo/Brand */}
                <div className="flex items-center">
                    <Link 
                        href="/" 
                        className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200"
                    >
                        Jubayer Alam
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link 
                        href="/blogs" 
                        className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 relative group"
                    >
                        Blogs
                        <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                    </Link>
                    <Link 
                        href="/projects" 
                        className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 relative group"
                    >
                        Projects
                        <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                    </Link>
                    <Link 
                        href="/about" 
                        className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 relative group"
                    >
                        About
                        <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                    </Link>
                </div>

                {/* Auth Actions */}
                <div className="flex items-center space-x-4">
                    {authed ? (
                        <>
                            <Link 
                                href="/dashboard" 
                                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                            >
                                Dashboard
                            </Link>
                            <button
                                onClick={() => { clearTokens(); router.push('/'); router.refresh(); }}
                                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link 
                            href="/login" 
                            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                        >
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button - for future mobile nav implementation */}
                <div className="md:hidden">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        aria-expanded="false"
                    >
                        <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </button>
                </div>
            </nav>
        </header>
    );
}
