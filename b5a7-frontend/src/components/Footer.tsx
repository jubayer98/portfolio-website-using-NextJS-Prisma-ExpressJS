import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-gray-200/60 bg-white/95 backdrop-blur-md">
            <div className="container mx-auto max-w-6xl px-6 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="md:col-span-1">
                        <Link 
                            href="/" 
                            className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200"
                        >
                            Jubayer Alam
                        </Link>
                        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                            A modern portfolio showcasing blogs, projects, and professional work. Built with cutting-edge technologies.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="md:col-span-1">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                            Navigation
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link 
                                    href="/blogs" 
                                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                                >
                                    Blogs
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/projects" 
                                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                                >
                                    Projects
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/about" 
                                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                                >
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Tech Stack */}
                    <div className="md:col-span-1">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                            Tech Stack
                        </h3>
                        <ul className="space-y-3">
                            <li className="text-sm text-gray-600">Next.js</li>
                            <li className="text-sm text-gray-600">Tailwind CSS</li>
                            <li className="text-sm text-gray-600">Express.js</li>
                            <li className="text-sm text-gray-600">Prisma</li>
                            <li className="text-sm text-gray-600">Neon Database</li>
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div className="md:col-span-1">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                            Connect
                        </h3>
                        <div className="flex space-x-4">
                            <a
                                href="https://github.com/jubayer98"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                                aria-label="GitHub"
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a
                                href="https://linkedin.com/in/yourprofile"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                                aria-label="LinkedIn"
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>
                            <a
                                href="mailto:contact@yourportfolio.com"
                                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                                aria-label="Email"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-200 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                            <p className="text-sm text-gray-600">
                                © {currentYear} Jubayer Alam. All rights reserved.
                            </p>
                            <div className="flex space-x-6">
                                <Link 
                                    href="/privacy" 
                                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                                >
                                    Privacy Policy
                                </Link>
                                <Link 
                                    href="/terms" 
                                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                                >
                                    Terms of Service
                                </Link>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>Built with</span>
                            <svg className="h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                            <span>by Jubayer Alam</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
