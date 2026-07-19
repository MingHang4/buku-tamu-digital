import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST || (process.env.NODE_ENV === 'production' ? 'db' : 'localhost'),
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'guestbook',
  connectionTimeoutMillis: 3000,
});

export const query = (text, params) => pool.query(text, params);
export default pool;
