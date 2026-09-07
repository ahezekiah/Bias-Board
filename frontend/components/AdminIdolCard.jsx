'use client';

import { useState } from "react";
import { apiRequest } from "@/lib/api";
import Image from "next/image";

export default function AdminIdolCard({ idol, onChange }) {
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState({
        stage_name: idol.stage_name || '',
        real_name: idol.real_name || '',
        group_name: idol.group_name || '',
        position: idol.position || '',
        image_url: idol.image_url || '',
        birthday: idol.birthday || '',
        mbti: idol.mbti || '',
        nationality: idol.nationality || '',
        full_profession: idol.full_profession || '',
        generation: idol.generation || '',
        bio: idol.bio || '',
        instagram: idol.instagram || ''
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setForm((current) => ({
            ...current,
            [name]: value
        }));
    }

    async function handleUpdate(e) {
        e.preventDefault();
        setError('');
        try {
            await apiRequest(`/idols/${idol.id}`,{
                method: "PUT",
                body: JSON.stringify(form)
            }, true);
            setEditing(false);
            await onChange();
        } catch (error) {
            setError(error.message);
        }
    }

    async function handleDelete() {
        const confirmed = window.confirm(`Are you sure that you want to delete ${idol.stage_name} from BiasBoard?`);
        if (!confirmed) {
            return;
        }
        setError('');
        try {
            await apiRequest(`/idols/${idol.id}`, {
                method: "DELETE"
            }, true);
            await onChange();
        } catch (error) {
            setError(error.message);
        }
    }

    if (editing) {
        return (
            <article className="adminIdolCard">
                <form className="adminEditForm" onSubmit={handleUpdate}>
                    <h2>Edit {idol.stage_name}</h2>
                    <div className="formGrid">
                        <label>
                            Stage Name *
                            <input name="stage_name" value={form.stage_name} onChange={handleChange} required/>
                        </label>
                        <label>
                            Real Name
                            <input name="real_name" value={form.real_name} onChange={handleChange}/>
                        </label>
                        <label>
                            Group *
                            <input name="group_name" value={form.group_name} onChange={handleChange} required/>
                        </label>
                        <label>
                            Position *
                            <input name="position" value={form.position} onChange={handleChange} placeholder="Leader, Vocalist, Dancer, Rapper, etc..." required/>
                        </label>
                        <label>
                            Birthday *
                            <input name="birthday" type="date" value={form.birthday ? form.birthday.split('T')[0] : ''} onChange={handleChange} required/>
                        </label>
                        <label>
                            MBTI
                            <input name="mbti" value={form.mbti} onChange={handleChange} placeholder="ENFP, ISTJ, ENFJ, INTP, etc..."/>
                        </label>
                        <label>
                            Nationality
                            <input name="nationality" value={form.nationality} onChange={handleChange} placeholder="South Korean, Japanese, Korean-American, etc..."/>
                        </label>
                        <label>
                            Full Profession
                            <input name="full_profession" value={form.full_profession} onChange={handleChange} placeholder="Model, Singer, Actor/Actress, Producer, etc..."/>
                        </label>
                        <label>
                            Generation of K-pop
                            <input name="generation" value={form.generation} onChange={handleChange} placeholder="1st Gen, 2nd Gen, 3rd Gen, 4th Gen, 5th Gen, etc..."/>
                        </label>
                        <label>
                            Instagram
                            <input name="instagram" value={form.instagram} onChange={handleChange} placeholder="https://www.instagram.com/@username"/>
                        </label>
                    </div>
                    <label>
                        Image URL *
                        <input type="url" name="image_url" value={form.image_url} onChange={handleChange} required/>
                    </label>
                    <label>
                        Bio
                        <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Short biography about the Idol..."/>
                    </label>
                    {error && (
                        <p className="error">{error}</p>
                    )}
                    <div className="cardActions">
                        <button type="submit" className="button">Save Changes</button>
                        <button type="button" className="button secondary" onClick={() => setEditing(false)}>Cancel Changes</button>
                    </div>
                </form>
            </article>
        );
    }

    return (
        <article className="adminIdolCard">
            <div className="adminIdolImage">
                <Image src={idol.image_url || '/images/no-product-image-400x400-1.png'} alt={idol.stage_name || 'Stage Name'} width={400} height={500} unoptimized referrerPolicy="no-referrer"/>
            </div>
            <div className="adminIdolInfo">
                <span className="groupBadge">
                    {idol.group_name}
                </span>
                <h2>{idol.stage_name}</h2>
                <p className="muted">{idol.real_name || 'No Real Name Provided.'}</p>
                <p>{idol.position || 'No Position Provided.'}</p>
                {error && (
                    <p className="error">{error}</p>
                )}
                <div className="cardActions">
                    <button type="button" className="button" onClick={() => setEditing(true)}>Edit Idol</button>
                    <button type="button" className="button danger" onClick={handleDelete}>Delete Idol</button>
                </div>
            </div>
        </article>
    );
}