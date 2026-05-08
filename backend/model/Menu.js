const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    kategori: {
        type: String,
        required: true,
        enum: ['Makanan', 'Minuman', 'Snack']
    },
    harga: {
        type: Number,
        required: true
    },
    tersedia: {
        type: Boolean,
        default: true 
    },
    deskripsi: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Menu', menuSchema);