import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool(
    process.env.DATABASE_URL
        ? {
            connectionString: process.env.DATABASE_URL,
            ssl:
                process.env.NODE_ENV ? { rejectUnauthorized: false } : false
        }
        : {
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT
        }
);

pool.on('connect', () => {
    console.log('Connected to PostgreSQL');
});

pool.on('error', error => {
    console.error('Unexpected PostgreSQL error:', error);
});

export default pool;