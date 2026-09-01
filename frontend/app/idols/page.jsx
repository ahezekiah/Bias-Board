'use client';

import { useEffect, useState } from "react";
import IdolCard from "@/components/IdolCard";
import { apiRequest } from "@/lib/api";

export default function IdolsPage() {
    const [idols, setIdols] = useState([]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadIdols() {
            try {
                const data = await apiRequest('/idols');
                setIdols(data);
            } catch (error) {
                setError(error.message);
            }
        }
        loadIdols();
    }, []);

    const filteredIdols = idols.filter((idol) => {
        const value = search.toLowerCase();
        return (
            idol.stage_name.toLowerCase().includes(value) ||
            idol.group_name.toLowerCase().includes(value)
        );
    })

    return (
        <section className="section">
            <p className="eyebrow">DISCOVER</p>
            <h1>K-pop Idols</h1>
            <p className="pageDescription">
                Browse artists and find your next bias.
            </p>
            <input className="searchInput" placeholder="Search for Idol or Group..." value={search} onChange={(event) => setSearch(event.target.value)}/>
            {error && <p className="error">{error}</p>}
            <div className="idolGrid">
                {filteredIdols.map((idol) => (
                    <IdolCard key={idol.id} idol={idol} />
                ))}
            </div>
            {filteredIdols.length === 0 && (
                <p>No Idols Found.</p>
            )}
        </section>
    );
}