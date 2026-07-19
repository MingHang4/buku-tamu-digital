import express from 'express';
import { query } from '../db.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const result = await query('SELECT * FROM guestbook_entries ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal mengambil data' });
  }
});

router.post('/', async (req, res) => {
  const { nama, pesan } = req.body;

  if (!nama || !pesan) {
    return res.status(400).json({ error: 'Nama dan pesan wajib diisi' });
  }

  try {
    const result = await query(
      'INSERT INTO guestbook_entries (nama, pesan) VALUES ($1, $2) RETURNING *',
      [nama, pesan]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal menambah data' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await query('DELETE FROM guestbook_entries WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Data tidak ditemukan' });
    }
    res.json({ message: 'Data berhasil dihapus' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal menghapus data' });
  }
});

export default router;
