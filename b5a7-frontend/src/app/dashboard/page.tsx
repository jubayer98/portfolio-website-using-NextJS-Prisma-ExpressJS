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
    const [projects, setProjects] = useState<any[]>([]);
    const [savingPost, setSavingPost] = useState(false);
    const [savingProject, setSavingProject] = useState(false);
    const [activeTab, setActiveTab] = useState<'posts' | 'projects'>('posts');
    const [editingPost, setEditingPost] = useState<any>(null);
    const [editingProject, setEditingProject] = useState<any>(null);
    const [updatingPost, setUpdatingPost] = useState(false);
    const [updatingProject, setUpdatingProject] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState<{
        type: 'post' | 'project';
        id: string;
        title: string;
    } | null>(null);
    const [deleting, setDeleting] = useState(false);

    async function loadPosts() {
        try {
            const data = await api.listPosts();
            setPosts(data);
        } catch (e: any) {
            toast.error(e.message || 'Failed to load posts');
        }
    }

    async function loadProjects() {
        try {
            const data = await api.listProjects();
            setProjects(data);
        } catch (e: any) {
            toast.error(e.message || 'Failed to load projects');
        }
    }

    useEffect(() => { 
        loadPosts(); 
        loadProjects();
    }, []);

    async function createPost(form: FormData) {
        setSavingPost(true);
        try {
            await api.createPost({
                title: form.get('title') as string,
                content: form.get('content') as string,
                published: true,
            });
            toast.success('Post created successfully');
            (document.getElementById('post-form') as HTMLFormElement).reset();
            await loadPosts();
        } catch (e: any) {
            toast.error(e.message || 'Failed to create post');
        } finally {
            setSavingPost(false);
        }
    }

    async function createProject(form: FormData) {
        setSavingProject(true);
        try {
            const features = (form.get('features') as string).split('\n').filter(f => f.trim());
            const technologies = (form.get('technologies') as string).split(',').map(t => t.trim()).filter(t => t);
            const thumbnailUrl = form.get('thumbnailUrl') as string;
            const repoUrl = form.get('repoUrl') as string;
            const liveUrl = form.get('liveUrl') as string;
            
            await api.createProject({
                title: form.get('title') as string,
                description: form.get('description') as string,
                thumbnailUrl: thumbnailUrl || undefined,
                repoUrl: repoUrl || undefined,
                liveUrl: liveUrl || undefined,
                features,
                technologies,
                published: true,
                featured: false,
            });
            toast.success('Project created successfully');
            (document.getElementById('project-form') as HTMLFormElement).reset();
            await loadProjects();
        } catch (e: any) {
            toast.error(e.message || 'Failed to create project');
        } finally {
            setSavingProject(false);
        }
    }

    async function updateProject(form: FormData) {
        if (!editingProject) return;
        setUpdatingProject(true);
        try {
            const features = (form.get('features') as string).split('\n').filter(f => f.trim());
            const technologies = (form.get('technologies') as string).split(',').map(t => t.trim()).filter(t => t);
            const thumbnailUrl = form.get('thumbnailUrl') as string;
            const repoUrl = form.get('repoUrl') as string;
            const liveUrl = form.get('liveUrl') as string;
            
            await api.updateProject(editingProject.id, {
                title: form.get('title') as string,
                description: form.get('description') as string,
                thumbnailUrl: thumbnailUrl || undefined,
                repoUrl: repoUrl || undefined,
                liveUrl: liveUrl || undefined,
                features,
                technologies,
                published: true,
            });
            toast.success('Project updated successfully');
            setEditingProject(null);
            await loadProjects();
        } catch (e: any) {
            toast.error(e.message || 'Failed to update project');
        } finally {
            setUpdatingProject(false);
        }
    }

    async function updatePost(form: FormData) {
        if (!editingPost) return;
        setUpdatingPost(true);
        try {
            await api.updatePost(editingPost.id, {
                title: form.get('title') as string,
                content: form.get('content') as string,
                published: true,
            });
            toast.success('Post updated successfully');
            setEditingPost(null);
            await loadPosts();
        } catch (e: any) {
            toast.error(e.message || 'Failed to update post');
        } finally {
            setUpdatingPost(false);
        }
    }

    async function handleConfirmDelete() {
        if (!deleteConfirmation) return;
        
        if (deleteConfirmation.type === 'post') {
            await removePost(deleteConfirmation.id);
        } else {
            await removeProject(deleteConfirmation.id);
        }
    }

    async function removePost(id: string) {
        setDeleting(true);
        try {
            await api.deletePost(id);
            toast.success('Post deleted successfully');
            await loadPosts();
            setDeleteConfirmation(null);
        } catch (e: any) {
            toast.error(e.message || 'Failed to delete post');
        } finally {
            setDeleting(false);
        }
    }

    async function removeProject(id: string) {
        setDeleting(true);
        try {
            await api.deleteProject(id);
            toast.success('Project deleted successfully');
            await loadProjects();
            setDeleteConfirmation(null);
        } catch (e: any) {
            toast.error(e.message || 'Failed to delete project');
        } finally {
            setDeleting(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <section className="bg-white border-b px-6 py-8">
                <div className="container mx-auto max-w-6xl">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Dashboard</h1>
                    <p className="text-gray-600">Manage your blog posts and portfolio projects</p>
                </div>
            </section>

            {/* Navigation Tabs */}
            <section className="bg-white border-b px-6">
                <div className="container mx-auto max-w-6xl">
                    <nav className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('posts')}
                            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                                activeTab === 'posts'
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Blog Posts ({posts.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('projects')}
                            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                                activeTab === 'projects'
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Projects ({projects.length})
                        </button>
                    </nav>
                </div>
            </section>

            {/* Content */}
            <section className="py-8">
                <div className="container mx-auto max-w-6xl px-6 space-y-8">
                    {activeTab === 'posts' && (
                        <>
                            {/* Create Post Form */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Post</h2>
                                <form id="post-form" action={createPost} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                        <input 
                                            name="title" 
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                            placeholder="Enter post title" 
                                            required 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                                        <textarea 
                                            name="content" 
                                            rows={6}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                            placeholder="Write your post content here..." 
                                        />
                                    </div>
                                    <button 
                                        type="submit"
                                        disabled={savingPost} 
                                        className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                    >
                                        {savingPost ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Creating...
                                            </>
                                        ) : (
                                            'Create Post'
                                        )}
                                    </button>
                                    <p className="text-sm text-gray-500">Post will be published immediately and visible to all visitors.</p>
                                </form>
                            </div>

                            {/* Posts List */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Published Posts</h2>
                                {posts.length === 0 ? (
                                    <div className="text-center py-8">
                                        <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <p className="text-gray-500">No posts created yet</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {posts.map((post) => (
                                            <div key={post.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-gray-900">{post.title}</h3>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        Created {new Date(post.createdAt).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </p>
                                                </div>
                                                <div className="ml-4 flex space-x-2">
                                                    <button 
                                                        onClick={() => setEditingPost(post)} 
                                                        className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button 
                                                        onClick={() => setDeleteConfirmation({ type: 'post', id: post.id, title: post.title })} 
                                                        className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {activeTab === 'projects' && (
                        <>
                            {/* Create Project Form */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Project</h2>
                                <form id="project-form" action={createProject} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                                            <input 
                                                name="title" 
                                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                                placeholder="Enter project title" 
                                                required 
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail URL</label>
                                            <input 
                                                name="thumbnailUrl" 
                                                type="url"
                                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                                placeholder="https://example.com/image.jpg" 
                                            />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                        <textarea 
                                            name="description" 
                                            rows={4}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                            placeholder="Describe your project..." 
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Repository URL</label>
                                            <input 
                                                name="repoUrl" 
                                                type="url"
                                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                                placeholder="https://github.com/username/repo" 
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Live Demo URL</label>
                                            <input 
                                                name="liveUrl" 
                                                type="url"
                                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                                placeholder="https://myproject.vercel.app" 
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Features (one per line)</label>
                                            <textarea 
                                                name="features" 
                                                rows={4}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                                placeholder="User authentication&#10;Real-time notifications&#10;Responsive design"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Technologies (comma separated)</label>
                                            <textarea 
                                                name="technologies" 
                                                rows={4}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                                placeholder="Next.js, TypeScript, Tailwind CSS, Prisma"
                                            />
                                        </div>
                                    </div>
                                    
                                    <button 
                                        type="submit"
                                        disabled={savingProject} 
                                        className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                    >
                                        {savingProject ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Creating...
                                            </>
                                        ) : (
                                            'Create Project'
                                        )}
                                    </button>
                                    <p className="text-sm text-gray-500">Project will be published immediately and visible in your portfolio.</p>
                                </form>
                            </div>

                            {/* Projects List */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Published Projects</h2>
                                {projects.length === 0 ? (
                                    <div className="text-center py-8">
                                        <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                        <p className="text-gray-500">No projects created yet</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {projects.map((project) => (
                                            <div key={project.id} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-gray-900">{project.title}</h3>
                                                    <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                                                    {project.technologies && project.technologies.length > 0 && (
                                                        <div className="flex flex-wrap gap-1 mt-2">
                                                            {project.technologies.slice(0, 3).map((tech: string, index: number) => (
                                                                <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                                                    {tech}
                                                                </span>
                                                            ))}
                                                            {project.technologies.length > 3 && (
                                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                                                    +{project.technologies.length - 3} more
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                    <p className="text-sm text-gray-500 mt-2">
                                                        Created {new Date(project.createdAt).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </p>
                                                </div>
                                                <div className="ml-4 flex space-x-2">
                                                    <button 
                                                        onClick={() => setEditingProject(project)} 
                                                        className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button 
                                                        onClick={() => setDeleteConfirmation({ type: 'project', id: project.id, title: project.title })} 
                                                        className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Edit Post Modal */}
            {editingPost && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-96 overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold text-gray-900">Edit Post</h3>
                                <button
                                    onClick={() => setEditingPost(null)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <form onSubmit={(e) => { e.preventDefault(); updatePost(new FormData(e.currentTarget)); }} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                    <input 
                                        name="title" 
                                        defaultValue={editingPost.title}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                        placeholder="Enter post title" 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                                    <textarea 
                                        name="content" 
                                        defaultValue={editingPost.content || ''}
                                        rows={6}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                        placeholder="Write your post content here..." 
                                    />
                                </div>
                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => setEditingPost(null)}
                                        className="px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        disabled={updatingPost} 
                                        className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                    >
                                        {updatingPost ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Updating...
                                            </>
                                        ) : (
                                            'Update Post'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Project Modal */}
            {editingProject && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-96 overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold text-gray-900">Edit Project</h3>
                                <button
                                    onClick={() => setEditingProject(null)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <form onSubmit={(e) => { e.preventDefault(); updateProject(new FormData(e.currentTarget)); }} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                                        <input 
                                            name="title" 
                                            defaultValue={editingProject.title}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                            placeholder="Enter project title" 
                                            required 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail URL</label>
                                        <input 
                                            name="thumbnailUrl" 
                                            defaultValue={editingProject.thumbnailUrl || ''}
                                            type="url"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                            placeholder="https://example.com/image.jpg" 
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea 
                                        name="description" 
                                        defaultValue={editingProject.description}
                                        rows={4}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                        placeholder="Describe your project..." 
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Repository URL</label>
                                        <input 
                                            name="repoUrl" 
                                            defaultValue={editingProject.repoUrl || ''}
                                            type="url"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                            placeholder="https://github.com/username/repo" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Live Demo URL</label>
                                        <input 
                                            name="liveUrl" 
                                            defaultValue={editingProject.liveUrl || ''}
                                            type="url"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                            placeholder="https://myproject.vercel.app" 
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Features (one per line)</label>
                                        <textarea 
                                            name="features" 
                                            defaultValue={editingProject.features ? editingProject.features.join('\n') : ''}
                                            rows={4}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                            placeholder="User authentication&#10;Real-time notifications&#10;Responsive design"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Technologies (comma separated)</label>
                                        <textarea 
                                            name="technologies" 
                                            defaultValue={editingProject.technologies ? editingProject.technologies.join(', ') : ''}
                                            rows={4}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                            placeholder="Next.js, TypeScript, Tailwind CSS, Prisma"
                                        />
                                    </div>
                                </div>
                                
                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => setEditingProject(null)}
                                        className="px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        disabled={updatingProject} 
                                        className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                    >
                                        {updatingProject ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Updating...
                                            </>
                                        ) : (
                                            'Update Project'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-lg max-w-md w-full">
                        <div className="p-6">
                            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Delete {deleteConfirmation.type === 'post' ? 'Post' : 'Project'}
                                </h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Are you sure you want to delete &quot;<span className="font-medium">{deleteConfirmation.title}</span>&quot;? 
                                    This action cannot be undone.
                                </p>
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setDeleteConfirmation(null)}
                                    disabled={deleting}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleConfirmDelete}
                                    disabled={deleting}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                >
                                    {deleting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Deleting...
                                        </>
                                    ) : (
                                        'Delete'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
