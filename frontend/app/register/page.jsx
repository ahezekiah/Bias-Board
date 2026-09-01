'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiRequest } from "@/lib/api";

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    function handleChange(event) {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const data = await apiRequest('/auth/register', {
                method: 'POST',
                body: JSON.stringify(form)
            });
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.dispatchEvent(new Event('auth-change'));
            router.push('/dashboard');
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <section className="authSection">
            <form className="authCard" onSubmit={handleSubmit}>
                <p className="eyebrow">JOIN THE FANDOM!!!</p>
                <h1>Create an Account</h1>
                <label>
                    Username
                    <input name="username" type='text' value={form.username} onChange={handleChange} required/>
                </label>
                <label>
                    Email
                    <input name="email" type='email' value={form.email} onChange={handleChange} required/>
                </label>
                <label>
                    Password
                    <input name="password" type='password' value={form.password} onChange={handleChange} required minLength={6}/>
                </label>
                {error && (
                    <p className="error">{error}</p>
                )}
                <button className="button">Create Account</button>
                <p>
                    Already A Memeber?{" "}
                    <Link href='/login' className="clickable">Login Here</Link>
                </p>
            </form>
        </section>
    );
}