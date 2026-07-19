import express from 'express';
import cors from 'cors';
import guestbookRouter from './routes/guestbook.js';
import { query } from './db.js';

const app = express();
const port = process.env.API_PORT || 4000;
let dbReady = false;

async function initializeDatabase() {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS guestbook_entries (
        id SERIAL PRIMARY KEY,
        nama VARCHAR(100) NOT NULL,
        pesan TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    dbReady = true;
    console.log('Database table ready');
  } catch (error) {
    dbReady = false;
    console.warn('Database unavailable; continuing without table initialization:', error.message);
  }
}

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', database: dbReady ? 'connected' : 'unavailable' });
});

app.use('/api/guestbook', guestbookRouter);

app.listen(port, '0.0.0.0', async () => {
  console.log(`Backend running on port ${port}`);
  await initializeDatabase();
});
