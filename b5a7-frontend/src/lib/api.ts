/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from './auth';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

export async function apiFetch<T>(path: string, opts: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(opts.headers as Record<string, string>),
    };

    const access = getAccessToken();
    if (access) headers['Authorization'] = `Bearer ${access}`;

    let res = await fetch(`${API_BASE}${path}`, { ...opts, headers, cache: 'no-store' });

    if (res.status === 401) {
        const refresh = getRefreshToken();
        if (refresh) {
            const rr = await fetch(`${API_BASE}/auth/refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refresh }),
            });
            if (rr.ok) {
                const jr = await rr.json();
                if (jr.access) setTokens(jr.access);
                headers['Authorization'] = `Bearer ${jr.access}`;
                res = await fetch(`${API_BASE}${path}`, { ...opts, headers, cache: 'no-store' });
            } else {
                clearTokens();
            }
        }
    }

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed: ${res.status}`);
    }
    
    // Handle empty responses (like DELETE operations)
    if (res.status === 204 || res.headers.get('content-length') === '0') {
        return null as T;
    }
    
    return res.json();
}

export const api = {
    // Auth
    async register(data: { email: string; password: string; name?: string }) {
        const json = await apiFetch<{ user: any; access: string; refresh: string }>(
            '/auth/register',
            { method: 'POST', body: JSON.stringify(data) }
        );
        setTokens(json.access, json.refresh);
        return json;
    },
    async login(data: { email: string; password: string }) {
        const json = await apiFetch<{ user: any; access: string; refresh: string }>(
            '/auth/login',
            { method: 'POST', body: JSON.stringify(data) }
        );
        setTokens(json.access, json.refresh);
        return json;
    },
    async refresh() {
        const refresh = getRefreshToken();
        if (!refresh) throw new Error('No refresh token');
        const json = await apiFetch<{ access: string }>('/auth/refresh', {
            method: 'POST',
            body: JSON.stringify({ refresh }),
        });
        if (json.access) setTokens(json.access);
        return json;
    },
    logout() { clearTokens(); },

    // Public Posts
    listPosts() { return apiFetch<any[]>('/posts'); },

    // Owner Posts
    createPost(data: { title: string; content?: string; published?: boolean }) {
        return apiFetch<any>('/posts', { method: 'POST', body: JSON.stringify(data) });
    },
    updatePost(id: string, data: Partial<{ title: string; content?: string; published?: boolean }>) {
        return apiFetch<any>(`/posts/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    deletePost(id: string) { return apiFetch<void>(`/posts/${id}`, { method: 'DELETE' }); },

    // Projects (public list)
    listProjects() { return apiFetch<any[]>('/projects'); },

    // Owner Projects
    createProject(data: { 
        title: string; 
        description: string; 
        thumbnailUrl?: string; 
        repoUrl?: string; 
        liveUrl?: string; 
        features?: string[]; 
        technologies?: string[]; 
        published?: boolean; 
        featured?: boolean; 
    }) {
        return apiFetch<any>('/projects', { method: 'POST', body: JSON.stringify(data) });
    },
    updateProject(id: string, data: Partial<{ 
        title: string; 
        description: string; 
        thumbnailUrl?: string; 
        repoUrl?: string; 
        liveUrl?: string; 
        features?: string[]; 
        technologies?: string[]; 
        published?: boolean; 
        featured?: boolean; 
    }>) {
        return apiFetch<any>(`/projects/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    deleteProject(id: string) { return apiFetch<void>(`/projects/${id}`, { method: 'DELETE' }); },
};
