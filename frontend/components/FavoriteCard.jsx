'use client';

import { useState } from "react";
import { apiRequest } from "@/lib/api";
import Image from "next/image";

export default function FavoriteCard({ favorite, onChange }) {
    const [editing, setEditing] = useState(false);
    const [ranking, setRanking] = useState(favorite.ranking || 10);
    const [notes, setNotes] = useState(favorite.notes || '');
    const [error, setError] = useState('');

    async function saveChanges() {
        try {
            await apiRequest(`/favorites/${favorite.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    ranking: Number(ranking),
                    notes
                }),
            }, true);
            setEditing(false);
            onChange();
        } catch (error) {
            setError(error.message);
        }
    }

    async function removeBias() {
        const confirmed = window.confirm(`Remove ${favorite.stage_name} from your Bias List?`);

        if (!confirmed) {
            return;
        }

        try {
            await apiRequest(`/favorites/${favorite.id}`, {
                method: 'DELETE'
            }, true);
            onChange();
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <article className="favoriteCard">
            <Image src={favorite.image_url || '/images/no-product-image-400x400-1.png'} alt={favorite.stage_name || 'Stage Name'} width={100} height={320} unoptimized referrerPolicy="no-referrer"/>
            <div className="favoriteContent">
                <span className="groupBadge">{favorite.group_name}</span>
                <h2>{favorite.stage_name}</h2>
                {!editing ? (
                    <>
                        <div className="ranking">
                            {favorite.ranking}/10
                        </div>
                        <p>
                            {favorite.notes || 'No Notes Have Been Added Yet.'}
                        </p>
                        <div className="cardActions">
                            <button className="button" onClick={() => setEditing(true)}>
                                Edit Idol
                            </button>
                            <button className="button danger" onClick={removeBias}>
                                Remove Idol
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="editForm">
                        <label>
                            Ranking
                            <select value={ranking} onChange={(event) => setRanking(event.target.value)}>
                                {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1,].map((number) => (
                                    <option key={number} value={number}>
                                        {number}/10
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Notes
                            <textarea value={notes} onChange={(event) => setNotes(event.target.value)}/>
                        </label>
                        <div className="cardActions">
                            <button className="button" onClick={saveChanges}>Save Changes</button>
                            <button className="button secondary" onClick={() => setEditing(false)}>Cancel Changes</button>
                        </div>
                    </div>
                )}
                {error && (
                    <p className="error">{error}</p>
                )}
            </div>
        </article>
    );
}