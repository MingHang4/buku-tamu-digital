import { useEffect, useState } from 'react'
import './index.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

function App() {
  const [entries, setEntries] = useState([])
  const [nama, setNama] = useState('')
  const [pesan, setPesan] = useState('')
  const [error, setError] = useState('')

  const fetchEntries = async () => {
    try {
      const res = await fetch(`${API_URL}/api/guestbook`)
      const data = await res.json()
      setEntries(data)
    } catch (err) {
      setError('Gagal memuat data dari server')
    }
  }

  useEffect(() => {
    fetchEntries()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const res = await fetch(`${API_URL}/api/guestbook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nama, pesan }),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error || 'Terjadi kesalahan')
      return
    }

    setNama('')
    setPesan('')
    fetchEntries()
  }

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/api/guestbook/${id}`, { method: 'DELETE' })
    fetchEntries()
  }

  return (
    <div className="container">
      <h1>📖 Buku Tamu Digital</h1>
      <p className="subtitle">Tinggalkan pesan dan kesanmu di sini</p>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Nama kamu"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
        <textarea
          placeholder="Tulis pesan atau kesanmu..."
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Kirim Pesan</button>
      </form>

      <div className="entries">
        <h2>Pesan dari Pengunjung ({entries.length})</h2>
        {entries.length === 0 && <p className="empty">Belum ada pesan, jadilah yang pertama!</p>}
        {entries.map((entry) => (
          <div key={entry.id} className="entry-card">
            <div className="entry-header">
              <strong>{entry.nama}</strong>
              <button onClick={() => handleDelete(entry.id)} className="delete-btn">
                Hapus
              </button>
            </div>
            <p>{entry.pesan}</p>
            <small>{new Date(entry.created_at).toLocaleString('id-ID')}</small>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
