const express = require('express');
const Menu = require('../Model/Menu');
const router = express.Router();

// ambil semua data
router.get('/', async (req, res) => {
    try {
        const menuList = await Menu.find();
        res.json({
            status: true,
            message: 'Berhasil mendapatkan data menu',
            data: menuList,
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Terjadi server error!!!',
            error: error.message
        })
    }
});

// buat data baru
router.post('/', async (req, res) => {
    if (!req.body.nama) {
        return res.status(400).json({
            status: false,
            message: 'request nama dibutuhkan'
        });
    }

    if (!req.body.kategori) {
        return res.status(400).json({
            status: false,
            message: 'request kategori dibutuhkan'
        });
    }

    if (!req.body.harga) {
        return res.status(400).json({
            status: false,
            message: 'request harga dibutuhkan'
        });
    }

    if (req.body.kategori !== 'Makanan' && req.body.kategori !== 'Minuman' && req.body.kategori !== 'Snack') {
        return res.status(400).json({
            status: false,
            message: 'Pilihan kategori salah, hanya menerima: Makanan, Minuman dan Snack'
        });
    }

    const menu = new Menu({
        nama: req.body.nama,
        kategori: req.body.kategori,
        harga: req.body.harga,
        tersedia: req.body.tersedia,
        deskripsi: req.body.deskripsi
    });

    try {
        const newMenu = await menu.save();
        res.status(201).json({
            status: true,
            message: 'Berhasil membuat menu baru!',
            data: newMenu
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: 'Bad Request'
        });
    }
});

// ambil data spesifik
router.get('/:id', async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id);

        if (!menu) {
            return res.status(404).json({
                status: false,
                message: 'Menu tidak ditemukan!'
            });
        }

        res.json({
            status: true,
            message: 'Berhasil mendapatkan menu!',
            data: menu
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Terjadi Kesalahan!!!'
        });
    }
});

// edit menu
router.put('/:id', async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id);

        if (!menu) {
            return res.status(404).json({
                status: false,
                message: 'Menu tidak ditemukan!'
            });
        }

        if (req.body.nama) menu.nama = req.body.nama;
        if (req.body.kategori) menu.kategori = req.body.kategori;
        if (req.body.harga) menu.harga = req.body.harga;
        if (req.body.tersedia) menu.tersedia = req.body.tersedia;
        if (req.body.deskripsi) menu.deskripsi = req.body.deskripsi;

        const updateMenu = await menu.save();

        res.json({
            status: true,
            message: 'Berhasil melakukan edit menu!',
            data: updateMenu
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: 'Bad request'
        });
    }
});

// hapus menu
router.delete('/:id', async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id);

        if (!menu) {
            return res.status(404).json({
                status: false,
                message: 'Menu tidak ditemukan!'
            });
        }

        await menu.deleteOne();

        res.json({
            status: true,
            message: 'Berhasil menghapus menu!',
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Terjadi Kesalahan'
        });
    }
});

module.exports = router;