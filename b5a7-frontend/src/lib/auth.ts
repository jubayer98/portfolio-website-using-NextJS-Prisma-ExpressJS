const ACCESS_KEY = 'b5a7_access';
const REFRESH_KEY = 'b5a7_refresh';

export function getAccessToken() {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(ACCESS_KEY);
}
export function getRefreshToken() {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(REFRESH_KEY);
}
export function setTokens(access?: string, refresh?: string) {
    if (typeof window === 'undefined') return;
    if (access) localStorage.setItem(ACCESS_KEY, access);
    if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
}
export function clearTokens() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
}
export function isAuthed() {
    return !!getAccessToken();
}
