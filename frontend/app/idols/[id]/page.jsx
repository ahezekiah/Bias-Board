'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiRequest, getUser } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { FaInsagram } from 'react-icons/fa';

export default function IdolDetails() {
    const params = useParams();
    const id = params.id;
    const router = useRouter();
    const [idol, setIdol] = useState(null);
    const [ranking, setRanking] = useState(10);
    const [notes, setNotes] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadIdol() {
            try {
                console.log('Frontend idol ID:', id);
                const data = await apiRequest(`/idols/${id}`);
                setIdol(data);
            } catch (error) {
                setError(error.message);
            }
        }
        if (id) {
            loadIdol();
        }
    }, [id]);

    async function addBias(e) {
        e.preventDefault();
        const user = getUser();

        if (!user) {
            router.push('/login');
            return;
        }

        try {
            await apiRequest('/favorites', {
                method: 'POST',
                body: JSON.stringify({
                    idol_id: Number(id),
                    ranking: Number(ranking),
                    notes
                }),
            }, true);

            setMessage('Added to your Bias List! 💖');
            setError('');
        } catch (error) {
            setError(error.message);
            setMessage('');
        }
    }

    if (error && !idol) {
        return (
            <section className="section">
                <p className="error">{error}</p>
            </section>
        );
    }

    if (!idol) {
        return (
            <section className="section">
                <p>Loading Idol...</p>
            </section>
        );
    }
    return (
        <section className="section">
            <div className="idolDetails">
                <Image className='detailImage' src={idol.image_url} alt={idol.stage_name} width={700} height={650}/>
                <div>
                    <span className="groupBadge">{idol.group_name}</span>
                    <h1>{idol.stage_name}</h1>
                    <p className="muted">{idol.real_name}</p>
                    <h3>{idol.position}</h3>
                    <div className="idolFacts">
                        <div>
                            <span className="factLabel">Birthday</span>
                            <p>
                                {idol.birthday ? new Date(idol.birthday).toLocaleDateString() : 'Not Available'}
                            </p>
                        </div>
                        <div>
                            <span className="factLabel">MBTI</span>
                            <p>{idol.mbti || 'Not Available'}</p>
                        </div>
                        <div>
                            <span className="factLabel">Nationality</span>
                            <p>{idol.nationality || 'Not Available'}</p>
                        </div>
                        <div>
                            <span className="factLabel">Generation of K-pop</span>
                            <p>{idol.generation || 'Not Available'}</p>
                        </div> 
                        <div>
                            <span className="factLabel">Full Profession</span>
                            <p>{idol.full_profession || 'Not Available'}</p>
                        </div>
                    </div>
                    {idol.bio && (
                        <div className="idolBio">
                            <h2>Learn About {idol.stage_name}</h2>
                            <p>{idol.bio}</p>
                        </div>    
                    )}
                    {idol.instagram && (
                        <Link href={idol.instagram} target="_blank" rel="noopener noreferrer" className="instagramLink">
                            View Instagram
                        </Link>
                    )}
                    <hr />
                    <h2>Add to My Biases</h2>
                    <form onSubmit={addBias} className="biasForm">
                        <label>
                            <select value={ranking} onChange={(event) => setRanking(event.target.value)}>
                                {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((number) => (
                                    <option key={number} value={number}>
                                        {number}/10
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Notes
                            <textarea value={notes} onChange={(event) => setNotes(event.target.value)}
                                placeholder={`Why is ${idol.stage_name} your bias?`}/>
                        </label>
                        <button className="button">Add to Bias List</button>
                        {message && (
                            <p className="success">{message}</p>
                        )}
                        {error && (
                            <p className="error">{error}</p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}