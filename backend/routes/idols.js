import express from 'express';
import pool from '../db.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

/* 
    PUBLIC
    GET All Idols
*/
router.get('/', async (req, res, next) => {
    try {
        const { group } = req.query;

        let result;

        if (group) {
            result = await pool.query(
                `
                    SELECT *
                    FROM idols
                    WHERE LOWER(group_name) LIKE LOWER($1)
                    ORDER BY stage_name
                `,
                [`%${group}%`]
            );
        } else {
            result = await pool.query(
                `
                    SELECT *
                    FROM idols
                    ORDER BY stage_name
                `
            );
        }
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
});

/* 
    PUBLIC
    GET One Idol
*/
router.get('/:id', async (req, res, next) => {
    try {
        const idolID = Number(req.params.id);

        console.log('Idol ID:', req.params.id);
        console.log('Params:', req.params);

        if(!Number.isInteger(idolID)) {
            return res.status(400).json({ error: 'Invalid Idol ID.' });
        }

        const result = await pool.query(
            `
                SELECT *
                FROM idols
                WHERE id = $1
            `,
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Idol Not Found.' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
});

/* 
    ADMIN ONLY
    CREATE Idol
*/
router.post('/', authenticateToken, requireAdmin, async (req, res, next) => {
    try {
        const { stage_name, real_name, group_name, position, image_url, birthday, mbti, nationality, full_profession, generation, bio, instagram } = req.body;

        if (!stage_name || !group_name) {
            return res.status(400).json({ error: 'Stage Name and Group Name are required.' });
        }

        const result = await pool.query(
            `
                INSERT INTO idols
                (
                    stage_name,
                    real_name,
                    group_name,
                    position,
                    image_url,
                    birthday,
                    mbti,
                    nationality,
                    full_profession,
                    generation,
                    bio,
                    instagram
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                RETURNING *
            `,
            [stage_name, real_name, group_name, position, image_url, birthday, mbti, nationality, full_profession, generation, bio, instagram]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
});

/* 
    ADMIN ONLY
    UPDATE Idol
*/
router.put('/:id', authenticateToken, requireAdmin, async (req, res, next) => {
    try {
        const { stage_name, real_name, group_name, position, image_url, birthday, mbti, nationality, full_profession, generation, bio, instagram } = req.body;

        const result = await pool.query(
            `
                UPDATE idols
                SET
                    stage_name = $1,
                    real_name = $2,
                    group_name = $3,
                    position = $4,
                    image_url = $5,
                    birthday = $6,
                    mbti = $7,
                    nationality = $8,
                    full_profession = $9,
                    generation = $10,
                    bio = $11, 
                    instagram = $12
                WHERE id = $13
                RETURNING *
            `,
            [stage_name, real_name, group_name, position, image_url, birthday, mbti, nationality, full_profession, generation, bio, instagram, req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Idol Not Found.' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
});

/* 
    ADMIN ONLY
    DELETE Idol
*/
router.delete('/:id', authenticateToken, requireAdmin, async (req, res, next) => {
    try {
        const result = await pool.query(
            `
                DELETE FROM idols
                WHERE id = $1
                RETURNING *
            `,
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Idol Not Found.' });
        }

        res.json({ message: 'Idol Deleted!' });
    } catch (error) {
        next(error);
    }
});

export default router;