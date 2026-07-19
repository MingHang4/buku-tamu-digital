# Buku Tamu Digital

Project UAS Cloud Computing dengan arsitektur 3 container: frontend React, backend Express, dan database PostgreSQL.

## Arsitektur
- Frontend: React + Vite + Nginx
- Backend: Node.js + Express
- Database: PostgreSQL

## Struktur Folder
- frontend/: aplikasi React
- backend/: API Express dan konfigurasi database
- docker-compose.yml: menjalankan stack multi-container

## Cara Menjalankan
1. Jalankan Docker Compose:
   ```bash
   docker compose up --build -d
   ```
2. Akses aplikasi:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:4000/health
3. Untuk melihat data buku tamu:
   ```bash
   curl http://localhost:4000/api/guestbook
   ```

## Fitur Utama
- Menampilkan daftar tamu
- Menambah pesan baru
- Menghapus pesan
- Health check API
- Persistent storage database PostgreSQL

## Simulasi Ketahanan
- Cek status layanan:
  ```bash
  docker compose ps
  ```
- Restart service backend:
  ```bash
  docker compose restart backend
  ```
- Cek health endpoint:
  ```bash
  curl http://localhost:4000/health
  ```
