import express from 'express';
import pool from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
router.use(authenticateToken);

/* 
    READ
*/
router.get('/', async (req, res, next) => {
    try {
        const result = await pool.query(
            `
                SELECT
                    favorites.id,
                    favorites.ranking,
                    favorites.notes,
                    favorites.created_at,
                    idols.id AS idol_id,
                    idols.stage_name,
                    idols.real_name,
                    idols.group_name,
                    idols.position,
                    idols.image_url,
                    idols.birthday,
                    idols.mbti,
                    idols.nationality,
                    idols.full_profession,
                    idols.generation,
                    idols.bio,
                    idols.instagram
                FROM favorites
                JOIN idols 
                    ON favorites.idol_id = idols.id
                WHERE favorites.user_id = $1
                ORDER BY favorites.ranking DESC NULLS LAST
            `,
            [req.user.id]
        );

        res.json(result.rows);
    } catch (error) {
        next(error);
    }
});

/* 
    CREATE
*/
router.post('/', async (req, res, next) => {
    try {
        const { idol_id, ranking, notes } = req.body;

        if (!idol_id) {
            return res.status(400).json({ error: 'idol_id is required.' });
        }

        if (ranking && (ranking < 1 || ranking > 10)) {
            return res.status(400).json({ error: 'Ranking must be between 1 and 10.' });
        }

        const idol = await pool.query(
            `
                SELECT id
                FROM idols
                WHERE id = $1
            `,
            [idol_id]
        );

        if (idol.rows.length === 0) {
            return res.status(404).json({ error: 'Idol Not Found.' });
        }

        const result = await pool.query(
            `
                INSERT INTO favorites
                (
                    user_id,
                    idol_id,
                    ranking,
                    notes
                )
                VALUES ($1, $2, $3, $4)
                RETURNING *
            `,
            [
                req.user.id,
                idol_id,
                ranking ? Number(ranking) : null,
                notes || ''
            ]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({ error: 'That Idol is already in your Bias List!' });
        }
        next(error);
    }
});

/* 
    UPDATE
*/
router.put('/:id', async (req, res, next) => {
    try {
        const { ranking, notes } = req.body;

        if (ranking && (ranking < 1 || ranking > 10)) {
            return res.status(400).json({ error: 'Ranking must be between 1 and 10.'});
        }

        const result = await pool.query(
            `
                UPDATE favorites
                SET
                    ranking = $1,
                    notes = $2
                WHERE id = $3
                    AND user_id = $4
                RETURNING *
            `,
            [
                ranking || null,
                notes || '',
                req.params.id,
                req.user.id
            ]
        );

        if ( result.rows.length === 0) {
            return res.status(404).json({ error: 'Favorite Not Found.' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
});

/* 
    DELETE
*/
router.delete('/:id', async (req, res, next) => {
    try {
        const result = await pool.query(
            `
                DELETE FROM favorites
                WHERE id = $1
                    AND user_id = $2
                RETURNING *
            `,
            [req.params.id, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Favorite Not Found.' });
        }

        res.json({ message: 'Bias Removed!' });
    } catch (error) {
        next(error);
    }
});

export default router;