import { useState, useEffect } from 'react'
import Input from '../common/Input'
import Select from '../common/Select'
import Button from '../common/Button'
import { KATEGORI_OPTIONS } from '../../constants/api'

const initialFormState = {
  nama: '',
  kategori: 'Makanan',
  harga: '',
  deskripsi: '',
  tersedia: true,
}

function MenuForm({ initialData = null, onSubmit, isLoading = false }) {
  const [form, setForm] = useState(initialFormState)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialData) {
      setForm({
        nama: initialData.nama || '',
        kategori: initialData.kategori || 'Makanan',
        harga: initialData.harga?.toString() || '',
        deskripsi: initialData.deskripsi || '',
        tersedia: initialData.tersedia ?? true,
      })
    }
  }, [initialData])

  const validate = () => {
    const newErrors = {}
    
    if (!form.nama.trim()) {
      newErrors.nama = 'Nama menu wajib diisi'
    } else if (form.nama.trim().length < 3) {
      newErrors.nama = 'Nama minimal 3 karakter'
    }
    
    if (!form.harga) {
      newErrors.harga = 'Harga wajib diisi'
    } else if (Number(form.harga) < 0) {
      newErrors.harga = 'Harga tidak boleh minus'
    } else if (Number(form.harga) === 0) {
      newErrors.harga = 'Harga tidak boleh 0'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onSubmit({
        ...form,
        harga: Number(form.harga),
      })
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    // Clear error saat user mulai ngetik
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Nama Menu"
        name="nama"
        value={form.nama}
        onChange={handleChange}
        placeholder="Contoh: Nasi Goreng Spesial"
        error={errors.nama}
        autoFocus
      />

      <Select
        label="Kategori"
        name="kategori"
        value={form.kategori}
        onChange={handleChange}
        options={KATEGORI_OPTIONS}
        error={errors.kategori}
      />

      <Input
        label="Harga (Rp)"
        type="number"
        name="harga"
        value={form.harga}
        onChange={handleChange}
        placeholder="Contoh: 15000"
        min="0"
        error={errors.harga}
      />

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Deskripsi
        </label>
        <textarea
          name="deskripsi"
          value={form.deskripsi}
          onChange={handleChange}
          rows={3}
          placeholder="Deskripsi menu (opsional)"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center gap-3 bg-gray-50 p-3 rounded">
        <input
          type="checkbox"
          name="tersedia"
          checked={form.tersedia}
          onChange={handleChange}
          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
        />
        <label className="text-sm font-medium text-gray-700">
          Menu tersedia untuk dijual
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <Button 
          type="submit" 
          variant="primary" 
          size="lg"
          className="flex-1"
          isLoading={isLoading}
        >
          {initialData ? '💾 Update Menu' : '✨ Simpan Menu'}
        </Button>
      </div>
    </form>
  )
}

export default MenuForm