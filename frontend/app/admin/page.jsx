'use client';

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminIdolCard from "@/components/AdminIdolCard";
import { apiRequest, getUser } from "@/lib/api";
import Image from "next/image";

const emptyForm = {
    stage_name: '',
    real_name: '',
    group_name: '',
    position: '',
    image_url: '',
    birthday: '',
    mbti: '',
    nationality: '',
    full_profession: '',
    generation: '',
    bio: '',
    instagram: ''
};

export default function AdminPage() {
    const router = useRouter();
    const [idols, setIdols] = useState([]);
    const [user, setUser] = useState(null);
    const [search, setSearch] = useState('');
    const [form, setForm] = useState(emptyForm);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const loadIdols = useCallback(async () => {
        try {
            const data = await apiRequest('/idols');
            setIdols(data);
        } catch (error) {
            setError(error.message);
        }
    }, []);

    useEffect(() => {
        async function initializeAdminPage() {
            const currentUser = getUser();
            if (!currentUser) {
                router.replace('/login');
                return;
            }
            if (currentUser.role !== 'admin') {
                router.replace('/dashboard');
                return;
            }
            setUser(currentUser);
            await loadIdols();
            setLoading(false);
        }
        initializeAdminPage();
    }, [router, loadIdols]);


    const filteredIdols = idols.filter((idol) => {
        const value = search.toLowerCase();
        return (
            idol.stage_name.toLowerCase().includes(value) ||
            idol.group_name.toLowerCase().includes(value)
        );
    })

    function handleChange(event) {
        const { name, value } = event.target;
        setForm((current) => ({
            ...current,
            [name]: value
        }));
    }

    async function handleCreate(e) {
        e.preventDefault();
        setError('');
        setMessage('');
        setSaving(true);
        try {
            const createdIdol = await apiRequest('/idols', {
                method: "POST",
                body: JSON.stringify(form)
            }, true);
            setMessage(`${createdIdol.stage_name} was added successfully.`);
            setForm(emptyForm);
            setShowForm(false);
            await loadIdols();
        } catch (error) {
            setError(error.message);
        } finally {
            setSaving(false);
        }
    }

    function cancelCreate() {
        setForm(emptyForm);
        setShowForm(false);
        setError('');
    }

    if (loading) {
        return (
            <section className="section">
                Loading Admin Dashboard...
            </section>
        );
    }
    return (
        <section className="section">
            <div className="adminHeader">
                <div>
                    <p className="eyebrow">ADMIN DASHBOARD</p>
                    <h1>Manage Idols</h1>
                    <p className="pageDescription">
                        Welcome {user?.username}. Create Update, and Delete Idols from the BiasBoard Catalog.
                    </p>
                </div>
                {!showForm && (
                    <button type="button" className="button" onClick={() => {
                        setShowForm(true); setMessage(''); setError('');
                    }}>
                        + Add Idol
                    </button>
                )}
            </div>
            {message && (
                <p className="success">{message}</p>
            )}
            {error && !showForm && (
                <p className="error">{error}</p>
            )}
            {showForm && (
                <div className="adminCreateSection">
                    <div className="adminFormHeader">
                        <div>
                            <p className="eyebrow">NEW ARTIST</p>
                            <h2>Add An Idol</h2>
                        </div>
                    </div>
                    <form className="adminCreateForm" onSubmit={handleCreate}>
                        <div className="formGrid">
                            <label>
                                Stage Name *
                                <input name="stage_name" value={form.stage_name} onChange={handleChange} placeholder="Jungkook" required />
                            </label>
                            <label>
                                Real Name
                                <input name="real_name" value={form.real_name} onChange={handleChange} placeholder="Jeon Jung-kook" />
                            </label>
                            <label>
                                Group *
                                <input name="group_name" value={form.group_name} onChange={handleChange} placeholder="BTS" required />
                            </label>
                            <label>
                                Position *
                                <input name="position" value={form.position} onChange={handleChange} placeholder="Leader, Vocalist, Dancer, Rapper, etc..." required />
                            </label>
                            <label>
                                Birthday *
                                <input name="birthday" type="date" value={form.birthday ? form.birthday.split('T')[0] : ''} onChange={handleChange} required/>
                            </label>
                            <label>
                                MBTI
                                <input name="mbti" value={form.mbti} onChange={handleChange} placeholder="ENFP, ISTJ, ENFJ, INTP, etc..." />
                            </label>
                            <label>
                                Nationality
                                <input name="nationality" value={form.nationality} onChange={handleChange} placeholder="South Korean, Japanese, Korean-American, etc..." />
                            </label>
                            <label>
                                Full Profession
                                <input name="full_profession" value={form.full_profession} onChange={handleChange} placeholder="Model, Singer, Actor/Actress, Producer, etc..." />
                            </label>
                            <label>
                                Generation of K-pop
                                <input name="generation" value={form.generation} onChange={handleChange} placeholder="1st Gen, 2nd Gen, 3rd Gen, 4th Gen, 5th Gen, etc..." />
                            </label>
                            <label>
                                Instagram
                                <input name="instagram" value={form.instagram} onChange={handleChange} placeholder="https://www.instagram.com/@username" />
                            </label>
                        </div>
                        <label>
                            Image URL *
                            <input type="url" name="image_url" value={form.image_url} onChange={handleChange} placeholder="https://example.com/jungkook.jpg" required />
                        </label>
                        {form.image_url && (
                            <div className="adminImagePreview">
                                <p>Image Preview</p>
                                <Image src={form.image_url || '/images/no-product-image-400x400-1.png'} alt="New Idol Preview" width={400} height={500} unoptimized referrerPolicy="no-referrer"/>
                            </div>
                        )}
                        <label>
                            Bio
                            <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Short biography about the Idol..." />
                        </label>
                        {error && (
                            <p className="error">{error}</p>
                        )}
                        <div className="cardActions">
                            <button type="submit" className="button" disabled={saving}>{saving ? 'Adding Idol' : 'Add Idol'}</button>
                            <button type="button" className="button secondary" onClick={cancelCreate} disabled={saving}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
            <div className="adminCatalogHeader">
                <div>
                    <p className="eyebrow">CATALOG</p>
                    <h2>Current Idols</h2>
                </div>
                <span className="adminCount">
                    {idols.length}{' '}
                    {idols.length === 1 ? 'idol' : 'idols'}
                </span>
            </div>
            {idols.length === 0 ? (
                <div className="emptyState">
                    <h2>No Idols Yet.</h2>
                    <p>Add the first idol to the BiasBoard Catalog.</p>
                </div>
            ) : (
                <>
                    <input className="searchInput" placeholder="Search for Idol or Group..." value={search} onChange={(event) => setSearch(event.target.value)} />
                    {error && <p className="error">{error}</p>}
                    <div className="adminIdolGrid">
                        {filteredIdols.map((idol) => (
                            <AdminIdolCard key={idol.id} idol={idol} onChange={loadIdols} />
                        ))}
                    </div>
                    {filteredIdols.length === 0 && (
                        <p>No Idols Found.</p>
                    )}
                </>
            )}
        </section>
    );
}