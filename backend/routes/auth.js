import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const router = express.Router();

router.post('/register', async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Username, Email, and Password are required.' });
        }
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters.' });
        }

        const existingUser = await pool.query(
            `
                SELECT id
                FROM users
                WHERE email = $1 OR username = $2
            `, 
            [email.toLowerCase(), username]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({ error: 'Email or Username already exists! '});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `
                INSERT INTO users
                (username, email, password)
                VALUES ($1, $2, $3)
                RETURNING id, username, email, role
            `,
            [username, email.toLowerCase(), hashedPassword]
        );

        const newUser = result.rows[0];

        const token = jwt.sign(
            {
                id: newUser.id,
                username: newUser.username,
                role: newUser.role
            },
            process.env.JWT_SECRET,
            { 
                expiresIn: '2h' 
            }
        );

        res.status(201).json({
            message: 'Account Created!',
            token,
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and Password are required.' });
        }

        const result = await pool.query(
            `
                SELECT *
                FROM users
                WHERE username = $1
            `,
            [username]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password. '});
        }

        const user = result.rows[0];
        const passwordMatches = await bcrypt.compare(password, user.password);

        if (!passwordMatches) {
            return res.status(401).json({ error: 'Invalid username or password. '});
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET,
            { 
                expiresIn: '2h' 
            }
        );

        res.status(201).json({
            message: 'Login Successful!',
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
});

export default router;