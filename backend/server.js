import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import idolRoutes from './routes/idols.js';
import favoriteRoutes from './routes/favorites.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());


// Auth Check/Logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    console.log('Authorization:', req.headers.authorization);
    next();
})

app.get('/', (req, res) => {
    res.json({ message: 'BiasBoard API is Running! 🎤' });
});

app.use('/api/auth', authRoutes);
app.use('/api/idols', idolRoutes);
app.use('/api/favorites', favoriteRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint Not Found.' });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`BiasBoard API running on http://localhost:${PORT}`);
});