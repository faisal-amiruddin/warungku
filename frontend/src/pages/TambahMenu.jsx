import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MenuForm from '../components/menu/MenuForm'
import { useMenu } from '../hooks/useMenu'

function TambahMenu() {
  const navigate = useNavigate()
  const { createMenu } = useMenu()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData) => {
    setIsSubmitting(true)
    try {
      await createMenu(formData)
      navigate('/')
    } catch (error) {
      alert('Gagal menambahkan menu: ' + (error.response?.data?.message || error.message))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tambah Menu Baru</h1>
        <p className="text-gray-500 mt-1">
          Isi detail menu yang ingin dijual di warungmu
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <MenuForm onSubmit={handleSubmit} isLoading={isSubmitting} />
      </div>
    </div>
  )
}

export default TambahMenu