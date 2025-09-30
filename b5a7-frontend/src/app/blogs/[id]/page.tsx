/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from 'next';
import Link from 'next/link';

export const revalidate = 0; // Real-time updates

async function getPost(id: string) {
    const base = process.env.NEXT_PUBLIC_API_BASE!;
    // For demo, backend only exposes list; ideally add GET /posts/:id
    const res = await fetch(`${base}/posts`, { cache: 'no-store' });
    if (!res.ok) return null;
    const posts = await res.json();
    return posts.find((p: any) => p.id === id) ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const post = await getPost(id);
    
    if (!post) {
        return {
            title: 'Post Not Found | Portfolio',
            description: 'The requested blog post could not be found.',
        };
    }

    const description = post.content 
        ? post.content.substring(0, 160).replace(/\s+/g, ' ').trim() + (post.content.length > 160 ? '...' : '')
        : 'Read this insightful blog post about web development and technology.';

    return {
        title: `${post.title} | Portfolio Blog`,
        description,
        keywords: ['blog', 'web development', 'technology', 'programming', 'tutorial'],
        authors: [{ name: 'Jubayer Ahmed' }],
        creator: 'Jubayer Ahmed',
        publisher: 'Portfolio',
        openGraph: {
            title: post.title,
            description,
            type: 'article',
            publishedTime: post.createdAt,
            modifiedTime: post.updatedAt,
            authors: ['Jubayer Ahmed'],
            tags: ['blog', 'web development', 'technology'],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description,
            creator: '@jubayer98',
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}


export default async function BlogDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = await getPost(id);
    
    if (!post) {
        return (
            <div className="min-h-screen bg-white">
                <div className="container mx-auto max-w-4xl px-6 py-16">
                    <div className="text-center py-16">
                        <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
                        <p className="text-gray-600 mb-8">The blog post you&apos;re looking for doesn&apos;t exist or has been removed.</p>
                        <Link
                            href="/blogs"
                            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                        >
                            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Blogs
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const readingTime = post.content ? Math.ceil(post.content.split(' ').length / 200) : 1;
    const publishDate = new Date(post.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb */}
            <nav className="bg-gray-50 border-b">
                <div className="container mx-auto max-w-4xl px-6 py-4">
                    <ol className="flex items-center space-x-2 text-sm text-gray-500">
                        <li>
                            <Link href="/" className="hover:text-blue-600 transition-colors duration-200">
                                Home
                            </Link>
                        </li>
                        <li>
                            <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </li>
                        <li>
                            <Link href="/blogs" className="hover:text-blue-600 transition-colors duration-200">
                                Blogs
                            </Link>
                        </li>
                        <li>
                            <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </li>
                        <li className="text-gray-900 font-medium">
                            {post.title.length > 50 ? post.title.substring(0, 50) + '...' : post.title}
                        </li>
                    </ol>
                </div>
            </nav>

            {/* Article Content */}
            <article className="container mx-auto max-w-4xl px-6 py-12">
                {/* Article Header */}
                <header className="mb-12">
                    <div className="mb-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                            Blog Post
                        </span>
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {post.title}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-6 text-gray-600 border-b border-gray-200 pb-6">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                                <span className="text-sm font-bold text-white">JA</span>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Jubayer Alam</p>
                                <p className="text-sm text-gray-500">Author</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center text-sm">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <time dateTime={post.createdAt}>{publishDate}</time>
                        </div>
                        
                        <div className="flex items-center text-sm">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {readingTime} min read
                        </div>
                    </div>
                </header>

                {/* Article Body */}
                <div className="prose prose-lg max-w-none">
                    <div className="text-gray-700 leading-relaxed text-lg">
                        {post.content ? (
                            post.content.split('\n').map((paragraph: string, index: number) => (
                                paragraph.trim() ? (
                                    <p key={index} className="mb-6">
                                        {paragraph}
                                    </p>
                                ) : null
                            ))
                        ) : (
                            <p className="text-gray-500 italic">No content available for this post.</p>
                        )}
                    </div>
                </div>

                {/* Article Footer */}
                <footer className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                            Last updated: {new Date(post.updatedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </div>
                        
                        <Link
                            href="/blogs"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                        >
                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Blogs
                        </Link>
                    </div>
                </footer>
            </article>

            {/* JSON-LD Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "headline": post.title,
                        "description": post.content?.substring(0, 160) || "Blog post from Jubayer Alam's portfolio",
                        "author": {
                            "@type": "Person",
                            "name": "Jubayer Alam",
                            "url": "https://yourportfolio.com/about"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "Portfolio",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://yourportfolio.com/favicon.svg"
                            }
                        },
                        "datePublished": post.createdAt,
                        "dateModified": post.updatedAt,
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": `https://yourportfolio.com/blogs/${post.id}`
                        }
                    })
                }}
            />
        </div>
    );
}
