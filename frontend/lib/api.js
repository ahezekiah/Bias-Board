export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function getToken() {
    if (typeof window === 'undefined') {
        return null;
    }
    return localStorage.getItem('token');
}

export function getUser(){
    if (typeof window === 'undefined') {
        return null;
    }

    try {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    } catch {
        localStorage.removeItem('user');
        return null;
    }
    
}

export async function apiRequest(endpoint, options = {}, requireAuth = false) {
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    if (requireAuth) {
        const token = getToken();
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Something went wrong!');
    }

    return data;
}
