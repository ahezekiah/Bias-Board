'use client';

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { getUser } from "@/lib/api";
import { useRouter } from "next/navigation";

function subscribe(callback) {
    window.addEventListener('storage', callback);
    window.addEventListener('auth-change', callback);
    return () => {
        window.removeEventListener('storage', callback);
        window.removeEventListener('auth-change', callback);
    }
}

function getUserSnapshot() {
    const storedUser = localStorage.getItem('user');
    return storedUser;
}

function getServerSnapshot() {
    return null;
}

export default function Navbar(){
    const router = useRouter();
    const storedUser = useSyncExternalStore(subscribe, getUserSnapshot, getServerSnapshot);
    const user = storedUser ? JSON.parse(storedUser) : null;

    function logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('auth-change'));
        router.push('/');
        router.refresh();
    }
    return (
        <nav className="navbar">
            <Link href='/' className="logo">
                BiasBoard ✦
            </Link>
            <div className="navLinks">
                <Link href='/'>Home</Link>
                <Link href='/idols'>Idols</Link>
                {user && <Link href='/dashboard'>My Biases</Link>}
                {user?.role === 'admin' && (
                    <Link href='/admin' className="adminNavLink">Admin</Link>
                )}
                {!user ? (
                    <>
                        <Link href='/login'>Login</Link>
                        <Link href='/register' className="button small">Join Now</Link>
                    </>
                ) : (
                    <>
                        <span className="username">
                            @{user.username}
                        </span>
                        <button onClick={logout} className="button small secondary">Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
}