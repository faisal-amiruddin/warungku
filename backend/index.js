const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const menuRoutes = require('./routes/menuRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Koneksi ke database duls
if (!MONGODB_URI) {
  console.error('ERROR: MONGODB_URI tidak ditemukan di .env file');
  process.exit(1);
}
  
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Berhasil terhubung cuy!'))
    .catch((err) => console.error('Gagal terhubung nih huhu...\nError: ', err));

// manajemen routes
app.get('/', (req, res) => {
    res.send('WarungKu API Jalan! Gaskuen');
});

app.use('/api/menu', menuRoutes);

// server
app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
})