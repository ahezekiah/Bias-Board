'use client';

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FavoriteCard from "@/components/FavoriteCard";
import { apiRequest, getUser } from "@/lib/api";


// Only gets the data.
// It does NOT update state.
async function fetchFavorites() {
    return apiRequest('/favorites', {}, true);;
}

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const safeFavorites = Array.isArray(favorites) ? favorites : [];

    // Used by FavoriteCard when something changes.
    const loadFavorites = useCallback(async () => {
        try {
                const data = await fetchFavorites();
                console.log('Favorites Response:', data);
                setFavorites(Array.isArray(data) ? data : []);
                setError('');
            } catch (error) {
                setFavorites([]);
                setError(error.message);
                if (error.message === 'Authentication required' || error.message === 'Invalid or expired token') {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.dispatchEvent(new Event('auth-change'));
                    router.push('/login');
                }
            } finally {
                setLoading(false);
            }
    }, [router]);

    useEffect(() => {
        const currentUser = getUser();
        if (!currentUser) {
            router.push('/login');
            return;
        }
        async function initializeFavorites() {
            try {
                const data = await fetchFavorites();
                console.log('Favorites Response:', data);
                setUser(currentUser);
                setFavorites(Array.isArray(data) ? data : []);
                setError('');
            } catch (error) {
                setFavorites([]);
                setError(error.message);
                if (error.message === 'Authentication required' || error.message === 'Invalid or expired token') {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.dispatchEvent(new Event('auth-change'));
                    router.push('/login');
                }
            } finally {
                setLoading(false);
            }
        }
        initializeFavorites();
    }, [router]);

    if (loading) {
        return (
            <section className="section">
                <p>Loading you Bias List...</p>
            </section>
        );
    }
    return (
        <section className="section">
            <p className="eyebrow">YOUR COLLECTION!!!</p>
            <h1>{user?.username}&apos;s Bias List</h1>
            <p className="pageDescription">Your Personal K-pop Lineup.</p>
            <div className="stats">
                <div>
                    <strong>{safeFavorites.length}</strong>
                    <span>Total Biases</span>
                </div>
                <div>
                    <strong>
                        {safeFavorites.filter((favorite) => Number(favorite.ranking) === 10).length}
                    </strong>
                    <span>Perfect 10s</span>
                </div>
            </div>
            {error && (
                <p className="error">{error}</p>
            )}
            {favorites.length === 0 ? (
                <div className="emptyState">
                    <h2>Your Bias List is Empty 💔</h2>
                    <p>
                        Head over to the Idol Catalog and find
                        somebody worthy of the list.
                    </p>
                </div>
            ) : (
                <div className="favoritesGrid">
                    {favorites.map((favorite) => (
                        <FavoriteCard key={favorite.id} favorite={favorite} onChange={loadFavorites}/>
                    ))}
                </div>
            )}
        </section>
    );
}